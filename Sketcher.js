import { Vector } from "./geom.js";
import { makeMirrorMatrix } from "./geomHelpers.js";
import { localGC } from "./register.js";
import { DEG2RAD } from "./constants.js";
import {
  makeLine,
  makeThreePointArc,
  makeBezierCurve,
  makeTangentArc,
  assembleWire,
} from "./shapeHelpers.js";

import { BaseSketcher } from "./sketcherlib.js";

export default class Sketcher extends BaseSketcher {
  constructor(plane, origin) {
    super(plane, origin);

    this.pointer = new Vector(this.plane.origin);
    this.firstPoint = new Vector(this.plane.origin);

    this.pendingEdges = [];
    this._mirrorWire = false;
  }

  _updatePointer(newPointer) {
    this.pointer.delete();
    this.pointer = newPointer;
  }

  movePointerTo([x, y]) {
    if (this.pendingEdges.length)
      throw new Error(
        "You can only move the pointer if there is no edge defined"
      );
    this._updatePointer(this.plane.toWorldCoords([x, y]));
    this.firstPoint.delete();
    this.firstPoint = new Vector(this.pointer);
    return this;
  }

  lineTo([x, y]) {
    const endPoint = this.plane.toWorldCoords([x, y]);
    this.pendingEdges.push(makeLine(this.pointer, endPoint));
    this._updatePointer(endPoint);
    return this;
  }

  line(xDist, yDist) {
    const pointer = this.plane.toLocalCoords(this.pointer);
    return this.lineTo([xDist + pointer.x, yDist + pointer.y]);
  }

  vLine(distance) {
    return this.line(0, distance);
  }

  hLine(distance) {
    return this.line(distance, 0);
  }

  tangentLine(distance) {
    const [r, gc] = localGC();
    const previousEdge = this.pendingEdges.length
      ? this.pendingEdges[this.pendingEdges.length - 1]
      : null;

    if (!previousEdge)
      throw new Error("you need a previous edge to create a tangent line");

    const tangent = r(previousEdge.tangentAt(1));
    const endPoint = r(tangent.normalized().multiply(distance)).add(
      this.pointer
    );

    this.pendingEdges.push(makeLine(this.pointer, endPoint));
    this._updatePointer(endPoint);
    gc();
    return this;
  }

  polarLine(distance, angle) {
    const angleInRads = angle * DEG2RAD;
    const x = Math.cos(angleInRads) * distance;
    const y = Math.sin(angleInRads) * distance;
    return this.line(x, y);
  }

  polarLineTo([r, theta]) {
    const angleInRads = theta * DEG2RAD;
    const x = Math.cos(angleInRads) * r;
    const y = Math.sin(angleInRads) * r;
    return this.lineTo([x, y]);
  }

  bezierCurveTo(end, controlPoints) {
    let cp = controlPoints;
    if (cp.length === 2 && !Array.isArray(cp[0])) {
      cp = [cp];
    }
    const inWorldPoints = cp.map((p) => this.plane.toWorldCoords(p));
    const endPoint = this.plane.toWorldCoords(end);

    this.pendingEdges.push(
      makeBezierCurve([this.pointer, ...inWorldPoints, endPoint])
    );

    this._updatePointer(endPoint);
    return this;
  }

  quadraticBezierCurveTo(end, controlPoint) {
    return this.bezierCurveTo(end, [controlPoint]);
  }

  cubicBezierCurveTo(end, startControlPoint, endControlPoint) {
    return this.bezierCurveTo(end, [startControlPoint, endControlPoint]);
  }

