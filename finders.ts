import {
  Vector,
  asPnt,
  createNamedPlane,
  Point,
  Plane,
  PlaneName,
} from "./geom";
import { RegisteredObj } from "./register";
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

abstract class Finder<Type extends FaceOrEdge> extends RegisteredObj {
  protected filters: (({ element: Type, normal: Vector }) => boolean)[];
  protected references: { delete: () => void }[];
  abstract applyFilter(shape: AnyShape): Type[];
  abstract shouldKeep(t: Type): boolean;

  constructor() {
    super();
    this.filters = [];
    this.references = [];
  }

  delete() {
    this.references.forEach((r) => r.delete());
    this.references = [];
    this.filters = [];
    super.delete();
  }

  inList(elementList: Type[], { keepList = false } = {}): this {
    if (!keepList) this.references.push(...elementList);

    const elementInList = ({ element }) => {
      return !!elementList.find((e) => e.isSame(element));
    };
    this.filters.push(elementInList);
    return this;
  }

  atAngleWith(direction: Direction | Point = "Z", angle = 0): this {
    let myDirection: Vector;
    if (typeof direction === "string") {
      myDirection = new Vector(DIRECTIONS[direction]);
    } else {
      myDirection = new Vector(direction);
    }

    const checkAngle = ({ normal }) => {
      // We do not care about the orientation
      const angleOfNormal = Math.acos(Math.abs(normal.dot(myDirection)));

      return Math.abs(angleOfNormal - DEG2RAD * angle) < 1e-6;
    };

    this.filters.push(checkAngle);
    this.references.push(myDirection);

    return this;
  }

  atDistance(distance: number, point: Point = [0, 0, 0]): this {
    const pnt = asPnt(point);

    const oc = getOC();
    const vertexMaker = new oc.BRepBuilderAPI_MakeVertex(pnt);
    const vertex = vertexMaker.Vertex();
    vertexMaker.delete();

    const distanceBuilder = new oc.BRepExtrema_DistShapeShape_1();
    distanceBuilder.LoadS1(vertex);

    const checkPoint = ({ element }) => {
      distanceBuilder.LoadS2(element.wrapped);
      distanceBuilder.Perform();

      return Math.abs(distanceBuilder.Value() - distance) < 1e-6;
    };

    this.filters.push(checkPoint);
    this.references.push(distanceBuilder);

    return this;
  }

  containsPoint(point: Point): this {
    return this.atDistance(0, point);
  }

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

    const checkPoint = ({ element }) => {
      distanceBuilder.LoadS2(element.wrapped);
      distanceBuilder.Perform();

      return distanceBuilder.Value() < 1e-6;
    };

    this.filters.push(checkPoint);
    this.references.push(distanceBuilder);

    return this;
  }

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

  either(findersList: ((f: this) => this)[]): this {
    const builtFinders = findersList.map((finderFunction) => {
      const finder = new (<any>this.constructor)() as this;
      this.references.push(finder);
      finderFunction(finder);
      return finder;
    });

    const eitherFilter = ({ element }) =>
      builtFinders.some((finder) => finder.shouldKeep(element));
    this.filters.push(eitherFilter);

    return this;
  }

  and(findersList: ((f: this) => this)[]): this {
    findersList.forEach((f) => f(this));
    return this;
  }

  not(finderFun: (f: this) => this): this {
    const finder = new (<any>this.constructor)() as this;
    this.references.push(finder);
    finderFun(finder);

    const notFilter = ({ element }) => !finder.shouldKeep(element);
    this.filters.push(notFilter);

    return this;
  }

  asSizeFcn(size: number): (element: Type) => number {
    return (element) => {
      const shouldKeep = this.shouldKeep(element);
      return shouldKeep ? size : 0;
    };
  }
}

export class FaceFinder extends Finder<Face> {
  parallelTo(plane: Plane | StandardPlane | Face): this {
    if (typeof plane === "string" && PLANE_TO_DIR[plane])
      return this.atAngleWith(PLANE_TO_DIR[plane]);
    if (typeof plane !== "string" && plane instanceof Plane)
      return this.atAngleWith(plane.zDir);
    if (typeof plane !== "string" && plane.normalAt) {
      const normal = plane.normalAt();
      this.atAngleWith(normal);
      normal.delete();
      return this;
    }
    return this;
  }

  ofSurfaceType(surfaceType: SurfaceType): this {
    const check = ({ element }) => {
      return element.geomType === surfaceType;
    };
    this.filters.push(check);
    return this;
  }

  inPlane(inputPlane: PlaneName | Plane, origin: Point): this {
    let plane: Plane;
    if (typeof inputPlane === "string") {
      plane = createNamedPlane(inputPlane, origin);
      this.references.push(plane);
    } else {
      plane = inputPlane;
    }

    this.parallelTo(plane);

    const centerInPlane = ({ element }) => {
      const point = element.center;
      const projectedPoint = point.projectToPlane(plane);

      const isSamePoint = point.equals(projectedPoint);
      point.delete();
      projectedPoint.delete();

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
    normal.delete();
    return shouldKeep;
  }

  applyFilter(shape: AnyShape): Face[] {
    return shape.faces.filter((face: Face) => {
      const shouldKeep = this.shouldKeep(face);
      if (!shouldKeep) face.delete();
      return shouldKeep;
    });
  }
}

export class EdgeFinder extends Finder<Edge> {
  inDirection(direction: Direction | Point): this {
    return this.atAngleWith(direction, 0);
  }

  ofCurveType(curveType: CurveType): this {
    const check = ({ element }) => {
      return element.geomType === curveType;
    };
    this.filters.push(check);
    return this;
  }

  parallelTo(plane: Plane | StandardPlane | Face): this {
    if (typeof plane === "string" && PLANE_TO_DIR[plane])
      return this.atAngleWith(PLANE_TO_DIR[plane], 90);
    if (typeof plane !== "string" && plane instanceof Plane)
      return this.atAngleWith(plane.zDir, 90);
    if (typeof plane !== "string" && plane.normalAt) {
      const normal = plane.normalAt();
      this.atAngleWith(normal, 90);
      normal.delete();
      return this;
    }
    return this;
  }

  inPlane(inputPlane: PlaneName | Plane, origin: Point): this {
    let plane: Plane;
    if (typeof inputPlane === "string") {
      plane = createNamedPlane(inputPlane, origin);
      this.references.push(plane);
    } else {
      plane = inputPlane;
    }

    this.parallelTo(plane);

    const firstPointInPlane = ({ element }) => {
      const point = element.startPoint;
      const projectedPoint = point.projectToPlane(plane);

      const isSamePoint = point.equals(projectedPoint);
      point.delete();
      projectedPoint.delete();

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
    normal.delete();
    return shouldKeep;
  }

  applyFilter(shape: AnyShape): Edge[] {
    return shape.edges.filter((edge: Edge) => {
      const shouldKeep = this.shouldKeep(edge);
      if (!shouldKeep) edge.delete();
      return shouldKeep;
    });
  }
}

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
