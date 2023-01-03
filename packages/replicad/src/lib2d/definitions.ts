export type Point2D = [number, number];

export function isPoint2D(point: unknown): point is Point2D {
  return Array.isArray(point) && point.length === 2;
}
