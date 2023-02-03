import {
  Geom2dAdaptor_Curve,
  Geom2d_Curve,
  Handle_Geom2d_Curve,
} from "replicad-opencascadejs";

import { CurveType, findCurveType } from "../definitionMaps";
import precisionRound from "../utils/precisionRound";
import { getOC } from "../oclib.js";
import { GCWithScope, localGC, WrappingObj } from "../register.js";
import zip from "../utils/zip.js";

import { BoundingBox2d } from "./BoundingBox2d.js";
import { isPoint2D, Point2D } from "./definitions.js";
import { pnt } from "./ocWrapper.js";
import { reprPnt } from "./utils.js";
import { distance2d, samePoint } from "./vectorOperations.js";

export class Curve2D extends WrappingObj<Handle_Geom2d_Curve> {
  _boundingBox: null | BoundingBox2d;
  constructor(handle: Handle_Geom2d_Curve) {
    const oc = getOC();
    const inner = handle.get();

    super(new oc.Handle_Geom2d_Curve_2(inner));

    this._boundingBox = null;
  }

  get boundingBox() {
    if (this._boundingBox) return this._boundingBox;
    const oc = getOC();
    const boundBox = new oc.Bnd_Box2d();

    oc.BndLib_Add2dCurve.Add_3(this.wrapped, 1e-6, boundBox);

    this._boundingBox = new BoundingBox2d(boundBox);
    return this._boundingBox;
  }

  get repr() {
    return `${this.geomType} ${reprPnt(this.firstPoint)} - ${reprPnt(
      this.lastPoint
    )}`;
  }

  get innerCurve(): Geom2d_Curve {
    return this.wrapped.get();
  }

  value(parameter: number): Point2D {
    const pnt = this.innerCurve.Value(parameter);
    const vec: Point2D = [pnt.X(), pnt.Y()];
    pnt.delete();
    return vec;
  }

  get firstPoint(): Point2D {
    return this.value(this.firstParameter);
  }

  get lastPoint(): Point2D {
    return this.value(this.lastParameter);
  }

  get firstParameter(): number {
    return this.innerCurve.FirstParameter();
  }

  get lastParameter(): number {
    return this.innerCurve.LastParameter();
  }

  adaptor(): Geom2dAdaptor_Curve {
    const oc = getOC();
    return new oc.Geom2dAdaptor_Curve_2(this.wrapped);
  }

  get geomType(): CurveType {
    const adaptor = this.adaptor();
    const curveType = findCurveType(adaptor.GetType());
    adaptor.delete();
    return curveType;
  }

  clone(): Curve2D {
    return new Curve2D(this.innerCurve.Copy() as Handle_Geom2d_Curve);
  }

  reverse(): void {
    this.innerCurve.Reverse();
  }

  private distanceFromPoint(point: Point2D): number {
    const oc = getOC();
    const r = GCWithScope();

    const projector = r(
      new oc.Geom2dAPI_ProjectPointOnCurve_2(r(pnt(point)), this.wrapped)
    );

    let curveToPoint = Infinity;

    try {
      curveToPoint = projector.LowerDistance();
    } catch (e) {
      curveToPoint = Infinity;
    }

    return Math.min(
      curveToPoint,
      distance2d(point, this.firstPoint),
      distance2d(point, this.lastPoint)
    );
  }

  private distanceFromCurve(curve: Curve2D): number {
    const oc = getOC();
    const r = GCWithScope();

    let curveDistance = Infinity;
    const projector = r(
      new oc.Geom2dAPI_ExtremaCurveCurve(
        this.wrapped,
        curve.wrapped,
        this.firstParameter,
        this.lastParameter,
        curve.firstParameter,
        curve.lastParameter
      )
    );

    try {
      curveDistance = projector.LowerDistance();
    } catch (e) {
      curveDistance = Infinity;
    }

    // We need to take the shorter distance between the curves and the extremities
    return Math.min(
      curveDistance,
      this.distanceFromPoint(curve.firstPoint),
      this.distanceFromPoint(curve.lastPoint),
      curve.distanceFromPoint(this.firstPoint),
      curve.distanceFromPoint(this.lastPoint)
    );
  }

