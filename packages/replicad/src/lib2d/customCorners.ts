import { Curve2D } from "./Curve2D";
import { isPoint2D, Point2D } from "./definitions";
import { intersectCurves } from "./intersections";
import { make2dArcFromCenter, make2dSegmentCurve } from "./makeCurves";
import { make2dOffset } from "./offset";
import {
  add2d,
  crossProduct2d,
  normalize2d,
  scalarMultiply2d,
} from "./vectorOperations";

function removeCorner(
  firstCurve: Curve2D,
  secondCurve: Curve2D,
  radius: number
) {
  const sinAngle = crossProduct2d(
    firstCurve.tangentAt(1),
    secondCurve.tangentAt(0)
  );

  // This cover the case when the curves are colinear
  if (Math.abs(sinAngle) < 1e-10) return null;

  const orientationCorrection = sinAngle > 0 ? -1 : 1;
  const offset = Math.abs(radius) * orientationCorrection;

  const firstOffset = make2dOffset(firstCurve, offset);
  const secondOffset = make2dOffset(secondCurve, offset);

  if (!(firstOffset instanceof Curve2D) || !(secondOffset instanceof Curve2D)) {
    return null;
  }

  let potentialCenter: Point2D | undefined;
  try {
    const { intersections } = intersectCurves(firstOffset, secondOffset, 1e-9);

    // We need to work on the case where there are more than one intersections
    potentialCenter = intersections.at(-1);
  } catch (e) {
    return null;
  }

  if (!isPoint2D(potentialCenter)) {
    return null;
  }
  const center = potentialCenter;

  const splitForFillet = (curve: Curve2D, offsetCurve: Curve2D) => {
    const [x, y] = offsetCurve.tangentAt(center);
    const normal = normalize2d([-y, x]);
    const splitPoint = add2d(center, scalarMultiply2d(normal, offset));
    const splitParam = curve.parameter(splitPoint, 1e-6);
    return curve.splitAt([splitParam]);
  };

  const [first] = splitForFillet(firstCurve, firstOffset);
  const [, second] = splitForFillet(secondCurve, secondOffset);

  return { first, second, center };
}

export function filletCurves(
  firstCurve: Curve2D,
  secondCurve: Curve2D,
  radius: number
) {
  const cornerRemoved = removeCorner(firstCurve, secondCurve, radius);
  if (!cornerRemoved) {
    console.warn(
      "Cannot fillet between curves",
      firstCurve.repr,
      secondCurve.repr
    );
    return [firstCurve, secondCurve];
  }

  const { first, second, center } = cornerRemoved;

  return [
    first,
    make2dArcFromCenter(first.lastPoint, second.firstPoint, center),
    second,
  ];
}

export function chamferCurves(
  firstCurve: Curve2D,
  secondCurve: Curve2D,
  radius: number
) {
  const cornerRemoved = removeCorner(firstCurve, secondCurve, radius);
  if (!cornerRemoved) {
    console.warn(
      "Cannot chamfer between curves",
      firstCurve.repr,
      secondCurve.repr
    );
    return [firstCurve, secondCurve];
  }

  const { first, second } = cornerRemoved;

  return [
    first,
    make2dSegmentCurve(first.lastPoint, second.firstPoint),
    second,
  ];
}
