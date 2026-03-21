import { cast } from "../shapes";
import { getOC } from "../oclib";
import { GCWithScope } from "../register";

import type { Edge, AnyShape } from "../shapes";
import type { ProjectionCamera } from "./ProjectionCamera";
import type { TopoDS_Shape } from "replicad-opencascadejs";

const getEdges = (shape: TopoDS_Shape) => {
  if (shape.IsNull()) return [];
  return cast(shape).edges;
};

export function makeProjectedEdges(
  shape: AnyShape,
  camera: ProjectionCamera,
  withHiddenLines = true
): { visible: Edge[]; hidden: Edge[] } {
  const oc = getOC();
  const r = GCWithScope();

  const hiddenLineRemoval = r(new oc.HLRBRep_Algo());
  hiddenLineRemoval.Add(shape.wrapped, 0);

  const projector = r(new oc.HLRAlgo_Projector(camera.wrapped));
  hiddenLineRemoval.Projector(projector);

  hiddenLineRemoval.Update();
  hiddenLineRemoval.Hide();

  const hlrShapes = new oc.HLRBRep_HLRToShape(
    hiddenLineRemoval
  );

  const visible = [
    ...getEdges(hlrShapes.VCompound()),
    ...getEdges(hlrShapes.Rg1LineVCompound()),
    ...getEdges(hlrShapes.OutLineVCompound()),
  ];

  visible.forEach((e) => oc.BRepLib.BuildCurves3d(e.wrapped));

  const hidden = withHiddenLines
    ? [
        ...getEdges(hlrShapes.HCompound()),
        ...getEdges(hlrShapes.Rg1LineHCompound()),
        ...getEdges(hlrShapes.OutLineHCompound()),
      ]
    : [];

  hidden.forEach((e) => oc.BRepLib.BuildCurves3d(e.wrapped));

  return { visible, hidden };
}
