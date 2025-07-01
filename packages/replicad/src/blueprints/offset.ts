import {
  intersectCurves,
  stitchCurves,
  make2dOffset,
  Curve2D,
  samePoint as defaultSamePoint,
  Point2D,
  make2dSegmentCurve,
  squareDistance2d,
  make2dArcFromCenter,
  add2d,
  subtract2d,
  determinant2x2,
} from "../lib2d";
import {
  Blueprint,
  Blueprints,
  CompoundBlueprint,
  fuse2D,
  Shape2D,
  cut2D,
} from ".";

const PRECISION = 1e-8;

const samePoint = (x: Point2D, y: Point2D) =>
  defaultSamePoint(x, y, PRECISION * 10);

const getIntersectionPoint = (
  line1Start: Point2D,
  line1End: Point2D,
  line2Start: Point2D,
  line2End: Point2D
) => {
  const x =
    determinant2x2([
      [
        determinant2x2([
          [line1Start[0], line1Start[1]],
          [line1End[0], line1End[1]],
        ]),
        determinant2x2([
          [line1Start[0], 1],
          [line1End[0], 1],
        ]),
      ],
      [
        determinant2x2([
          [line2Start[0], line2Start[1]],
          [line2End[0], line2End[1]],
        ]),
        determinant2x2([
          [line2Start[0], 1],
          [line2End[0], 1],
        ]),
      ],
    ]) /
    determinant2x2([
      [
        determinant2x2([
          [line1Start[0], 1],
          [line1End[0], 1],
        ]),
        determinant2x2([
          [line1Start[1], 1],
          [line1End[1], 1],
        ]),
      ],
      [
        determinant2x2([
          [line2Start[0], 1],
          [line2End[0], 1],
        ]),
        determinant2x2([
          [line2Start[1], 1],
          [line2End[1], 1],
        ]),
      ],
    ]);

  const y =
    determinant2x2([
      [
        determinant2x2([
          [line1Start[0], line1Start[1]],
          [line1End[0], line1End[1]],
        ]),
        determinant2x2([
          [line1Start[1], 1],
          [line1End[1], 1],
        ]),
      ],
      [
        determinant2x2([
          [line2Start[0], line2Start[1]],
          [line2End[0], line2End[1]],
        ]),
        determinant2x2([
          [line2Start[1], 1],
          [line2End[1], 1],
        ]),
      ],
    ]) /
    determinant2x2([
      [
        determinant2x2([
          [line1Start[0], 1],
          [line1End[0], 1],
        ]),
        determinant2x2([
          [line1Start[1], 1],
          [line1End[1], 1],
        ]),
      ],
      [
        determinant2x2([
          [line2Start[0], 1],
          [line2End[0], 1],
        ]),
        determinant2x2([
          [line2Start[1], 1],
          [line2End[1], 1],
        ]),
      ],
    ]);

  return [x, y] as Point2D;
};

