import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import sourceMaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";

export default {
  input: `src/index.ts`,
  output: [
    {
      file: "dist/umd/replicad.js",
      name: "replicad",
      format: "umd",
      sourcemap: true,
    },
    {
      file: "dist/cjs/replicad.js",
      name: "replicad",
      format: "cjs",
      sourcemap: true,
    },
    { file: "dist/es/replicad.js", format: "es", sourcemap: true },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: "src/**",
  },
  plugins: [
    json(),
    typescript(),
    commonjs(),
    nodeResolve(),

    // Resolve source maps to the original source
    sourceMaps(),
  ],
};
