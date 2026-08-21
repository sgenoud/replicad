import { Face, type AnyShape } from "../shapes";
import type { EdgeFinder } from "./edgeFinder";
import { FaceFinder } from "./faceFinder";
import type { FinderFunction } from "./definitions";

export type SingleFace =
  | Face
  | FaceFinder
  | FinderFunction<FaceFinder, AnyShape>;

export function getSingleFace(f: SingleFace, shape: AnyShape): Face {
  if (f instanceof Face) return f;
  const finder = f instanceof FaceFinder ? f : f(new FaceFinder(), shape);
  return finder.find(shape, { unique: true });
}

type ShapeFinder = EdgeFinder | FaceFinder;
type ShapeFinderFunction = <FinderType extends ShapeFinder>(
  finder: FinderType,
  shape: AnyShape
) => FinderType;

type CartesianAxis = "X" | "Y" | "Z";

const AXIS_INDEX: Record<CartesianAxis, number> = { X: 0, Y: 1, Z: 2 };

/**
 * Creates a finder function selecting elements that touch one of the shape's
 * axis-aligned bounding-box extremes.
 *
 * @category Finders
 */
export const atShapeExtremum = (
  axis: CartesianAxis,
  extremum: "min" | "max",
  tolerance = 1e-6
): ShapeFinderFunction => {
  const axisIndex = AXIS_INDEX[axis];
  const boundIndex = extremum === "min" ? 0 : 1;

  return <FinderType extends ShapeFinder>(
    finder: FinderType,
    shape: AnyShape
  ): FinderType => {
    const shapeBox = shape.boundingBox;
    const shapeExtreme = shapeBox.bounds[boundIndex][axisIndex];
    shapeBox.delete();

    finder.when(({ element }) => {
      const elementBox = element.boundingBox;
      const elementExtreme = elementBox.bounds[boundIndex][axisIndex];
      elementBox.delete();

      return Math.abs(elementExtreme - shapeExtreme) <= tolerance;
    });
    return finder;
  };
};

/** Selects elements touching the shape's maximum Z boundary. */
export const topMost = atShapeExtremum("Z", "max");

/** Selects elements touching the shape's minimum Z boundary. */
export const bottomMost = atShapeExtremum("Z", "min");

/** Selects elements touching the shape's minimum X boundary. */
export const leftMost = atShapeExtremum("X", "min");

/** Selects elements touching the shape's maximum X boundary. */
export const rightMost = atShapeExtremum("X", "max");

/** Selects elements touching the shape's maximum Y boundary. */
export const frontMost = atShapeExtremum("Y", "max");

/** Selects elements touching the shape's minimum Y boundary. */
export const backMost = atShapeExtremum("Y", "min");
