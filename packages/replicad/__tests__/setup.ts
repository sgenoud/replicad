import { join } from "path";
import { expect, beforeAll } from "vitest";
import opencascade from "replicad-opencascadejs/src/replicad_single.js";
import { setOC } from "../src/index";
import toMatchSVGSnapshot from "./toMatchSVGSnapshot";

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchSVGSnapshot(): R;
    }
  }
}

beforeAll(async function () {
  if (globalThis.replicadInit) return;
  expect.extend({ toMatchSVGSnapshot });

  const opencascadeWasm = join(
    __dirname,
    "../../replicad-opencascadejs/src/replicad_single.wasm"
  );
  // @ts-expect-error bad ocjs typings
  const OC = await opencascade({
    locateFile: () => opencascadeWasm,
  });

  setOC(OC);
  globalThis.replicadInit = true;
});
