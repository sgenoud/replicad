import { bundleCodeWithRollup } from "./bundle-common";
import { shouldBundle } from "./shouldBundle";
import type { BundleCodeOptions } from "./types";

export async function bundleBrowserCode(
  code: string,
  options: BundleCodeOptions = {}
) {
  if (!shouldBundle(code)) {
    return {
      code,
      bundled: false,
    };
  }

  const { rollup } = await import("@rollup/browser");
  return bundleCodeWithRollup(rollup, code, options);
}
