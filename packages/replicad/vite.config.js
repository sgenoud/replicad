import { resolve } from "path";
import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";

const src = (path) => resolve(import.meta.dirname, path);

// UMD only supports a single entry point, so it is built in a second pass
// (`vite build --mode umd`) that appends to the output of the first one.
const umdOnly = process.env.REPLICAD_UMD?.toLowerCase() === "true";

const multiEntryLib = {
  entry: {
    replicad: src("src/index.ts"),
    "shape-functions": src("src/shapeFunctions/index.ts"),
  },
  formats: ["es", "cjs"],
};

const umdLib = {
  entry: src("src/index.ts"),
  name: "replicad",
  fileName: "replicad",
  formats: ["umd"],
};

export default defineConfig({
  build: {
    lib: umdOnly ? umdLib : multiEntryLib,
    emptyOutDir: !umdOnly,
    sourcemap: true,
    minify: false,
  },
  plugins: [
    umdOnly || process.env.NO_TYPES?.toLowerCase() === "true"
      ? null
      : dts({
          bundleTypes: true,
        }),
  ].filter((a) => !!a),
  test: {
    setupFiles: ["./__tests__/setup.ts"],
  },
});
