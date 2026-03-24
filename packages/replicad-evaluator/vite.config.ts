import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const external = (id: string) => {
  if (id.startsWith("node:")) return true;

  return [
    "@rollup/browser",
    "parse-css-color",
    "replicad",
    "rollup",
    "rollup-plugin-external-globals",
    "sucrase",
  ].includes(id);
};

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "replicadEvaluator",
      fileName: "replicad-evaluator",
      formats: ["es"],
    },
    sourcemap: true,
    minify: false,
    rollupOptions: {
      external,
    },
  },
  plugins: [
    dts({
      rollupTypes: false,
    }),
  ],
  test: {
    environment: "node",
    setupFiles: ["./__tests__/setup.ts"],
  },
});
