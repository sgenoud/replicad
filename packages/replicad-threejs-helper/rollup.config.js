import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-ts";

export default {
  input: `lib/replicad-threejs-helper.ts`,
  output: [
    {
      file: "dist/umd/replicad-threejs-helper.js",
      name: "replicad",
      format: "umd",
      sourcemap: true,
    },
    {
      file: "dist/cjs/replicad-threejs-helper.js",
      name: "replicad",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/es/replicad-threejs-helper.js",
      format: "es",
      sourcemap: true,
    },
  ],
  watch: {
    include: "lib/**",
  },
  plugins: [typescript(), commonjs(), nodeResolve()],
  external: ["three"],
};
