import api from "../../utils/builderAPI";
import { autorun } from "mobx";
import { types, getRoot, flow } from "mobx-state-tree";

const FaceInfo = types.model("FaceInfo", {
  type: types.string,
  center: types.array(types.number),
  normal: types.array(types.number),
});
const EdgeInfo = types.model("FaceInfo", {
  type: types.string,
  start: types.array(types.number),
  end: types.array(types.number),
  direction: types.array(types.number),
});

export default types.optional(
  types
    .model("SelectedInfoState", {
      processingInfo: types.optional(types.boolean, false),
      faceInfo: types.maybeNull(FaceInfo),
      edgeInfo: types.maybeNull(EdgeInfo),
    })
    .views((self) => ({
      get currentShape() {
        return getRoot(self).ui.shapeIndex;
      },
      get currentFace() {
        return getRoot(self).ui.highlightedFaceIndex;
      },
      get currentEdge() {
        return getRoot(self).ui.highlightedEdgeIndex;
      },
      get faceInitialized() {
        return (
          (self.currentShape !== -1 && !!self.currentFace) ||
          self.currentFace === 0
        );
      },
      get edgeInitialized() {
        return (
          (self.currentShape !== -1 && !!self.currentEdge) ||
          self.currentEdge === 0
        );
      },
    }))
    .actions((self) => ({
      getFaceInfo: flow(function* getFaceInfo() {
        self.processingInfo = true;

        if (!self.faceInitialized) {
          self.faceInfo = null;
          return;
        }

        self.faceInfo = yield api.faceInfo(self.currentShape, self.currentFace);
        self.processingInfo = false;
      }),
      getEdgeInfo: flow(function* getEdgeInfo() {
        self.processingInfo = true;

        if (!self.edgeInitialized) {
          self.edgeInfo = null;
          return;
        }

        self.edgeInfo = yield api.edgeInfo(self.currentShape, self.currentEdge);
        self.processingInfo = false;
      }),
    }))
    .extend((self) => {
      let faceDisposer = null;
      let edgeDisposer = null;

      return {
        actions: {
          afterCreate() {
            faceDisposer = autorun(() => {
              self.currentFace;
              self.getFaceInfo();
            });

            edgeDisposer = autorun(() => {
              self.currentEdge;
              self.getEdgeInfo();
            });
          },

          afterDestroy() {
            if (faceDisposer) faceDisposer();
            if (edgeDisposer) edgeDisposer();
          },
        },
      };
    }),
  {}
);
