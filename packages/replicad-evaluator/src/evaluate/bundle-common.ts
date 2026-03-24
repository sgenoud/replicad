import type { OutputChunk, Plugin, RollupBuild, RollupOptions } from "rollup";
import { createExternalGlobalsPlugin } from "./plugins/externalGlobals";
import { createSucraseTsPlugin } from "./plugins/sucraseTs";
import { createUrlResolverPlugin } from "./plugins/urlResolver";
import { createVirtualEntryPlugin } from "./plugins/virtualEntry";
import { shouldBundle } from "./shouldBundle";
import type { BundleCodeOptions, BundleCodeResult } from "./types";

const DEFAULT_ENTRY_ID = "__entry__.ts";

export async function bundleCodeWithRollup(
  rollupImplementation: (options: RollupOptions) => Promise<RollupBuild>,
  code: string,
  options: BundleCodeOptions = {}
): Promise<BundleCodeResult> {
  if (!shouldBundle(code)) {
    return {
      code,
      bundled: false,
    };
  }

  const entryId = options.filename || DEFAULT_ENTRY_ID;
  const plugins: Plugin[] = [
    createVirtualEntryPlugin(entryId, code),
    createUrlResolverPlugin(options.fetch),
    createSucraseTsPlugin(),
    createExternalGlobalsPlugin(),
  ];

  const bundle = await rollupImplementation({
    input: entryId,
    treeshake: false,
    plugins,
  });

  try {
    const output = await bundle.generate({
      format: "es",
      sourcemap: "inline",
      inlineDynamicImports: true,
      exports: "named",
    });
    const chunk = output.output.find(
      (entry): entry is OutputChunk => entry.type === "chunk"
    );

    if (!chunk) {
      throw new Error("Rollup did not produce a JavaScript chunk");
    }

    return {
      code: chunk.code,
      bundled: true,
    };
  } finally {
    await bundle.close();
  }
}
