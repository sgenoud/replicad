import {
  Geom_CylindricalSurface,
  gp_GTrsf2d,
  Geom_Surface,
} from "replicad-opencascadejs";

import { GCWithScope, localGC, WrappingObj } from "./register";
import type { Deletable } from "./register";
import { getOC } from "./oclib.js";
import { findCurveType } from "./definitionMaps";

import { Edge, Face } from "./shapes";
import { Plane, makeAx2 } from "./geom";
import {
  axis2d,
  pnt,
  Point2D,
  vec,
  BoundingBox2d,
  Curve2D,
  make2dSegmentCurve,
} from "./lib2d";

export const curvesBoundingBox = (curves: Curve2D[]): BoundingBox2d => {
  const oc = getOC();
  const boundBox = new oc.Bnd_Box2d();

  curves.forEach((c) => {
    oc.BndLib_Add2dCurve.Add(c.wrapped, 1e-6, boundBox);
  });

  return new BoundingBox2d(boundBox);
};

export function curvesAsEdgesOnPlane(curves: Curve2D[], plane: Plane) {
  const [r, gc] = localGC();
  const ax = r(makeAx2(plane.origin, plane.zDir, plane.xDir));

  const oc = getOC();

  const edges = curves.map((curve) => {
    const curve3d = oc.GeomLib.To3d(ax, curve.wrapped);
    return new Edge(new oc.BRepBuilderAPI_MakeEdge(curve3d).Edge());
  });

  gc();
  return edges;
}

export const curvesAsEdgesOnSurface = (
  curves: Curve2D[],
  geomSurf: Geom_Surface
) => {
  const [r, gc] = localGC();
  const oc = getOC();

  const modifiedCurves = curves.map((curve) => {
    const edgeBuilder = r(
      new oc.BRepBuilderAPI_MakeEdge(curve.wrapped, geomSurf)
    );
    return new Edge(edgeBuilder.Edge());
  });

  gc();
  return modifiedCurves;
};

export const transformCurves = (
  curves: Curve2D[],
  transformation: gp_GTrsf2d | null
): Curve2D[] => {
  const oc = getOC();

  const modifiedCurves = curves.map((curve) => {
    if (!transformation) return curve.clone();
    return new Curve2D(oc.GeomLib.GTransform(curve.wrapped, transformation));
  });

  return modifiedCurves;
};

export class Transformation2D extends WrappingObj<gp_GTrsf2d> {
  transformCurves(curves: Curve2D[]) {
    return transformCurves(curves, this.wrapped);
  }
}

export const stretchTransform2d = (
  ratio: number,
  direction: Point2D,
  origin: Point2D = [0, 0]
): Transformation2D => {
  const oc = getOC();
  const axis = axis2d(origin, direction);
  const transform = new oc.gp_GTrsf2d();
  transform.SetAffinity(axis, ratio);

  axis.delete();
  return new Transformation2D(transform);
};

export const translationTransform2d = (
  translation: Point2D
): Transformation2D => {
  const oc = getOC();
  const [r, gc] = localGC();

  const rotation = new oc.gp_Trsf2d();
  rotation.SetTranslation(r(vec(translation)));

  const transform = new oc.gp_GTrsf2d(rotation);
  gc();
  return new Transformation2D(transform);
};

export const mirrorTransform2d = (
  centerOrDirection: Point2D,
  origin: Point2D = [0, 0],
  mode = "center"
): Transformation2D => {
  const oc = getOC();
  const [r, gc] = localGC();

  const rotation = new oc.gp_Trsf2d();
  if (mode === "center") {
    rotation.SetMirror(r(pnt(centerOrDirection)));
  } else {
    rotation.SetMirror(r(axis2d(origin, centerOrDirection)));
  }

  const transform = new oc.gp_GTrsf2d(rotation);
  gc();
  return new Transformation2D(transform);
};

export const rotateTransform2d = (
  angle: number,
  center: Point2D = [0, 0]
): Transformation2D => {
  const oc = getOC();
  const [r, gc] = localGC();

  const rotation = new oc.gp_Trsf2d();
  rotation.SetRotation(r(pnt(center)), angle);

  const transform = new oc.gp_GTrsf2d(rotation);
  gc();
  return new Transformation2D(transform);
};

