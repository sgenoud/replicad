import {
  Geom2dAPI_PointsToBSpline,
  Geom2d_TrimmedCurve,
  Handle_Geom2d_Curve,
} from "replicad-opencascadejs";
import { getOC } from "../oclib.js";
import { GCWithScope, localGC } from "../register.js";

import { Point2D } from "./definitions.js";
import { axis2d, pnt, vec } from "./ocWrapper.js";

import { Curve2D } from "./Curve2D";
import {
  add2d,
  distance2d,
  normalize2d,
  samePoint,
  scalarMultiply2d,
  subtract2d,
} from "./vectorOperations.js";

export const make2dSegmentCurve = (
  startPoint: Point2D,
  endPoint: Point2D
): Curve2D => {
  const oc = getOC();
  const [r, gc] = localGC();

  const segment = r(
    new oc.GCE2d_MakeSegment_1(r(pnt(startPoint)), r(pnt(endPoint)))
  ).Value();
  const curve = new Curve2D(segment);

  if (!samePoint(curve.firstPoint, startPoint)) {
    curve.reverse();
  }

  gc();
  return curve;
};

export const make2dThreePointArc = (
  startPoint: Point2D,
  midPoint: Point2D,
  endPoint: Point2D
): Curve2D => {
  const oc = getOC();
  const [r, gc] = localGC();

  const segment = r(
    new oc.GCE2d_MakeArcOfCircle_4(
      r(pnt(startPoint)),
      r(pnt(midPoint)),
      r(pnt(endPoint))
    )
  ).Value();
  gc();

  const curve = new Curve2D(segment);
  if (!samePoint(curve.firstPoint, startPoint)) {
    (curve.wrapped.get() as Geom2d_TrimmedCurve).SetTrim(
      curve.lastParameter,
      curve.firstParameter,
      true,
      true
    );
  }
  return curve;
};

export const make2dTangentArc = (
  startPoint: Point2D,
  tangent: Point2D,
  endPoint: Point2D
): Curve2D => {
  const oc = getOC();
  const [r, gc] = localGC();

  const segment = r(
    new oc.GCE2d_MakeArcOfCircle_5(
      r(pnt(startPoint)),
      r(vec(tangent)),
      r(pnt(endPoint))
    )
  ).Value();
  gc();

  const curve = new Curve2D(segment);
  if (!samePoint(curve.firstPoint, startPoint)) {
    (curve.wrapped.get() as Geom2d_TrimmedCurve).SetTrim(
      curve.lastParameter,
      curve.firstParameter,
      true,
      true
    );
  }
  return curve;
};

export const make2dCircle = (
  radius: number,
  center: Point2D = [0, 0]
): Curve2D => {
  const oc = getOC();
  const [r, gc] = localGC();

  const segment = r(
    new oc.GCE2d_MakeCircle_7(r(pnt(center)), radius, true)
  ).Value();
  gc();

  return new Curve2D(segment as unknown as Handle_Geom2d_Curve);
};

export const make2dEllipse = (
  majorRadius: number,
  minorRadius: number,
  xDir: Point2D = [1, 0],
  center: Point2D = [0, 0],
  direct = true
): Curve2D => {
  const oc = getOC();
  const [r, gc] = localGC();
  const ellipse = r(
    new oc.gp_Elips2d_2(
      r(axis2d(center, xDir)),
      majorRadius,
      minorRadius,
      direct
    )
  );

  const segment = r(new oc.GCE2d_MakeEllipse_1(ellipse)).Value();
  gc();

  return new Curve2D(segment as unknown as Handle_Geom2d_Curve);
};

export const make2dEllipseArc = (
  majorRadius: number,
  minorRadius: number,
  startAngle: number,
  endAngle: number,
  center: Point2D = [0, 0],
  xDir: Point2D,
  direct = true
): Curve2D => {
  const oc = getOC();
  const [r, gc] = localGC();
  const ellipse = r(
    new oc.gp_Elips2d_2(r(axis2d(center, xDir)), majorRadius, minorRadius, true)
  );

  const segment = r(
    new oc.GCE2d_MakeArcOfEllipse_1(ellipse, startAngle, endAngle, direct)
  ).Value();
  gc();

  return new Curve2D(segment);
};

export const make2dBezierCurve = (
  startPoint: Point2D,
  controls: Point2D[],
  endPoint: Point2D
): Curve2D => {
  const oc = getOC();
  const [r, gc] = localGC();

  const arrayOfPoints = r(
    new oc.TColgp_Array1OfPnt2d_2(1, controls.length + 2)
  );
  arrayOfPoints.SetValue(1, r(pnt(startPoint)));

  controls.forEach((p, i) => {
    arrayOfPoints.SetValue(i + 2, r(pnt(p)));
  });

  arrayOfPoints.SetValue(controls.length + 2, r(pnt(endPoint)));

  const bezCurve = new oc.Geom2d_BezierCurve_1(arrayOfPoints);
  gc();

  return new Curve2D(new oc.Handle_Geom2d_Curve_2(bezCurve));
};

export function make2dInerpolatedBSplineCurve(
  points: Point2D[],
  {
    tolerance = 1e-3,
    smoothing = null,
    degMax = 3,
    degMin = 1,
  }: {
    tolerance?: number;
    smoothing?: null | [number, number, number];
    degMax?: number;
    degMin?: number;
  } = {}
) {
  const r = GCWithScope();
  const oc = getOC();

  const pnts = r(new oc.TColgp_Array1OfPnt2d_2(1, points.length));

  points.forEach((point, index) => {
    pnts.SetValue(index + 1, r(pnt(point)));
  });

  let splineBuilder: Geom2dAPI_PointsToBSpline;

  if (smoothing) {
    splineBuilder = r(
      new oc.Geom2dAPI_PointsToBSpline_6(
        pnts,
        smoothing[0],
        smoothing[1],
        smoothing[2],
        degMax,
        oc.GeomAbs_Shape.GeomAbs_C2 as any,
        tolerance
      )
    );
  } else {
    splineBuilder = r(
      new oc.Geom2dAPI_PointsToBSpline_2(
        pnts,
        degMin,
        degMax,
        oc.GeomAbs_Shape.GeomAbs_C2 as any,
        tolerance
      )
    );
  }

  if (!splineBuilder.IsDone()) {
    throw new Error("B-spline approximation failed");
  }

  return new Curve2D(splineBuilder.Curve());
}

// This assumes that both start and end points are at radius distance from the
// center
export const make2dArcFromCenter = (
  startPoint: Point2D,
  endPoint: Point2D,
  center: Point2D
) => {
  const midChord = scalarMultiply2d(add2d(startPoint, endPoint), 0.5);
  const orientedRadius = distance2d(center, startPoint);

  const midChordDir = normalize2d(subtract2d(midChord, center));

  return make2dThreePointArc(
    startPoint,
    add2d(scalarMultiply2d(midChordDir, orientedRadius), center),
    endPoint
  );
};
