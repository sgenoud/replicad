export declare function buildFunctionWithContext(evalString: string, context: Record<string, unknown>): string;
export declare function buildEvaluator(evalString: string, context: Record<string, unknown>): any;
export declare function runInContext<T = unknown>(text: string, context?: Record<string, unknown>): T;
export declare function withGlobalBindings<T>(globals: Record<string, unknown>, callback: () => Promise<T>): Promise<T>;
