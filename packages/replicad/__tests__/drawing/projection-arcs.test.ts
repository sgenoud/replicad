import { expect, test } from "vitest";
import { edgeToCurveOnPlane } from "../../src/curves";
import { drawPointsInterpolation } from "../../src/draw";
import { approximateAsSvgCompatibleCurve } from "../../src/lib2d/approximations";
import {
  make2dEllipseArc,
  make2dInerpolatedBSplineCurve,
  make2dBezierCurve,
} from "../../src/lib2d/makeCurves";
import { samePoint } from "../../src/lib2d/vectorOperations";
import { getOC } from "../../src/oclib";
import { ProjectionCamera } from "../../src/projection/ProjectionCamera";
import { makeProjectedEdges } from "../../src/projection/makeProjectedEdges";

test("keeps trimmed ellipse arcs when splitting for SVG export", () => {
  const ellipseArc = make2dEllipseArc(
    5,
    3,
    Math.PI,
    5.6,
    [0, 0],
    [1, 0],
    true
  );
  const midpoint = ellipseArc.value(
    0.5 * (ellipseArc.firstParameter + ellipseArc.lastParameter)
  );

  const [firstHalf, secondHalf] = approximateAsSvgCompatibleCurve([ellipseArc]);

  expect(firstHalf).toBeDefined();
  expect(secondHalf).toBeDefined();
  expect(samePoint(firstHalf.firstPoint, ellipseArc.firstPoint)).toBe(true);
  expect(samePoint(firstHalf.lastPoint, midpoint)).toBe(true);
  expect(samePoint(secondHalf.firstPoint, midpoint)).toBe(true);
  expect(samePoint(secondHalf.lastPoint, ellipseArc.lastPoint)).toBe(true);
});

test("keeps trimmed bspline segments when converting for SVG export", () => {
  const spline = make2dInerpolatedBSplineCurve([
    [0, 0],
    [4, 5],
    [8, -2],
    [12, 4],
    [16, 0],
  ]);
  const [start, middle, end] = spline.splitAt([0.3, 0.7]);

  expect(start).toBeDefined();
  expect(middle).toBeDefined();
  expect(end).toBeDefined();

  const compatibleCurves = approximateAsSvgCompatibleCurve([middle]);

  expect(compatibleCurves.length).toBeGreaterThan(0);
  expect(samePoint(compatibleCurves[0].firstPoint, middle.firstPoint)).toBe(
    true
  );
  expect(
    samePoint(
      compatibleCurves[compatibleCurves.length - 1].lastPoint,
      middle.lastPoint
    )
  ).toBe(true);
});

test("approximates rational beziers before SVG export", () => {
  const rationalBezier = make2dBezierCurve(
    [0, 0],
    [
      [1, 2],
      [2, -2],
    ],
    [3, 0]
  );
  const bezier = rationalBezier.adaptor().Bezier().get();
  bezier.SetWeight(2, 0.2);

  expect(bezier.IsRational()).toBe(true);

  const compatibleCurves = approximateAsSvgCompatibleCurve([rationalBezier]);

  expect(compatibleCurves.length).toBeGreaterThan(0);
  expect(samePoint(compatibleCurves[0].firstPoint, rationalBezier.firstPoint)).toBe(
    true
  );
  expect(
    samePoint(
      compatibleCurves[compatibleCurves.length - 1].lastPoint,
      rationalBezier.lastPoint
    )
  ).toBe(true);

  compatibleCurves.forEach((curve) => {
    if (curve.geomType === "BEZIER_CURVE") {
      const adaptor = curve.adaptor();
      expect(adaptor.Bezier().get().IsRational()).toBe(false);
      adaptor.delete?.();
    }
  });
});

test("rebuilds projected spline edges from their 3d geometry", () => {
  const shape = drawPointsInterpolation(
    [
      [0, 0],
      [10, 8],
      [20, -5],
      [30, 10],
      [40, 0],
    ],
    {},
    { closeShape: true }
  )
    .sketchOnPlane()
    .extrude(5);
  const camera = new ProjectionCamera([60, -60, 40]).lookAt(shape);
  const projectedSpline = makeProjectedEdges(shape, camera).visible.find(
    (edge) => edge.geomType === "BSPLINE_CURVE"
  );

  expect(projectedSpline).toBeDefined();

  const rebuiltCurve = edgeToCurveOnPlane(projectedSpline!);
  const oc = getOC();
  const adaptor = new oc.BRepAdaptor_Curve_2(projectedSpline!.wrapped);
  const first = adaptor.FirstParameter();
  const last = adaptor.LastParameter();

  [0, 0.25, 0.5, 0.75, 1].forEach((ratio) => {
    const parameter = first + (last - first) * ratio;
    const point = adaptor.Value(parameter);
    const rebuiltPoint = rebuiltCurve.value(parameter);

    expect(rebuiltPoint[0]).toBeCloseTo(point.X(), 7);
    expect(rebuiltPoint[1]).toBeCloseTo(point.Y(), 7);

    point.delete();
  });

  adaptor.delete();
});
