import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/replicad-script.ts"),
      name: "replicad-script",
      fileName: "replicad-script",
      formats: ["es", "umd", "cjs"],
    },
    sourcemap: true,
    minify: false,
  },
  plugins: [
    dts(),
  ],
  test: {
    setupFiles: ["./__tests__/setup.ts"],
  },
});
