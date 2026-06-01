import { createRequire } from "node:module";
import { beforeAll } from "vitest";
import opencascade from "replicad-opencascadejs";
import * as replicad from "../../replicad/src/index";

declare global {
  var replicadEvaluatorOC: any;
  var replicadEvaluatorReady: boolean | undefined;
}

beforeAll(async () => {
  if (globalThis.replicadEvaluatorReady) return;

  const require = createRequire(import.meta.url);
  const opencascadeWasm = require.resolve("replicad-opencascadejs/wasm");

  globalThis.replicadEvaluatorOC = await opencascade({
    locateFile: () => opencascadeWasm,
  });

  replicad.setOC(globalThis.replicadEvaluatorOC);
  globalThis.replicadEvaluatorReady = true;
});
