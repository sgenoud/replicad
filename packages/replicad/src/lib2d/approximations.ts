import { Geom2dAdaptor_Curve } from "replicad-opencascadejs";
import { findCurveType } from "../definitionMaps";
import { getOC } from "../oclib";
import { GCWithScope } from "../register";
import { Curve2D } from "./Curve2D";

export const approximateAsBSpline = (
  adaptor: Geom2dAdaptor_Curve,
  tolerance = 1e-5
): Curve2D => {
  const oc = getOC();
  const r = GCWithScope();

  const convert = r(
    new oc.Geom2dConvert_ApproxCurve_2(
      adaptor.ShallowCopy(),
      tolerance,
      oc.GeomAbs_Shape.GeomAbs_C0 as any,
      30,
      3
    )
  );
  return new Curve2D(convert.Curve());
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
