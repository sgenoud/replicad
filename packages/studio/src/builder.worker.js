import { expose } from "comlink";
import * as replicad from "replicad";

import initOpenCascade from "./initOCSingle.js";
import initOpenCascadeWithExceptions from "./initOCWithExceptions.js";
import normalizeColor from "./utils/normalizeColor";
import { runInContext, buildModuleEvaluator } from "./vm";

self.replicad = replicad;

const isBlueprintLike = (shape) => {
  return (
    shape instanceof replicad.Blueprint ||
    shape instanceof replicad.Blueprints ||
    shape instanceof replicad.CompoundBlueprint ||
    shape instanceof replicad.Drawing
  );
};

export function runInContextAsOC(code, context = {}) {
  const editedText = `
${code}
let dp = {}
try {
  dp = defaultParams;
} catch (e) {}
return main(replicad, __inputParams || dp)
  `;

  return runInContext(editedText, context);
}

async function runAsFunction(code, params) {
  const oc = await OC;

  return runInContextAsOC(code, {
    oc,
    replicad,
    __inputParams: params,
  });
}

export async function runAsModule(code, params) {
  const module = await buildModuleEvaluator(code);

  if (module.default) return module.default(params || module.defaultParams);
  return module.main(replicad, params || module.defaultParams || {});
}

const runCode = async (code, params) => {
  if (code.match(/^\s*export\s+/m)) {
    return runAsModule(code, params);
  }
  return runAsFunction(code, params);
};

const extractDefaultParamsFromCode = async (code) => {
  if (code.match(/^\s*export\s+/m)) {
    const module = await buildModuleEvaluator(code);
    return module.defaultParams || null;
  }

  const editedText = `
${code}
let dp = null
try {
  dp = defaultParams;
} catch (e) { }
return dp
  `;

  try {
    return runInContext(editedText, {});
  } catch (e) {
    return {};
  }
};

const SHAPES_MEMORY = {};

const ocVersions = {
  withExceptions: null,
  single: null,
  current: null,
};

let OC = Promise.reject("OpenCascade not initialized");

function enableExceptions() {
  if (!ocVersions.withExceptions) {
    ocVersions.withExceptions = initOpenCascadeWithExceptions();
  }
  ocVersions.current = "withExceptions";
  OC = ocVersions.withExceptions;
}

function disableExceptions() {
  if (!ocVersions.single) {
    ocVersions.single = initOpenCascade();
  }
  ocVersions.current = "single";
  OC = ocVersions.single;
}

async function toggleExceptions() {
  if (ocVersions.current === "single") {
    enableExceptions();
  } else {
    disableExceptions();
  }

  await OC;
  return ocVersions.current;
}

disableExceptions();

const shapeOrSketch = (shape) => {
  if (!(shape instanceof replicad.Sketch)) return shape;
  if (shape.wire.isClosed) return shape.face();
  return shape.wire;
};

const organiseReturnValue = (inputShapes, baseName = "Shape") => {
  let shapes = inputShapes;

  if (!Array.isArray(shapes)) shapes = [shapes];

  return shapes.map((inputShape, i) => {
    if (!inputShape.shape) {
      return {
        name: `${baseName} ${i}`,
        shape: shapeOrSketch(inputShape),
      };
    }
    const { name, shape, ...rest } = inputShape;

    return {
      name: name || `${baseName} ${i}`,
      shape: shapeOrSketch(shape),
      ...rest,
    };
  });
};

const normalizeColorAndOpacity = (shapes) => {
  return shapes.map((shape) => {
    const { color, opacity, ...rest } = shape;

    const normalizedColor = color && normalizeColor(color);
    let configuredOpacity = opacity;
    if (normalizedColor && normalizedColor.alpha !== 1) {
      configuredOpacity = opacity ?? normalizedColor.alpha;
    }

    return {
      ...rest,
      color: normalizedColor?.color,
      opacity: configuredOpacity,
    };
  });
};

