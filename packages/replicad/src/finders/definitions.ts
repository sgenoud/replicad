import { AxisName, Vector } from "../geom";
import { Face, Edge } from "../shapes";

export type StandardPlane = "XY" | "XZ" | "YZ";
export const PLANE_TO_DIR: Record<StandardPlane, AxisName> = {
  YZ: "X",
  XZ: "Y",
  XY: "Z",
};

export type FaceOrEdge = Face | Edge;

export type FilterFcn<Type> = {
  element: Type;
  normal: Vector | null;
};

export type FinderFunction<FinderType, ShapeType> = (
  finder: FinderType,
  shape: ShapeType
) => FinderType;

export abstract class Finder<Type, FilterType> {
  protected filters: (({ element, normal }: FilterFcn<Type>) => boolean)[];

  protected abstract applyFilter(shape: FilterType): Type[];

  /**
   * Check if a particular element should be filtered or not according to the
   * current finder
   */
  abstract shouldKeep(t: Type): boolean;

  constructor() {
    this.filters = [];
  }

  delete() {
    this.filters = [];
  }

  /**
   * Combine logically a set of filter with an AND operation.
   *
   * You need to pass an array of functions that take a finder as a argument
   * and return the same finder with some filters applied to it.
   *
   * Note that by default filters are applied with and AND operation, but in
   * some case you might want to create them dynamically and use this method.
   *
   * @category Filter Combination
   */
  and(findersList: ((f: this) => this)[]): this {
    findersList.forEach((f) => f(this));
    return this;
  }

  /**
   * Invert the result of a particular finder
   *
   * You need to pass a function that take a finder as a argument
   * and return the same finder with some filters applied to it.
   *
   * @category Filter Combination
   */
  not(finderFun: (f: this) => this): this {
    const finder = new (<any>this.constructor)() as this;
    finderFun(finder);

    const notFilter = ({ element }: { element: Type }) =>
      !finder.shouldKeep(element);
    this.filters.push(notFilter);

    return this;
  }

  /**
   * Combine logically a set of filter with an OR operation.
   *
   * You need to pass an array of functions that take a finder as a argument
   * and return the same finder with some filters applied to it.
   *
   * @category Filter Combination
   */
  either(findersList: ((f: this) => this)[]): this {
    const builtFinders = findersList.map((finderFunction) => {
      const finder = new (<any>this.constructor)() as this;
      finderFunction(finder);
      return finder;
    });

    const eitherFilter = ({ element }: { element: Type }) =>
      builtFinders.some((finder) => finder.shouldKeep(element));
    this.filters.push(eitherFilter);

    return this;
  }

  /**
   * Returns all the elements that fit the set of filters defined on this
   * finder
   *
   * If unique is configured as an option it will either return the unique
   * element found or throw an error.
   */
  find(shape: FilterType, options: { unique: true }): Type;
  find(shape: FilterType): Type[];
  find(shape: FilterType, options: { unique?: false }): Type[];
  find(shape: FilterType, { unique = false } = {}) {
    const elements = this.applyFilter(shape);

    if (unique) {
      if (elements.length !== 1) {
        console.error(elements);
        throw new Error("Finder has not found a unique solution");
      }
      return elements[0];
    }

    return elements;
  }
}
