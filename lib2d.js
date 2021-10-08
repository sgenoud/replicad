import { localGC } from "./register.js";
import { getOC } from "./oclib.js";

export const pnt = ([x, y]) => {
  const oc = getOC();
  return new oc.gp_Pnt2d_3(x, y);
};

export const direction2d = ([x, y]) => {
  const oc = getOC();
  return new oc.gp_Dir2d_4(x, y);
};

export const vec = ([x, y]) => {
  const oc = getOC();
  return new oc.gp_Vec2d_4(x, y);
};

export const axis2d = (point, direction) => {
  const oc = getOC();
  const [r, gc] = localGC();
  const axis = new oc.gp_Ax2d_2(r(pnt(point)), r(direction2d(direction)));
  gc();
  return axis;
};

export const rotate2d = (point, angle, center = [0, 0]) => {
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

export const polarToCartesian = (r, theta) => {
  const x = Math.cos(theta) * r;
  const y = Math.sin(theta) * r;
  return [x, y];
};

export const cartesiantToPolar = ([x, y]) => {
  const r = distance2d([x, y]);
  const theta = Math.atan(y / x);

  return [r, theta];
};

export const tangentAt = (curve, index) => {
  const oc = getOC();
  const [r, gc] = localGC();

  const paramLength = curve.LastParameter() - curve.FirstParameter();
  const param = paramLength * index + curve.FirstParameter();

  const point = r(new oc.gp_Pnt2d_1());
  const dir = r(new oc.gp_Vec2d_1());

  curve.D1(param, point, dir);

  const tgtVec = [dir.X(), dir.Y()];
  gc();

  return tgtVec;
};

export const samePoint = ([x0, y0], [x1, y1]) => {
  return Math.abs(x0 - x1) <= 1e-6 && Math.abs(y0 - y1) <= 1e-6;
};

export const distance2d = ([x0, y0], [x1, y1] = [0, 0]) => {
  return Math.sqrt((x0 - x1) ** 2 + (y0 - y1) ** 2);
};

export const angle2d = ([x0, y0], [x1, y1] = [0, 0]) => {
  return Math.atan((y1 - y0) / (x1 - x0));
};

export const normalize2d = ([x0, y0]) => {
  const l = distance2d([x0, y0]);
  return [x0 / l, y0 / l];
};

export const make2dSegmentCurve = (startPoint, endPoint) => {
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

export const make2dThreePointArc = (startPoint, midPoint, endPoint) => {
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

export const make2dTangentArc = (startPoint, tangent, endPoint) => {
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
  majorRadius,
  minorRadius,
  startAngle,
  endAngle,
  center = [0, 0],
  xDir
) => {
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

export const make2dBezierCurve = (startPoint, controls, endPoint) => {
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