const buildShapesFromCode = async (code, params) => {
  const oc = await OC;
  replicad.setOC(oc);
  if (!replicad.getFont())
    await replicad.loadFont("/fonts/HKGrotesk-Regular.ttf");

  let shapes;
  try {
    shapes = await runCode(code, params);
  } catch (e) {
    let message = "error";

    if (typeof e === "number") {
      if (oc.OCJS) {
        const error = oc.OCJS.getStandard_FailureData(e);
        message = error.GetMessageString();
      } else {
        message = `Kernel error ${e}`;
      }
    } else {
      message = e.message;
      console.error(e);
    }

    return {
      error: true,
      message,
      stack: e.stack,
    };
  }

  shapes = organiseReturnValue(shapes);
  shapes = normalizeColorAndOpacity(shapes);
  console.log(shapes);
  SHAPES_MEMORY.defaultShape = shapes;

  return shapes
    .filter(
      ({ shape }) => !(shape instanceof replicad.Drawing) || shape.innerShape
    )
    .map(
      ({
        name,
        shape,
        color,
        strokeType,
        opacity,
        highlight: inputHighlight,
        highlightEdge,
        highlightFace,
      }) => {
        let highlight =
          inputHighlight ||
          (highlightEdge && highlightEdge(new replicad.EdgeFinder())) ||
          (highlightFace && highlightFace(new replicad.FaceFinder()));

        const shapeInfo = {
          name,
          color,
          strokeType,
          opacity,
        };

        if (isBlueprintLike(shape)) {
          shapeInfo.format = "svg";
          shapeInfo.paths = shape.toSVGPaths();
          shapeInfo.viewbox = shape.toSVGViewBox();
          return shapeInfo;
        }

        try {
          shapeInfo.mesh = shape.mesh({ tolerance: 0.1, angularTolerance: 30 });
          shapeInfo.edges = shape.meshEdges({ keepMesh: true });
        } catch (e) {
          console.error(e);
          shapeInfo.error = true;
          return shapeInfo;
        }

        if (highlight)
          try {
            shapeInfo.highlight = highlight.find(shape).map((s) => {
              return s.hashCode;
            });
          } catch (e) {
            console.error(e);
          }

        return shapeInfo;
      }
    );
};

const buildBlob = (
  shape,
  fileType,
  meshConfig = {
    tolerance: 0.01,
    angularTolerance: 30,
  }
) => {
  if (fileType === "stl") return shape.blobSTL(meshConfig);
  if (fileType === "stl-binary")
    return shape.blobSTL({ ...meshConfig, binary: true });
  if (fileType === "step") return shape.blobSTEP();
  throw new Error(`Filetype "${fileType}" unknown for export.`);
};
const exportShape = async (
  fileType = "stl",
  shapeId = "defaultShape",
  meshConfig
) => {
  if (!SHAPES_MEMORY[shapeId])
    throw new Error(`Shape ${shapeId} not computed yet`);
  if (fileType === "step-assembly") {
    return [
      {
        blob: replicad.exportSTEP(SHAPES_MEMORY[shapeId]),
        name: shapeId,
      },
    ];
  }
  return SHAPES_MEMORY[shapeId].map(({ shape, name }) => ({
    blob: buildBlob(shape, fileType, meshConfig),
    name,
  }));
};

const faceInfo = (subshapeIndex, faceIndex, shapeId = "defaultShape") => {
  const face = SHAPES_MEMORY[shapeId]?.[subshapeIndex]?.shape.faces[faceIndex];
  if (!face) return null;
  return {
    type: face.geomType,
    center: face.center.toTuple(),
    normal: face.normalAt().normalize().toTuple(),
  };
};

const edgeInfo = (subshapeIndex, edgeIndex, shapeId = "defaultShape") => {
  const edge = SHAPES_MEMORY[shapeId]?.[subshapeIndex]?.shape.edges[edgeIndex];
  if (!edge) return null;
  return {
    type: edge.geomType,
    start: edge.startPoint.toTuple(),
    end: edge.endPoint.toTuple(),
    direction: edge.tangentAt().normalize().toTuple(),
  };
};

const service = {
  ready: () => OC.then(() => true),
  buildShapesFromCode,
  extractDefaultParamsFromCode,
  exportShape,
  edgeInfo,
  faceInfo,
  toggleExceptions,
  exceptionsEnabled: () => ocVersions.current === "withExceptions",
};

expose(service, self);
export default service;
