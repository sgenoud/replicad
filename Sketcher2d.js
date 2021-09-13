import Sketch from "./Sketch";
import { DEG2RAD } from "./constants.js";
import { localGC } from "./register.js";
import { getOC } from "./oclib.js";
import { assembleWire } from "./shapeHelpers";
import { Edge } from "./shapes";

import {
  normalize2d,
  samePoint,
  tangentAt,
  distance2d,
  axis2d,
  make2dSegmentCurve,
  make2dTangentArc,
  make2dThreePointArc,
  make2dBezierCurve,
} from "./lib2d";

export default class FaceSketcher {
  constructor(face, origin = [0, 0]) {
    this.pointer = origin;
    this.face = face.clone();
    this._bounds = face.UVBounds;
    this.firstPoint = origin;

    this.pendingCurves = [];
  }

  _convertToUV([x, y]) {
    const { uMin, uMax, vMin, vMax } = this._bounds;
    return [uMin + x * (uMax - uMin), vMin + y * (vMax - vMin)];
  }

  _convertFromUV([u, v]) {
    const { uMin, uMax, vMin, vMax } = this._bounds;
    return [(u - uMin) / (uMax - uMin), (v - vMin) / (vMax - vMin)];
  }

  movePointerTo(point) {
    if (this.pendingCurves.length)
      throw new Error(
        "You can only move the pointer if there is no curve defined"
      );

    this.pointer = point;
    this.firstPoint = point;
    return this;
  }

  lineTo(point) {
    const curve = make2dSegmentCurve(
      this._convertToUV(this.pointer),
      this._convertToUV(point)
    );
    this.pointer = point;
    this.pendingCurves.push(curve);
    return this;
  }

  line(xDist, yDist) {
    return this.lineTo([this.pointer[0] + xDist, this.pointer[1] + yDist]);
  }

  vLine(distance) {
    return this.line(0, distance);
  }

  hLine(distance) {
    return this.line(distance, 0);
  }

