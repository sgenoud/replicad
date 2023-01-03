import round2 from "../utils/round2";
import { Point2D } from "./definitions";

export const reprPnt = ([x, y]: Point2D): string => {
  return `(${round2(x)},${round2(y)})`;
};

const asFixed = (p: number): string => {
  let num = p;
  if (Math.abs(p) < 1e-9) num = 0;
  return num.toFixed(10);
};
export const removeDuplicatePoints = (points: Point2D[]): Point2D[] => {
  return Array.from(
    new Set(points.map(([p0, p1]) => `[${asFixed(p0)},${asFixed(p1)}]`))
  ).map((p) => JSON.parse(p));
};
