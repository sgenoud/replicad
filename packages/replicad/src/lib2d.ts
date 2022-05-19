import { localGC, WrappingObj, GCWithScope } from "./register.js";
import { getOC } from "./oclib.js";
import {
  Bnd_Box2d,
  gp_Pnt2d,
  gp_Dir2d,
  gp_Vec2d,
  gp_Ax2d,
  Geom2d_Curve,
  Handle_Geom2d_Curve,
  Geom2dAPI_InterCurveCurve,
  Geom2dAdaptor_Curve,
  Geom2dAPI_PointsToBSpline,
} from "replicad-opencascadejs";

import { CurveType, findCurveType } from "./definitionMaps";
import { RAD2DEG } from "./constants";
import round5 from "./utils/round5";

const round = (v: number): number => Math.round(v * 100) / 100;
const reprPnt = ([x, y]: Point2D): string => {
  return `(${round(x)},${round(y)})`;
};

export class BoundingBox2d extends WrappingObj<Bnd_Box2d> {
  constructor(wrapped?: Bnd_Box2d) {
    const oc = getOC();
    let boundBox = wrapped;
    if (!boundBox) {
      boundBox = new oc.Bnd_Box2d();
    }
    super(boundBox);
  }

  get repr(): string {
    const [min, max] = this.bounds;
    return `${reprPnt(min)} - ${reprPnt(max)}`;
  }

  get bounds(): [Point2D, Point2D] {
    const xMin = { current: 0 };
    const yMin = { current: 0 };
    const xMax = { current: 0 };
    const yMax = { current: 0 };

    this.wrapped.Get(xMin, yMin, xMax, yMax);
    return [
      [xMin.current, yMin.current],
      [xMax.current, yMax.current],
    ];
  }

  get center(): Point2D {
    const [[xmin, ymin], [xmax, ymax]] = this.bounds;
    return [xmin + (xmax - xmin) / 2, ymin + (ymax - ymin) / 2];
  }

  get width(): number {
    const [[xmin], [xmax]] = this.bounds;
    return Math.abs(xmax - xmin);
  }

  get height(): number {
    const [[, ymin], [, ymax]] = this.bounds;
    return Math.abs(ymax - ymin);
  }

  outsidePoint(paddingPercent = 1): Point2D {
    const [min, max] = this.bounds;
    const width = max[0] - min[0];
    const height = max[1] - min[1];

    return [
      max[0] + (width / 100) * paddingPercent,
      max[1] + (height / 100) * paddingPercent * 0.9,
    ];
  }

  add(other: BoundingBox2d) {
    this.wrapped.Add_1(other.wrapped);
  }

  isOut(other: BoundingBox2d): boolean {
    return this.wrapped.IsOut_2(other.wrapped);
  }
}

export type Point2D = [number, number];

export const pnt = ([x, y]: Point2D): gp_Pnt2d => {
  const oc = getOC();
  return new oc.gp_Pnt2d_3(x, y);
};

export const direction2d = ([x, y]: Point2D): gp_Dir2d => {
  const oc = getOC();
  return new oc.gp_Dir2d_4(x, y);
};

export const vec = ([x, y]: Point2D): gp_Vec2d => {
  const oc = getOC();
  return new oc.gp_Vec2d_4(x, y);
};

export const axis2d = (point: Point2D, direction: Point2D): gp_Ax2d => {
  const oc = getOC();
  const [r, gc] = localGC();
  const axis = new oc.gp_Ax2d_2(r(pnt(point)), r(direction2d(direction)));
  gc();
  return axis;
};

export const rotate2d = (
  point: Point2D,
  angle: number,
  center: Point2D = [0, 0]
): Point2D => {
  const [px0, py0] = point;
  const [cx, cy] = center;

  const px = px0 - cx;
  const py = py0 - cy;

  const sinA = Math.sin(angle);
  const cosA = Math.cos(angle);

  const xnew = px * cosA - py * sinA;
  const ynew = px * sinA + py * cosA;

  return [xnew + cx, ynew + cy];
};

export const polarToCartesian = (r: number, theta: number): Point2D => {
  const x = Math.cos(theta) * r;
  const y = Math.sin(theta) * r;
  return [x, y];
};

export const cartesiantToPolar = ([x, y]: Point2D): [number, number] => {
  const r = distance2d([x, y]);
  const theta = Math.atan2(y, x);

  return [r, theta];
};

export const samePoint = ([x0, y0]: Point2D, [x1, y1]: Point2D): boolean => {
  return Math.abs(x0 - x1) <= 1e-6 && Math.abs(y0 - y1) <= 1e-6;
};