export function rawOffsets(
  blueprint: Blueprint,
  offset: number,
  offsetConfig: Offset2DConfig = {}
): Curve2D[] {
  const correctedOffset =
    blueprint.orientation === "clockwise" ? -offset : offset;
  const offsetCurves: OffsetCurvePair[] = blueprint.curves.map((c) => ({
    offset: make2dOffset(c, correctedOffset),
    original: c,
  }));

  // Ideally we would use the length of the curve to make sure it is
  // not only a point, but the algo we have access to are a bit to
  // convoluted to be usable here

  const offsettedArray: Curve2D[] = [];

  let savedLastCurve: null | OffsetCurvePair = null;

  let previousCurve = offsetCurves.at(-1);

  // We have no offseted curves
  if (!previousCurve) return [];
  if (offsettedArray.length === 1) return offsettedArray;

  const appendCurve = (curve: OffsetCurvePair) => {
    if (!savedLastCurve) {
      savedLastCurve = curve;
    } else if (curve.offset instanceof Curve2D) {
      offsettedArray.push(curve.offset);
    } else if (!samePoint(curve.offset.firstPoint, curve.offset.lastPoint)) {
      offsettedArray.push(
        make2dSegmentCurve(curve.offset.firstPoint, curve.offset.lastPoint)
      );
    }
  };
  const iterateOffsetCurves = function* (): Generator<OffsetCurvePair> {
    for (const curve of offsetCurves.slice(0, -1)) {
      yield curve;
    }
    // This should never happen
    if (!savedLastCurve) throw new Error("Bug in the offset algorithm");
    yield savedLastCurve;
  };

  for (const curve of iterateOffsetCurves()) {
    const previousFirstPoint = previousCurve.offset.firstPoint;
    const previousLastPoint = previousCurve.offset.lastPoint;
    const firstPoint = curve.offset.firstPoint;
    const lastPoint = curve.offset.lastPoint;

    // When the offset curves do still touch we do nothing
    if (samePoint(previousLastPoint, firstPoint)) {
      appendCurve(previousCurve);
      previousCurve = curve;
      continue;
    }

    let intersections: Point2D[] = [];

    if (
      previousCurve.offset instanceof Curve2D &&
      curve.offset instanceof Curve2D
    ) {
      // When the offset curves intersect we cut them and save them at
      const { intersections: pointIntersections, commonSegmentsPoints } =
        intersectCurves(previousCurve.offset, curve.offset, PRECISION / 100);
      intersections = [...pointIntersections, ...commonSegmentsPoints];
    }

    if (intersections.length > 0) {
      let intersection = intersections[0];
      if (intersections.length > 1) {
        // We choose the intersection point the closest to the end of the
        // original curve endpoint (why? not sure, following
        // https://github.com/jbuckmccready/cavalier_contours/)

        const originalEndpoint = previousCurve?.original.lastPoint;
        const distances = intersections.map((i) =>
          squareDistance2d(i, originalEndpoint)
        );
        intersection = intersections[distances.indexOf(Math.min(...distances))];
      }

      // We need to be a lot more careful here with multiple intersections
      // as well as cases where curves overlap

      const splitPreviousCurve = (previousCurve.offset as Curve2D).splitAt(
        [intersection],
        PRECISION
      )[0];
      const splitCurve = (curve.offset as Curve2D)
        .splitAt([intersection], PRECISION)
        .at(-1);

      if (!splitCurve) throw new Error("Bug in the splitting algo in offset");

      appendCurve({
        offset: splitPreviousCurve,
        original: previousCurve.original,
      });
      previousCurve = { offset: splitCurve, original: curve.original };
      continue;
    }

    switch (offsetConfig.lineJoinType ?? "round") {
      case "round":
        // When the offset curves do not intersect we link them with an arc of
        // radius offset
        const arcJoiner = make2dArcFromCenter(
          previousLastPoint,
          firstPoint,
          previousCurve.original.lastPoint
        );

        appendCurve(previousCurve);
        offsettedArray.push(arcJoiner);

        break;
      case "bevel":
        // When the offset curves do not intersect we link them with a segment
        const bevelJoiner = make2dSegmentCurve(previousLastPoint, firstPoint);

        appendCurve(previousCurve);
        offsettedArray.push(bevelJoiner);

        break;
      case "miter":
        // When the offset curves do not intersect we determine the intersection
        // of the two offset curves by extending the tangents
        const previousOtherPoint =
          previousCurve.offset instanceof Curve2D
            ? subtract2d(previousLastPoint, previousCurve.offset.tangentAt(1))
            : previousCurve.offset.firstPoint;
        const nextOtherPoint =
          curve.offset instanceof Curve2D
            ? add2d(firstPoint, curve.offset.tangentAt(0))
            : curve.offset.lastPoint;

        const offsetIntersectionPoint = getIntersectionPoint(
          previousOtherPoint,
          previousLastPoint,
          firstPoint,
          nextOtherPoint
        );
        const miterJoiner1 = make2dSegmentCurve(
          previousLastPoint,
          offsetIntersectionPoint
        );
        const miterJoiner2 = make2dSegmentCurve(
          offsetIntersectionPoint,
          firstPoint
        );

        appendCurve(previousCurve);
        offsettedArray.push(miterJoiner1);
        offsettedArray.push(miterJoiner2);

        break;
    }

    previousCurve = curve;
  }

  appendCurve(previousCurve);
  return offsettedArray;
}

