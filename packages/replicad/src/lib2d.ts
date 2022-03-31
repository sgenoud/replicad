import { localGC, WrappingObj } from "./register.js";
import { getOC } from "./oclib.js";
import {
  Bnd_Box2d,
  gp_Pnt2d,
  gp_Dir2d,
  gp_Vec2d,
  gp_Ax2d,
  Geom2d_Curve,
} from "replicad-opencascadejs";

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
    const [[ymin], [, ymax]] = this.bounds;
    return Math.abs(ymax - ymin);
  }

  outsidePoint(paddingPercent = 1): Point2D {
    const [min, max] = this.bounds;
    const width = max[0] - min[0];
    const height = max[1] - min[1];

    return [
      max[0] + (width / 100) * paddingPercent,
      max[1] + (height / 100) * paddingPercent,
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
  const theta = Math.atan(y / x);

  return [r, theta];
};

export const tangentAt = (curve: Geom2d_Curve, index: number): Point2D => {
  const oc = getOC();
  const [r, gc] = localGC();

  const paramLength = curve.LastParameter() - curve.FirstParameter();
  const param = paramLength * index + curve.FirstParameter();

  const point = r(new oc.gp_Pnt2d_1());
  const dir = r(new oc.gp_Vec2d_1());

  curve.D1(param, point, dir);

  const tgtVec = [dir.X(), dir.Y()] as Point2D;
  gc();

  return tgtVec;
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
  return Math.atan((y1 - y0) / (x1 - x0));
};

export const normalize2d = ([x0, y0]: Point2D): Point2D => {
  const l = distance2d([x0, y0]);
  return [x0 / l, y0 / l];
};

export const make2dSegmentCurve = (
  startPoint: Point2D,
  endPoint: Point2D
): Geom2d_Curve => {
  const oc = getOC();
  const [r, gc] = localGC();

  const segment = r(
    new oc.GCE2d_MakeSegment_1(r(pnt(startPoint)), r(pnt(endPoint)))
  )
    .Value()
    .get();

  gc();

  return segment;
};

export const make2dThreePointArc = (
  startPoint: Point2D,
  midPoint: Point2D,
  endPoint: Point2D
): Geom2d_Curve => {
  const oc = getOC();
  const [r, gc] = localGC();

  const segment = r(
    new oc.GCE2d_MakeArcOfCircle_4(
      r(pnt(startPoint)),
      r(pnt(midPoint)),
      r(pnt(endPoint))
    )
  )
    .Value()
    .get();
  gc();

  return segment;
};

export const make2dTangentArc = (
  startPoint: Point2D,
  tangent: Point2D,
  endPoint: Point2D
): Geom2d_Curve => {
  const oc = getOC();
  const [r, gc] = localGC();

  const segment = r(
    new oc.GCE2d_MakeArcOfCircle_5(
      r(pnt(startPoint)),
      r(vec(tangent)),
      r(pnt(endPoint))
    )
  )
    .Value()
    .get();
  gc();

  return segment;
};

export const make2dEllipseArc = (
  majorRadius: number,
  minorRadius: number,
  startAngle: number,
  endAngle: number,
  center: Point2D = [0, 0],
  xDir: Point2D
): Geom2d_Curve => {
  const oc = getOC();
  const [r, gc] = localGC();
  const ellipse = r(
    new oc.gp_Elips2d_2(r(axis2d(center, xDir)), majorRadius, minorRadius, true)
  );

  const segment = r(
    new oc.GCE2d_MakeArcOfEllipse_1(ellipse, startAngle, endAngle, true)
  )
    .Value()
    .get();
  gc();

  return segment;
};

export const make2dBezierCurve = (
  startPoint: Point2D,
  controls: Point2D[],
  endPoint: Point2D
): Geom2d_Curve => {
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

  return bezCurve;
};
