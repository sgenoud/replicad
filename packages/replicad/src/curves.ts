import {
  Geom2d_Curve,
  Geom_CylindricalSurface,
  gp_GTrsf2d,
  Handle_Geom2d_Curve,
  Handle_Geom_Surface,
} from "replicad-opencascadejs";

import { localGC } from "./register";
import { getOC } from "./oclib.js";

import { Edge, Face } from "./shapes";
import { Plane, makeAx2 } from "./geom";
import { axis2d, pnt, Point2D, vec, BoundingBox2d } from "./lib2d";

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
  const ax = r(makeAx2(plane.origin, plane.zDir, plane.xDir));

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

export const translationTransform2d = (translation: Point2D): gp_GTrsf2d => {
  const oc = getOC();
  const [r, gc] = localGC();

  const rotation = new oc.gp_Trsf2d_1();
  rotation.SetTranslation_1(r(vec(translation)));
  gc();

  const transform = new oc.gp_GTrsf2d_2(rotation);
  gc();
  return transform;
};

export const mirrorTransform2d = (
  centerOrDirection: Point2D,
  origin: Point2D = [0, 0],
  mode = "center"
): gp_GTrsf2d => {
  const oc = getOC();
  const [r, gc] = localGC();

  const rotation = new oc.gp_Trsf2d_1();
  if (mode === "center") {
    rotation.SetMirror_1(r(pnt(centerOrDirection)));
  } else {
    rotation.SetMirror_2(r(axis2d(origin, centerOrDirection)));
  }
  gc();

  const transform = new oc.gp_GTrsf2d_2(rotation);
  gc();
  return transform;
};

export const rotateTransform2d = (
  angle: number,
  center: Point2D = [0, 0]
): gp_GTrsf2d => {
  const oc = getOC();
  const [r, gc] = localGC();

  const rotation = new oc.gp_Trsf2d_1();
  rotation.SetRotation(r(pnt(center)), angle);

  const transform = new oc.gp_GTrsf2d_2(rotation);
  gc();
  return transform;
};

export const scaleTransform2d = (
  scaleFactor: number,
  center: Point2D = [0, 0]
): gp_GTrsf2d => {
  const oc = getOC();
  const [r, gc] = localGC();

  const scaling = new oc.gp_Trsf2d_1();
  scaling.SetScale(r(pnt(center)), scaleFactor);

  const transform = new oc.gp_GTrsf2d_2(scaling);
  gc();
  return transform;
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
    transformation = r(new oc.gp_GTrsf2d_1());
    transformation.SetAffinity(uAxis, bounds.uMax - bounds.uMin);

    if (bounds.uMin !== 0) {
      const translation = r(new oc.gp_GTrsf2d_1());
      translation.SetTranslationPart(new oc.gp_XY_2(0, -bounds.uMin));
      transformation.Multiply(translation);
    }

    const vTransformation = r(new oc.gp_GTrsf2d_1());
    vTransformation.SetAffinity(vAxis, bounds.vMax - bounds.vMin);
    transformation.Multiply(vTransformation);

    if (bounds.vMin !== 0) {
      const translation = r(new oc.gp_GTrsf2d_1());
      translation.SetTranslationPart(r(new oc.gp_XY_2(0, -bounds.vMin)));
      transformation.Multiply(translation);
    }
  }

  const modifiedCurves = transformCurves(curves, transformation);
  const edges = curvesAsEdgesOnSurface(modifiedCurves, geomSurf);
  modifiedCurves.forEach((c) => c.delete());

  gc();
  return edges;
}
