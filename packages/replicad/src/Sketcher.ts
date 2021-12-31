import { Plane, PlaneName, Point, Vector } from "./geom";
import { makePlane } from "./geomHelpers";
import { localGC, RegisteredObj } from "./register";
import { DEG2RAD, RAD2DEG } from "./constants";
import { distance2d, angle2d, polarToCartesian, Point2D } from "./lib2d";
import {
  makeLine,
  makeThreePointArc,
  makeBezierCurve,
  makeTangentArc,
  makeEllipseArc,
  assembleWire,
} from "./shapeHelpers.js";

import {
  convertSvgEllipseParams,
  SplineConfig,
  defaultsSplineConfig,
  GenericSketcher,
} from "./sketcherlib.js";
import { CurveLike, Edge, Wire } from "./shapes.js";
import { Handle_Geom_BezierCurve } from "replicad-opencascadejs";
import Sketch from "./sketches/Sketch.js";

/**
 * The FaceSketcher allows you to sketch on a plane.
 *
 * @category Sketching
 */
export default class Sketcher
  extends RegisteredObj
  implements GenericSketcher<Sketch>
{
  protected plane: Plane;
  protected pointer: Vector;
  protected firstPoint: Vector;
  protected pendingEdges: Edge[];
  protected _mirrorWire: boolean;

  /**
   * The sketcher can be defined by a plane, or a simple plane definition,
   * with either a point of origin, or the position on the normal axis from
   * the coordinates origin
   */
  constructor(plane: Plane);
  constructor(plane?: PlaneName, origin?: Point | number);
  constructor(plane?: Plane | PlaneName, origin?: Point) {
    super();

    this.plane =
      plane instanceof Plane ? makePlane(plane) : makePlane(plane, origin);

    this.pointer = new Vector(this.plane.origin);
    this.firstPoint = new Vector(this.plane.origin);

    this.pendingEdges = [];
    this._mirrorWire = false;
  }

  delete(): void {
    this.plane.delete();
    super.delete();
  }

  protected _updatePointer(newPointer: Vector): void {
    this.pointer.delete();
    this.pointer = newPointer;
  }

  movePointerTo([x, y]: Point2D): this {
    if (this.pendingEdges.length)
      throw new Error(
        "You can only move the pointer if there is no edge defined"
      );
    this._updatePointer(this.plane.toWorldCoords([x, y]));
    this.firstPoint.delete();
    this.firstPoint = new Vector(this.pointer);
    return this;
  }

  lineTo([x, y]: Point2D): this {
    const endPoint = this.plane.toWorldCoords([x, y]);
    this.pendingEdges.push(makeLine(this.pointer, endPoint));
    this._updatePointer(endPoint);
    return this;
  }

  line(xDist: number, yDist: number): this {
    const pointer = this.plane.toLocalCoords(this.pointer);
    return this.lineTo([xDist + pointer.x, yDist + pointer.y]);
  }

  vLine(distance: number): this {
    return this.line(0, distance);
  }

  hLine(distance: number): this {
    return this.line(distance, 0);
  }

  polarLine(distance: number, angle: number): this {
    const angleInRads = angle * DEG2RAD;
    const [x, y] = polarToCartesian(distance, angleInRads);
    return this.line(x, y);
  }

  polarLineTo([r, theta]: [number, number]): this {
    const angleInRads = theta * DEG2RAD;
    const point = polarToCartesian(r, angleInRads);
    return this.lineTo(point);
  }

  tangentLine(distance: number): this {
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

  threePointsArcTo(end: Point2D, innerPoint: Point2D): this {
    const gpoint1 = this.plane.toWorldCoords(innerPoint);
    const gpoint2 = this.plane.toWorldCoords(end);

    this.pendingEdges.push(makeThreePointArc(this.pointer, gpoint1, gpoint2));

    this._updatePointer(gpoint2);
    return this;
  }

  threePointsArc(
    xDist: number,
    yDist: number,
    viaXDist: number,
    viaYDist: number
  ): this {
    const pointer = this.plane.toLocalCoords(this.pointer);
    return this.threePointsArcTo(
      [pointer.x + xDist, pointer.y + yDist],
      [pointer.x + viaXDist, pointer.y + viaYDist]
    );
  }

  tangentArcTo(end: Point2D): this {
    const endPoint = this.plane.toWorldCoords(end);
    const previousEdge = this.pendingEdges[this.pendingEdges.length - 1];

    this.pendingEdges.push(
      makeTangentArc(previousEdge.endPoint, previousEdge.tangentAt(1), endPoint)
    );

    this._updatePointer(endPoint);
    return this;
  }

  tangentArc(xDist: number, yDist: number): this {
    const pointer = this.plane.toLocalCoords(this.pointer);
    return this.tangentArcTo([xDist + pointer.x, yDist + pointer.y]);
  }

  sagittaArcTo(end: Point2D, sagitta: number): this {
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

  sagittaArc(xDist: number, yDist: number, sagitta: number): this {
    const pointer = this.plane.toLocalCoords(this.pointer);
    return this.sagittaArcTo([xDist + pointer.x, yDist + pointer.y], sagitta);
  }

  vSagittaArc(distance: number, sagitta: number): this {
    return this.sagittaArc(0, distance, sagitta);
  }

  hSagittaArc(distance: number, sagitta: number): this {
    return this.sagittaArc(distance, 0, sagitta);
  }

  ellipseTo(
    end: Point2D,
    horizontalRadius: number,
    verticalRadius: number,
    rotation = 0,
    longAxis = false,
    sweep = false
  ): this {
    const [r, gc] = localGC();
    const start = this.plane.toLocalCoords(this.pointer);

    let rotationAngle = rotation;
    let majorRadius = horizontalRadius;
    let minorRadius = verticalRadius;

    if (horizontalRadius < verticalRadius) {
      rotationAngle = rotation + 90;
      majorRadius = verticalRadius;
      minorRadius = horizontalRadius;
    }

    const { cx, cy, startAngle, endAngle, clockwise } = convertSvgEllipseParams(
      [start.x, start.y],
      end,
      majorRadius,
      minorRadius,
      rotationAngle * DEG2RAD,
      longAxis,
      sweep
    );

    const xDir = r(
      new Vector(this.plane.xDir).rotate(
        rotationAngle,
        this.plane.origin,
        this.plane.zDir
      )
    );

    const arc = makeEllipseArc(
      majorRadius,
      minorRadius,
      clockwise ? startAngle : endAngle,
      clockwise ? endAngle : startAngle,
      r(this.plane.toWorldCoords([cx, cy])),
      this.plane.zDir,
      xDir
    );

    this.pendingEdges.push(arc);
    this._updatePointer(this.plane.toWorldCoords(end));
    gc();
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
    const pointer = this.plane.toLocalCoords(this.pointer);
    return this.ellipseTo(
      [xDist + pointer.x, yDist + pointer.y],
      horizontalRadius,
      verticalRadius,
      rotation,
      longAxis,
      sweep
    );
  }

  halfEllipseTo(end: Point2D, verticalRadius: number, sweep = false): this {
    const pointer = this.plane.toLocalCoords(this.pointer);
    const start: Point2D = [pointer.x, pointer.y];
    pointer.delete();

    const angle = angle2d(end, start);
    const distance = distance2d(end, start);

    return this.ellipseTo(
      end,
      distance / 2,
      verticalRadius,
      angle * RAD2DEG,
      false,
      sweep
    );
  }

  halfEllipse(
    xDist: number,
    yDist: number,
    verticalRadius: number,
    sweep = false
  ): this {
    const pointer = this.plane.toLocalCoords(this.pointer);
    return this.halfEllipseTo(
      [xDist + pointer.x, yDist + pointer.y],
      verticalRadius,
      sweep
    );
  }

  bezierCurveTo(end: Point2D, controlPoints: Point2D | Point2D[]): this {
    let cp: Point2D[];
    if (controlPoints.length === 2 && !Array.isArray(controlPoints[0])) {
      cp = [controlPoints as Point2D];
    } else {
      cp = controlPoints as Point2D[];
    }

    const inWorldPoints = cp.map((p) => this.plane.toWorldCoords(p));
    const endPoint = this.plane.toWorldCoords(end);

    this.pendingEdges.push(
      makeBezierCurve([this.pointer, ...inWorldPoints, endPoint])
    );

    this._updatePointer(endPoint);
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
    const [r, gc] = localGC();
    const { endTangent, startTangent, startFactor, endFactor } =
      defaultsSplineConfig(config);

    const endPoint = this.plane.toWorldCoords(end);
    const previousEdge = this.pendingEdges.length
      ? this.pendingEdges[this.pendingEdges.length - 1]
      : null;

    const defaultDistance = r(endPoint.sub(this.pointer)).Length * 0.25;

    let startPoleDirection: Point;
    if (startTangent) {
      startPoleDirection = this.plane.toWorldCoords(startTangent);
    } else if (!previousEdge) {
      startPoleDirection = this.plane.toWorldCoords([1, 0]);
    } else if (previousEdge.geomType === "BEZIER_CURVE") {
      const rawCurve = (
        r(previousEdge.curve).wrapped as CurveLike & {
          Bezier: () => Handle_Geom_BezierCurve;
        }
      )
        .Bezier()
        .get();
      const previousPole = r(new Vector(rawCurve.Pole(rawCurve.NbPoles() - 1)));

      startPoleDirection = r(this.pointer.sub(previousPole));
    } else {
      startPoleDirection = r(previousEdge.tangentAt(1));
    }

    const poleDistance = r(
      startPoleDirection.normalized().multiply(startFactor * defaultDistance)
    );
    const startControl = r(this.pointer.add(poleDistance));

    let endPoleDirection: Point;
    if (endTangent === "symmetric") {
      endPoleDirection = r(startPoleDirection.multiply(-1));
    } else {
      endPoleDirection = r(this.plane.toWorldCoords(endTangent));
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

  smoothSpline(xDist: number, yDist: number, splineConfig: SplineConfig): this {
    const pointer = this.plane.toLocalCoords(this.pointer);
    return this.smoothSplineTo(
      [xDist + pointer.x, yDist + pointer.y],
      splineConfig
    );
  }

  protected _mirrorWireOnStartEnd(wire: Wire): Wire {
    const startToEndVector = this.pointer.sub(this.firstPoint).normalize();
    const normal = startToEndVector.cross(this.plane.zDir);

    const mirroredWire = wire.clone().mirror(normal, this.pointer);

    const combinedWire = assembleWire([wire, mirroredWire]);
    mirroredWire.delete();

    return combinedWire;
  }

  protected buildWire(): Wire {
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

  protected _closeSketch(): void {
    if (!this.pointer.equals(this.firstPoint) && !this._mirrorWire) {
      const endpoint = this.plane.toLocalCoords(this.firstPoint);
      this.lineTo([endpoint.x, endpoint.y]);
    }
  }

  done(): Sketch {
    const sketch = new Sketch(this.buildWire(), {
      defaultOrigin: this.plane.origin,
      defaultDirection: this.plane.zDir,
    });
    this.delete();
    return sketch;
  }

  close(): Sketch {
    this._closeSketch();
    return this.done();
  }

  closeWithMirror(): Sketch {
    this._mirrorWire = true;
    return this.close();
  }
}
