import type { CodeEvaluator } from "../types";
export interface BundleCodeOptions {
    filename?: string;
    fetch?: typeof fetch;
}
export interface BundleCodeResult {
    code: string;
    bundled: boolean;
}
export interface CreateCodeEvaluatorOptions {
    fetch?: typeof fetch;
    tempDir?: string;
}
export type AutoCodeEvaluatorFactory = (options?: CreateCodeEvaluatorOptions) => CodeEvaluator;