export const scaleTransform2d = (
  scaleFactor: number,
  center: Point2D = [0, 0]
): Transformation2D => {
  const oc = getOC();
  const [r, gc] = localGC();

  const scaling = new oc.gp_Trsf2d();
  scaling.SetScale(r(pnt(center)), scaleFactor);

  const transform = new oc.gp_GTrsf2d(scaling);
  gc();
  return new Transformation2D(transform);
};

export function faceRadius(face: Face): null | number {
  const oc = getOC();
  const [r, gc] = localGC();
  const geomSurf = r(oc.BRep_Tool.Surface(face.wrapped));

  if (face.geomType !== "CYLINDRE") return null;

  const cylinder = r((geomSurf as Geom_CylindricalSurface).Cylinder());
  const radius = cylinder.Radius();
  gc();
  return radius;
}

export type ScaleMode = "original" | "bounds" | "native";

export function curvesAsEdgesOnFace(
  curves: Curve2D[],
  face: Face,
  scale: ScaleMode = "original"
) {
  const [r, gc] = localGC();

  const oc = getOC();
  let geomSurf = r(oc.BRep_Tool.Surface(face.wrapped));

  const bounds = face.UVBounds;

  let transformation: null | gp_GTrsf2d = null;
  const uAxis = r(axis2d([0, 0], [0, 1]));
  const vAxis = r(axis2d([0, 0], [1, 0]));

  if (scale === "original" && face.geomType !== "PLANE") {
    if (face.geomType !== "CYLINDRE")
      throw new Error(
        "Only planar and cylidrical faces can be unwrapped for sketching"
      );

    const cylinder = r((geomSurf as Geom_CylindricalSurface).Cylinder());
    if (!cylinder.Direct()) {
      geomSurf = geomSurf.UReversed();
    }
    const radius = cylinder.Radius();
    const affinity = stretchTransform2d(1 / radius, [0, 1]);
    transformation = affinity.wrapped;
  }

  if (scale === "bounds") {
    transformation = r(new oc.gp_GTrsf2d());
    transformation.SetAffinity(uAxis, bounds.uMax - bounds.uMin);

    if (bounds.uMin !== 0) {
      const translation = r(new oc.gp_GTrsf2d());
      translation.SetTranslationPart(new oc.gp_XY(0, -bounds.uMin));
      transformation.Multiply(translation);
    }

    const vTransformation = r(new oc.gp_GTrsf2d());
    vTransformation.SetAffinity(vAxis, bounds.vMax - bounds.vMin);
    transformation.Multiply(vTransformation);

    if (bounds.vMin !== 0) {
      const translation = r(new oc.gp_GTrsf2d());
      translation.SetTranslationPart(r(new oc.gp_XY(0, -bounds.vMin)));
      transformation.Multiply(translation);
    }
  }

  const modifiedCurves = transformCurves(curves, transformation);
  const edges = curvesAsEdgesOnSurface(modifiedCurves, geomSurf);

  gc();
  return edges;
}

export function edgeToCurve(e: Edge, face: Face): Curve2D {
  const oc = getOC();
  const r = GCWithScope();

  const adaptor = r(new oc.BRepAdaptor_Curve2d(e.wrapped, face.wrapped));

  const trimmed = new oc.Geom2d_TrimmedCurve(
    adaptor.Curve(),
    adaptor.FirstParameter(),
    adaptor.LastParameter(),
    true,
    true
  );

  if (e.orientation === "backward") {
    trimmed.Reverse();
  }

  return new Curve2D(trimmed);
}

const poles3dTo2d = (poles: any, register: <T extends Deletable>(value: T) => T) => {
  const oc = getOC();
  const poles2d = register(
    new oc.NCollection_Array1_gp_Pnt2d(poles.Lower(), poles.Upper())
  );

  for (let i = poles.Lower(); i <= poles.Upper(); i++) {
    const pole = register(poles.Value(i));
    poles2d.SetValue(i, register(new oc.gp_Pnt2d(pole.X(), pole.Y())));
  }

  return poles2d;
};

