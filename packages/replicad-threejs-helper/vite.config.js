import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(import.meta.dirname, "lib/replicad-threejs-helper.ts"),
      // The global the UMD bundle exposes -- kept as-is so the published
      // bundle stays compatible with existing script-tag consumers.
      name: "replicad",
      formats: ["es", "umd", "cjs"],
      // The package is "type": "module", so the CommonJS build needs the .cjs
      // extension to be parsed as CommonJS. The UMD bundle keeps .js: it is
      // loaded by path from a script tag, not resolved as a module.
      fileName: (format) =>
        format === "cjs"
          ? "cjs/replicad-threejs-helper.cjs"
          : `${format}/replicad-threejs-helper.js`,
    },
    sourcemap: true,
    minify: false,
    rollupOptions: {
      external: ["three"],
      output: {
        // The previous rollup build inferred this name; spelled out here so
        // UMD consumers keep reading the same global.
        globals: { three: "three" },
      },
    },
  },
  plugins: [dts()],
});
