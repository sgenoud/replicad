var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import parse from "parse-css-color";
import { rollup } from "@rollup/browser";
import { transform } from "sucrase";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { rollup as rollup$1 } from "rollup";
const DEFAULT_MESH_CONFIG = {
  tolerance: 0.01,
  angularTolerance: 30
};
const isMeshShape = (replicad, shape) => {
  if (typeof replicad.MeshShape === "function") {
    return shape instanceof replicad.MeshShape;
  }
  return !(shape == null ? void 0 : shape.blobSTEP) && !!(shape == null ? void 0 : shape.mesh);
};
const buildBlob = (shape, fileType, meshConfig = DEFAULT_MESH_CONFIG) => {
  if (fileType === "stl")
    return shape.blobSTL(meshConfig);
  if (fileType === "stl-binary") {
    return shape.blobSTL({ ...meshConfig, binary: true });
  }
  if (fileType === "step")
    return shape.blobSTEP();
  throw new Error(`Filetype "${fileType}" unknown for export.`);
};
function exportShapeEntries(replicad, shapesMemory, fileType = "stl", shapeId = "defaultShape", meshConfig = DEFAULT_MESH_CONFIG) {
  if (!shapesMemory[shapeId]) {
    throw new Error(`Shape ${shapeId} not computed yet`);
  }
  const isStepExport = fileType === "step" || fileType === "step-assembly";
  const exportableShapes = isStepExport ? shapesMemory[shapeId].filter(({ shape }) => !isMeshShape(replicad, shape)) : shapesMemory[shapeId];
  if (isStepExport && exportableShapes.length === 0) {
    throw new Error(
      "STEP export is not supported for mesh shapes. No exportable shapes found."
    );
  }
  if (fileType === "step-assembly") {
    if (!replicad.exportSTEP) {
      throw new Error("replicad.exportSTEP is not available");
    }
    return [
      {
        blob: replicad.exportSTEP(exportableShapes),
        name: shapeId
      }
    ];
  }
  return exportableShapes.map(({ shape, name }) => ({
    blob: buildBlob(shape, fileType, meshConfig),
    name
  }));
}
const adaptSketchDebugShape = (replicad, shape) => {
  if (!replicad.Sketch || !(shape instanceof replicad.Sketch))
    return shape;
  if (shape.wire.isClosed)
    return shape.face();
  return shape.wire;
};
class BuilderHelper {
  constructor(replicad) {
    __publicField(this, "replicad");
    __publicField(this, "shapes");
    __publicField(this, "faceFinder");
    __publicField(this, "edgeFinder");
    this.replicad = replicad;
    this.shapes = [];
    this.faceFinder = null;
    this.edgeFinder = null;
  }
  debug(shape) {
    this.shapes.push(shape);
    return shape;
  }
  d(shape) {
    return this.debug(shape);
  }
  highlightFace(faceFinder) {
    this.faceFinder = faceFinder;
    return faceFinder;
  }
  hf(faceFinder) {
    return this.highlightFace(faceFinder);
  }
  highlightEdge(edgeFinder) {
    this.edgeFinder = edgeFinder;
    return edgeFinder;
  }
  he(edgeFinder) {
    return this.highlightEdge(edgeFinder);
  }
  apply(config) {
    const nextConfig = config.concat(
      this.shapes.map((shape, index) => ({
        shape: adaptSketchDebugShape(this.replicad, shape),
        name: `Debug ${index}`
      }))
    );
    nextConfig.forEach((shapeConfig) => {
      if (this.edgeFinder && !shapeConfig.highlightEdge) {
        shapeConfig.highlightEdge = this.edgeFinder;
      }
      if (this.faceFinder && !shapeConfig.highlightFace) {
        shapeConfig.highlightFace = this.faceFinder;
      }
    });
    return nextConfig;
  }
}
const rgbToHex = (color) => {
  const [r, g, b] = color;
  return "#" + [r, g, b].map((x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }).join("");
};
function normalizeColor(color) {
  const parsed = parse(color);
  if (!parsed || parsed.type.startsWith("hsl")) {
    return { color: "#fff", alpha: 1 };
  }
  return {
    color: rgbToHex(parsed.values),
    alpha: parsed.alpha
  };
}
const isInstanceOf = (value, maybeConstructor) => {
  return typeof maybeConstructor === "function" && value instanceof maybeConstructor;
};
const isSVGable = (replicad, shape) => {
  return isInstanceOf(shape, replicad.Blueprint) || isInstanceOf(shape, replicad.Blueprints) || isInstanceOf(shape, replicad.CompoundBlueprint) || isInstanceOf(shape, replicad.Drawing) || !!(shape == null ? void 0 : shape.toSVGPaths) && !!(shape == null ? void 0 : shape.toSVGViewBox);
};
const isMeshable = (shape) => {
  return !!(shape == null ? void 0 : shape.mesh);
};
const inferSolidType = (replicad, shape) => {
  if (isInstanceOf(shape, replicad.MeshShape))
    return "mesh";
  return "shape";
};
function createBasicShapeConfig(inputShapes, baseName = "Shape") {
  let shapes = [];
  if (!inputShapes)
    return [];
  if (Array.isArray(inputShapes))
    shapes = inputShapes;
  else
    shapes = [inputShapes];
  return shapes.map((inputShape) => {
    if (!inputShape.shape) {
      return {
        shape: inputShape
      };
    }
    return inputShape;
  }).map((inputShape, index) => {
    const { name, ...rest } = inputShape;
    const shapeIndex = shapes.length > 1 ? ` ${index}` : "";
    return {
      name: name || `${baseName}${shapeIndex}`,
      ...rest
    };
  });
}
function normalizeColorAndOpacity(shape) {
  const { color, opacity, ...rest } = shape;
  const normalizedColor = color ? normalizeColor(color) : void 0;
  let configuredOpacity = opacity;
  if (normalizedColor && normalizedColor.alpha !== 1) {
    configuredOpacity = opacity ?? normalizedColor.alpha;
  }
  return {
    ...rest,
    color: normalizedColor == null ? void 0 : normalizedColor.color,
    opacity: configuredOpacity
  };
}
function normalizeHighlight(replicad, config) {
  const {
    highlight: inputHighlight,
    highlightEdge,
    highlightFace,
    ...rest
  } = config;
  const highlight = (inputHighlight && typeof inputHighlight.find === "function" ? inputHighlight : null) || (highlightEdge && replicad.EdgeFinder ? highlightEdge(new replicad.EdgeFinder()) : null) || (highlightFace && replicad.FaceFinder ? highlightFace(new replicad.FaceFinder()) : null);
  return {
    ...rest,
    highlight
  };
}
function normalizeLabels(replicad, config) {
  const { labels = [], ...rest } = config;
  const filteredLabels = labels.filter((labelConfig) => {
    return labelConfig && labelConfig.label && labelConfig.from && labelConfig.to;
  }).map((labelConfig) => {
    const {
      label,
      from: fromInput,
      to: toInput,
      offset: offsetInput,
      color,
      mode,
      fontSize,
      position
    } = labelConfig;
    const from = isInstanceOf(fromInput, replicad.Vertex) ? fromInput.asTuple() : fromInput;
    const to = isInstanceOf(toInput, replicad.Vertex) ? toInput.asTuple() : toInput;
    const offset = isInstanceOf(offsetInput, replicad.Vertex) ? offsetInput.asTuple() : offsetInput;
    return {
      label: label ?? "Label",
      from,
      to,
      offset,
      color,
      mode,
      fontSize,
      position
    };
  });
  return {
    ...rest,
    labels: filteredLabels
  };
}
function checkShapeConfigIsValid(replicad, shape) {
  return isSVGable(replicad, shape.shape) || isMeshable(shape.shape);
}
const adaptSketch = (replicad, shape) => {
  if (!isInstanceOf(shape, replicad.Sketch))
    return shape;
  if (shape.wire.isClosed)
    return shape.face();
  return shape.wire;
};
const adaptSketches = (replicad, shape) => {
  const isSketches = isInstanceOf(shape, replicad.Sketches) || isInstanceOf(shape, replicad.CompoundSketch);
  if (!isSketches)
    return shape;
  return shape.wires;
};
class ShapeStandardizer {
  constructor(replicad) {
    __publicField(this, "replicad");
    __publicField(this, "shapeAdapters");
    this.replicad = replicad;
    this.shapeAdapters = {
      sketch: (shape) => adaptSketch(this.replicad, shape),
      sketches: (shape) => adaptSketches(this.replicad, shape)
    };
  }
  registerAdapter(name, adapter) {
    this.shapeAdapters[name] = adapter;
  }
  adaptShape(shape) {
    Object.values(this.shapeAdapters).forEach((adapter) => {
      shape = adapter(shape);
    });
    return shape;
  }
  standardizeShape(shapes) {
    return shapes.map(({ shape, ...rest }) => ({
      shape: this.adaptShape(shape),
      ...rest
    })).filter(
      (shape) => checkShapeConfigIsValid(this.replicad, shape)
    );
  }
}
function renderSVG(shapeConfig) {
  const { name, shape, color, strokeType, opacity } = shapeConfig;
  return {
    name,
    color,
    strokeType,
    opacity,
    format: "svg",
    paths: shape.toSVGPaths(),
    viewbox: shape.toSVGViewBox()
  };
}
function renderMesh(replicad, shapeConfig) {
  const { name, shape, color, opacity, labels, highlight, solidType } = shapeConfig;
  const shapeInfo = {
    name,
    color,
    opacity,
    solidType: solidType || inferSolidType(replicad, shape),
    labels,
    mesh: null,
    edges: null,
    error: false,
    message: null,
    highlight: null
  };
  try {
    const hasMeshEdges = typeof shape.meshEdges === "function";
    const mesh = hasMeshEdges ? shape.mesh({
      tolerance: 0.1,
      angularTolerance: 30
    }) : shape.mesh();
    if (mesh) {
      if (!Array.isArray(mesh.vertices) && ArrayBuffer.isView(mesh.vertices)) {
        mesh.vertices = Array.from(mesh.vertices);
      }
      if (!Array.isArray(mesh.triangles) && ArrayBuffer.isView(mesh.triangles)) {
        mesh.triangles = Array.from(mesh.triangles);
      }
      if (!Array.isArray(mesh.normals) && ArrayBuffer.isView(mesh.normals)) {
        mesh.normals = Array.from(mesh.normals);
      }
      if (Array.isArray(mesh.normals) && Array.isArray(mesh.vertices) && mesh.normals.length !== mesh.vertices.length) {
        delete mesh.normals;
      }
    }
    shapeInfo.mesh = mesh;
    if (hasMeshEdges) {
      shapeInfo.edges = shape.meshEdges({ keepMesh: true });
    }
  } catch (error) {
    console.error(error);
    shapeInfo.error = true;
    shapeInfo.message = (error == null ? void 0 : error.message) || "Could not generate the mesh";
    return shapeInfo;
  }
  if (highlight) {
    try {
      shapeInfo.highlight = highlight.find(shape).map((subshape) => {
        return subshape.hashCode;
      });
    } catch (error) {
      console.error(error);
    }
  }
  return shapeInfo;
}
function render(replicad, shapes) {
  return shapes.map((shapeConfig) => {
    if (isSVGable(replicad, shapeConfig.shape)) {
      return renderSVG(shapeConfig);
    }
    return renderMesh(replicad, shapeConfig);
  });
}
function renderOutput(shapes, options) {
  const {
    replicad,
    shapeStandardizer,
    beforeRender,
    defaultName = "Shape"
  } = options;
  const standardizer = shapeStandardizer || new ShapeStandardizer(replicad);
  const baseShape = createBasicShapeConfig(shapes, defaultName).map(normalizeColorAndOpacity).map((shape) => normalizeHighlight(replicad, shape)).map((shape) => normalizeLabels(replicad, shape));
  const standardizedShapes = standardizer.standardizeShape(baseShape);
  const config = beforeRender ? beforeRender(standardizedShapes) : standardizedShapes;
  return render(replicad, config);
}
const MODULE_RE = /^\s*export\s+/m;
const createShapeMemory = () => /* @__PURE__ */ Object.create(null);
const isModuleCode = (code) => MODULE_RE.test(code);
function formatException(oc, error) {
  let message = "error";
  if (typeof error === "number") {
    if (oc == null ? void 0 : oc.OCJS) {
      const kernelError = oc.OCJS.getStandard_FailureData(error);
      message = kernelError.GetMessageString();
    } else {
      message = `Kernel error ${error}`;
    }
  } else if (error == null ? void 0 : error.message) {
    message = error.message;
    console.error(error);
  } else {
    message = String(error);
  }
  return {
    error: true,
    message,
    stack: error == null ? void 0 : error.stack
  };
}
async function withTemporaryGlobals(globals, callback) {
  const previous = /* @__PURE__ */ new Map();
  Object.entries(globals).forEach(([key, value]) => {
    previous.set(key, {
      hadOwnProperty: Object.prototype.hasOwnProperty.call(globalThis, key),
      value: globalThis[key]
    });
    globalThis[key] = value;
  });
  try {
    return await callback();
  } finally {
    previous.forEach(({ hadOwnProperty, value }, key) => {
      if (hadOwnProperty) {
        globalThis[key] = value;
      } else {
        delete globalThis[key];
      }
    });
  }
}
function createBuilder({ runtime, codeEvaluator }) {
  const shapesMemory = createShapeMemory();
  const ensureRuntimeReady = async () => {
    var _a, _b, _c, _d, _e, _f, _g;
    const currentRuntime = await runtime();
    (_b = (_a = currentRuntime.replicad).setOC) == null ? void 0 : _b.call(_a, currentRuntime.oc);
    if ((_c = currentRuntime.manifold) == null ? void 0 : _c.Manifold) {
      (_e = (_d = currentRuntime.manifold).setup) == null ? void 0 : _e.call(_d);
      (_g = (_f = currentRuntime.replicad).setManifold) == null ? void 0 : _g.call(_f, currentRuntime.manifold);
    }
    return currentRuntime;
  };
  const ensureFontLoaded = async (replicad, fontPath) => {
    var _a, _b;
    if (!fontPath || ((_a = replicad.getFont) == null ? void 0 : _a.call(replicad)))
      return;
    await ((_b = replicad.loadFont) == null ? void 0 : _b.call(replicad, fontPath));
  };
  const runInContextAsOC = (code, context = {}) => {
    const editedText = `
${code}
let dp = {}
try {
  dp = defaultParams;
} catch (error) {}
return main(replicad, __inputParams || dp)
    `;
    return codeEvaluator.runInContext(editedText, context);
  };
  const evaluateModule = async (code) => {
    const currentRuntime = await ensureRuntimeReady();
    return await codeEvaluator.evaluateModule(code, {
      filename: "__entry__.ts",
      globals: {
        replicad: currentRuntime.replicad,
        oc: currentRuntime.oc
      }
    });
  };
  const runAsFunction = async (code, params) => {
    const currentRuntime = await ensureRuntimeReady();
    return await runInContextAsOC(code, {
      oc: currentRuntime.oc,
      replicad: currentRuntime.replicad,
      __inputParams: params
    });
  };
  const runAsModule = async (code, params) => {
    const currentRuntime = await ensureRuntimeReady();
    const module = await evaluateModule(code);
    if (module.default) {
      return module.default(params || module.defaultParams);
    }
    return module.main(
      currentRuntime.replicad,
      params || module.defaultParams || {}
    );
  };
  const runCode = async (code, params) => {
    if (isModuleCode(code)) {
      return await runAsModule(code, params);
    }
    return await runAsFunction(code, params);
  };
  const extractDefaultParamsFromCode = async (code) => {
    if (isModuleCode(code)) {
      const module = await evaluateModule(code);
      return module.defaultParams || null;
    }
    const editedText = `
${code}
try {
  return defaultParams;
} catch (error) {
  return null;
}
    `;
    try {
      return await codeEvaluator.runInContext(editedText, {});
    } catch (error) {
      return {};
    }
  };
  const extractDefaultNameFromCode = async (code) => {
    if (isModuleCode(code)) {
      const module = await evaluateModule(code);
      return module.defaultName;
    }
    const editedText = `
${code}
try {
  return defaultName;
} catch (error) {
  return;
}
    `;
    try {
      return await codeEvaluator.runInContext(editedText, {});
    } catch (error) {
      return void 0;
    }
  };
  const computeLabels = async (code, params) => {
    var _a;
    if (!isModuleCode(code))
      return [];
    const currentRuntime = await ensureRuntimeReady();
    await ensureFontLoaded(currentRuntime.replicad, currentRuntime.fontPath);
    const module = await evaluateModule(code);
    const labels = ((_a = module.labels) == null ? void 0 : _a.call(module, params || module.defaultParams || {})) || [];
    return labels.filter((labelConfig) => {
      return labelConfig && labelConfig.label && labelConfig.from && labelConfig.to;
    });
  };
  const buildShapesFromCode = async (code, params) => {
    const currentRuntime = await ensureRuntimeReady();
    await ensureFontLoaded(currentRuntime.replicad, currentRuntime.fontPath);
    let shapes;
    let defaultName;
    const helper = new BuilderHelper(currentRuntime.replicad);
    const standardizer = new ShapeStandardizer(currentRuntime.replicad);
    try {
      shapes = await withTemporaryGlobals(
        {
          $: helper,
          registerShapeStandardizer: standardizer.registerAdapter.bind(standardizer)
        },
        async () => {
          const result = await runCode(code, params);
          defaultName = code ? await extractDefaultNameFromCode(code) : void 0;
          return result;
        }
      );
    } catch (error) {
      return formatException(currentRuntime.oc, error);
    }
    return renderOutput(shapes, {
      replicad: currentRuntime.replicad,
      shapeStandardizer: standardizer,
      beforeRender: (builtShapes) => {
        const editedShapes = helper.apply(builtShapes);
        shapesMemory.defaultShape = builtShapes;
        return editedShapes;
      },
      defaultName
    });
  };
  const exportShape = async (fileType = "stl", shapeId = "defaultShape", meshConfig) => {
    const currentRuntime = await ensureRuntimeReady();
    return exportShapeEntries(
      currentRuntime.replicad,
      shapesMemory,
      fileType,
      shapeId,
      meshConfig
    );
  };
  const loadFont = async (fontData, fontName, forceUpdate = false) => {
    var _a, _b;
    const currentRuntime = await ensureRuntimeReady();
    await ((_b = (_a = currentRuntime.replicad).loadFont) == null ? void 0 : _b.call(_a, fontData, fontName, forceUpdate));
  };
  const faceInfo = (subshapeIndex, faceIndex, shapeId = "defaultShape") => {
    var _a, _b, _c;
    const face = (_c = (_b = (_a = shapesMemory[shapeId]) == null ? void 0 : _a[subshapeIndex]) == null ? void 0 : _b.shape.faces) == null ? void 0 : _c[faceIndex];
    if (!face)
      return null;
    return {
      type: face.geomType,
      center: face.center.toTuple(),
      normal: face.normalAt().normalize().toTuple()
    };
  };
  const edgeInfo = (subshapeIndex, edgeIndex, shapeId = "defaultShape") => {
    var _a, _b, _c;
    const edge = (_c = (_b = (_a = shapesMemory[shapeId]) == null ? void 0 : _a[subshapeIndex]) == null ? void 0 : _b.shape.edges) == null ? void 0 : _c[edgeIndex];
    if (!edge)
      return null;
    return {
      type: edge.geomType,
      start: edge.startPoint.toTuple(),
      end: edge.endPoint.toTuple(),
      direction: edge.tangentAt().normalize().toTuple()
    };
  };
  return {
    ready: async () => {
      await ensureRuntimeReady();
      return true;
    },
    buildShapesFromCode,
    computeLabels,
    extractDefaultParamsFromCode,
    extractDefaultNameFromCode,
    extractDefaultParams: extractDefaultParamsFromCode,
    extractDefaultName: extractDefaultNameFromCode,
    exportShape,
    loadFont,
    faceInfo,
    edgeInfo
  };
}
function createExternalGlobalsPlugin() {
  return {
    name: "replicad-evaluator-external-globals",
    transform(code) {
      if (!code.includes(`"replicad"`) && !code.includes(`'replicad'`)) {
        return null;
      }
      let transformed = code;
      transformed = transformed.replace(
        /import\s+\*\s+as\s+([\w$]+)\s+from\s+["']replicad["'];?/g,
        (_match, namespaceImport) => {
          return `const ${namespaceImport} = globalThis.replicad;`;
        }
      );
      transformed = transformed.replace(
        /import\s+([\w$]+)\s*,\s*{([^}]+)}\s+from\s+["']replicad["'];?/g,
        (_match, defaultImport, namedImports) => {
          return [
            `const ${defaultImport} = globalThis.replicad;`,
            `const { ${rewriteNamedImports(namedImports)} } = globalThis.replicad;`
          ].join("\n");
        }
      );
      transformed = transformed.replace(
        /import\s+{([^}]+)}\s+from\s+["']replicad["'];?/g,
        (_match, namedImports) => {
          return `const { ${rewriteNamedImports(namedImports)} } = globalThis.replicad;`;
        }
      );
      transformed = transformed.replace(
        /import\s+([\w$]+)\s+from\s+["']replicad["'];?/g,
        (_match, defaultImport) => {
          return `const ${defaultImport} = globalThis.replicad;`;
        }
      );
      transformed = transformed.replace(
        /import\s+["']replicad["'];?/g,
        ""
      );
      if (transformed === code)
        return null;
      return {
        code: transformed,
        map: null
      };
    }
  };
}
function rewriteNamedImports(namedImports) {
  return namedImports.split(",").map((entry) => entry.trim()).filter(Boolean).map((entry) => {
    if (!entry.includes(" as "))
      return entry;
    const [imported, local] = entry.split(/\s+as\s+/);
    return `${imported.trim()}: ${local.trim()}`;
  }).join(", ");
}
const TYPESCRIPT_FILE_RE = /\.(?:ts|tsx)$/;
function createSucraseTsPlugin() {
  return {
    name: "replicad-evaluator-sucrase-ts",
    transform(code, id) {
      if (!TYPESCRIPT_FILE_RE.test(id))
        return null;
      const result = transform(code, {
        transforms: ["typescript"],
        filePath: id,
        sourceMapOptions: {
          compiledFilename: id
        }
      });
      return {
        code: result.code,
        map: result.sourceMap
      };
    }
  };
}
const REMOTE_ID_RE = /^(https?:\/\/|data:)/;
const isRemoteId = (id) => REMOTE_ID_RE.test(id);
function createUrlResolverPlugin(fetchImpl) {
  const fetcher = fetchImpl ?? globalThis.fetch;
  const requestCache = /* @__PURE__ */ new Map();
  return {
    name: "replicad-evaluator-url-resolver",
    async resolveId(source, importer) {
      if (source === "replicad")
        return null;
      if (isRemoteId(source))
        return source;
      if (importer && /^https?:\/\//.test(importer) && source.startsWith(".")) {
        return new URL(source, importer).href;
      }
      return null;
    },
    async load(id) {
      if (!isRemoteId(id))
        return null;
      if (!fetcher) {
        throw new Error("fetch is required to resolve remote modules");
      }
      if (!requestCache.has(id)) {
        requestCache.set(
          id,
          fetcher(id).then(async (response) => {
            if (!response.ok) {
              throw new Error(`Could not fetch ${id}: ${response.status}`);
            }
            return await response.text();
          })
        );
      }
      return await requestCache.get(id);
    }
  };
}
function createVirtualEntryPlugin(entryId, code) {
  return {
    name: "replicad-evaluator-virtual-entry",
    resolveId(id) {
      if (id === entryId)
        return id;
      return null;
    },
    load(id) {
      if (id === entryId)
        return code;
      return null;
    }
  };
}
const IMPORT_OR_EXPORT_RE = /^\s*(import|export)\s/m;
const REMOTE_IMPORT_RE = /from\s+["'](?:https?:\/\/|data:)/m;
const TYPESCRIPT_HINTS_RE = /\b(?:interface|type|enum|implements|readonly|public|private|protected)\b|:\s*[\w$][\w$<>, .[\]|&?:-]*(?=[,)=;])/m;
function looksLikeTypeScript(code) {
  return TYPESCRIPT_HINTS_RE.test(code);
}
function shouldBundle(code) {
  return IMPORT_OR_EXPORT_RE.test(code) || REMOTE_IMPORT_RE.test(code) || looksLikeTypeScript(code);
}
const DEFAULT_ENTRY_ID = "__entry__.ts";
async function bundleCodeWithRollup(rollupImplementation, code, options = {}) {
  if (!shouldBundle(code)) {
    return {
      code,
      bundled: false
    };
  }
  const entryId = options.filename || DEFAULT_ENTRY_ID;
  const plugins = [
    createVirtualEntryPlugin(entryId, code),
    createUrlResolverPlugin(options.fetch),
    createSucraseTsPlugin(),
    createExternalGlobalsPlugin()
  ];
  const bundle = await rollupImplementation({
    input: entryId,
    treeshake: false,
    plugins
  });
  try {
    const output = await bundle.generate({
      format: "es",
      sourcemap: "inline",
      inlineDynamicImports: true,
      exports: "named"
    });
    const chunk = output.output.find(
      (entry) => entry.type === "chunk"
    );
    if (!chunk) {
      throw new Error("Rollup did not produce a JavaScript chunk");
    }
    return {
      code: chunk.code,
      bundled: true
    };
  } finally {
    await bundle.close();
  }
}
function bundleBrowserCode(code, options = {}) {
  return bundleCodeWithRollup(rollup, code, options);
}
function buildFunctionWithContext(evalString, context) {
  return `
  return function (context) {
    "use strict";
    ${Object.keys(context).length > 0 ? `let ${Object.keys(context).map(
    (key) => `${key} = context[${JSON.stringify(key)}]`
  )};` : ``}
    ${evalString};
  }
  `;
}
function buildEvaluator(evalString, context) {
  const template = buildFunctionWithContext(evalString, context);
  const functor = Function(template);
  return functor();
}
function runInContext(text, context = {}) {
  const evaluator = buildEvaluator(text, context);
  return evaluator(context);
}
async function withGlobalBindings(globals, callback) {
  const previousValues = /* @__PURE__ */ new Map();
  Object.entries(globals).forEach(([key, value]) => {
    previousValues.set(key, {
      hadOwnProperty: Object.prototype.hasOwnProperty.call(globalThis, key),
      value: globalThis[key]
    });
    globalThis[key] = value;
  });
  try {
    return await callback();
  } finally {
    previousValues.forEach(({ hadOwnProperty, value }, key) => {
      if (hadOwnProperty) {
        globalThis[key] = value;
      } else {
        delete globalThis[key];
      }
    });
  }
}
function createBrowserCodeEvaluator(options = {}) {
  return {
    runInContext,
    async evaluateModule(code, evaluateOptions = {}) {
      const bundled = await bundleBrowserCode(code, {
        filename: evaluateOptions.filename,
        fetch: options.fetch
      });
      const url = URL.createObjectURL(
        new Blob([bundled.code], { type: "text/javascript" })
      );
      try {
        return await withGlobalBindings(evaluateOptions.globals ?? {}, async () => {
          return await import(
            /* @vite-ignore */
            url
          );
        });
      } finally {
        URL.revokeObjectURL(url);
      }
    }
  };
}
function bundleNodeCode(code, options = {}) {
  return bundleCodeWithRollup(rollup$1, code, options);
}
function createNodeCodeEvaluator(options = {}) {
  return {
    runInContext,
    async evaluateModule(code, evaluateOptions = {}) {
      const bundled = await bundleNodeCode(code, {
        filename: evaluateOptions.filename,
        fetch: options.fetch
      });
      const tempRoot = await mkdtemp(
        join(options.tempDir || tmpdir(), "replicad-evaluator-")
      );
      const modulePath = join(tempRoot, "entry.mjs");
      await writeFile(modulePath, bundled.code, "utf8");
      try {
        return await withGlobalBindings(evaluateOptions.globals ?? {}, async () => {
          return await import(pathToFileURL(modulePath).href);
        });
      } finally {
        await rm(tempRoot, { recursive: true, force: true });
      }
    }
  };
}
const isBrowserEnvironment = () => {
  return typeof WorkerGlobalScope !== "undefined" || typeof window !== "undefined" && typeof document !== "undefined";
};
function createCodeEvaluator(options = {}) {
  if (isBrowserEnvironment()) {
    return createBrowserCodeEvaluator(options);
  }
  return createNodeCodeEvaluator(options);
}
function createRuntimeResolver(options) {
  if (options.runtime) {
    return options.runtime;
  }
  return async () => {
    const oc = await options.oc;
    const manifold = await options.manifold;
    return {
      replicad: options.replicad,
      oc,
      manifold,
      fontPath: options.fontPath
    };
  };
}
function createEvaluator(options) {
  const runtime = createRuntimeResolver(options);
  const codeEvaluator = options.codeEvaluator || createCodeEvaluator({
    fetch: options.fetch,
    tempDir: options.tempDir
  });
  return createBuilder({
    runtime,
    codeEvaluator
  });
}
export {
  BuilderHelper,
  ShapeStandardizer,
  createEvaluator,
  normalizeColor,
  render,
  renderOutput
};
//# sourceMappingURL=replicad-evaluator.js.map
