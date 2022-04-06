import { Vector, asPnt, Point, Plane, PlaneName } from "./geom";
import { makePlane } from "./geomHelpers";
import { DEG2RAD } from "./constants";
import { Face, Edge, AnyShape, SurfaceType, CurveType } from "./shapes";
import { getOC } from "./oclib";

type Direction = "X" | "Y" | "Z";

const DIRECTIONS: Record<Direction, Point> = {
  X: [1, 0, 0],
  Y: [0, 1, 0],
  Z: [0, 0, 1],
};

type StandardPlane = "XY" | "XZ" | "YZ";
const PLANE_TO_DIR: Record<StandardPlane, [number, number, number]> = {
  YZ: [1, 0, 0],
  XZ: [0, 1, 0],
  XY: [0, 0, 1],
};

type FaceOrEdge = Face | Edge;

abstract class Finder<Type extends FaceOrEdge> {
  protected filters: (({
    element,
    normal,
  }: {
    element: Type;
    normal: Vector;
  }) => boolean)[];
  protected references: { delete: () => void }[];

  protected abstract applyFilter(shape: AnyShape): Type[];

  /**
   * Check if a particular element should be filtered or not according to the
   * current finder
   */
  abstract shouldKeep(t: Type): boolean;

  constructor() {
    this.filters = [];
    this.references = [];
  }

  delete() {
    this.references.forEach((r) => r.delete());
    this.references = [];
    this.filters = [];
  }

  /**
   * Filter to find elements that are in the list.
   *
   * This deletes the elements in the list as the filter deletion.
   *
   * @param __namedParameters.keepList change the behaviour to keep the elements in the list
   * instead of deleting them
   *
   *
   * @category Filter
   */
  inList(elementList: Type[], { keepList = false } = {}): this {
    if (!keepList) this.references.push(...elementList);

    const elementInList = ({ element }: { element: Type }) => {
      return !!elementList.find((e) => e.isSame(element));
    };
    this.filters.push(elementInList);
    return this;
  }

  /**
   * Filter to find elements that are at a specified angle (in degrees) with
   * a direction.
   *
   * The element direction corresponds to its normal in the case of a face.
   *
   * @category Filter
   */
  atAngleWith(direction: Direction | Point = "Z", angle = 0): this {
    let myDirection: Vector;
    if (typeof direction === "string") {
      myDirection = new Vector(DIRECTIONS[direction]);
    } else {
      myDirection = new Vector(direction);
    }

    const checkAngle = ({ normal }: { normal: Vector }) => {
      // We do not care about the orientation
      const angleOfNormal = Math.acos(Math.abs(normal.dot(myDirection)));

      return Math.abs(angleOfNormal - DEG2RAD * angle) < 1e-6;
    };

    this.filters.push(checkAngle);
    this.references.push(myDirection);

    return this;
  }

  /**
   * Filter to find elements that are at a specified distance from a point.
   *
   * @category Filter
   */
  atDistance(distance: number, point: Point = [0, 0, 0]): this {
    const pnt = asPnt(point);

    const oc = getOC();
    const vertexMaker = new oc.BRepBuilderAPI_MakeVertex(pnt);
    const vertex = vertexMaker.Vertex();
    vertexMaker.delete();

    const distanceBuilder = new oc.BRepExtrema_DistShapeShape_1();
    distanceBuilder.LoadS1(vertex);

    const checkPoint = ({ element }: { element: Type }) => {
      distanceBuilder.LoadS2(element.wrapped);
      distanceBuilder.Perform();

      return Math.abs(distanceBuilder.Value() - distance) < 1e-6;
    };

    this.filters.push(checkPoint);
    this.references.push(distanceBuilder);

    return this;
  }

  /**
   * Filter to find elements that contain a certain point
   *
   * @category Filter
   */
  containsPoint(point: Point): this {
    return this.atDistance(0, point);
  }

