import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "replicad",
      fileName: "replicad",
      formats: ["es", "umd", "cjs"],
    },
    sourcemap: true,
    minify: false,
  },
  plugins: [dts({ outputDir: resolve(__dirname, "dist/types/") })],
});
