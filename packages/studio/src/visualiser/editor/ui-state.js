import { types, getRoot } from "mobx-state-tree";

const ClipConfig = types.optional(
  types
    .model("ClipConfig", {
      disabled: types.optional(types.boolean, true),
      plane: types.optional(types.string, "XZ"),
      constant: types.optional(types.number, 0),
    })
    .views((self) => ({
      get position() {
        if (self.plane === "XY") return self.constant;
        else return -self.constant;
      },
      get planeVector() {
        if (self.disabled) return undefined;
        return {
          XZ: [0, 1, 0],
          XY: [0, 0, -1],
          YZ: [1, 0, 0],
        }[self.plane];
      },
    }))
    .actions((self) => ({
      toggle() {
        self.disabled = !self.disabled;
      },
      setPlane(newPlane) {
        self.plane = newPlane;
        self.constant = 0;
      },
      setConstant(newConstant) {
        self.constant = newConstant;
      },
    })),
  {}
);

export default types.optional(
  types
    .model("UIState", {
      shapeSelection: types.optional(types.number, -1),
      highlightedFaceIndex: types.maybe(types.maybeNull(types.number)),
      highlightedEdgeIndex: types.maybe(types.maybeNull(types.number)),
      clip: ClipConfig,
      showDownload: types.optional(types.boolean, false),
      enableParams: types.optional(types.boolean, false),
    })
    .views((self) => ({
      get singleShape() {
        const store = getRoot(self);
        return store.currentMesh.length === 1;
      },

      get shapeIndex() {
        const store = getRoot(self);
        if (store.errors) return -1;
        if (self.singleShape) return 0;
        if (self.shapeSelection > store.currentMesh.length) return -1;
        return self.shapeSelection;
      },
      get shapeSelected() {
        const store = getRoot(self);
        if (self.shapeIndex === -1) return store.currentMesh;
        return store.currentMesh[self.shapeIndex];
      },

      get currentIsSVG() {
        const shape = self.shapeSelected;
        return (
          shape &&
          (shape.format === "svg" ||
            (shape.length && shape[0].format === "svg"))
        );
      },
    }))
    .actions((self) => {
      return {
        changeDownload(newValue) {
          self.showDownload = newValue;
        },
        changeEnableParams(newValue) {
          self.enableParams = newValue;
        },
        changeHighlight(faceIndex, edgeIndex) {
          self.highlightedFaceIndex = faceIndex;
          self.highlightedEdgeIndex = edgeIndex;
        },
        deHighlight() {
          self.highlightedFaceIndex = null;
          self.highlightedEdgeIndex = null;
        },
        selectShape(newSelection) {
          self.shapeSelection = newSelection;
          self.deHighlight();
        },
      };
    }),
  {}
);
