import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll } from "vitest";
import opencascade from "../../replicad-opencascadejs/src/replicad_single.js";
import * as replicad from "../../replicad/src/index";

declare global {
  var replicadEvaluatorOC: any;
  var replicadEvaluatorReady: boolean | undefined;
}

beforeAll(async () => {
  if (globalThis.replicadEvaluatorReady) return;

  const here = dirname(fileURLToPath(import.meta.url));
  const opencascadeWasm = join(
    here,
    "../../replicad-opencascadejs/src/replicad_single.wasm"
  );

  globalThis.replicadEvaluatorOC = await opencascade({
    locateFile: () => opencascadeWasm,
  });

  replicad.setOC(globalThis.replicadEvaluatorOC);
  globalThis.replicadEvaluatorReady = true;
});