  /**
   * Filter to find elements that are within a box
   *
   * The elements that are not fully contained in the box are also found.
   *
   * @category Filter
   */
  inBox(corner1: Point, corner2: Point) {
    const oc = getOC();
    const boxMaker = new oc.BRepPrimAPI_MakeBox_4(
      asPnt(corner1),
      asPnt(corner2)
    );
    const box = boxMaker.Solid();
    boxMaker.delete();
    this.references.push(box);

    const distanceBuilder = new oc.BRepExtrema_DistShapeShape_1();
    distanceBuilder.LoadS1(box);

    const checkPoint = ({ element }: { element: Type }) => {
      distanceBuilder.LoadS2(element.wrapped);
      distanceBuilder.Perform();

      return distanceBuilder.Value() < 1e-6;
    };

    this.filters.push(checkPoint);
    this.references.push(distanceBuilder);

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
      this.references.push(finder);
      finderFunction(finder);
      return finder;
    });

    const eitherFilter = ({ element }: { element: Type }) =>
      builtFinders.some((finder) => finder.shouldKeep(element));
    this.filters.push(eitherFilter);

    return this;
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
    this.references.push(finder);
    finderFun(finder);

    const notFilter = ({ element }: { element: Type }) =>
      !finder.shouldKeep(element);
    this.filters.push(notFilter);

    return this;
  }

  /**
   * Returns all the elements that fit the set of filters defined on this
   * finder
   *
   * If unique is configured as an option it will either return the unique
   * element found or throw an error.
   *
   * If clean is set to true the finder is deleted at the end of the filtering
   * operation.
   */
  find(shape: AnyShape, options: { unique: true; clean?: boolean }): Type;
  find(shape: AnyShape, options: { unique?: false; clean?: boolean }): Type[];
  find(shape: AnyShape, { unique = false, clean = false } = {}) {
    const elements = this.applyFilter(shape);

    if (clean) this.delete();

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

/**
 * With a FaceFinder you can apply a set of filters to find specific faces
 * within a shape.
 *
 * @category Finders
 */
export class FaceFinder extends Finder<Face> {
  /** Filter to find faces that are parallel to plane or another face
   *
   * Note that this will work only in planar faces (but the method does not
   * check this assumption).
   *
   * @category Filter
   */
  parallelTo(plane: Plane | StandardPlane | Face): this {
    if (typeof plane === "string" && PLANE_TO_DIR[plane])
      return this.atAngleWith(PLANE_TO_DIR[plane]);
    if (typeof plane !== "string" && plane instanceof Plane)
      return this.atAngleWith(plane.zDir);
    if (typeof plane !== "string" && plane.normalAt) {
      const normal = plane.normalAt();
      this.atAngleWith(normal);
      return this;
    }
    return this;
  }

  /**
   * Filter to find faces that are of a cetain surface type.
   *
   * @category Filter
   */
  ofSurfaceType(surfaceType: SurfaceType): this {
    const check = ({ element }: { element: Face }) => {
      return element.geomType === surfaceType;
    };
    this.filters.push(check);
    return this;
  }

  /** Filter to find faces that are contained in a plane.
   *
   * Note that this will work only in planar faces (but the method does not
   * check this assumption).
   *
   * @category Filter
   */
  inPlane(inputPlane: PlaneName | Plane, origin?: Point | number): this {
    const plane =
      inputPlane instanceof Plane
        ? makePlane(inputPlane)
        : makePlane(inputPlane, origin);

    this.parallelTo(plane);

    const centerInPlane = ({ element }: { element: Face }) => {
      const point = element.center;
      const projectedPoint = point.projectToPlane(plane);

      const isSamePoint = point.equals(projectedPoint);
      return isSamePoint;
    };

    this.filters.push(centerInPlane);
    return this;
  }

  shouldKeep(element: Face): boolean {
    const normal = element.normalAt();
    const shouldKeep = this.filters.every((filter) =>
      filter({ normal, element })
    );
    return shouldKeep;
  }

  protected applyFilter(shape: AnyShape): Face[] {
    return shape.faces.filter((face: Face) => {
      const shouldKeep = this.shouldKeep(face);
      return shouldKeep;
    });
  }
}

/**
 * With an EdgeFinder you can apply a set of filters to find specific edges
 * within a shape.
 *
 * @category Finders
 */
export class EdgeFinder extends Finder<Edge> {
  /**
   * Filter to find edges that are in a certain direction
   *
   * @category Filter
   */
  inDirection(direction: Direction | Point): this {
    return this.atAngleWith(direction, 0);
  }

  /**
   * Filter to find edges that are of a cetain curve type.
   *
   * @category Filter
   */
  ofCurveType(curveType: CurveType): this {
    const check = ({ element }: { element: Edge }) => {
      return element.geomType === curveType;
    };
    this.filters.push(check);
    return this;
  }

  /**
   * Filter to find edges that are parallel to a plane.
   *
   * Note that this will work only in lines (but the method does not
   * check this assumption).
   *
   * @category Filter
   */
  parallelTo(plane: Plane | StandardPlane | Face): this {
    if (typeof plane === "string" && PLANE_TO_DIR[plane])
      return this.atAngleWith(PLANE_TO_DIR[plane], 90);
    if (typeof plane !== "string" && plane instanceof Plane)
      return this.atAngleWith(plane.zDir, 90);
    if (typeof plane !== "string" && plane.normalAt) {
      const normal = plane.normalAt();
      this.atAngleWith(normal, 90);
      return this;
    }
    return this;
  }

  /**
   * Filter to find edges that within a plane.
   *
   * Note that this will work only in lines (but the method does not
   * check this assumption).
   *
   * @category Filter
   */
  inPlane(inputPlane: PlaneName | Plane, origin?: Point | number): this {
    const plane =
      inputPlane instanceof Plane
        ? makePlane(inputPlane)
        : makePlane(inputPlane, origin);

    this.parallelTo(plane);

    const firstPointInPlane = ({ element }: { element: Edge }) => {
      const point = element.startPoint;
      const projectedPoint = point.projectToPlane(plane);

      const isSamePoint = point.equals(projectedPoint);

      return isSamePoint;
    };

    this.filters.push(firstPointInPlane);
    return this;
  }

  shouldKeep(element: Edge): boolean {
    const normal = element.tangentAt().normalized();
    const shouldKeep = this.filters.every((filter) =>
      filter({ normal, element })
    );
    return shouldKeep;
  }

  protected applyFilter(shape: AnyShape): Edge[] {
    return shape.edges.filter((edge: Edge) => {
      const shouldKeep = this.shouldKeep(edge);
      return shouldKeep;
    });
  }
}

/**
 * Combine a set of finder filters (defined with radius) to pass as a filter
 * function.
 *
 * It returns the filter, as well as a cleanup function.
 */
export const combineFinderFilters = <Type extends FaceOrEdge>(
  filters: { filter: Finder<Type>; radius: number }[]
): [(v: Type) => number, () => void] => {
  const filter = (element: Type) => {
    for (const { filter, radius } of filters) {
      if (filter.shouldKeep(element)) return radius;
    }
    return 0;
  };

  return [filter, () => filters.forEach((f) => f.filter.delete())];
};
