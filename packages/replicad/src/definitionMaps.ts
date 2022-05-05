import { getOC } from "./oclib.js";

export type CurveType =
  | "LINE"
  | "CIRCLE"
  | "ELLIPSE"
  | "HYPERBOLA"
  | "PARABOLA"
  | "BEZIER_CURVE"
  | "BSPLINE_CURVE"
  | "OFFSET_CURVE"
  | "OTHER_CURVE";

let CURVE_TYPES_MAP: Map<any, CurveType> | null = null;

const getCurveTypesMap = (refresh?: boolean): Map<any, CurveType> => {
  if (CURVE_TYPES_MAP && !refresh) return CURVE_TYPES_MAP;

  const oc = getOC();
  const ga = oc.GeomAbs_CurveType;

  CURVE_TYPES_MAP = new Map([
    [ga.GeomAbs_Line, "LINE"],
    [ga.GeomAbs_Circle, "CIRCLE"],
    [ga.GeomAbs_Ellipse, "ELLIPSE"],
    [ga.GeomAbs_Hyperbola, "HYPERBOLA"],
    [ga.GeomAbs_Parabola, "PARABOLA"],
    [ga.GeomAbs_BezierCurve, "BEZIER_CURVE"],
    [ga.GeomAbs_BSplineCurve, "BSPLINE_CURVE"],
    [ga.GeomAbs_OffsetCurve, "OFFSET_CURVE"],
    [ga.GeomAbs_OtherCurve, "OTHER_CURVE"],
  ]);
  return CURVE_TYPES_MAP;
};

export const findCurveType = (type: any): CurveType => {
  let shapeType = getCurveTypesMap().get(type);
  if (!shapeType) shapeType = getCurveTypesMap(true).get(type);
  if (!shapeType) throw new Error("unknown type");
  return shapeType;
};
