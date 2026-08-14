import { expose } from "comlink";
import * as replicad from "replicad";
import { createBuilder } from "replicad-evaluator/builder";
import { createBrowserCodeEvaluator } from "replicad-evaluator/evaluate/browser";
import { getManifoldModule, setWasmUrl } from "manifold-3d/lib/wasm.js";
import manifoldWasmUrl from "manifold-3d/manifold.wasm?url";

import initOpenCascade from "./initOCSingle.js";

self.replicad = replicad;

let manifoldModulePromise = null;

const loadManifold = async () => {
  setWasmUrl(manifoldWasmUrl);
  // Cache the promise itself (not just the result) to avoid concurrent
  // instantiation during the await window where manifoldwasm is still null
  if (!manifoldModulePromise) {
    manifoldModulePromise = getManifoldModule();
  }
  return manifoldModulePromise;
};

const OC = initOpenCascade();
const MANIFOLD = loadManifold();

async function ensureReplicadReady() {
  const [oc, manifold] = await Promise.all([OC, MANIFOLD]);
  replicad.setOC(oc);
  if (manifold?.Manifold) {
    manifold.setup();
    replicad.setManifold(manifold);
  }
  return oc;
}

const evaluator = createBuilder({
  codeEvaluator: createBrowserCodeEvaluator(),
  runtime: async () => {
    const [oc, manifold] = await Promise.all([OC, MANIFOLD]);
    return {
      replicad,
      oc,
      manifold,
      fontPath: "/fonts/HKGrotesk-Regular.ttf",
    };
  },
});

const service = {
  ready: () => ensureReplicadReady().then(() => true),
  buildShapesFromCode: (...args) => evaluator.buildShapesFromCode(...args),
  loadFont: (...args) => evaluator.loadFont(...args),
  computeLabels: (...args) => evaluator.computeLabels(...args),
  extractDefaultParamsFromCode: (...args) =>
    evaluator.extractDefaultParamsFromCode(...args),
  extractDefaultNameFromCode: (...args) =>
    evaluator.extractDefaultNameFromCode(...args),
  exportShape: (...args) => evaluator.exportShape(...args),
  getCompatibilityReplacements: () => evaluator.getCompatibilityReplacements(),
  edgeInfo: (...args) => evaluator.edgeInfo(...args),
  faceInfo: (...args) => evaluator.faceInfo(...args),
};

expose(service, self);
export default service;
