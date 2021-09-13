import { Vector, asPnt, createNamedPlane } from "./geom.js";
import { RegisteredObj } from "./register.js";
import { DEG2RAD } from "./constants.js";
import { getOC } from "./oclib.js";

const DIRECTIONS = {
  X: [1, 0, 0],
  Y: [0, 1, 0],
  Z: [0, 0, 1],
};
const PLANE_TO_DIR = {
  YZ: [1, 0, 0],
  XZ: [0, 1, 0],
  XY: [0, 0, 1],
};

class Finder extends RegisteredObj {
  constructor() {
    super();
    this.oc = getOC();
    this.filters = [];
    this.references = [];
  }

  delete() {
    this.references.forEach((r) => r.delete());
    this.references = [];
    this.filters = [];
    this.oc = null;
    super.delete();
  }

  inList(elementList, { keepList = false } = {}) {
    if (!keepList) this.references.push(...elementList);

    const elementInList = ({ element }) => {
      return !!elementList.find((e) => e.isSame(element));
    };
    this.filters.push(elementInList);
    return this;
  }

  atAngleWith(direction = "Z", angle = 0) {
    let myDirection;
    if (DIRECTIONS[direction]) {
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

  atDistance(distance, point = [0, 0, 0]) {
    const pnt = asPnt(point);

    const vertexMaker = new this.oc.BRepBuilderAPI_MakeVertex(pnt);
    const vertex = vertexMaker.Vertex();
    vertexMaker.delete();

    const distanceBuilder = new this.oc.BRepExtrema_DistShapeShape_1();
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

  containsPoint(point) {
    return this.atDistance(0, point);
  }

  inBox(corner1, corner2) {
    const boxMaker = new this.oc.BRepPrimAPI_MakeBox_4(
      asPnt(corner1),
      asPnt(corner2)
    );
    const box = boxMaker.Solid();
    boxMaker.delete();
    this.references.push(box);

    const distanceBuilder = new this.oc.BRepExtrema_DistShapeShape_1();
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

  find(shape, { unique = false, clean = false } = {}) {
    let elements = this.applyFilter(shape);

    if (unique) {
      if (elements.length !== 1) {
        console.error(elements);
        throw new Error("Finder has not found a unique solution");
      }
      elements = elements[0];
    }

    if (clean) this.delete();
    return elements;
  }

  either(findersList) {
    const builtFinders = findersList.map((finderFunction) => {
      const finder = new this.constructor();
      this.references.push(finder);
      finderFunction(finder);
      return finder;
    });

    const eitherFilter = ({ element }) =>
      builtFinders.some((finder) => finder.shouldKeep(element));
    this.filters.push(eitherFilter);

    return this;
  }

  and(findersList) {
    findersList.forEach((f) => f(this));
    return this;
  }

  not(finderFun) {
    const finder = new this.constructor();
    this.references.push(finder);
    finderFun(finder);

    const notFilter = ({ element }) => !finder.shouldKeep(element);
    this.filters.push(notFilter);

    return this;
  }

  asSizeFcn(size) {
    return (element) => {
      const shouldKeep = this.shouldKeep(element);
      return shouldKeep ? size : 0;
    };
  }
}

export class FaceFinder extends Finder {
  parallelTo(plane) {
    if (PLANE_TO_DIR[plane]) return this.atAngleWith(PLANE_TO_DIR[plane]);
    if (plane.zDir) return this.atAngleWith(plane.zDir);
    if (plane.normalAt) {
      const normal = plane.normalAt();
      this.atAngleWith(normal);
      normal.delete();
      return this;
    }
  }

  ofSurfaceType(surfaceType) {
    const check = ({ element }) => {
      return element.geomType === surfaceType;
    };
    this.filters.push(check);
    return this;
  }

  inPlane(inputPlane, origin) {
    let plane = inputPlane;
    if (typeof inputPlane === "string") {
      plane = createNamedPlane(plane, origin);
      this.references.push(plane);
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

  shouldKeep(element) {
    const normal = element.normalAt();
    const shouldKeep = this.filters.every((filter) =>
      filter({ normal, element })
    );
    normal.delete();
    return shouldKeep;
  }

  applyFilter(shape) {
    return shape.faces.filter((face) => {
      const shouldKeep = this.shouldKeep(face);
      if (!shouldKeep) face.delete();
      return shouldKeep;
    });
  }
}

export class EdgeFinder extends Finder {
  inDirection(direction) {
    return this.atAngleWith(direction, 0);
  }

  ofCurveType(curveType) {
    const check = ({ element }) => {
      return element.geomType === curveType;
    };
    this.filters.push(check);
    return this;
  }

  parallelTo(plane) {
    if (PLANE_TO_DIR[plane]) return this.atAngleWith(PLANE_TO_DIR[plane], 90);
    if (plane.zDir) return this.atAngleWith(plane.zDir, 90);
    if (plane.normalAt) {
      const normal = plane.normalAt();
      this.atAngleWith(normal, 90);
      normal.delete();
      return this;
    }
  }

  inPlane(inputPlane, origin) {
    let plane = inputPlane;
    if (typeof inputPlane === "string") {
      plane = createNamedPlane(plane, origin);
      this.references.push(plane);
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

  shouldKeep(element) {
    const normal = element.tangentAt().normalized();
    const shouldKeep = this.filters.every((filter) =>
      filter({ normal, element })
    );
    normal.delete();
    return shouldKeep;
  }

  applyFilter(shape) {
    return shape.edges.filter((edge) => {
      const shouldKeep = this.shouldKeep(edge);
      if (!shouldKeep) edge.delete();
      return shouldKeep;
    });
  }
}

export const combineFinderFilters = (filters) => {
  const filter = (element) => {
    for (let { filter, radius } of filters) {
      if (filter.shouldKeep(element)) return radius;
    }
    return 0;
  };

  return [filter, () => filters.forEach((f) => f.filter.delete())];
};
