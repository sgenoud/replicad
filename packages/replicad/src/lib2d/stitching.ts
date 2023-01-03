import Flatbush from "flatbush";
import { Curve2D } from "./Curve2D";

export const stitchCurves = (
  curves: Curve2D[],
  precision = 1e-7
): Curve2D[][] => {
  // We create a spacial index of the startpoints
  const startPoints = new Flatbush(curves.length);
  curves.forEach((c) => {
    const [x, y] = c.firstPoint;
    startPoints.add(x - precision, y - precision, x + precision, y + precision);
  });
  startPoints.finish();

  const stitchedCurves: Curve2D[][] = [];
  const visited = new Set<number>();

  curves.forEach((curve, index) => {
    if (visited.has(index)) return;

    const connectedCurves: Curve2D[] = [curve];
    let currentIndex = index;

    visited.add(index);

    // Once we have started a connected curve segment, we look for the next

    let maxLoops = curves.length;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (maxLoops-- < 0) {
        throw new Error("Infinite loop detected");
      }

      const lastPoint = connectedCurves[connectedCurves.length - 1].lastPoint;

      const [x, y] = lastPoint;
      const neighbors = startPoints.search(
        x - precision,
        y - precision,
        x + precision,
        y + precision
      );

      const indexDistance = (otherIndex: number) =>
        Math.abs((currentIndex - otherIndex) % curves.length);
      const potentialNextCurves = neighbors
        .filter((neighborIndex) => !visited.has(neighborIndex))
        .map((neighborIndex): [Curve2D, number, number] => [
          curves[neighborIndex],
          neighborIndex,
          indexDistance(neighborIndex),
        ])
        .sort(([, , a], [, , b]) => indexDistance(a) - indexDistance(b));

      if (potentialNextCurves.length === 0) {
        // No more curves to connect we should have wrapped
        stitchedCurves.push(connectedCurves);
        break;
      }

      const [nextCurve, nextCurveIndex] = potentialNextCurves[0];

      connectedCurves.push(nextCurve);
      visited.add(nextCurveIndex);
      currentIndex = nextCurveIndex;
    }
  });

  return stitchedCurves;
};
