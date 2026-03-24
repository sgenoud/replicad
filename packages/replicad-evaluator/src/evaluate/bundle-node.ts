import { rollup } from "rollup";
import { bundleCodeWithRollup } from "./bundle-common";
import type { BundleCodeOptions } from "./types";

export function bundleNodeCode(code: string, options: BundleCodeOptions = {}) {
  return bundleCodeWithRollup(rollup, code, options);
}
