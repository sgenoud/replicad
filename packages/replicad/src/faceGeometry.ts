import type { TopoDS_Face } from "replicad-opencascadejs";

import { asPnt, type Point, Vector } from "./geom.js";
import { getOC } from "./oclib.js";
import { GCWithScope } from "./register.js";
import { unwrapShape, type ShapeInput } from "./shapeInternals/shapeInput.js";

export interface FaceUVBounds {
  uMin: number;
  uMax: number;
  vMin: number;
  vMax: number;
}

export function faceUVBounds(faceInput: ShapeInput<TopoDS_Face>): FaceUVBounds {
  const oc = getOC();
  const result = oc.BRepTools.UVBounds(unwrapShape(faceInput), 0, 0, 0, 0);
  return {
    uMin: result.UMin,
    uMax: result.UMax,
    vMin: result.VMin,
    vMax: result.VMax,
  };
}

export function pointOnFace(
  faceInput: ShapeInput<TopoDS_Face>,
  u: number,
  v: number
): Vector {
  const oc = getOC();
  const face = unwrapShape(faceInput);
  const { uMin, uMax, vMin, vMax } = faceUVBounds(face);
  const surface = new oc.BRepAdaptor_Surface(face, false);
  const point = new oc.gp_Pnt();

  const absoluteU = u * (uMax - uMin) + uMin;
  const absoluteV = v * (vMax - vMin) + vMin;

  surface.D0(absoluteU, absoluteV, point);
  const result = new Vector(point);
  surface.delete();
  point.delete();
  return result;
}

export function faceUVCoordinates(
  faceInput: ShapeInput<TopoDS_Face>,
  point: Point
): [number, number] {
  const oc = getOC();
  const face = unwrapShape(faceInput);
  const r = GCWithScope();
  const surface = r(oc.BRep_Tool.Surface(face));
  const projectedPoint = r(
    new oc.GeomAPI_ProjectPointOnSurf(
      r(asPnt(point)),
      surface,
      oc.Extrema_ExtAlgo.Extrema_ExtAlgo_Grad
    )
  );

  const { U, V } = projectedPoint.LowerDistanceParameters(0, 0);
  return [U, V];
}

export function faceNormalAt(
  faceInput: ShapeInput<TopoDS_Face>,
  location?: Point
): Vector {
  const oc = getOC();
  const face = unwrapShape(faceInput);
  let u: number;
  let v: number;

  if (location) {
    [u, v] = faceUVCoordinates(face, location);
  } else {
    const { uMin, uMax, vMin, vMax } = faceUVBounds(face);
    u = 0.5 * (uMin + uMax);
    v = 0.5 * (vMin + vMax);
  }

  const r = GCWithScope();
  const point = r(new oc.gp_Pnt());
  const normal = r(new oc.gp_Vec());
  const properties = r(new oc.BRepGProp_Face(face, false));
  properties.Normal(u, v, point, normal);

  return new Vector(normal);
}

export function faceCenter(faceInput: ShapeInput<TopoDS_Face>): Vector {
  const oc = getOC();
  const properties = new oc.GProp_GProps();
  oc.BRepGProp.SurfaceProperties(
    unwrapShape(faceInput),
    properties,
    1e-7,
    true
  );

  const center = new Vector(properties.CentreOfMass());
  properties.delete();
  return center;
}
