import type { CreateCodeEvaluatorOptions } from "./types";
import type { CodeEvaluator } from "../types";
export declare const isBrowserEnvironment: () => boolean;
export declare function createCodeEvaluator(options?: CreateCodeEvaluatorOptions): CodeEvaluator;
