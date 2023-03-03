import { Geom2dAdaptor_Curve, gp_Pnt2d } from "replicad-opencascadejs";
import { RAD2DEG } from "../constants";
import { findCurveType } from "../definitionMaps";
import { getOC } from "../oclib";
import round2 from "../utils/round2";
import round5 from "../utils/round5";
import { approximateAsBSpline, BSplineToBezier } from "./approximations";
import { Point2D } from "./definitions";

const fromPnt = (pnt: gp_Pnt2d) => `${round2(pnt.X())} ${round2(pnt.Y())}`;

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

    if (deg === 1) {
      return `L ${endpoint}`;
    }

    if (deg === 2) {
      return `Q ${fromPnt(curve.Pole(2))} ${endpoint}`;
    }

    if (deg === 3) {
      const p1 = fromPnt(curve.Pole(2));
      const p2 = fromPnt(curve.Pole(3));
      return `C ${p1} ${p2} ${endpoint}`;
    }
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
    const deg = adaptor.BSpline().get().Degree();
    if (deg < 4) {
      const bezierCurves = BSplineToBezier(adaptor);
      return bezierCurves
        .map((c) => adaptedCurveToPathElem(c.adaptor(), c.lastPoint))
        .join(" ");
    }
  }

  const bspline = approximateAsBSpline(adaptor);
  const bezierCurves = BSplineToBezier(bspline.adaptor());
  return bezierCurves
    .map((c) => adaptedCurveToPathElem(c.adaptor(), c.lastPoint))
    .join(" ");
};
