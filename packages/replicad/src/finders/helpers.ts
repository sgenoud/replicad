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
 * Creates a predicate for a finder's `when` method that selects elements
 * touching an axis-aligned bounding-box extreme of a shape.
 *
 * An element is selected when its bounding-box minimum or maximum is within
 * `tolerance` of the corresponding bound of `shape`. This means that a side
 * face touching the top of a shape is considered top-most too. Combine this
 * predicate with an orientation filter when only horizontal or vertical
 * elements should be selected.
 *
 * The shape bounds are calculated once when the predicate is created. Element
 * bounds are calculated whenever the predicate is evaluated.
 *
 * @param shape - Shape whose bounds define the extremum.
 * @param axis - Cartesian axis along which to compare bounds.
 * @param extremum - Whether to compare the minimum or maximum bound.
 * @param tolerance - Maximum difference between bounds. Defaults to `1e-6`.
 * @returns A predicate that can be passed to `EdgeFinder.when` or
 * `FaceFinder.when`.
 *
 * @example
 * const topEdges = new EdgeFinder()
 *   .when(atShapeExtremum(shape, "Z", "max"))
 *   .parallelTo("XY")
 *   .find(shape);
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

/**
 * Creates a predicate selecting elements touching the shape's maximum Z bound.
 *
 * @example
 * shape.fillet(2, (finder, shape) =>
 *   finder.when(topMost(shape)).parallelTo("XY")
 * );
 *
 * @category Finders
 */
export const topMost = (shape: AnyShape, tolerance = 1e-6) =>
  atShapeExtremum(shape, "Z", "max", tolerance);

/**
 * Creates a predicate selecting elements touching the shape's minimum Z bound.
 *
 * @example
 * finder.when(bottomMost(shape));
 *
 * @category Finders
 */
export const bottomMost = (shape: AnyShape, tolerance = 1e-6) =>
  atShapeExtremum(shape, "Z", "min", tolerance);

/**
 * Creates a predicate selecting elements touching the shape's minimum X bound.
 *
 * @example
 * finder.when(leftMost(shape));
 *
 * @category Finders
 */
export const leftMost = (shape: AnyShape, tolerance = 1e-6) =>
  atShapeExtremum(shape, "X", "min", tolerance);

/**
 * Creates a predicate selecting elements touching the shape's maximum X bound.
 *
 * @example
 * finder.when(rightMost(shape));
 *
 * @category Finders
 */
export const rightMost = (shape: AnyShape, tolerance = 1e-6) =>
  atShapeExtremum(shape, "X", "max", tolerance);

/**
 * Creates a predicate selecting elements touching the shape's maximum Y bound.
 *
 * "Front" is defined as the positive Y direction.
 *
 * @example
 * finder.when(frontMost(shape));
 *
 * @category Finders
 */
export const frontMost = (shape: AnyShape, tolerance = 1e-6) =>
  atShapeExtremum(shape, "Y", "max", tolerance);

/**
 * Creates a predicate selecting elements touching the shape's minimum Y bound.
 *
 * "Back" is defined as the negative Y direction.
 *
 * @example
 * finder.when(backMost(shape));
 *
 * @category Finders
 */
export const backMost = (shape: AnyShape, tolerance = 1e-6) =>
  atShapeExtremum(shape, "Y", "min", tolerance);
