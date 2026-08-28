import { Face, type AnyShape } from "../shapes";
import { FaceFinder } from "./faceFinder";
import type { FaceOrEdge, FilterFcn, FinderFunction } from "./definitions";

export type SingleFace =
  | Face
  | FaceFinder
  | FinderFunction<FaceFinder, AnyShape>;

export function getSingleFace(f: SingleFace, shape: AnyShape): Face {
  if (f instanceof Face) return f;
  const finder = f instanceof FaceFinder ? f : f(new FaceFinder(), shape);
  return finder.find(shape, { unique: true });
}

type CartesianAxis = "X" | "Y" | "Z";
type ShapeExtremumFilter = <Type extends FaceOrEdge>(
  filter: FilterFcn<Type>
) => boolean;

const AXIS_INDEX: Record<CartesianAxis, number> = { X: 0, Y: 1, Z: 2 };

/**
 * Creates a filter selecting elements that touch one of the shape's
 * axis-aligned bounding-box extremes.
 *
 * @category Finders
 */
export const atShapeExtremum = (
  shape: AnyShape,
  axis: CartesianAxis,
  extremum: "min" | "max",
  tolerance = 1e-6
): ShapeExtremumFilter => {
  const axisIndex = AXIS_INDEX[axis];
  const boundIndex = extremum === "min" ? 0 : 1;
  const shapeBox = shape.boundingBox;
  const shapeExtreme = shapeBox.bounds[boundIndex][axisIndex];
  shapeBox.delete();

  return ({ element }) => {
    const elementBox = element.boundingBox;
    const elementExtreme = elementBox.bounds[boundIndex][axisIndex];
    elementBox.delete();

    return Math.abs(elementExtreme - shapeExtreme) <= tolerance;
  };
};

/** Selects elements touching the shape's maximum Z boundary. */
export const topMost = (shape: AnyShape, tolerance = 1e-6) =>
  atShapeExtremum(shape, "Z", "max", tolerance);

/** Selects elements touching the shape's minimum Z boundary. */
export const bottomMost = (shape: AnyShape, tolerance = 1e-6) =>
  atShapeExtremum(shape, "Z", "min", tolerance);

/** Selects elements touching the shape's minimum X boundary. */
export const leftMost = (shape: AnyShape, tolerance = 1e-6) =>
  atShapeExtremum(shape, "X", "min", tolerance);

/** Selects elements touching the shape's maximum X boundary. */
export const rightMost = (shape: AnyShape, tolerance = 1e-6) =>
  atShapeExtremum(shape, "X", "max", tolerance);

/** Selects elements touching the shape's maximum Y boundary. */
export const frontMost = (shape: AnyShape, tolerance = 1e-6) =>
  atShapeExtremum(shape, "Y", "max", tolerance);

/** Selects elements touching the shape's minimum Y boundary. */
export const backMost = (shape: AnyShape, tolerance = 1e-6) =>
  atShapeExtremum(shape, "Y", "min", tolerance);
