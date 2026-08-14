import { beforeAll } from "vitest";
import opencascade from "replicad-opencascadejs";
import * as replicad from "../../replicad/src/index";

declare global {
  var replicadEvaluatorOC: any;
  var replicadEvaluatorReady: boolean | undefined;
}

beforeAll(async () => {
  if (globalThis.replicadEvaluatorReady) return;

  globalThis.replicadEvaluatorOC = await opencascade();

  replicad.setOC(globalThis.replicadEvaluatorOC);
  globalThis.replicadEvaluatorReady = true;
});
