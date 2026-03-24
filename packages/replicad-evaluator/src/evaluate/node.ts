import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { bundleNodeCode } from "./bundle-node";
import { runInContext, withGlobalBindings } from "./common";
import type { CreateCodeEvaluatorOptions } from "./types";
import type { CodeEvaluator } from "../types";

export function createNodeCodeEvaluator(
  options: CreateCodeEvaluatorOptions = {}
): CodeEvaluator {
  return {
    runInContext,
    async evaluateModule(code, evaluateOptions = {}) {
      const bundled = await bundleNodeCode(code, {
        filename: evaluateOptions.filename,
        fetch: options.fetch,
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
    },
  };
}
