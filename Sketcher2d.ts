import Sketch from "./Sketch";
import { DEG2RAD, RAD2DEG } from "./constants.js";
import { localGC } from "./register.js";
import { getOC } from "./oclib.js";
import { assembleWire } from "./shapeHelpers";
import { Edge, Face, Wire } from "./shapes";
import {
  convertSvgEllipseParams,
  defaultsSplineConfig,
  SplineConfig,
} from "./sketcherlib.js";
import { Geom2d_Curve, Handle_Geom_Surface } from "../wasm/cadeau_single";

import {
  normalize2d,
  angle2d,
  samePoint,
  tangentAt,
  distance2d,
  axis2d,
  rotate2d,
  polarToCartesian,
  cartesiantToPolar,
  make2dSegmentCurve,
  make2dTangentArc,
  make2dThreePointArc,
  make2dBezierCurve,
  make2dEllipseArc,
  Point2D,
} from "./lib2d";

type UVBounds = {
  uMin: number;
  uMax: number;
  vMin: number;
  vMax: number;
};

export default class FaceSketcher {
  pointer: Point2D;
  face: Face;
  firstPoint: Point2D;
  pendingCurves: Geom2d_Curve[];
  _bounds: UVBounds;

  constructor(face: Face, origin: Point2D = [0, 0]) {
    this.pointer = origin;
    this.face = face.clone();
    this._bounds = face.UVBounds;
    this.firstPoint = origin;

    this.pendingCurves = [];
  }

  protected _convertToUV([x, y]: Point2D): Point2D {
    const { uMin, uMax, vMin, vMax } = this._bounds;
    return [uMin + x * (uMax - uMin), vMin + y * (vMax - vMin)];
  }

  protected _convertFromUV([u, v]: Point2D): Point2D {
    const { uMin, uMax, vMin, vMax } = this._bounds;
    return [(u - uMin) / (uMax - uMin), (v - vMin) / (vMax - vMin)];
  }

  movePointerTo(point: Point2D): this {
    if (this.pendingCurves.length)
      throw new Error(
        "You can only move the pointer if there is no curve defined"
      );

    this.pointer = point;
    this.firstPoint = point;
    return this;
  }

  lineTo(point: Point2D): this {
    const curve = make2dSegmentCurve(
      this._convertToUV(this.pointer),
      this._convertToUV(point)
    );
    this.pointer = point;
    this.pendingCurves.push(curve);
    return this;
  }

  line(xDist: number, yDist: number): this {
    return this.lineTo([this.pointer[0] + xDist, this.pointer[1] + yDist]);
  }

  vLine(distance: number): this {
    return this.line(0, distance);
  }

  hLine(distance: number): this {
    return this.line(distance, 0);
  }

