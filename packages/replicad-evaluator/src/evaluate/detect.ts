import { createBrowserCodeEvaluator } from "./browser";
import { createNodeCodeEvaluator } from "./node";
import type { CreateCodeEvaluatorOptions } from "./types";
import type { CodeEvaluator } from "../types";

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