export const distance2d = (
  [x0, y0]: Point2D,
  [x1, y1]: Point2D = [0, 0]
): number => {
  return Math.sqrt((x0 - x1) ** 2 + (y0 - y1) ** 2);
};

export const angle2d = (
  [x0, y0]: Point2D,
  [x1, y1]: Point2D = [0, 0]
): number => {
  return Math.atan2(y1 - y0, x1 - x0);
};

export const normalize2d = ([x0, y0]: Point2D): Point2D => {
  const l = distance2d([x0, y0]);
  return [x0 / l, y0 / l];
};

function zip<Type>(arrays: Array<Type[]>) {
  return arrays[0].map(function (_: any, i: number) {
    return arrays.map(function (array) {
      return array[i];
    });
  });
}

export class Curve2D extends WrappingObj<Handle_Geom2d_Curve> {
  constructor(handle: Handle_Geom2d_Curve) {
    const oc = getOC();
    const inner = handle.get();
    super(new oc.Handle_Geom2d_Curve_2(inner));
  }

  get repr() {
    return `${reprPnt(this.firstPoint)} - ${reprPnt(this.lastPoint)}`;
  }

  get innerCurve(): Geom2d_Curve {
    return this.wrapped.get();
  }

  get firstPoint(): Point2D {
    return this.value(this.firstParameter);
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
    return new Curve2D(this.wrapped);
  }

  reverse(): void {
    this.innerCurve.Reverse();
  }

  parameter(point: Point2D): number {
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
      if (samePoint(point, this.firstPoint)) return this.firstParameter;
      if (samePoint(point, this.lastPoint)) return this.lastParameter;

      throw new Error("Failed to find parameter");
    }

