import { Plane, createNamedPlane } from "./geom.js";
import { makeMirrorMatrix } from "./geomHelpers.js";
import { Solid, downcast } from "./shapes.js";
import {
  makeLine,
  makeFace,
  makeThreePointArc,
  makeBezierCurve,
  makeTangentArc,
  assembleWire,
} from "./shapeHelpers.js";
import { getOC } from "./oclib.js";

export default class Sketcher {
  constructor(plane = "XY", origin = [0, 0, 0]) {
    this.oc = getOC();
    if (plane instanceof Plane) {
      this.plane = plane;
    }

    if (plane instanceof Plane) {
      this.plane = plane;
    } else {
      this.plane = createNamedPlane(plane, origin);
    }
    this.pointer = this.plane.origin;

    this.firstPoint = this.plane.origin;

    this.pendingEdges = [];
  }

  movePointer(x, y) {
    this.pointer = this.plane.toWorldCoords([x, y]);
    this.firstPoint = this.pointer;
    return this;
  }

  lineTo(x, y) {
    const endPoint = this.plane.toWorldCoords([x, y]);
    this.pendingEdges.push(makeLine(this.pointer, endPoint));
    this.pointer = endPoint;
    return this;
  }

  line(xDist, yDist) {
    const pointer = this.plane.toLocalCoords(this.pointer);
    return this.lineTo(xDist + pointer.x, yDist + pointer.y);
  }

  vLine(distance) {
    return this.line(0, distance);
  }

  hLine(distance) {
    return this.line(distance, 0);
  }

  vLineTo(yCoord) {
    return this.lineTo(this.pointer.x, yCoord);
  }

  hLineTo(xCoord) {
    return this.lineTo(xCoord, this.pointer.y);
  }

  polarLine(distance, angle) {
    const angleInRads = angle * (Math.PI / 180);
    const x = Math.cos(angleInRads) * distance;
    const y = Math.sin(angleInRads) * distance;
    return this.line(x, y);
  }

  polarLineTo(distance, angle) {
    const angleInRads = angle * (Math.PI / 180);
    const x = Math.cos(angleInRads) * distance;
    const y = Math.sin(angleInRads) * distance;
    return this.lineTo(x, y);
  }

  bezierCurve(controlPoints, end) {
    let cp = controlPoints;
    if (cp.length === 2 && !Array.isArray(cp[0])) {
      cp = [cp];
    }
    const inWorldPoints = cp.map((p) => this.plane.toWorldCoords(p));
    const endPoint = this.plane.toWorldCoords(end);

    this.pendingEdges.push(
      makeBezierCurve([this.pointer, ...inWorldPoints, endPoint])
    );
    this.pointer = endPoint;
    return this;
  }

  threePointsArc(center, end) {
    const gpoint1 = this.plane.toWorldCoords(center);
    const gpoint2 = this.plane.toWorldCoords(end);

    this.pendingEdges.push(makeThreePointArc(this.pointer, gpoint1, gpoint2));
    this.pointer = gpoint2;
    return this;
  }

  tangentArcTo(end) {
    let endPoint = this.plane.toWorldCoords(end);
    const previousEdge = this.pendingEdges[this.pendingEdges.length - 1];

    this.pendingEdges.push(
      makeTangentArc(previousEdge.endPoint, previousEdge.tangentAt(1), endPoint)
    );

    this.pointer = endPoint;
    return this;
  }

  tangentArc(xDist, yDist) {
    const pointer = this.plane.toLocalCoords(this.pointer);
    return this.tangentArcTo([xDist + pointer.x, yDist + pointer.y]);
  }

  sagittaArcTo(end, sagitta) {
    const startPoint = this.pointer;
    const endPoint = this.plane.toWorldCoords(end);

    let p = endPoint.add(startPoint);
    const midPoint = p.multiply(0.5);
    p.delete();

    p = endPoint.sub(startPoint);
    const sagDirection = p.cross(this.plane.zDir).normalized();

    p.delete();
    const sagVector = sagDirection.multiply(sagitta);

    const sagPoint = midPoint.add(sagVector);
    sagVector.delete();

    this.pendingEdges.push(makeThreePointArc(this.pointer, sagPoint, endPoint));
    this.pointer = endPoint;

    sagPoint.delete();
    return this;
  }

  sagittaArc(xDist, yDist, sagitta) {
    const pointer = this.plane.toLocalCoords(this.pointer);
    return this.sagittaArcTo([xDist + pointer.x, yDist + pointer.y], sagitta);
  }

  vSagittaArc(distance, sagitta) {
    return this.sagittaArc(0, distance, sagitta);
  }

  hSagittaArc(distance, sagitta) {
    return this.sagittaArc(distance, 0, sagitta);
  }

  buildWire() {
    if (!this.pendingEdges.length)
      throw new Error("No lines to convert into a wire");
    const wire = assembleWire(this.pendingEdges);
    this.pendingEdges.forEach((e) => e.delete());
    return wire;
  }

  _postProcessWire(wire, { returnType, extrusionDistance }) {
    if (returnType !== "face" && returnType !== "solid") return wire;

    const face = makeFace(wire);
    wire.delete();

    if (returnType === "face") return face;

    const extrusionVec = this.plane.zDir.multiply(extrusionDistance);
    const solidBuilder = new this.oc.BRepPrimAPI_MakePrism_1(
      face.wrapped,
      extrusionVec.wrapped,
      false,
      true
    );
    const solid = new Solid(downcast(solidBuilder.Shape()));

    face.delete();
    extrusionVec.delete();
    solidBuilder.delete();

    return solid;
  }

  close({ returnType, extrusionDistance = 1 } = {}) {
    if (!this.pointer.equals(this.firstPoint)) {
      const endpoint = this.plane.toLocalCoords(this.firstPoint);
      this.lineTo(endpoint.x, endpoint.y);
    }

    const wire = this.buildWire();
    return this._postProcessWire(wire, { returnType, extrusionDistance });
  }

  closeWithMirror({ returnType, extrusionDistance = 1 } = {}) {
    const startToEndVector = this.pointer.sub(this.firstPoint).normalize();
    const mirrorVector = startToEndVector.cross(this.plane.zDir);

    const mirror = makeMirrorMatrix({
      position: this.pointer,
      normal: mirrorVector,
    });

    const wire = this.buildWire();

    const mirroredWire = wire.transformShape(mirror);
    startToEndVector.delete();
    mirrorVector.delete();
    mirror.delete();

    const newWire = assembleWire([wire, mirroredWire]);
    return this._postProcessWire(newWire, { returnType, extrusionDistance });
  }
}
