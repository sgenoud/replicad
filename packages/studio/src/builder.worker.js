import { expose } from "comlink";
import * as replicad from "replicad";
import { createBuilder } from "replicad-evaluator/builder";
import { createBrowserCodeEvaluator } from "replicad-evaluator/evaluate/browser";
import { getManifoldModule, setWasmUrl } from "manifold-3d/lib/wasm.js";
import manifoldWasmUrl from "manifold-3d/manifold.wasm?url";

import initOpenCascade from "./initOCSingle.js";
import initOpenCascadeWithExceptions from "./initOCWithExceptions.js";

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

const ocVersions = {
  withExceptions: null,
  single: null,
  current: null,
};

let OC = Promise.reject("OpenCascade not initialized");

function enableExceptions() {
  if (!ocVersions.withExceptions) {
    ocVersions.withExceptions = initOpenCascadeWithExceptions();
  }
  ocVersions.current = "withExceptions";
  OC = ocVersions.withExceptions;
}

function disableExceptions() {
  if (!ocVersions.single) {
    ocVersions.single = initOpenCascade();
  }
  ocVersions.current = "single";
  OC = ocVersions.single;
}

async function toggleExceptions() {
  if (ocVersions.current === "single") {
    enableExceptions();
  } else {
    disableExceptions();
  }

  await OC;
  return ocVersions.current;
}

disableExceptions();

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
  edgeInfo: (...args) => evaluator.edgeInfo(...args),
  faceInfo: (...args) => evaluator.faceInfo(...args),
  toggleExceptions,
  exceptionsEnabled: () => ocVersions.current === "withExceptions",
};

expose(service, self);
export default service;
