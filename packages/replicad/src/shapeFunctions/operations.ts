import type {
  TopoDS_Compound,
  TopoDS_Face,
  TopoDS_Shape,
  TopoDS_Solid,
} from "replicad-opencascadejs";

import { DEG2RAD } from "../constants.js";
import {
  asDir,
  makePln,
  type Plane,
  type PlaneName,
  type SimplePoint,
} from "../geom.js";
import { makePlane } from "../geomHelpers.js";
import { getOC } from "../oclib.js";
import { GCWithScope } from "../register.js";
import { unwrapShape, type ShapeInput } from "./shapeInput.js";
import { iterTopo } from "./topology.js";

export interface BooleanOperationOptions {
  optimisation?: "none" | "commonFace" | "sameFace";
}

export interface ShellOptions {
  faces: Iterable<ShapeInput<TopoDS_Face>>;
  thickness: number;
  tolerance?: number;
}

export interface DraftOptions {
  faces: Iterable<ShapeInput<TopoDS_Face>>;
  angle: number;
  neutralPlane?: Plane | PlaneName;
}

/** Pieces grouped by their position relative to an oriented plane. */
export interface PlaneSplitResult<T> {
  positive: T | null;
  negative: T | null;
  on: T | null;
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

const signedDistanceToPlane = (point: SimplePoint, plane: Plane): number =>
  (point[0] - plane.origin.x) * plane.zDir.x +
  (point[1] - plane.origin.y) * plane.zDir.y +
  (point[2] - plane.origin.z) * plane.zDir.z;

/**
 * Splits a shape with an oriented plane and groups pieces by side.
 *
 * `offset` translates the splitting plane along its normal. A side is null
 * when empty, the piece itself when it contains one piece, and a compound when
 * it contains multiple disconnected pieces.
 */
export function splitShape(
  shapeInput: ShapeInput,
  inputPlane: Plane | PlaneName = "XY",
  offset = 0,
  tolerance = 1e-7
): PlaneSplitResult<TopoDS_Solid | TopoDS_Compound> {
  const oc = getOC();
  const r = GCWithScope();
  const shape = unwrapShape(shapeInput);
  const basePlane = r(makePlane(inputPlane));
  const plane =
    offset === 0
      ? basePlane
      : r(
          basePlane.translate([
            basePlane.zDir.x * offset,
            basePlane.zDir.y * offset,
            basePlane.zDir.z * offset,
          ])
        );
  const ocPlane = r(makePln(plane.origin, plane.zDir));
  const faceBuilder = r(new oc.BRepBuilderAPI_MakeFace(ocPlane));
  const splittingFace = r(faceBuilder.Face());

  const argumentsList = r(new oc.NCollection_List_TopoDS_Shape());
  argumentsList.Append(shape);
  const toolsList = r(new oc.NCollection_List_TopoDS_Shape());
  toolsList.Append(splittingFace);

  const builder = r(new oc.BRepAlgoAPI_Splitter());
  builder.SetArguments(argumentsList);
  builder.SetTools(toolsList);
  builder.Build();
  if (builder.HasErrors()) throw new Error("Could not split shape with plane");

  // Splitter.Shape() contains the split arguments but not the tools. We only
  // expose solid results; section edges, faces, shells, and other topology are
  // intentionally ignored.
  const splitResult = builder.Shape();
  const pieces: TopoDS_Solid[] =
    splitResult.ShapeType() === oc.TopAbs_ShapeEnum.TopAbs_SOLID
      ? [oc.TopoDS.Solid(splitResult)]
      : [...iterTopo(splitResult, "solid")];
  splitResult.delete();

  const grouped = {
    positive: [] as TopoDS_Solid[],
    negative: [] as TopoDS_Solid[],
    on: [] as TopoDS_Solid[],
  };

  for (const piece of pieces) {
    const bounds = r(new oc.Bnd_Box());
    oc.BRepBndLib.Add(piece, bounds, true);
    const min = r(bounds.CornerMin());
    const max = r(bounds.CornerMax());
    const center: SimplePoint = [
      (min.X() + max.X()) / 2,
      (min.Y() + max.Y()) / 2,
      (min.Z() + max.Z()) / 2,
    ];
    const distance = signedDistanceToPlane(center, plane);

    if (distance > tolerance) grouped.positive.push(piece);
    else if (distance < -tolerance) grouped.negative.push(piece);
    else grouped.on.push(piece);
  }

  const asShape = (
    group: TopoDS_Solid[]
  ): TopoDS_Solid | TopoDS_Compound | null => {
    if (!group.length) return null;
    if (group.length === 1) return group[0];

    const compound = new oc.TopoDS_Compound();
    const compoundBuilder = r(new oc.TopoDS_Builder());
    compoundBuilder.MakeCompound(compound);
    group.forEach((piece) => compoundBuilder.Add(compound, piece));
    group.forEach((piece) => piece.delete());
    return compound;
  };

  return {
    positive: asShape(grouped.positive),
    negative: asShape(grouped.negative),
    on: asShape(grouped.on),
  };
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

/** Applies a draft angle to the supplied faces of a shape. */
export function draftShape(
  shapeInput: ShapeInput,
  { faces, angle, neutralPlane = "XY" }: DraftOptions
): TopoDS_Shape {
  const oc = getOC();
  const shape = unwrapShape(shapeInput);
  const builder = new oc.BRepOffsetAPI_DraftAngle(shape);
  const inputPlane = makePlane(neutralPlane);
  const plane = makePln(inputPlane.origin, inputPlane.zDir);
  const direction = asDir(inputPlane.zDir);

  for (const face of faces) {
    builder.Add(unwrapShape(face), direction, angle * DEG2RAD, plane, false);
  }

  builder.Build();
  const result = builder.ModifiedShape(shape);

  builder.delete();
  plane.delete();
  direction.delete();
  inputPlane.delete();
  return result;
}
