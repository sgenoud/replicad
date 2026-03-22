import { Geom2dAPI_InterCurveCurve } from "replicad-opencascadejs";
import { getOC } from "../oclib";
import { Curve2D } from "./Curve2D";
import { Point2D } from "./definitions";
import { samePoint } from "./vectorOperations";

function* pointsIteration(
  intersector: Geom2dAPI_InterCurveCurve
): Generator<Point2D> {
  const nPoints = intersector.NbPoints();
  if (!nPoints) return;

  for (let i = 1; i <= nPoints; i++) {
    const point = intersector.Point(i);
    yield [point.X(), point.Y()];
  }
}

function* commonSegmentsIteration(
  intersector: Geom2dAPI_InterCurveCurve
): Generator<Curve2D> {
  const nSegments = intersector.NbSegments();
  if (!nSegments) return;

  for (let i = 1; i <= nSegments; i++) {
    try {
      const { Curve1, Curve2 } = intersector.Segment(i);
      Curve2.delete();
      yield new Curve2D(Curve1);
    } catch (e) {
      continue;
    }
  }
}

export const intersectCurves = (
  first: Curve2D,
  second: Curve2D,
  precision = 1e-9
) => {
  if (first.boundingBox.isOut(second.boundingBox))
    return { intersections: [], commonSegments: [], commonSegmentsPoints: [] };

  const oc = getOC();
  const intersector = new oc.Geom2dAPI_InterCurveCurve();

  let intersections;
  let commonSegments;

  try {
    intersector.Init(first.wrapped, second.wrapped, precision);

    intersections = Array.from(pointsIteration(intersector));
    commonSegments = Array.from(commonSegmentsIteration(intersector));
  } catch (e) {
    console.error(first, second, e);
    throw new Error("Intersections failed between curves");
  } finally {
    intersector.delete();
  }

  const segmentsAsPoints = commonSegments
    .filter((c) => samePoint(c.firstPoint, c.lastPoint, precision))
    .map((c) => c.firstPoint);

  if (segmentsAsPoints.length) {
    intersections.push(...segmentsAsPoints);
    commonSegments = commonSegments.filter(
      (c) => !samePoint(c.firstPoint, c.lastPoint, precision)
    );
  }

  const commonSegmentsPoints = commonSegments.flatMap((c) => [
    c.firstPoint,
    c.lastPoint,
  ]);

  return { intersections, commonSegments, commonSegmentsPoints };
};

export const selfIntersections = (curve: Curve2D, precision = 1e-9) => {
  const oc = getOC();
  const intersector = new oc.Geom2dAPI_InterCurveCurve();

  let intersections;

  try {
    intersector.Init(curve.wrapped, curve.wrapped, precision);

    intersections = Array.from(pointsIteration(intersector));
  } catch (e) {
    throw new Error("Self intersection failed");
  } finally {
    intersector.delete();
  }

  return intersections;
};
