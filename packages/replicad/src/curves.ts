import {
  Bnd_Box2d,
  Geom2d_Curve,
  Geom_CylindricalSurface,
  gp_GTrsf2d,
  Handle_Geom2d_Curve,
  Handle_Geom_Surface,
} from "replicad-opencascadejs";

import { WrappingObj, localGC } from "./register";
import { getOC } from "./oclib.js";

import { Edge, Face } from "./shapes";
import { Plane, makeAx2 } from "./geom";
import { axis2d, Point2D } from "./lib2d";

const round = (v: number): number => Math.round(v * 100) / 100;
const reprPnt = ([x, y]: Point2D): string => {
  return `(${round(x)},${round(y)})`;
};

export class BoundingBox2d extends WrappingObj<Bnd_Box2d> {
  constructor(wrapped: Bnd_Box2d) {
    const oc = getOC();
    let boundBox = wrapped;
    if (!boundBox) {
      boundBox = new oc.Bnd_Box2d();
    }
    super(boundBox);
  }

  get repr(): string {
    const [min, max] = this.bounds;
    return `${reprPnt(min)} - ${reprPnt(max)}`;
  }

  get bounds(): [Point2D, Point2D] {
    const xMin = { current: 0 };
    const yMin = { current: 0 };
    const xMax = { current: 0 };
    const yMax = { current: 0 };

    this.wrapped.Get(xMin, yMin, xMax, yMax);
    return [
      [xMin.current, yMin.current],
      [xMax.current, yMax.current],
    ];
  }

  outsidePoint(paddingPercent = 1): Point2D {
    const [min, max] = this.bounds;
    const width = max[0] - min[0];
    const height = max[1] - min[1];

    return [
      max[0] + (width / 100) * paddingPercent,
      max[1] + (height / 100) * paddingPercent,
    ];
  }

  isOut(other: BoundingBox2d): boolean {
    return this.wrapped.IsOut_2(other.wrapped);
  }
}

export const curvesBoundingBox = (curves: Geom2d_Curve[]): BoundingBox2d => {
  const oc = getOC();
  const boundBox = new oc.Bnd_Box2d();

  curves.forEach((c) => {
    const h = new oc.Handle_Geom2d_Curve_2(c);
    oc.BndLib_Add2dCurve.Add_3(h, 1e-6, boundBox);
  });

  return new BoundingBox2d(boundBox);
};

export function curvesAsEdgesOnPlane(curves: Geom2d_Curve[], plane: Plane) {
  const [r, gc] = localGC();
  const ax = r(makeAx2(plane.origin, plane.zDir));

  const oc = getOC();

  const edges = curves.map((curve) => {
    const curve3d = oc.GeomLib.To3d(ax, new oc.Handle_Geom2d_Curve_2(curve));
    return new Edge(new oc.BRepBuilderAPI_MakeEdge_24(curve3d).Edge());
  });

  gc();
  return edges;
}

export const curvesAsEdgesOnSurface = (
  curves: Handle_Geom2d_Curve[],
  geomSurf: Handle_Geom_Surface
) => {
  const [r, gc] = localGC();
  const oc = getOC();

  const modifiedCurves = curves.map((curve) => {
    const edgeBuilder = r(new oc.BRepBuilderAPI_MakeEdge_30(curve, geomSurf));
    return new Edge(edgeBuilder.Edge());
  });

  gc();
  return modifiedCurves;
};

export const transformCurves = (
  curves: Geom2d_Curve[],
  transformation: gp_GTrsf2d | null
): Handle_Geom2d_Curve[] => {
  const [r, gc] = localGC();
  const oc = getOC();

  const modifiedCurves = curves.map((curve) => {
    let handle = new oc.Handle_Geom2d_Curve_2(curve);
    if (transformation) {
      handle = oc.GeomLib.GTransform(r(handle), transformation);
    }
    return handle;
  });

  gc();
  return modifiedCurves;
};

export const stretchTransform2d = (
  ratio: number,
  direction: Point2D,
  origin: Point2D = [0, 0]
): gp_GTrsf2d => {
  const oc = getOC();
  const axis = axis2d(origin, direction);
  const transform = new oc.gp_GTrsf2d_1();
  transform.SetAffinity(axis, ratio);

  axis.delete();
  return transform;
};

export const translationTransform2d = ([u, v]: Point2D): gp_GTrsf2d => {
  const oc = getOC();
  const translation = new oc.gp_GTrsf2d_1();
  const vec = new oc.gp_XY_2(u, v);
  translation.SetTranslationPart(vec);
  vec.delete();
  return translation;
};

export function faceRadius(face: Face): null | number {
  const oc = getOC();
  const [r, gc] = localGC();
  const geomSurf = r(oc.BRep_Tool.Surface_2(face.wrapped));

  if (face.geomType !== "CYLINDRE") return null;

  const cylinder = r((geomSurf.get() as Geom_CylindricalSurface).Cylinder());
  const radius = cylinder.Radius();
  gc();
  return radius;
}

export type ScaleMode = "original" | "bounds" | "native";

export function curvesAsEdgesOnFace(
  curves: Geom2d_Curve[],
  face: Face,
  scale: ScaleMode = "original"
) {
  const [r, gc] = localGC();

  const oc = getOC();
  let geomSurf = r(oc.BRep_Tool.Surface_2(face.wrapped));
  const bounds = face.UVBounds;

  let transformation = null;
  const uAxis = r(axis2d([0, 0], [0, 1]));
  const vAxis = r(axis2d([0, 0], [1, 0]));

  if (scale === "original" && face.geomType !== "PLANE") {
    if (face.geomType !== "CYLINDRE")
      throw new Error(
        "Only planar and cylidrical faces can be unwrapped for sketching"
      );

    const cylinder = r((geomSurf.get() as Geom_CylindricalSurface).Cylinder());
    if (!cylinder.Direct()) {
      geomSurf = geomSurf.get().UReversed();
    }
    const radius = cylinder.Radius();
    const affinity = r(stretchTransform2d(1 / radius, [0, 1]));
    transformation = affinity;
  }

  if (scale === "bounds") {
    transformation = new oc.gp_GTrsf2d_1();
    transformation.SetAffinity(uAxis, bounds.uMax - bounds.uMin);

    if (bounds.uMin !== 0) {
      const translation = new oc.gp_GTrsf2d_1();
      translation.SetTranslationPart(new oc.gp_XY_2(0, -bounds.uMin));
      transformation.Multiply(translation);
    }

    const vTransformation = new oc.gp_GTrsf2d_1();
    vTransformation.SetAffinity(vAxis, bounds.vMax - bounds.vMin);
    transformation.Multiply(vTransformation);

    if (bounds.vMin !== 0) {
      const translation = new oc.gp_GTrsf2d_1();
      translation.SetTranslationPart(new oc.gp_XY_2(0, -bounds.vMin));
      transformation.Multiply(translation);
    }
  }

  const modifiedCurves = transformCurves(curves, transformation);
  const edges = curvesAsEdgesOnSurface(modifiedCurves, geomSurf);
  modifiedCurves.forEach((c) => c.delete());

  gc();
  return edges;
}
