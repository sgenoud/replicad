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
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        builder: resolve(__dirname, "src/builder.ts"),
        "evaluate/browser": resolve(__dirname, "src/evaluate/browser.ts"),
      },
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
      include: ["src"],
      entryRoot: "src",
    }),
  ],
  test: {
    environment: "node",
    setupFiles: ["./__tests__/setup.ts"],
  },
});
