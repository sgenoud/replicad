import { types, flow, getSnapshot } from "mobx-state-tree";
import { autorun } from "mobx";

import api from "../../utils/builderAPI";
import UIState from "./ui-state";
import CodeState from "./code-state";
import SelectedInfo from "./selected-info";

import codeInit from "./codeInit";

const inSeries = (func) => {
  let refresh;
  let currentlyRunning = false;

  return async function () {
    if (currentlyRunning) {
      refresh = true;
      return;
    }
    currentlyRunning = true;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      refresh = false;
      await func();

      if (!refresh) break;
    }

    currentlyRunning = false;
  };
};

const AppState = types
  .model("AppState", {
    ui: UIState,
    code: CodeState,
    selectedInfo: SelectedInfo,
    config: types.optional(
      types.model({
        code: types.optional(types.string, ""),
      }),
      {}
    ),
  })
  .views((self) => ({
    get currentValues() {
      return getSnapshot(self.config);
    },
    get hasError() {
      return !!self.error.error;
    },

    get codeInitialized() {
      return !!self.config.code;
    },
  }))
  .volatile(() => ({
    defaultParams: null,
    currentMesh: [],
    processing: false,
    shapeLoaded: false,
    error: false,
    faceInfo: null,
    processingInfo: null,
  }))
  .actions((self) => ({
    updateCode(newCode) {
      self.config.code = newCode;
    },

    initCode: flow(function* () {
      const code = yield codeInit();
      self.updateCode(code);
    }),

    process: flow(function* process(params) {
      self.ui.deHighlight();
      self.processing = true;
      try {
        const mesh = yield api.buildShapesFromCode(
          self.currentValues.code,
          params
        );

        if (mesh.error) {
          self.error = mesh;
        } else {
          self.currentMesh = mesh;
          self.error = false;
        }

        self.shapeLoaded = true;
      } catch (e) {
        console.error(e);
        self.error = e;
      }

      try {
        self.defaultParams = yield api.extractDefaultParamsFromCode(
          self.currentValues.code
        );
      } catch (e) {
        console.log("no default params");
      }

      self.processing = false;
    }),
  }))
  .extend((self) => {
    let disposer = null;

    const processor = inSeries(self.process);

    const run = async () => {
      if (!self.currentValues.code) return;
      await processor();
    };

    return {
      actions: {
        afterCreate() {
          disposer = autorun(run);
        },

        afterDestroy() {
          if (disposer) disposer();
        },
      },
    };
  });

export default AppState;
