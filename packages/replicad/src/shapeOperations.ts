import type { TopoDS_Face, TopoDS_Shape } from "replicad-opencascadejs";

import { getOC } from "./oclib.js";
import { GCWithScope } from "./register.js";
import { unwrapShape, type ShapeInput } from "./shapeInternals/shapeInput.js";

export interface BooleanOperationOptions {
  optimisation?: "none" | "commonFace" | "sameFace";
}

export interface ShellOptions {
  faces: Iterable<ShapeInput<TopoDS_Face>>;
  thickness: number;
  tolerance?: number;
}

const configureGlue = (
  builder: {
    SetGlue(value: any): void;
  },
  optimisation: BooleanOperationOptions["optimisation"]
): void => {
  const oc = getOC();
  if (optimisation === "commonFace") {
    builder.SetGlue(oc.BOPAlgo_GlueEnum.BOPAlgo_GlueShift);
  }
  if (optimisation === "sameFace") {
    builder.SetGlue(oc.BOPAlgo_GlueEnum.BOPAlgo_GlueFull);
  }
};

/** Builds a raw shape by fusing two shapes. */
export function fuseShapes(
  leftInput: ShapeInput,
  rightInput: ShapeInput,
  { optimisation = "none" }: BooleanOperationOptions = {}
): TopoDS_Shape {
  const oc = getOC();
  const r = GCWithScope();
  const builder = r(
    new oc.BRepAlgoAPI_Fuse(unwrapShape(leftInput), unwrapShape(rightInput))
  );

  configureGlue(builder, optimisation);
  builder.Build();
  builder.SimplifyResult(true, true, 1e-3);
  return builder.Shape();
}

/** Builds a raw shape by cutting a tool shape from another shape. */
export function cutShape(
  shapeInput: ShapeInput,
  toolInput: ShapeInput,
  { optimisation = "none" }: BooleanOperationOptions = {}
): TopoDS_Shape {
  const oc = getOC();
  const r = GCWithScope();
  const builder = r(
    new oc.BRepAlgoAPI_Cut(unwrapShape(shapeInput), unwrapShape(toolInput))
  );

  configureGlue(builder, optimisation);
  builder.Build();
  builder.SimplifyResult(true, true, 1e-3);
  return builder.Shape();
}

/** Builds a raw shape containing the intersection of two shapes. */
export function intersectShapes(
  leftInput: ShapeInput,
  rightInput: ShapeInput
): TopoDS_Shape {
  const oc = getOC();
  const r = GCWithScope();
  const builder = r(
    new oc.BRepAlgoAPI_Common(unwrapShape(leftInput), unwrapShape(rightInput))
  );

  builder.Build();
  builder.SimplifyResult(true, true, 1e-3);
  return builder.Shape();
}

/**
 * Hollows a shape by removing the supplied faces and retaining a wall of the
 * requested thickness.
 */
export function shellShape(
  shapeInput: ShapeInput,
  { faces, thickness, tolerance = 1e-3 }: ShellOptions
): TopoDS_Shape {
  const oc = getOC();
  const r = GCWithScope();
  const facesToRemove = r(new oc.NCollection_List_TopoDS_Shape());

  for (const face of faces) facesToRemove.Append(unwrapShape(face));

  const builder = r(new oc.BRepOffsetAPI_MakeThickSolid());
  builder.MakeThickSolidByJoin(
    unwrapShape(shapeInput),
    facesToRemove,
    -thickness,
    tolerance,
    oc.BRepOffset_Mode.BRepOffset_Skin,
    false,
    false,
    oc.GeomAbs_JoinType.GeomAbs_Arc,
    false
  );

  return builder.Shape();
}
