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

  const hiddenLineRemoval = r(new oc.HLRBRep_Algo_1());
  hiddenLineRemoval.Add_2(shape.wrapped, 0);

  const projector = r(new oc.HLRAlgo_Projector_2(camera.wrapped));
  hiddenLineRemoval.Projector_1(projector);

  hiddenLineRemoval.Update();
  hiddenLineRemoval.Hide_1();

  const hlrShapes = new oc.HLRBRep_HLRToShape(
    new oc.Handle_HLRBRep_Algo_2(hiddenLineRemoval)
  );

  const visible = [
    ...getEdges(hlrShapes.VCompound_1()),
    ...getEdges(hlrShapes.Rg1LineVCompound_1()),
    ...getEdges(hlrShapes.OutLineVCompound_1()),
  ];

  visible.forEach((e) => oc.BRepLib.BuildCurves3d_2(e.wrapped));

  const hidden = withHiddenLines
    ? [
        ...getEdges(hlrShapes.HCompound_1()),
        ...getEdges(hlrShapes.Rg1LineHCompound_1()),
        ...getEdges(hlrShapes.OutLineHCompound_1()),
      ]
    : [];

  hidden.forEach((e) => oc.BRepLib.BuildCurves3d_2(e.wrapped));

  return { visible, hidden };
}
