import { runInContext, withGlobalBindings } from "./common";
import { looksLikeTypeScript } from "./shouldBundle";
import { rewriteReplicadImports } from "./plugins/externalGlobals";
import type { CreateCodeEvaluatorOptions } from "./types";
import type { CodeEvaluator } from "../types";
import { transform } from "sucrase";

function prepareBrowserModuleCode(code: string, filename = "__entry__.ts") {
  const rewrittenCode = rewriteReplicadImports(code);

  if (!looksLikeTypeScript(rewrittenCode)) {
    return rewrittenCode;
  }

  return transform(rewrittenCode, {
    transforms: ["typescript"],
    filePath: filename,
    sourceMapOptions: {
      compiledFilename: filename,
    },
  }).code;
}

export function createBrowserCodeEvaluator(
  options: CreateCodeEvaluatorOptions = {}
): CodeEvaluator {
  return {
    runInContext,
    async evaluateModule(code, evaluateOptions = {}) {
      const preparedCode = prepareBrowserModuleCode(
        code,
        evaluateOptions.filename
      );

      const url = URL.createObjectURL(
        new Blob([preparedCode], { type: "text/javascript" })
      );

      try {
        return await withGlobalBindings(evaluateOptions.globals ?? {}, async () => {
          return await import(/* @vite-ignore */ url);
        });
      } finally {
        URL.revokeObjectURL(url);
      }
    },
  };
}
