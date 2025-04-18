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

/**
 * Creates a 2D segment curve between two points.
 *
 * @param startPoint - The starting point of the segment.
 * @param endPoint - The ending point of the segment.
 *
 * @returns A Curve2D object representing the segment.
 *
 * @category Planar curves
 */
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

/**
 * Creates a 2D arc curve defined by three points.
 *
 * @param startPoint - The starting point of the arc.
 * @param midPoint - The midpoint of the arc.
 * @param endPoint - The ending point of the arc.
 *
 * @returns A Curve2D object representing the arc.
 *
 * @category Planar curves
 */
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

/**
 * Creates a 2D tangent arc curve defined by three points.
 *
 * @param startPoint - The starting point of the arc.
 * @param tangent - The tangent vector at the starting point.
 * @param endPoint - The ending point of the arc.
 *
 * @returns A Curve2D object representing the tangent arc.
 *
 * @category Planar curves
 */
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

/**
 * Creates a 2D circle curve.
 *
 * @param radius - The radius of the circle.
 * @param center - The center point of the circle (default is [0, 0]).
 *
 * @returns A Curve2D object representing the circle.
 *
 * @category Planar curves
 */
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

/**
 * Creates a 2D ellipse curve.
 *
 * @param majorRadius - The major radius of the ellipse.
 * @param minorRadius - The minor radius of the ellipse.
 * @param xDir - The direction vector for the major axis (default is [1, 0]).
 * @param center - The center point of the ellipse (default is [0, 0]).
 * @param direct - Whether the ellipse is direct (default is true).
 *
 * @returns A Curve2D object representing the ellipse.
 *
 * @category Planar curves
 */
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

/**
 * Creates a 2D ellipse arc curve.
 *
 * @param majorRadius - The major radius of the ellipse.
 * @param minorRadius - The minor radius of the ellipse.
 * @param startAngle - The starting angle of the arc.
 * @param endAngle - The ending angle of the arc.
 * @param center - The center point of the ellipse (default is [0, 0]).
 * @param xDir - The direction vector for the major axis (default is [1, 0]).
 * @param direct - Whether the ellipse is direct (default is true).
 *
 * @returns A Curve2D object representing the ellipse arc.
 *
 * @category Planar curves
 */
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

/**
 * Creates a 2D Bezier curve defined by a start point, control points, and an end point.
 *
 * @param startPoint - The starting point of the Bezier curve.
 * @param controls - An array of control points for the Bezier curve.
 * @param endPoint - The ending point of the Bezier curve.
 *
 * @returns A Curve2D object representing the Bezier curve.
 *
 * @category Planar curves
 */
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

/**
 * Creates a 2D B-spline curve defined by a set of points.
 *
 * @param points - An array of points defining the B-spline curve.
 * @param options - Options for the B-spline curve.
 * @param options.tolerance - The tolerance for the approximation (default is 1e-3).
 * @param options.smoothing - Smoothing parameters for the B-spline curve (default is null).
 * @param options.degMax - Maximum degree of the B-spline curve (default is 3).
 * @param options.degMin - Minimum degree of the B-spline curve (default is 1).
 *
 * @returns A Curve2D object representing the B-spline curve.
 *
 * @category Planar curves
 */
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
