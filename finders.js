import { Vector, asPnt } from "./geom.js";
import { DEG2RAD } from "./constants.js";

export const edgeIsParallelTo = (oc, edge, parallelTo = [0, 0, 1]) => {
  const { startPoint, endPoint } = edge;
  const v = new Vector(oc, parallelTo);
  const direction = endPoint.sub(startPoint).normalize();
  const dotProduct = direction.dot(v);

  startPoint.delete();
  endPoint.delete();
  v.delete();
  direction.delete();

  return Math.abs(dotProduct - 1) < 1e-6;
};

export const findInList = (edgesList, value) => {
  return (edge) => {
    const found = edgesList.find((e) => e.isSame(edge));
    if (found) return value;
    return null;
  };
};

export const max = (array, maxFcn) => {
  return array
    .map((elem) => ({ value: maxFcn(elem), elem }))
    .reduce((a, b) => {
      if (!a) return b;
      if (!b) return a;

      if (a.value >= b.value) return a;
      return b;
    }, null).elem;
};

export const min = (array, minFcn) => {
  return array
    .map((elem) => ({ value: minFcn(elem), elem }))
    .reduce((a, b) => {
      if (!a) return b;
      if (!b) return a;

      if (a.value <= b.value) return a;
      return b;
    }, null).elem;
};

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

class Finder {
  constructor(oc) {
    this.oc = oc;
    this.filters = [];
    this.references = [];
  }

  delete() {
    this.references.forEach((r) => r.delete());
    this.references = [];
    this.filters = [];
  }

  atAngleWith(direction = "Z", angle = 0) {
    let myDirection;
    if (DIRECTIONS[direction]) {
      myDirection = new Vector(this.oc, DIRECTIONS[direction]);
    } else {
      myDirection = new Vector(this.oc, direction);
    }

    const checkAngle = ({ normal }) => {
      // We do not care about the orientation
      const angleOfNormal = Math.acos(Math.abs(normal.dot(myDirection)));
      //console.log("angle", angleOfNormal / DEG2RAD);

      return Math.abs(angleOfNormal - DEG2RAD * angle) < 1e-6;
    };

    this.filters.push(checkAngle);
    this.references.push(myDirection);

    return this;
  }

  containsPoint(point) {
    const pnt = asPnt(this.oc, point);

    const vertexMaker = new this.oc.BRepBuilderAPI_MakeVertex(pnt);
    const vertex = vertexMaker.Vertex();
    vertexMaker.delete();

    const distanceBuilder = new this.oc.BRepExtrema_DistShapeShape_1();
    distanceBuilder.LoadS1(vertex);

    const checkPoint = ({ element }) => {
      distanceBuilder.LoadS2(element);
      distanceBuilder.Perform();

      //console.log("distance", distanceBuilder.Value());
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

  applyFilter(shape) {
    return shape.faces.filter((face) => {
      const normal = face.normalAt();
      const shouldKeep = this.filters.every((filter) =>
        filter({ normal, element: face.wrapped })
      );
      normal.delete();
      if (!shouldKeep) face.delete();
      return shouldKeep;
    });
  }

  asSizeFcn(size) {
    return (face) => {
      const normal = face.normalAt();
      const shouldKeep = this.filters.every((filter) =>
        filter({ normal, element: face.wrapped })
      );
      normal.delete();
      return shouldKeep ? size : 0;
    };
  }
}

export class EdgeFinder extends Finder {
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

  applyFilter(shape) {
    return shape.edges.filter((edge) => {
      const normal = edge.tangentAt();
      const shouldKeep = this.filters.every((filter) =>
        filter({ normal, element: edge.wrapped })
      );
      normal.delete();
      if (!shouldKeep) edge.delete();
      return shouldKeep;
    });
  }

  asSizeFcn(size) {
    return (edge) => {
      const normal = edge.tangentAt();
      const shouldKeep = this.filters.every((filter) =>
        filter({ normal, element: edge.wrapped })
      );
      normal.delete();
      return shouldKeep ? size : 0;
    };
  }
}
