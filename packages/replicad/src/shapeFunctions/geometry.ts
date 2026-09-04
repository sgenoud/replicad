import type { Adaptor3d_Surface, gp_Pnt, gp_Vec } from "replicad-opencascadejs";

import { findCurveType, type CurveType } from "../definitionMaps.js";
import { Vector } from "../geom.js";
import { getOC } from "../oclib.js";
import { WrappingObj } from "../register.js";

export interface CurveLike {
  delete(): void;
  Value(v: number): gp_Pnt;
  IsPeriodic(): boolean;
  Period(): number;
  IsClosed(): boolean;
  FirstParameter(): number;
  LastParameter(): number;
  GetType?(): any;
  D1(v: number, p: gp_Pnt, vPrime: gp_Vec): void;
}

export type CurveInput = CurveLike | { readonly wrapped: CurveLike };

const unwrapCurve = (curve: CurveInput): CurveLike =>
  "wrapped" in curve ? curve.wrapped : curve;

const mapCurveParameter = (curve: CurveLike, position: number): number => {
  const firstParam = curve.FirstParameter();
  const lastParam = curve.LastParameter();
  return firstParam + (lastParam - firstParam) * position;
};

export function curveType(curveInput: CurveInput): CurveType {
  const curve = unwrapCurve(curveInput);
  const technicalType = curve.GetType && curve.GetType();
  return findCurveType(technicalType);
}

export function curvePointAt(curveInput: CurveInput, position = 0.5): Vector {
  const curve = unwrapCurve(curveInput);
  return new Vector(curve.Value(mapCurveParameter(curve, position)));
}

export function curveTangentAt(curveInput: CurveInput, position = 0.5): Vector {
  const oc = getOC();
  const curve = unwrapCurve(curveInput);
  const parameter = mapCurveParameter(curve, position);
  const point = new oc.gp_Pnt();
  const derivative = new oc.gp_Vec();

  curve.D1(parameter, point, derivative);
  const tangent = new Vector(derivative);

  point.delete();
  derivative.delete();
  return tangent;
}

export class Curve extends WrappingObj<CurveLike> {
  get repr(): string {
    const { startPoint, endPoint } = this;
    const retVal = `start: (${this.startPoint.repr}) end:(${this.endPoint.repr}}`;
    startPoint.delete();
    endPoint.delete();
    return retVal;
  }

  get curveType(): CurveType {
    return curveType(this);
  }

  get startPoint(): Vector {
    return new Vector(this.wrapped.Value(this.wrapped.FirstParameter()));
  }

  get endPoint(): Vector {
    return new Vector(this.wrapped.Value(this.wrapped.LastParameter()));
  }

  pointAt(position = 0.5): Vector {
    return curvePointAt(this, position);
  }

  tangentAt(position = 0.5): Vector {
    return curveTangentAt(this, position);
  }

  get isClosed(): boolean {
    return this.wrapped.IsClosed();
  }

  get isPeriodic(): boolean {
    return this.wrapped.IsPeriodic();
  }

  get period(): number {
    return this.wrapped.Period();
  }
}

export type SurfaceType =
  | "PLANE"
  | "CYLINDRE"
  | "CONE"
  | "SPHERE"
  | "TORUS"
  | "BEZIER_SURFACE"
  | "BSPLINE_SURFACE"
  | "REVOLUTION_SURFACE"
  | "EXTRUSION_SURFACE"
  | "OFFSET_SURFACE"
  | "OTHER_SURFACE";

export type SurfaceInput =
  | Adaptor3d_Surface
  | { readonly wrapped: Adaptor3d_Surface };

const unwrapSurface = (surface: SurfaceInput): Adaptor3d_Surface =>
  "wrapped" in surface ? surface.wrapped : surface;

export function surfaceType(surfaceInput: SurfaceInput): SurfaceType {
  const oc = getOC();
  const ga = oc.GeomAbs_SurfaceType;
  const types: Map<any, SurfaceType> = new Map([
    [ga.GeomAbs_Plane, "PLANE"],
    [ga.GeomAbs_Cylinder, "CYLINDRE"],
    [ga.GeomAbs_Cone, "CONE"],
    [ga.GeomAbs_Sphere, "SPHERE"],
    [ga.GeomAbs_Torus, "TORUS"],
    [ga.GeomAbs_BezierSurface, "BEZIER_SURFACE"],
    [ga.GeomAbs_BSplineSurface, "BSPLINE_SURFACE"],
    [ga.GeomAbs_SurfaceOfRevolution, "REVOLUTION_SURFACE"],
    [ga.GeomAbs_SurfaceOfExtrusion, "EXTRUSION_SURFACE"],
    [ga.GeomAbs_OffsetSurface, "OFFSET_SURFACE"],
    [ga.GeomAbs_OtherSurface, "OTHER_SURFACE"],
  ]);

  const type = types.get(unwrapSurface(surfaceInput).GetType());
  if (!type) throw new Error("surface type not found");
  return type;
}

export class Surface extends WrappingObj<Adaptor3d_Surface> {
  get surfaceType(): SurfaceType {
    return surfaceType(this);
  }
}