const point3dTo2d = (point: any): Point2D => [point.X(), point.Y()];

const direction3dTo2d = (direction: any): Point2D => [
  direction.X(),
  direction.Y(),
];

const axis3dTo2d = (axis: any, register: <T extends Deletable>(value: T) => T) => {
  const oc = getOC();

  const location = register(axis.Location());
  const xDirection = register(axis.XDirection());
  const yDirection = register(axis.YDirection());

  return register(
    new oc.gp_Ax22d(
      register(new oc.gp_Pnt2d(location.X(), location.Y())),
      register(
        new oc.gp_Dir2d(
          direction3dTo2d(xDirection)[0],
          direction3dTo2d(xDirection)[1]
        )
      ),
      register(
        new oc.gp_Dir2d(
          direction3dTo2d(yDirection)[0],
          direction3dTo2d(yDirection)[1]
        )
      )
    )
  );
};

const orientCurveLikeEdge = (curve: Curve2D, edge: Edge): Curve2D => {
  if (edge.orientation === "backward") curve.reverse();
  return curve;
};

export function edgeToCurveOnPlane(e: Edge): Curve2D {
  const oc = getOC();
  const r = GCWithScope();

  const adaptor = r(new oc.BRepAdaptor_Curve(e.wrapped));
  const curveType = findCurveType(adaptor.GetType());
  const firstParameter = adaptor.FirstParameter();
  const lastParameter = adaptor.LastParameter();

  const wrapAndTrim = (curve: any) =>
    orientCurveLikeEdge(
      new Curve2D(
        new oc.Geom2d_TrimmedCurve(
          curve,
          firstParameter,
          lastParameter,
          true,
          true
        )
      ),
      e
    );

  if (curveType === "LINE") {
    const start = point3dTo2d(r(adaptor.Value(firstParameter)));
    const end = point3dTo2d(r(adaptor.Value(lastParameter)));
    return orientCurveLikeEdge(make2dSegmentCurve(start, end), e);
  }

  if (curveType === "CIRCLE") {
    const circle = adaptor.Circle();
    const curveCopy = new oc.Geom2d_Circle(
      r(new oc.gp_Circ2d(axis3dTo2d(r(circle.Position()), r), circle.Radius()))
    );

    return wrapAndTrim(curveCopy);
  }

  if (curveType === "ELLIPSE") {
    const ellipse = adaptor.Ellipse();
    const curveCopy = new oc.Geom2d_Ellipse(
      r(
        new oc.gp_Elips2d(
          axis3dTo2d(r(ellipse.Position()), r),
          ellipse.MajorRadius(),
          ellipse.MinorRadius()
        )
      )
    );

    return wrapAndTrim(curveCopy);
  }

  if (curveType === "BEZIER_CURVE") {
    const bezier = adaptor.Bezier();
    const poles = poles3dTo2d(r(bezier.Poles()), r);
    const curveCopy = bezier.IsRational()
      ? new oc.Geom2d_BezierCurve(poles, bezier.Weights())
      : new oc.Geom2d_BezierCurve(poles);
    curveCopy.Segment(firstParameter, lastParameter);

    return orientCurveLikeEdge(new Curve2D(curveCopy), e);
  }

  if (curveType === "BSPLINE_CURVE") {
    const bspline = adaptor.BSpline();
    const poles = poles3dTo2d(r(bspline.Poles()), r);
    const curveCopy = bspline.IsRational()
      ? new oc.Geom2d_BSplineCurve(
          poles,
          bspline.Weights(),
          bspline.Knots(),
          bspline.Multiplicities(),
          bspline.Degree(),
          bspline.IsPeriodic()
        )
      : new oc.Geom2d_BSplineCurve(
          poles,
          bspline.Knots(),
          bspline.Multiplicities(),
          bspline.Degree(),
          bspline.IsPeriodic()
        );
    curveCopy.Segment(firstParameter, lastParameter, 1e-9);

    return orientCurveLikeEdge(new Curve2D(curveCopy), e);
  }

  throw new Error(`Unsupported projected curve type: ${curveType}`);
}
