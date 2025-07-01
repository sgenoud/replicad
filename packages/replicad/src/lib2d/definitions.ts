export type Point2D = [number, number];

export function isPoint2D(point: unknown): point is Point2D {
  return Array.isArray(point) && point.length === 2;
}

export type Matrix2X2 = [[number, number], [number, number]];

export function isMatrix2X2(matrix: unknown): matrix is Matrix2X2 {
  return (
    Array.isArray(matrix) &&
    matrix.length === 2 &&
    matrix.every((row) => Array.isArray(row) && row.length === 2)
  );
}
