import { createBuilder } from "./builder";
import { createCodeEvaluator } from "./evaluate/detect";
import type {
  CreateEvaluatorOptions,
  EvaluatorService,
  RuntimeContext,
  RuntimeResolver,
} from "./types";

function createRuntimeResolver(
  options: CreateEvaluatorOptions
): RuntimeResolver {
  if (options.runtime) {
    return options.runtime;
  }

  return async (): Promise<RuntimeContext> => {
    const oc = await options.oc;
    const manifold = await options.manifold;

    return {
      replicad: options.replicad,
      oc,
      manifold,
      fontPath: options.fontPath,
    };
  };
}

export function createEvaluator(
  options: CreateEvaluatorOptions
): EvaluatorService {
  const runtime = createRuntimeResolver(options);
  const codeEvaluator =
    options.codeEvaluator ||
    createCodeEvaluator({
      fetch: options.fetch,
      tempDir: options.tempDir,
    });

  return createBuilder({
    runtime,
    codeEvaluator,
  });
}
