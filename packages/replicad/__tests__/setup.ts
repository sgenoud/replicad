import { expect, beforeAll } from "vitest";
import opencascade from "replicad-opencascadejs";
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

  const OC = await opencascade();

  setOC(OC);
  globalThis.replicadInit = true;
});
