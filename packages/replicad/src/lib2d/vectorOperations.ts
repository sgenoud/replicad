import { Point2D } from "./definitions";

export const samePoint = (
  [x0, y0]: Point2D,
  [x1, y1]: Point2D,
  precision = 1e-6
): boolean => {
  return Math.abs(x0 - x1) <= precision && Math.abs(y0 - y1) <= precision;
};

export const add2d = ([x0, y0]: Point2D, [x1, y1]: Point2D): Point2D => {
  return [x0 + x1, y0 + y1];
};

export const subtract2d = ([x0, y0]: Point2D, [x1, y1]: Point2D): Point2D => {
  return [x0 - x1, y0 - y1];
};

export const scalarMultiply2d = (
  [x0, y0]: Point2D,
  scalar: number
): Point2D => {
  return [x0 * scalar, y0 * scalar];
};

export const distance2d = (
  [x0, y0]: Point2D,
  [x1, y1]: Point2D = [0, 0]
): number => {
  return Math.sqrt((x0 - x1) ** 2 + (y0 - y1) ** 2);
};

export const squareDistance2d = (
  [x0, y0]: Point2D,
  [x1, y1]: Point2D = [0, 0]
): number => {
  return (x0 - x1) ** 2 + (y0 - y1) ** 2;
};

export function crossProduct2d([x0, y0]: Point2D, [x1, y1]: Point2D): number {
  return x0 * y1 - y0 * x1;
}

export const angle2d = (
  [x0, y0]: Point2D,
  [x1, y1]: Point2D = [0, 0]
): number => {
  return Math.atan2(y1 * x0 - y0 * x1, x0 * x1 + y0 * y1);
};

export const polarAngle2d = (
  [x0, y0]: Point2D,
  [x1, y1]: Point2D = [0, 0]
): number => {
  return Math.atan2(y1 - y0, x1 - x0);
};

export const normalize2d = ([x0, y0]: Point2D): Point2D => {
  const l = distance2d([x0, y0]);
  return [x0 / l, y0 / l];
};

export const rotate2d = (
  point: Point2D,
  angle: number,
  center: Point2D = [0, 0]
): Point2D => {
  const [px0, py0] = point;
  const [cx, cy] = center;

  const px = px0 - cx;
  const py = py0 - cy;

  const sinA = Math.sin(angle);
  const cosA = Math.cos(angle);

  const xnew = px * cosA - py * sinA;
  const ynew = px * sinA + py * cosA;

  return [xnew + cx, ynew + cy];
};

export const polarToCartesian = (r: number, theta: number): Point2D => {
  const x = Math.cos(theta) * r;
  const y = Math.sin(theta) * r;
  return [x, y];
};

export const cartesianToPolar = ([x, y]: Point2D): [number, number] => {
  const r = distance2d([x, y]);
  const theta = Math.atan2(y, x);

  return [r, theta];
};