  tangentLine(distance) {
    const previousCurve = this.pendingCurves.length
      ? this.pendingCurves[this.pendingCurves.length - 1]
      : null;

    if (!previousCurve)
      throw new Error("You need a previous curve to sketch a tangent line");

    const direction = normalize2d(
      this._convertFromUV(tangentAt(previousCurve, 1))
    );
    return this.line(direction[0] * distance, direction[1] * distance);
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

  threePointsArcTo(end, midPoint) {
    this.pendingCurves.push(
      make2dThreePointArc(
        this._convertToUV(this.pointer),
        this._convertToUV(midPoint),
        this._convertToUV(end)
      )
    );
    this.pointer = end;
    return this;
  }

  threePointsArc(xDist, yDist, viaXDist, viaYDist) {
    return this.threePointsArcTo(
      [this.pointer.x + xDist, this.pointer.y + yDist],
      [this.pointer.x + viaXDist, this.pointer.y + viaYDist]
    );
  }

  tangentArcTo(end) {
    const previousCurve = this.pendingCurves.length
      ? this.pendingCurves[this.pendingCurves.length - 1]
      : null;

    if (!previousCurve)
      throw new Error("You need a previous curve to sketch a tangent arc");

    this.pendingCurves.push(
      make2dTangentArc(
        this._convertToUV(this.pointer),
        tangentAt(previousCurve, 1),
        this._convertToUV(end)
      )
    );

    this.pointer = this;
    return this;
  }

  tangentArc(xDist, yDist) {
    return this.tangentArcTo([xDist + this.pointer.x, yDist + this.pointer.y]);
  }

  sagittaArcTo(end, sagitta) {
    const [x0, y0] = this.pointer;
    const [x1, y1] = end;

    const midPoint = [(x0 + x1) / 2, (y0 + y1) / 2];

    // perpendicular vector of B - A
    const sagDir = [-(y1 - y0), x1 - x0];
    const sagDirLen = Math.sqrt(sagDir[0] ** 2 + sagDir[1] ** 2);

    const sagPoint = [
      midPoint[0] + (sagDir[0] / sagDirLen) * sagitta,
      midPoint[1] + (sagDir[1] / sagDirLen) * sagitta,
    ];

    this.pendingCurves.push(
      make2dThreePointArc(
        this._convertToUV(this.pointer),
        this._convertToUV(sagPoint),
        this._convertToUV(end)
      )
    );
    this.pointer = end;

    return this;
  }

  sagittaArc(xDist, yDist, sagitta) {
    return this.sagittaArcTo(
      [xDist + this.pointer[0], yDist + this.pointer[1]],
      sagitta
    );
  }

  vSagittaArc(distance, sagitta) {
    return this.sagittaArc(0, distance, sagitta);
  }

  hSagittaArc(distance, sagitta) {
    return this.sagittaArc(distance, 0, sagitta);
  }

  bezierCurveTo(end, controlPoints) {
    this.pendingCurves.push(
      make2dBezierCurve(
        this._convertToUV(this.pointer),
        controlPoints.map((cp) => this._convertToUV(cp)),
        this._convertToUV(end)
      )
    );

    this.pointer = end;
    return this;
  }

  quadraticBezierCurveTo(end, controlPoint) {
    return this.bezierCurveTo(end, [controlPoint]);
  }

  cubicBezierCurveTo(end, startControlPoint, endControlPoint) {
    return this.bezierCurveTo(end, [startControlPoint, endControlPoint]);
  }

  smoothSplineTo(end, config) {
    let conf = config;
    if (!config || (!config.endSkew && config.endSkew !== 0)) {
      conf = { endSkew: config };
    }
    const { endSkew = 0, startFactor = 1, endFactor = 1 } = conf;

    const previousCurve = this.pendingCurves.length
      ? this.pendingCurves[this.pendingCurves.length - 1]
      : null;

    const defaultDistance = distance2d(this.pointer, end) * 0.25;

    let startPoleDirection;
    if (!previousCurve) {
      startPoleDirection = [end[0] - this.pointer[0], end[1] - this.pointer[1]];
    } else {
      startPoleDirection = this._convertFromUV(tangentAt(previousCurve, 1));
    }

    startPoleDirection = normalize2d(startPoleDirection);
    const startControl = [
      this.pointer[0] + startPoleDirection[0] * startFactor * defaultDistance,
      this.pointer[1] + startPoleDirection[1] * startFactor * defaultDistance,
    ];

    let endPoleDirection;
    if (Array.isArray(endSkew)) {
      endPoleDirection = endSkew;
    } else if (endSkew === "symmetric") {
      endPoleDirection = [-startPoleDirection[0], -startPoleDirection[1]];
    } else {
      const d = [end[0] - this.pointer[0], end[1] - this.pointer[1]];

      const angle = endSkew * DEG2RAD;
      endPoleDirection = [
        d[0] * Math.cos(angle) - d[1] * Math.sin(angle),
        d[1] * Math.cos(angle) + d[0] * Math.sin(angle),
      ];
    }

    endPoleDirection = normalize2d(endPoleDirection);
    const endControl = [
      end[0] - endPoleDirection[0] * endFactor * defaultDistance,
      end[1] - endPoleDirection[1] * endFactor * defaultDistance,
    ];

    return this.cubicBezierCurveTo(end, startControl, endControl);
  }

  smoothSpline(xDist, yDist, splineConfig) {
    return this.smoothSplineTo(
      [xDist + this.pointer[0], yDist + this.pointer[1]],
      splineConfig
    );
  }

  _adaptSurface() {
    const oc = getOC();
    return new oc.BRep_Tool.Surface_2(this.face.wrapped);
  }

  buildWire() {
    const [r, gc] = localGC();
    const oc = getOC();

    const geomSurf = r(this._adaptSurface());

    const edges = this.pendingCurves.map((curve) => {
      return r(
        new Edge(
          r(
            new oc.BRepBuilderAPI_MakeEdge_30(
              r(new oc.Handle_Geom2d_Curve_2(curve)),
              geomSurf
            )
          ).Edge()
        )
      );
    });
    const wire = assembleWire(edges);
    oc.BRepLib.BuildCurves3d_2(wire.wrapped);

    gc();
    return wire;
  }

  _closeSketch() {
    if (!samePoint(this.pointer, this.firstPoint)) {
      this.lineTo(this.firstPoint);
    }
  }

  close(shaperConfig) {
    this._closeSketch();
    if (!shaperConfig) return this.done();

    return this.done().fromConfig(shaperConfig);
  }

  done() {
    const [r, gc] = localGC();

    const wire = this.buildWire();
    const sketch = new Sketch(wire);
    if (wire.isClosed) {
      const face = r(sketch.face({ keep: true }));
      sketch.defaultOrigin = r(face.pointOnSurface(0.5, 0.5));
      sketch.defaultDirection = r(r(face.normalAt()).multiply(-1));
    } else {
      const startPoint = r(wire.startPoint);
      sketch.defaultOrigin = startPoint;
      sketch.defaultDirection = r(this.face.normalAt(startPoint));
    }
    sketch.baseFace = this.face;
    gc();
    return sketch;
  }

  closeWithMirror(shaperConfig) {
    if (samePoint(this.pointer, this.firstPoint))
      throw new Error(
        "Cannot close with a mirror when the sketch is already closed"
      );
    const startToEndVector = [
      this.pointer[0] - this.firstPoint[0],
      this.pointer[1] - this.firstPoint[1],
    ];

    const mirrorAxis = axis2d(
      this._convertToUV(this.pointer),
      this._convertToUV(startToEndVector)
    );

    const mirroredCurves = this.pendingCurves.map((c) =>
      c.Mirrored_2(mirrorAxis).get()
    );
    mirroredCurves.reverse();
    this.pendingCurves.push(...mirroredCurves);
    this.pointer = this.firstPoint;

    return this.close(shaperConfig);
  }
}
