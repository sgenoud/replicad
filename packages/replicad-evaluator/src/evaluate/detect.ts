import { createBrowserCodeEvaluator } from "./browser";
import { createNodeCodeEvaluator } from "./node";
import type { CreateCodeEvaluatorOptions } from "./types";
import type { CodeEvaluator } from "../types";

// Only present in a worker scope. Declared (rather than pulling in the
// "webworker" lib, which collides with "dom") so the typeof guard below
// resolves; this is erased at compile time.
declare const WorkerGlobalScope: unknown;

export const isBrowserEnvironment = () => {
  return (
    typeof WorkerGlobalScope !== "undefined" ||
    (typeof window !== "undefined" && typeof document !== "undefined")
  );
};

export function createCodeEvaluator(
  options: CreateCodeEvaluatorOptions = {}
): CodeEvaluator {
  if (isBrowserEnvironment()) {
    return createBrowserCodeEvaluator(options);
  }

  return createNodeCodeEvaluator(options);
}
