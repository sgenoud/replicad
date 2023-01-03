import Sketch from "./sketches/Sketch";
import { DEG2RAD, RAD2DEG } from "./constants.js";
import { localGC } from "./register.js";
import { getOC } from "./oclib.js";
import { assembleWire } from "./shapeHelpers";
import { Edge, Face, Wire } from "./shapes";
import {
  convertSvgEllipseParams,
  defaultsSplineConfig,
  SplineConfig,
  GenericSketcher,
} from "./sketcherlib";
import {
  Handle_Geom2d_Curve,
  Handle_Geom_Surface,
} from "replicad-opencascadejs";
import { chamferCurves, Curve2D, filletCurves } from "./lib2d";

import {
  normalize2d,
  polarAngle2d,
  samePoint,
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
import Blueprint from "./blueprints/Blueprint";

type UVBounds = {
  uMin: number;
  uMax: number;
  vMin: number;
  vMax: number;
};

export class BaseSketcher2d {
  protected pointer: Point2D;
  protected firstPoint: Point2D;
  protected pendingCurves: Curve2D[];
  protected _nextCorner: { radius: number; mode: "fillet" | "chamfer" } | null;

  constructor(origin: Point2D = [0, 0]) {
    this.pointer = origin;
    this.firstPoint = origin;
    this._nextCorner = null;

    this.pendingCurves = [];
  }

  protected _convertToUV([x, y]: Point2D): Point2D {
    return [x, y];
  }

  protected _convertFromUV([u, v]: Point2D): Point2D {
    return [u, v];
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

  protected saveCurve(curve: Curve2D) {
    if (!this._nextCorner) {
      this.pendingCurves.push(curve);
      return;
    }

    const previousCurve = this.pendingCurves.pop();
    if (!previousCurve) throw new Error("bug in the custom corner algorithm");

    const makeCorner =
      this._nextCorner.mode === "chamfer" ? chamferCurves : filletCurves;

    this.pendingCurves.push(
      ...makeCorner(previousCurve, curve, this._nextCorner.radius)
    );
    this._nextCorner = null;
  }

  lineTo(point: Point2D): this {
    const curve = make2dSegmentCurve(
      this._convertToUV(this.pointer),
      this._convertToUV(point)
    );
    this.pointer = point;
    this.saveCurve(curve);
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

  vLineTo(yPos: number): this {
    return this.lineTo([this.pointer[0], yPos]);
  }

  hLineTo(xPos: number): this {
    return this.lineTo([xPos, this.pointer[1]]);
  }

  polarLineTo([r, theta]: Point2D): this {
    const angleInRads = theta * DEG2RAD;
    const point = polarToCartesian(r, angleInRads);
    return this.lineTo(point);
  }

  polarLine(distance: number, angle: number): this {
    const angleInRads = angle * DEG2RAD;
    const [x, y] = polarToCartesian(distance, angleInRads);
    return this.line(x, y);
  }

  tangentLine(distance: number): this {
    const previousCurve = this.pendingCurves.length
      ? this.pendingCurves[this.pendingCurves.length - 1]
      : null;

    if (!previousCurve)
      throw new Error("You need a previous curve to sketch a tangent line");

    const direction = normalize2d(
      this._convertFromUV(previousCurve.tangentAt(1))
    );
    return this.line(direction[0] * distance, direction[1] * distance);
  }

  threePointsArcTo(end: Point2D, midPoint: Point2D): this {
    this.saveCurve(
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

    this.saveCurve(
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

  bulgeArcTo(end: Point2D, bulge: number): this {
    if (!bulge) return this.lineTo(end);
    const halfChord = distance2d(this.pointer, end) / 2;
    const bulgeAsSagitta = -bulge * halfChord;

    return this.sagittaArcTo(end, bulgeAsSagitta);
  }

  bulgeArc(xDist: number, yDist: number, bulge: number): this {
    return this.bulgeArcTo(
      [xDist + this.pointer[0], yDist + this.pointer[1]],
      bulge
    );
  }

  vBulgeArc(distance: number, bulge: number): this {
    return this.bulgeArc(0, distance, bulge);
  }

  hBulgeArc(distance: number, bulge: number): this {
    return this.bulgeArc(distance, 0, bulge);
  }

  tangentArcTo(end: Point2D): this {
    const previousCurve = this.pendingCurves.length
      ? this.pendingCurves[this.pendingCurves.length - 1]
      : null;

    if (!previousCurve)
      throw new Error("You need a previous curve to sketch a tangent arc");

    this.saveCurve(
      make2dTangentArc(
        this._convertToUV(this.pointer),
        previousCurve.tangentAt(1),
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

    const { cx, cy, startAngle, endAngle, clockwise, rx, ry } =
      convertSvgEllipseParams(
        this._convertToUV(this.pointer),
        this._convertToUV(end),
        r1,
        r2,
        newRotationAngle,
        longAxis,
        sweep
      );

    const arc = make2dEllipseArc(
      rx,
      ry,
      clockwise ? startAngle : endAngle,
      clockwise ? endAngle : startAngle,
      [cx, cy],
      xDir
    );

    if (!clockwise) {
      arc.reverse();
    }

    this.saveCurve(arc);
    this.pointer = end;
    return this;
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

  halfEllipseTo(end: Point2D, minorRadius: number, sweep = false): this {
    const angle = polarAngle2d(end, this.pointer);
    const distance = distance2d(end, this.pointer);

    return this.ellipseTo(
      end,
      distance / 2,
      minorRadius,
      angle * RAD2DEG,
      true,
      sweep
    );
  }

  halfEllipse(
    xDist: number,
    yDist: number,
    minorRadius: number,
    sweep = false
  ): this {
    const [x0, y0] = this.pointer;
    return this.halfEllipseTo([x0 + xDist, y0 + yDist], minorRadius, sweep);
  }

  bezierCurveTo(end: Point2D, controlPoints: Point2D | Point2D[]): this {
    let cp: Point2D[];
    if (controlPoints.length === 2 && !Array.isArray(controlPoints[0])) {
      cp = [controlPoints as Point2D];
    } else {
      cp = controlPoints as Point2D[];
    }

    this.saveCurve(
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
    const { endTangent, startTangent, startFactor, endFactor } =
      defaultsSplineConfig(config);

    const previousCurve = this.pendingCurves.length
      ? this.pendingCurves[this.pendingCurves.length - 1]
      : null;

    const defaultDistance = distance2d(this.pointer, end) * 0.25;

    let startPoleDirection: Point2D;
    if (startTangent) {
      startPoleDirection = startTangent;
    } else if (!previousCurve) {
      startPoleDirection = [1, 0];
    } else {
      startPoleDirection = this._convertFromUV(previousCurve.tangentAt(1));
    }

    startPoleDirection = normalize2d(startPoleDirection);
    const startControl: Point2D = [
      this.pointer[0] + startPoleDirection[0] * startFactor * defaultDistance,
      this.pointer[1] + startPoleDirection[1] * startFactor * defaultDistance,
    ];

    let endPoleDirection: Point2D;
    if (endTangent === "symmetric") {
      endPoleDirection = [-startPoleDirection[0], -startPoleDirection[1]];
    } else {
      endPoleDirection = endTangent;
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

  /**
   * Changes the corner between the previous and next segments.
   */
  customCorner(radius: number, mode: "fillet" | "chamfer" = "fillet") {
    if (!this.pendingCurves.length)
      throw new Error("You need a curve defined to fillet the angle");

    this._nextCorner = { mode, radius };
    return this;
  }

  protected _customCornerLastWithFirst(
    radius: number,
    mode: "fillet" | "chamfer" = "fillet"
  ) {
    if (!radius) return;

    const previousCurve = this.pendingCurves.pop();
    const curve = this.pendingCurves.shift();

    if (!previousCurve || !curve)
      throw new Error("Not enough curves to close and fillet");

    const makeCorner = mode === "chamfer" ? chamferCurves : filletCurves;

    this.pendingCurves.push(...makeCorner(previousCurve, curve, radius));
  }

  protected _closeSketch(): void {
    if (!samePoint(this.pointer, this.firstPoint)) {
      this.lineTo(this.firstPoint);
    }
  }

  protected _closeWithMirror() {
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
      (c) =>
        new Curve2D(c.innerCurve.Mirrored_2(mirrorAxis) as Handle_Geom2d_Curve)
    );
    mirroredCurves.reverse();
    mirroredCurves.map((c) => c.reverse());
    this.pendingCurves.push(...mirroredCurves);
    this.pointer = this.firstPoint;
  }
}

/**
 * The FaceSketcher allows you to sketch on a face that is not planar, for
 * instance the sides of a cylinder.
 *
 * The coordinates passed to the methods corresponds to normalised distances on
 * this surface, between 0 and 1 in both direction.
 *
 * Note that if you are drawing on a closed surface (typically a revolution
 * surface or a cylinder), the first parameters represents the angle and can be
 * smaller than 0 or bigger than 1.
 *
 * @category Sketching
 */
export default class FaceSketcher
  extends BaseSketcher2d
  implements GenericSketcher<Sketch>
{
  protected face: Face;
  protected _bounds: UVBounds;

  constructor(face: Face, origin: Point2D = [0, 0]) {
    super(origin);
    this.face = face.clone();
    this._bounds = face.UVBounds;
  }

  protected _convertToUV([x, y]: Point2D): Point2D {
    const { uMin, uMax, vMin, vMax } = this._bounds;
    return [uMin + x * (uMax - uMin), vMin + y * (vMax - vMin)];
  }

  protected _convertFromUV([u, v]: Point2D): Point2D {
    const { uMin, uMax, vMin, vMax } = this._bounds;
    return [(u - uMin) / (uMax - uMin), (v - vMin) / (vMax - vMin)];
  }

  _adaptSurface(): Handle_Geom_Surface {
    const oc = getOC();
    // CHECK THIS: return new oc.BRep_Tool.Surface_2(this.face.wrapped)
    return oc.BRep_Tool.Surface_2(this.face.wrapped);
  }

  /**
   * @ignore
   */
  protected buildWire(): Wire {
    const [r, gc] = localGC();
    const oc = getOC();

    const geomSurf = r(this._adaptSurface());

    const edges = this.pendingCurves.map((curve) => {
      return r(
        new Edge(
          r(new oc.BRepBuilderAPI_MakeEdge_30(curve.wrapped, geomSurf)).Edge()
        )
      );
    });
    const wire = assembleWire(edges);
    oc.BRepLib.BuildCurves3d_2(wire.wrapped);

    gc();
    return wire;
  }

  done(): Sketch {
    const [r, gc] = localGC();

    const wire = this.buildWire();
    const sketch = new Sketch(wire);
    if (wire.isClosed) {
      const face = r(sketch.clone().face());
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

  close(): Sketch {
    this._closeSketch();
    return this.done();
  }

  closeWithMirror(): Sketch {
    this._closeWithMirror();
    return this.close();
  }

  /**
   * Stop drawing, make sure the sketch is closed (by adding a straight line to
   * from the last point to the first), add a fillet between the last and the
   * first segments and returns the sketch.
   */
  closeWithCustomCorner(
    radius: number,
    mode: "fillet" | "chamfer" = "fillet"
  ): Sketch {
    this._closeSketch();
    this._customCornerLastWithFirst(radius, mode);

    return this.done();
  }
}

export class BlueprintSketcher
  extends BaseSketcher2d
  implements GenericSketcher<Blueprint>
{
  constructor(origin: Point2D = [0, 0]) {
    super();
    this.pointer = origin;
    this.firstPoint = origin;

    this.pendingCurves = [];
  }

  done(): Blueprint {
    return new Blueprint(this.pendingCurves);
  }

  close(): Blueprint {
    this._closeSketch();
    return this.done();
  }

  closeWithMirror(): Blueprint {
    this._closeWithMirror();
    return this.close();
  }

  /**
   * Stop drawing, make sure the sketch is closed (by adding a straight line to
   * from the last point to the first), add a fillet between the last and the
   * first segments and returns the sketch.
   */

  closeWithCustomCorner(
    radius: number,
    mode: "fillet" | "chamfer" = "fillet"
  ): Blueprint {
    this._closeSketch();
    this._customCornerLastWithFirst(radius, mode);

    return this.done();
  }
}