    if (lowerDistance > 1e-6) {
      throw new Error("Point not on curve");
    }
    return lowerDistanceParameter;
  }

  value(parameter: number): Point2D {
    const pnt = this.innerCurve.Value(parameter);
    const vec: Point2D = [pnt.X(), pnt.Y()];
    pnt.delete();
    return vec;
  }

  get lastPoint(): Point2D {
    return this.value(this.lastParameter);
  }

  tangentAt(index: number): Point2D {
    const oc = getOC();
    const [r, gc] = localGC();

    const paramLength =
      this.innerCurve.LastParameter() - this.innerCurve.FirstParameter();
    const param = paramLength * index + this.innerCurve.FirstParameter();

    const point = r(new oc.gp_Pnt2d_1());
    const dir = r(new oc.gp_Vec2d_1());

    this.innerCurve.D1(param, point, dir);

    const tgtVec = [dir.X(), dir.Y()] as Point2D;
    gc();

    return tgtVec;
  }

  splitAt(points: Point2D[]): Curve2D[] {
    const oc = getOC();
    const r = GCWithScope();

    let parameters = points.map((point) => {
      return this.parameter(point);
    });

    // We only split on each point once
    parameters = Array.from(new Set(parameters.map((p) => p.toFixed(9))))
      .map((p) => Number.parseFloat(p))
      .sort((a, b) => a - b);
    const firstParam = this.firstParameter;
    const lastParam = this.lastParameter;

    if (firstParam > lastParam) {
      parameters.reverse();
    }

    // We do not split again on the start and end
    if (Math.abs(parameters[0] - firstParam) < 1e-8)
      parameters = parameters.slice(1);
    if (Math.abs(parameters[parameters.length - 1] - lastParam) < 1e-8)
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
          const newCurve = new Curve2D(new oc.Handle_Geom2d_Curve_2(curveCopy));

          return newCurve;
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

export const make2dSegmentCurve = (
  startPoint: Point2D,
  endPoint: Point2D
): Curve2D => {
  const oc = getOC();
  const [r, gc] = localGC();

  const segment = r(
    new oc.GCE2d_MakeSegment_1(r(pnt(startPoint)), r(pnt(endPoint)))
  ).Value();

  gc();

  return new Curve2D(segment);
};

export const make2dThreePointArc = (
  startPoint: Point2D,
  midPoint: Point2D,
  endPoint: Point2D
): Curve2D => {
  const oc = getOC();
  const [r, gc] = localGC();

  const segment = r(
    new oc.GCE2d_MakeArcOfCircle_4(
      r(pnt(startPoint)),
      r(pnt(midPoint)),
      r(pnt(endPoint))
    )
  ).Value();
  gc();

  return new Curve2D(segment);
};

export const make2dTangentArc = (
  startPoint: Point2D,
  tangent: Point2D,
  endPoint: Point2D
): Curve2D => {
  const oc = getOC();
  const [r, gc] = localGC();

  const segment = r(
    new oc.GCE2d_MakeArcOfCircle_5(
      r(pnt(startPoint)),
      r(vec(tangent)),
      r(pnt(endPoint))
    )
  ).Value();
  gc();

  return new Curve2D(segment);
};

export const make2dCircle = (
  radius: number,
  center: Point2D = [0, 0]
): Curve2D => {
  const oc = getOC();
  const [r, gc] = localGC();

  const segment = r(
    new oc.GCE2d_MakeCircle_7(r(pnt(center)), radius, true)
  ).Value();
  gc();

  return new Curve2D(segment as unknown as Handle_Geom2d_Curve);
};

export const make2dEllipse = (
  majorRadius: number,
  minorRadius: number,
  xDir: Point2D = [1, 0],
  center: Point2D = [0, 0],
  direct = true
): Curve2D => {
  const oc = getOC();
  const [r, gc] = localGC();
  const ellipse = r(
    new oc.gp_Elips2d_2(
      r(axis2d(center, xDir)),
      majorRadius,
      minorRadius,
      direct
    )
  );

  const segment = r(new oc.GCE2d_MakeEllipse_1(ellipse)).Value();
  gc();

  return new Curve2D(segment as unknown as Handle_Geom2d_Curve);
};

export const make2dEllipseArc = (
  majorRadius: number,
  minorRadius: number,
  startAngle: number,
  endAngle: number,
  center: Point2D = [0, 0],
  xDir: Point2D,
  direct = true
): Curve2D => {
  const oc = getOC();
  const [r, gc] = localGC();
  const ellipse = r(
    new oc.gp_Elips2d_2(r(axis2d(center, xDir)), majorRadius, minorRadius, true)
  );

  const segment = r(
    new oc.GCE2d_MakeArcOfEllipse_1(ellipse, startAngle, endAngle, direct)
  ).Value();
  gc();

  return new Curve2D(segment);
};

export const make2dBezierCurve = (
  startPoint: Point2D,
  controls: Point2D[],
  endPoint: Point2D
): Curve2D => {
  const oc = getOC();
  const [r, gc] = localGC();

  const arrayOfPoints = r(
    new oc.TColgp_Array1OfPnt2d_2(1, controls.length + 2)
  );
  arrayOfPoints.SetValue(1, r(pnt(startPoint)));

  controls.forEach((p, i) => {
    arrayOfPoints.SetValue(i + 2, r(pnt(p)));
  });

  arrayOfPoints.SetValue(controls.length + 2, r(pnt(endPoint)));

  const bezCurve = new oc.Geom2d_BezierCurve_1(arrayOfPoints);
  gc();

  return new Curve2D(new oc.Handle_Geom2d_Curve_2(bezCurve));
};

export function make2dInerpolatedBSplineCurve(
  points: Point2D[],
  {
    tolerance = 1e-3,
    smoothing = null,
    degMax = 3,
    degMin = 1,
  }: {
    tolerance?: number;
    smoothing?: null | [number, number, number];
    degMax?: number;
    degMin?: number;
  } = {}
) {
  const r = GCWithScope();
  const oc = getOC();

  const pnts = r(new oc.TColgp_Array1OfPnt2d_2(1, points.length));

  points.forEach((point, index) => {
    pnts.SetValue(index + 1, r(pnt(point)));
  });

  let splineBuilder: Geom2dAPI_PointsToBSpline;

  if (smoothing) {
    splineBuilder = r(
      new oc.Geom2dAPI_PointsToBSpline_6(
        pnts,
        smoothing[0],
        smoothing[1],
        smoothing[2],
        degMax,
        oc.GeomAbs_Shape.GeomAbs_C2 as any,
        tolerance
      )
    );
  } else {
    splineBuilder = r(
      new oc.Geom2dAPI_PointsToBSpline_2(
        pnts,
        degMin,
        degMax,
        oc.GeomAbs_Shape.GeomAbs_C2 as any,
        tolerance
      )
    );
  }

  if (!splineBuilder.IsDone()) {
    throw new Error("B-spline approximation failed");
  }

  return new Curve2D(splineBuilder.Curve());
}

function* pointsIteration(
  intersector: Geom2dAPI_InterCurveCurve
): Generator<Point2D> {
  const nPoints = intersector.NbPoints();
  if (!nPoints) return;

  for (let i = 1; i <= nPoints; i++) {
    const point = intersector.Point(i);
    yield [point.X(), point.Y()];
  }
}

function* commonSegmentsIteration(
  intersector: Geom2dAPI_InterCurveCurve
): Generator<Curve2D> {
  const nSegments = intersector.NbSegments();
  if (!nSegments) return;

  const oc = getOC();

  for (let i = 1; i <= nSegments; i++) {
    const h1 = new oc.Handle_Geom2d_Curve_1();
    const h2 = new oc.Handle_Geom2d_Curve_1();
    intersector.Segment(i, h1, h2);
    yield new Curve2D(h1);
    h2.delete();
  }
}

export const intersectCurves = (first: Curve2D, second: Curve2D) => {
  const oc = getOC();
  const intersector = new oc.Geom2dAPI_InterCurveCurve_1();

  let intersections;
  let commonSegments;

  try {
    intersector.Init_1(first.wrapped, second.wrapped, 1e-6);

    intersections = Array.from(pointsIteration(intersector));
    commonSegments = Array.from(commonSegmentsIteration(intersector));
  } catch (e) {
    throw new Error("Intersections failed between curves");
  } finally {
    intersector.delete();
  }

  const commonSegmentsPoints = commonSegments.flatMap((c) => [
    c.firstPoint,
    c.lastPoint,
  ]);

  return { intersections, commonSegments, commonSegmentsPoints };
};

export const BSplineToBezier = (adaptor: Geom2dAdaptor_Curve): Curve2D[] => {
  if (findCurveType(adaptor.GetType()) !== "BSPLINE_CURVE")
    throw new Error("You can only convert a Bspline");

  const handle = adaptor.BSpline();

  const oc = getOC();
  const convert = new oc.Geom2dConvert_BSplineCurveToBezierCurve_1(handle);

  function* bezierCurves(): Generator<Curve2D> {
    const nArcs = convert.NbArcs();
    if (!nArcs) return;

    for (let i = 1; i <= nArcs; i++) {
      const arc = convert.Arc(i);
      yield new Curve2D(arc);
    }
  }

  const curves = Array.from(bezierCurves());
  convert.delete();
  return curves;
};

const fromPnt = (pnt: gp_Pnt2d) => `${round(pnt.X())} ${round(pnt.Y())}`;

export const adaptedCurveToPathElem = (
  adaptor: Geom2dAdaptor_Curve,
  lastPoint: Point2D
): string => {
  const oc = getOC();
  const curveType = findCurveType(adaptor.GetType());

  const [endX, endY] = lastPoint;
  const endpoint = `${round5(endX)} ${round5(endY)}`;
  if (curveType === "LINE") {
    return `L ${endpoint}`;
  }
  if (curveType === "BEZIER_CURVE") {
    const curve = adaptor.Bezier().get();
    const deg = curve.Degree();

    if (deg === 2) {
      return `Q ${fromPnt(curve.Pole(2))} ${endpoint}`;
    }

    if (deg === 3) {
      const p1 = fromPnt(curve.Pole(2));
      const p2 = fromPnt(curve.Pole(3));
      return `C ${p1} ${p2} ${endpoint}`;
    }

    console.warn(`bezier of degree ${deg} not implemented, using a line`);
    return `L ${endpoint}`;
  }
  if (curveType === "CIRCLE") {
    const curve = adaptor.Circle();
    const radius = curve.Radius();

    const p1 = adaptor.FirstParameter();
    const p2 = adaptor.LastParameter();

    const paramAngle = (p2 - p1) * RAD2DEG;

    const end =
      paramAngle !== 360
        ? endpoint
        : `${round5(endX)} ${round5(endY + 0.0001)}`;

    return `A ${radius} ${radius} 0 ${Math.abs(paramAngle) > 180 ? "1" : "0"} ${
      curve.IsDirect() ? "1" : "0"
    } ${end}`;
  }

  if (curveType === "ELLIPSE") {
    const curve = adaptor.Ellipse();
    const rx = curve.MajorRadius();
    const ry = curve.MinorRadius();

    const p1 = adaptor.FirstParameter();
    const p2 = adaptor.LastParameter();

    const paramAngle = (p2 - p1) * RAD2DEG;

    const end =
      paramAngle !== 360
        ? endpoint
        : `${round5(endX)} ${round5(endY + 0.0001)}`;

    const dir0 = new oc.gp_Dir2d_1();
    const angle = 180 - curve.XAxis().Direction().Angle(dir0) * RAD2DEG;
    dir0.delete();

    return `A ${round5(rx)} ${round5(ry)} ${round5(angle)} ${
      Math.abs(paramAngle) > 180 ? "1" : "0"
    } ${curve.IsDirect() ? "1" : "0"} ${end}`;
  }

  if (curveType === "BSPLINE_CURVE") {
    const bezierCurves = BSplineToBezier(adaptor);
    return bezierCurves
      .map((c) => adaptedCurveToPathElem(c.adaptor(), c.lastPoint))
      .join(" ");
  }
  console.warn(`${curveType} not implemented, using a line`);
  return `L ${endpoint}`;
};
