import { resolve } from "path";
import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      name: "replicad",
      fileName: "replicad",
      formats: ["es", "umd", "cjs"],
    },
    sourcemap: true,
    minify: false,
  },
  plugins: [
    process.env.NO_TYPES?.toLowerCase() === "true"
      ? null
      : dts({
          bundleTypes: true,
        }),
  ].filter((a) => !!a),
  test: {
    setupFiles: ["./__tests__/setup.ts"],
  },
});
