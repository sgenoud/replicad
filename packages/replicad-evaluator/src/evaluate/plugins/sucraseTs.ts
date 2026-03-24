import type { Plugin } from "rollup";
import { transform } from "sucrase";

const TYPESCRIPT_FILE_RE = /\.(?:ts|tsx)$/;

export function createSucraseTsPlugin(): Plugin {
  return {
    name: "replicad-evaluator-sucrase-ts",
    transform(code, id) {
      if (!TYPESCRIPT_FILE_RE.test(id)) return null;

      const result = transform(code, {
        transforms: ["typescript"],
        filePath: id,
        sourceMapOptions: {
          compiledFilename: id,
        },
      });

      return {
        code: result.code,
        map: result.sourceMap,
      };
    },
  };
}