  tangentLine(distance: number): this {
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

  polarLine(distance: number, angle: number): this {
    const angleInRads = angle * DEG2RAD;
    const [x, y] = polarToCartesian(distance, angleInRads);
    return this.line(x, y);
  }

  polarLineTo([r, theta]: Point2D): this {
    const angleInRads = theta * DEG2RAD;
    const point = polarToCartesian(r, angleInRads);
    return this.lineTo(point);
  }

  threePointsArcTo(end: Point2D, midPoint: Point2D): this {
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

  threePointsArc(
    xDist: number,
    yDist: number,
    viaXDist: number,
    viaYDist: number
  ): this {
    const [x0, y0] = this.pointer;
    return this.threePointsArcTo(
      [x0 + xDist, y0 + yDist],
      [x0 + viaXDist, y0 + viaYDist]
    );
  }

  tangentArcTo(end: Point2D): this {
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

    this.pointer = end;
    return this;
  }

  tangentArc(xDist: number, yDist: number): this {
    const [x0, y0] = this.pointer;
    return this.tangentArcTo([xDist + x0, yDist + y0]);
  }

  ellipseTo(
    end: Point2D,
    horizontalRadius: number,
    verticalRadius: number,
    rotation = 0,
    longAxis = false,
    sweep = false
  ): this {
    let rotationAngle = rotation;
    let majorRadius = horizontalRadius;
    let minorRadius = verticalRadius;

    if (horizontalRadius < verticalRadius) {
      rotationAngle = rotation + 90;
      majorRadius = verticalRadius;
      minorRadius = horizontalRadius;
    }
    const radRotationAngle = rotationAngle * DEG2RAD;

    /*
     * The complicated part in this function comes from the scaling that we do
     * between standardised units and UV.  We need to:
     *   - stretch the length of the  radiuses and take into account the angle they
     *     make with the X direction
     *   - modify the angle (as the scaling is not homogenous in the two directions
     *     the angle can change.
     */

    const convertAxis = (ax: Point2D) => distance2d(this._convertToUV(ax));
    const r1 = convertAxis(polarToCartesian(majorRadius, radRotationAngle));
    const r2 = convertAxis(
      polarToCartesian(minorRadius, radRotationAngle + Math.PI / 2)
    );

    const xDir = normalize2d(
      this._convertToUV(rotate2d([1, 0], radRotationAngle))
    );
    const [, newRotationAngle] = cartesiantToPolar(xDir);

    const { cx, cy, startAngle, endAngle, clockwise } = convertSvgEllipseParams(
      this._convertToUV(this.pointer),
      this._convertToUV(end),
      r1,
      r2,
      newRotationAngle,
      longAxis,
      sweep
    );

    const arc = make2dEllipseArc(
      r1,
      r2,
      clockwise ? startAngle : endAngle,
      clockwise ? endAngle : startAngle,
      [cx, cy],
      xDir
    );

    this.pendingCurves.push(arc);
    this.pointer = end;
    return this;
  }

  halfEllipseTo(
    end: Point2D,
    minorRadius: number,
    longAxis = false,
    sweep = false
  ): this {
    const angle = angle2d(end, this.pointer);
    const distance = distance2d(end, this.pointer);

    return this.ellipseTo(
      end,
      distance / 2,
      minorRadius,
      angle * RAD2DEG,
      longAxis,
      sweep
    );
  }

  halfEllipse(
    xDist: number,
    yDist: number,
    minorRadius: number,
    longAxis = false,
    sweep = false
  ): this {
    const [x0, y0] = this.pointer;
    return this.halfEllipseTo(
      [x0 + xDist, y0 + yDist],
      minorRadius,
      longAxis,
      sweep
    );
  }

  ellipse(
    xDist: number,
    yDist: number,
    horizontalRadius: number,
    verticalRadius: number,
    rotation = 0,
    longAxis = false,
    sweep = false
  ): this {
    const [x0, y0] = this.pointer;
    return this.ellipseTo(
      [xDist + x0, yDist + y0],
      horizontalRadius,
      verticalRadius,
      rotation,
      longAxis,
      sweep
    );
  }

  sagittaArcTo(end: Point2D, sagitta: number): this {
    const [x0, y0] = this.pointer;
    const [x1, y1] = end;

    const midPoint = [(x0 + x1) / 2, (y0 + y1) / 2];

    // perpendicular vector of B - A
    const sagDir = [-(y1 - y0), x1 - x0];
    const sagDirLen = Math.sqrt(sagDir[0] ** 2 + sagDir[1] ** 2);

    const sagPoint: Point2D = [
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

  sagittaArc(xDist: number, yDist: number, sagitta: number): this {
    return this.sagittaArcTo(
      [xDist + this.pointer[0], yDist + this.pointer[1]],
      sagitta
    );
  }

  vSagittaArc(distance: number, sagitta: number): this {
    return this.sagittaArc(0, distance, sagitta);
  }

  hSagittaArc(distance: number, sagitta: number): this {
    return this.sagittaArc(distance, 0, sagitta);
  }

  bezierCurveTo(end: Point2D, controlPoints: Point2D | Point2D[]): this {
    let cp: Point2D[];
    if (controlPoints.length === 2 && !Array.isArray(controlPoints[0])) {
      cp = [controlPoints as Point2D];
    } else {
      cp = controlPoints as Point2D[];
    }

    this.pendingCurves.push(
      make2dBezierCurve(
        this._convertToUV(this.pointer),
        cp.map((point) => this._convertToUV(point)),
        this._convertToUV(end)
      )
    );

    this.pointer = end;
    return this;
  }

  quadraticBezierCurveTo(end: Point2D, controlPoint: Point2D): this {
    return this.bezierCurveTo(end, [controlPoint]);
  }

  cubicBezierCurveTo(
    end: Point2D,
    startControlPoint: Point2D,
    endControlPoint: Point2D
  ): this {
    return this.bezierCurveTo(end, [startControlPoint, endControlPoint]);
  }

  smoothSplineTo(end: Point2D, config?: SplineConfig): this {
    const { endSkew, startFactor, endFactor } = defaultsSplineConfig(config);

    const previousCurve = this.pendingCurves.length
      ? this.pendingCurves[this.pendingCurves.length - 1]
      : null;

    const defaultDistance = distance2d(this.pointer, end) * 0.25;

    let startPoleDirection: Point2D;
    if (!previousCurve) {
      startPoleDirection = [end[0] - this.pointer[0], end[1] - this.pointer[1]];
    } else {
      startPoleDirection = this._convertFromUV(tangentAt(previousCurve, 1));
    }

    startPoleDirection = normalize2d(startPoleDirection);
    const startControl: Point2D = [
      this.pointer[0] + startPoleDirection[0] * startFactor * defaultDistance,
      this.pointer[1] + startPoleDirection[1] * startFactor * defaultDistance,
    ];

    let endPoleDirection: Point2D;
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
    const endControl: Point2D = [
      end[0] - endPoleDirection[0] * endFactor * defaultDistance,
      end[1] - endPoleDirection[1] * endFactor * defaultDistance,
    ];

    return this.cubicBezierCurveTo(end, startControl, endControl);
  }

  smoothSpline(
    xDist: number,
    yDist: number,
    splineConfig?: SplineConfig
  ): this {
    return this.smoothSplineTo(
      [xDist + this.pointer[0], yDist + this.pointer[1]],
      splineConfig
    );
  }

  _adaptSurface(): Handle_Geom_Surface {
    const oc = getOC();
    // CHECK THIS: return new oc.BRep_Tool.Surface_2(this.face.wrapped)
    return oc.BRep_Tool.Surface_2(this.face.wrapped);
  }

  buildWire(): Wire {
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

  protected _closeSketch(): void {
    if (!samePoint(this.pointer, this.firstPoint)) {
      this.lineTo(this.firstPoint);
    }
  }

  close(): Sketch {
    this._closeSketch();
    return this.done();
  }

  done(): Sketch {
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

  closeWithMirror(): Sketch {
    if (samePoint(this.pointer, this.firstPoint))
      throw new Error(
        "Cannot close with a mirror when the sketch is already closed"
      );
    const startToEndVector: Point2D = [
      this.pointer[0] - this.firstPoint[0],
      this.pointer[1] - this.firstPoint[1],
    ];

    const mirrorAxis = axis2d(
      this._convertToUV(this.pointer),
      this._convertToUV(startToEndVector)
    );

    const mirroredCurves = this.pendingCurves.map(
      (c) => c.Mirrored_2(mirrorAxis).get() as Geom2d_Curve
    );
    mirroredCurves.reverse();
    this.pendingCurves.push(...mirroredCurves);
    this.pointer = this.firstPoint;

    return this.close();
  }
}
