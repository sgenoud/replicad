import type { RollupBuild, RollupOptions } from "rollup";
import type { BundleCodeOptions, BundleCodeResult } from "./types";
export declare function bundleCodeWithRollup(rollupImplementation: (options: RollupOptions) => Promise<RollupBuild>, code: string, options?: BundleCodeOptions): Promise<BundleCodeResult>;