  smoothSplineTo(end, config) {
    const [r, gc] = localGC();

    let conf = config;
    if (!config || (!config.endSkew && config.endSkew !== 0)) {
      conf = { endSkew: config };
    }
    const { endSkew = 0, startFactor = 1, endFactor = 1 } = conf;

    const endPoint = this.plane.toWorldCoords(end);
    const previousEdge = this.pendingEdges.length
      ? this.pendingEdges[this.pendingEdges.length - 1]
      : null;

    const defaultDistance = r(endPoint.sub(this.pointer)).Length * 0.25;

    let startPoleDirection;
    if (!previousEdge) {
      startPoleDirection = r(endPoint.sub(this.pointer));
    } else if (previousEdge.geomType === "BEZIER_CURVE") {
      const rawCurve = r(previousEdge.curve).wrapped.Bezier().get();
      const previousPole = r(new Vector(rawCurve.Pole(rawCurve.NbPoles() - 1)));

      startPoleDirection = r(this.pointer.sub(previousPole));
    } else {
      startPoleDirection = r(previousEdge.tangentAt(1));
    }

    const poleDistance = r(
      startPoleDirection.normalized().multiply(startFactor * defaultDistance)
    );
    const startControl = r(this.pointer.add(poleDistance));

    let endPoleDirection;
    if (Array.isArray(endSkew)) {
      endPoleDirection = r(this.plane.toWorldCoords(endSkew));
    } else if (endSkew === "symmetric") {
      endPoleDirection = r(startPoleDirection.multiply(-1));
    } else {
      const direction = r(endPoint.sub(this.pointer));
      const d = r(this.plane.toLocalCoords(direction));

      const angle = endSkew * DEG2RAD;
      endPoleDirection = r(
        this.plane.toWorldCoords([
          d.x * Math.cos(angle) - d.y * Math.sin(angle),
          d.y * Math.cos(angle) + d.x * Math.sin(angle),
        ])
      );
    }

    const endPoleDistance = r(
      endPoleDirection.normalized().multiply(endFactor * defaultDistance)
    );
    const endControl = r(endPoint.sub(endPoleDistance));

    this.pendingEdges.push(
      makeBezierCurve([this.pointer, startControl, endControl, endPoint])
    );

    this._updatePointer(endPoint);
    gc();
    return this;
  }

  smoothSpline(xDist, yDist, splineConfig) {
    const pointer = this.plane.toLocalCoords(this.pointer);
    return this.smoothSplineTo(
      [xDist + pointer.x, yDist + pointer.y],
      splineConfig
    );
  }

  threePointsArcTo(end, centerPoint) {
    const gpoint1 = this.plane.toWorldCoords(centerPoint);
    const gpoint2 = this.plane.toWorldCoords(end);

    this.pendingEdges.push(makeThreePointArc(this.pointer, gpoint1, gpoint2));

    this._updatePointer(gpoint2);
    return this;
  }

  threePointsArc(xDist, yDist, viaXDist, viaYDist) {
    const pointer = this.plane.toLocalCoords(this.pointer);
    return this.threePointsArcTo(
      [pointer.x + xDist, pointer.y + yDist],
      [pointer.x + viaXDist, pointer.y + viaYDist]
    );
  }

  tangentArcTo(end) {
    let endPoint = this.plane.toWorldCoords(end);
    const previousEdge = this.pendingEdges[this.pendingEdges.length - 1];

    this.pendingEdges.push(
      makeTangentArc(previousEdge.endPoint, previousEdge.tangentAt(1), endPoint)
    );

    this._updatePointer(endPoint);
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
    this._updatePointer(endPoint);

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

  _mirrorWireOnStartEnd(wire) {
    const startToEndVector = this.pointer.sub(this.firstPoint).normalize();
    const mirrorVector = startToEndVector.cross(this.plane.zDir);

    const mirror = makeMirrorMatrix({
      position: this.pointer,
      normal: mirrorVector,
    });

    const mirroredWire = wire.transformShape(mirror);
    startToEndVector.delete();
    mirrorVector.delete();
    mirror.delete();

    const combinedWire = assembleWire([wire, mirroredWire]);
    mirroredWire.delete();

    return combinedWire;
  }

  buildWire() {
    if (!this.pendingEdges.length)
      throw new Error("No lines to convert into a wire");

    let wire = assembleWire(this.pendingEdges);
    this.pendingEdges.forEach((e) => e.delete());

    if (this._mirrorWire) {
      wire = this._mirrorWireOnStartEnd(wire);
    }

    this.pointer.delete();
    this.firstPoint.delete();
    return wire;
  }

  _closeSketch() {
    if (!this.pointer.equals(this.firstPoint) && !this._mirrorWire) {
      const endpoint = this.plane.toLocalCoords(this.firstPoint);
      this.lineTo([endpoint.x, endpoint.y]);
    }
  }

  closeWithMirror(shaperConfig) {
    this._mirrorWire = true;
    return this.close(shaperConfig);
  }
}