interface OffsetCurvePair {
  offset:
    | Curve2D
    | { collapsed: true; firstPoint: Point2D; lastPoint: Point2D };
  original: Curve2D;
}

export interface Offset2DConfig {
  lineJoinType?: "miter" | "bevel" | "round";
}

export function offsetBlueprint(
  blueprint: Blueprint,
  offset: number,
  offsetConfig: Offset2DConfig = {}
): Shape2D {
  const offsettedArray = rawOffsets(blueprint, offset, offsetConfig);

  if (offsettedArray.length < 2) return null;

  // We remove the self intersections with the use the the algorithm as described in https://github.com/jbuckmccready/CavalierContours#offset-algorithm-and-stepwise-example

  const allIntersections: Map<number, Point2D[]> = new Map();
  const updateIntersections = (index: number, newPoints: Point2D[]) => {
    const intersections = allIntersections.get(index) || [];
    allIntersections.set(index, [...intersections, ...newPoints]);
  };

  offsettedArray.forEach((firstCurve, firstIndex) => {
    offsettedArray.slice(firstIndex + 1).forEach((secondCurve, secondIndex) => {
      const { intersections: rawIntersections, commonSegmentsPoints } =
        intersectCurves(firstCurve, secondCurve, PRECISION);

      const intersections = [
        ...rawIntersections,
        ...commonSegmentsPoints,
      ].filter((intersection) => {
        const onFirstCurveExtremity =
          samePoint(intersection, firstCurve.firstPoint) ||
          samePoint(intersection, firstCurve.lastPoint);

        const onSecondCurveExtremity =
          samePoint(intersection, secondCurve.firstPoint) ||
          samePoint(intersection, secondCurve.lastPoint);

        return !(onFirstCurveExtremity && onSecondCurveExtremity);
      });

      if (!intersections.length) return;

      updateIntersections(firstIndex, intersections);
      updateIntersections(secondIndex + firstIndex + 1, intersections);
    });
  });

  if (!allIntersections.size) {
    const offsettedBlueprint = new Blueprint(offsettedArray);
    if (!blueprint.intersects(offsettedBlueprint)) return offsettedBlueprint;
    return null;
  }

  const splitCurves = offsettedArray.flatMap((curve, index) => {
    if (!allIntersections.has(index)) return curve;

    const intersections = allIntersections.get(index) || [];
    const splitCurves = curve.splitAt(intersections, PRECISION * 100);
    return splitCurves;
  });

  // We remove all the segments that are closer to the original curve than the offset
  const prunedCurves = splitCurves.filter((curve) => {
    const closeCurve = blueprint.curves.find(
      (c) => c.distanceFrom(curve) < Math.abs(offset) - PRECISION
    );
    return !closeCurve;
  });

  if (!prunedCurves.length) return null;

  const curvesGrouped = stitchCurves(prunedCurves);

  const blueprints = curvesGrouped
    .filter((c) => c.length > 1)
    .map((c) => new Blueprint(c))
    .filter((b) => b.isClosed());

  if (!blueprints.length) return null;
  if (blueprints.length === 1) {
    return blueprints[0];
  }
  return new Blueprints(blueprints);
}

const fuseAll = (blueprints: Shape2D[]): Shape2D => {
  let fused: Shape2D = blueprints[0];
  for (let i = 1; i < blueprints.length; i++) {
    fused = fuse2D(fused, blueprints[i]);
  }
  return fused;
};

export default function offset(
  bp: Shape2D,
  offsetDistance: number,
  offsetConfig: Offset2DConfig = {}
): Shape2D {
  if (bp instanceof Blueprint) {
    return offsetBlueprint(bp, offsetDistance, offsetConfig);
  } else if (bp instanceof Blueprints) {
    return fuseAll(
      bp.blueprints.map((b) => offset(b, offsetDistance, offsetConfig))
    );
  } else if (bp instanceof CompoundBlueprint) {
    const innerShape = fuseAll(
      bp.blueprints.slice(1).map((b) => offset(b, offsetDistance, offsetConfig))
    );
    return cut2D(
      offset(bp.blueprints[0], offsetDistance, offsetConfig),
      innerShape
    );
  }
  return null;
}