  distanceFrom(element: Curve2D | Point2D): number {
    if (isPoint2D(element)) {
      return this.distanceFromPoint(element);
    }

    return this.distanceFromCurve(element);
  }

  isOnCurve(point: Point2D): boolean {
    return this.distanceFromPoint(point) < 1e-9;
  }

  parameter(point: Point2D, precision = 1e-9): number {
    const oc = getOC();
    const r = GCWithScope();

    let lowerDistance;
    let lowerDistanceParameter;
    try {
      const projector = r(
        new oc.Geom2dAPI_ProjectPointOnCurve_2(r(pnt(point)), this.wrapped)
      );
      lowerDistance = projector.LowerDistance();
      lowerDistanceParameter = projector.LowerDistanceParameter();
    } catch (e) {
      // Perhaps it failed because it is on an extremity
      if (samePoint(point, this.firstPoint, precision))
        return this.firstParameter;
      if (samePoint(point, this.lastPoint, precision))
        return this.lastParameter;

      throw new Error("Failed to find parameter");
    }

    if (lowerDistance > precision) {
      throw new Error(
        `Point ${reprPnt(point)} not on curve ${
          this.repr
        }, ${lowerDistance.toFixed(9)}`
      );
    }
    return lowerDistanceParameter;
  }

  tangentAt(index: number | Point2D): Point2D {
    const oc = getOC();
    const [r, gc] = localGC();

    let param;

    if (Array.isArray(index)) {
      param = this.parameter(index);
    } else {
      const paramLength =
        this.innerCurve.LastParameter() - this.innerCurve.FirstParameter();
      param = paramLength * index + this.innerCurve.FirstParameter();
    }

    const point = r(new oc.gp_Pnt2d_1());
    const dir = r(new oc.gp_Vec2d_1());

    this.innerCurve.D1(param, point, dir);

    const tgtVec = [dir.X(), dir.Y()] as Point2D;
    gc();

    return tgtVec;
  }

  splitAt(points: Point2D[] | number[], precision = 1e-9): Curve2D[] {
    const oc = getOC();
    const r = GCWithScope();

    let parameters = points.map((point: Point2D | number) => {
      if (isPoint2D(point)) return this.parameter(point, precision);
      return point;
    });

    // We only split on each point once
    parameters = Array.from(
      new Map(
        parameters.map((p) => [precisionRound(p, -Math.log10(precision)), p])
      ).values()
    ).sort((a, b) => a - b);
    const firstParam = this.firstParameter;
    const lastParam = this.lastParameter;

    if (firstParam > lastParam) {
      parameters.reverse();
    }

    // We do not split again on the start and end
    if (Math.abs(parameters[0] - firstParam) < precision * 100)
      parameters = parameters.slice(1);
    if (!parameters.length) return [this];

    if (
      Math.abs(parameters[parameters.length - 1] - lastParam) <
      precision * 100
    )
      parameters = parameters.slice(0, -1);
    if (!parameters.length) return [this];

    return zip([
      [firstParam, ...parameters],
      [...parameters, lastParam],
    ]).map(([first, last]) => {
      try {
        if (this.geomType === "BEZIER_CURVE") {
          const curveCopy = new oc.Geom2d_BezierCurve_1(
            r(this.adaptor()).Bezier().get().Poles_2()
          );
          curveCopy.Segment(first, last);
          return new Curve2D(new oc.Handle_Geom2d_Curve_2(curveCopy));
        }
        if (this.geomType === "BSPLINE_CURVE") {
          const adapted = r(this.adaptor()).BSpline().get();

          const curveCopy = new oc.Geom2d_BSplineCurve_1(
            adapted.Poles_2(),
            adapted.Knots_2(),
            adapted.Multiplicities_2(),
            adapted.Degree(),
            adapted.IsPeriodic()
          );
          curveCopy.Segment(first, last, precision);
          return new Curve2D(new oc.Handle_Geom2d_Curve_2(curveCopy));
        }

        const trimmed = new oc.Geom2d_TrimmedCurve(
          this.wrapped,
          first,
          last,
          true,
          true
        );
        return new Curve2D(new oc.Handle_Geom2d_Curve_2(trimmed));
      } catch (e) {
        throw new Error("Failed to split the curve");
      }
    });
  }
}
