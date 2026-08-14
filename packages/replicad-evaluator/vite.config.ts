import { resolve } from "path";
import { defineConfig } from "vitest/config";
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
        index: resolve(import.meta.dirname, "src/index.ts"),
        builder: resolve(import.meta.dirname, "src/builder.ts"),
        "evaluate/browser": resolve(
          import.meta.dirname,
          "src/evaluate/browser.ts"
        ),
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
      include: ["src"],
      entryRoot: "src",
    }),
  ],
  test: {
    environment: "node",
    setupFiles: ["./__tests__/setup.ts"],
  },
});
