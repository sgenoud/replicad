import { expose } from "comlink";
import * as replicad from "replicad";

import initOpenCascade from "./initOCSingle.js";
import initOpenCascadeWithExceptions from "./initOCWithExceptions.js";
import { StudioHelper } from "./utils/StudioHelper";
import { runInContext, buildModuleEvaluator } from "./vm";

import { renderOutput, ShapeStandardizer } from "./utils/renderOutput";

self.replicad = replicad;

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
try {
  return defaultParams;
} catch (e) {
  return null;
}
  `;

  try {
    return runInContext(editedText, {});
  } catch (e) {
    return {};
  }
};

const extractDefaultNameFromCode = async (code) => {
  if (code.match(/^\s*export\s+/m)) {
    const module = await buildModuleEvaluator(code);
    return module.defaultName || null;
  }

  const editedText = `
${code}
try {
  return defaultName;
} catch (e) {
  return null;
}
  `;

  try {
    return runInContext(editedText, {});
  } catch (e) {
    return null;
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

const formatException = (oc, e) => {
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
};

const buildShapesFromCode = async (code, params) => {
  const oc = await OC;
  replicad.setOC(oc);
  if (!replicad.getFont())
    await replicad.loadFont("/fonts/HKGrotesk-Regular.ttf");

  let shapes;
  const helper = new StudioHelper();
  const standardizer = new ShapeStandardizer();

  try {
    self.$ = helper;
    self.registerShapeStandardizer =
      standardizer.registerAdapter.bind(standardizer);
    shapes = await runCode(code, params);
  } catch (e) {
    return formatException(oc, e);
  }

  return renderOutput(shapes, standardizer, (shapes) => {
    const editedShapes = helper.apply(shapes);
    SHAPES_MEMORY.defaultShape = shapes;
    return editedShapes;
  });
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
  extractDefaultNameFromCode,
  exportShape,
  edgeInfo,
  faceInfo,
  toggleExceptions,
  exceptionsEnabled: () => ocVersions.current === "withExceptions",
};

expose(service, self);
export default service;
