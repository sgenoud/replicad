import { exportShapeEntries } from "./export";
import { BuilderHelper } from "./helper";
import { renderOutput, ShapeStandardizer } from "./render";
import type {
  CodeEvaluator,
  GenericRecord,
  ReplicadLike,
  RuntimeResolver,
} from "./types";

const MODULE_RE = /^\s*export\s+/m;

interface BuilderOptions {
  runtime: RuntimeResolver;
  codeEvaluator: CodeEvaluator;
}

const createShapeMemory = () => Object.create(null) as Record<string, any[]>;

const isModuleCode = (code: string) => MODULE_RE.test(code);

function formatException(oc: any, error: any) {
  let message = "error";

  if (typeof error === "number") {
    if (oc?.OCJS) {
      const kernelError = oc.OCJS.getStandard_FailureData(error);
      message = kernelError.GetMessageString();
    } else {
      message = `Kernel error ${error}`;
    }
  } else if (error?.message) {
    message = error.message;
    console.error(error);
  } else {
    message = String(error);
  }

  return {
    error: true,
    message,
    stack: error?.stack,
  };
}

async function withTemporaryGlobals<T>(
  globals: Record<string, unknown>,
  callback: () => Promise<T>
) {
  const previous = new Map<
    string,
    { hadOwnProperty: boolean; value: unknown }
  >();

  Object.entries(globals).forEach(([key, value]) => {
    previous.set(key, {
      hadOwnProperty: Object.prototype.hasOwnProperty.call(globalThis, key),
      value: (globalThis as Record<string, unknown>)[key],
    });
    (globalThis as Record<string, unknown>)[key] = value;
  });

  try {
    return await callback();
  } finally {
    previous.forEach(({ hadOwnProperty, value }, key) => {
      if (hadOwnProperty) {
        (globalThis as Record<string, unknown>)[key] = value;
      } else {
        delete (globalThis as Record<string, unknown>)[key];
      }
    });
  }
}

export function createBuilder({ runtime, codeEvaluator }: BuilderOptions) {
  const shapesMemory = createShapeMemory();

  const ensureRuntimeReady = async () => {
    const currentRuntime = await runtime();
    currentRuntime.replicad.setOC?.(currentRuntime.oc);

    if (currentRuntime.manifold?.Manifold) {
      currentRuntime.manifold.setup?.();
      currentRuntime.replicad.setManifold?.(currentRuntime.manifold);
    }

    return currentRuntime;
  };

  const ensureFontLoaded = async (
    replicad: ReplicadLike,
    fontPath?: string
  ) => {
    if (!fontPath || replicad.getFont?.()) return;
    await replicad.loadFont?.(fontPath);
  };

  const runInContextAsOC = (
    code: string,
    context: Record<string, unknown> = {}
  ) => {
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

  const evaluateModule = async (code: string) => {
    const currentRuntime = await ensureRuntimeReady();
    return await codeEvaluator.evaluateModule(code, {
      filename: "__entry__.ts",
      globals: {
        replicad: currentRuntime.replicad,
        oc: currentRuntime.oc,
      },
    });
  };

  const runAsFunction = async (code: string, params?: GenericRecord) => {
    const currentRuntime = await ensureRuntimeReady();
    return await runInContextAsOC(code, {
      oc: currentRuntime.oc,
      replicad: currentRuntime.replicad,
      __inputParams: params,
    });
  };

  const runAsModule = async (code: string, params?: GenericRecord) => {
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

  const runCode = async (code: string, params?: GenericRecord) => {
    if (isModuleCode(code)) {
      return await runAsModule(code, params);
    }
    return await runAsFunction(code, params);
  };

  const extractDefaultParamsFromCode = async (code: string) => {
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
      return (await codeEvaluator.runInContext(editedText, {})) as
        | GenericRecord
        | null;
    } catch (error) {
      return {};
    }
  };

  const extractDefaultNameFromCode = async (code: string) => {
    if (isModuleCode(code)) {
      const module = await evaluateModule(code);
      return module.defaultName as string | undefined;
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
      return (await codeEvaluator.runInContext(editedText, {})) as
        | string
        | undefined;
    } catch (error) {
      return undefined;
    }
  };

  const computeLabels = async (code: string, params?: GenericRecord) => {
    if (!isModuleCode(code)) return [];

    const currentRuntime = await ensureRuntimeReady();
    await ensureFontLoaded(currentRuntime.replicad, currentRuntime.fontPath);
    const module = await evaluateModule(code);
    const labels = module.labels?.(params || module.defaultParams || {}) || [];

    return labels.filter((labelConfig: any) => {
      return (
        labelConfig && labelConfig.label && labelConfig.from && labelConfig.to
      );
    });
  };

  const buildShapesFromCode = async (code: string, params?: GenericRecord) => {
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
          registerShapeStandardizer:
            standardizer.registerAdapter.bind(standardizer),
        },
        async () => {
          const result = await runCode(code, params);
          defaultName = code
            ? await extractDefaultNameFromCode(code)
            : undefined;
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
      defaultName,
    });
  };

  const exportShape = async (
    fileType = "stl",
    shapeId = "defaultShape",
    meshConfig?: GenericRecord
  ) => {
    const currentRuntime = await ensureRuntimeReady();
    return exportShapeEntries(
      currentRuntime.replicad,
      shapesMemory,
      fileType,
      shapeId,
      meshConfig
    );
  };

  const loadFont = async (
    fontData: string | ArrayBuffer,
    fontName?: string,
    forceUpdate = false
  ) => {
    const currentRuntime = await ensureRuntimeReady();
    await currentRuntime.replicad.loadFont?.(fontData, fontName, forceUpdate);
  };

  const faceInfo = (
    subshapeIndex: number,
    faceIndex: number,
    shapeId = "defaultShape"
  ) => {
    const face = shapesMemory[shapeId]?.[subshapeIndex]?.shape.faces?.[faceIndex];
    if (!face) return null;
    return {
      type: face.geomType,
      center: face.center.toTuple(),
      normal: face.normalAt().normalize().toTuple(),
    };
  };

  const edgeInfo = (
    subshapeIndex: number,
    edgeIndex: number,
    shapeId = "defaultShape"
  ) => {
    const edge = shapesMemory[shapeId]?.[subshapeIndex]?.shape.edges?.[edgeIndex];
    if (!edge) return null;
    return {
      type: edge.geomType,
      start: edge.startPoint.toTuple(),
      end: edge.endPoint.toTuple(),
      direction: edge.tangentAt().normalize().toTuple(),
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
    edgeInfo,
  };
}
