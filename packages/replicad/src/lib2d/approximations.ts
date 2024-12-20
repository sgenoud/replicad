import { Geom2dAdaptor_Curve, GeomAbs_Shape } from "replicad-opencascadejs";
import { findCurveType } from "../definitionMaps";
import { getOC } from "../oclib";
import { GCWithScope } from "../register";
import { Curve2D } from "./Curve2D";
import { samePoint } from "./vectorOperations";

export const approximateAsBSpline = (
  adaptor: Geom2dAdaptor_Curve,
  tolerance = 1e-4,
  continuity: "C0" | "C1" | "C2" | "C3" = "C0",
  maxSegments = 200
): Curve2D => {
  const oc = getOC();
  const r = GCWithScope();

  const continuities: Record<string, GeomAbs_Shape> = {
    C0: oc.GeomAbs_Shape.GeomAbs_C0 as GeomAbs_Shape,
    C1: oc.GeomAbs_Shape.GeomAbs_C1 as GeomAbs_Shape,
    C2: oc.GeomAbs_Shape.GeomAbs_C2 as GeomAbs_Shape,
    C3: oc.GeomAbs_Shape.GeomAbs_C3 as GeomAbs_Shape,
  };

  const convert = r(
    new oc.Geom2dConvert_ApproxCurve_2(
      adaptor.ShallowCopy(),
      tolerance,
      continuities[continuity],
      maxSegments,
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

export interface ApproximationOptions {
  tolerance?: number;
  continuity?: "C0" | "C1" | "C2" | "C3";
  maxSegments?: number;
}

export function approximateAsSvgCompatibleCurve(
  curves: Curve2D[],
  options: ApproximationOptions = {
    tolerance: 1e-4,
    continuity: "C0",
    maxSegments: 300,
  }
): Curve2D[] {
  const r = GCWithScope();

  return curves.flatMap((curve) => {
    const adaptor = r(curve.adaptor());
    const curveType = findCurveType(adaptor.GetType());

    if (
      curveType === "ELLIPSE" ||
      (curveType === "CIRCLE" && samePoint(curve.firstPoint, curve.lastPoint))
    ) {
      return curve.splitAt([0.5]);
    }

    if (["LINE", "ELLIPSE", "CIRCLE"].includes(curveType)) {
      return curve;
    }

    if (curveType === "BEZIER_CURVE") {
      const b = adaptor.Bezier().get();
      const deg = b.Degree();

      if ([1, 2, 3].includes(deg)) {
        return curve;
      }
    }

    if (curveType === "BSPLINE_CURVE") {
      const c = BSplineToBezier(adaptor);
      return approximateAsSvgCompatibleCurve(c, options);
    }

    const bspline = approximateAsBSpline(
      adaptor,
      options.tolerance,
      options.continuity,
      options.maxSegments
    );
    return approximateAsSvgCompatibleCurve(
      BSplineToBezier(r(bspline.adaptor())),
      options
    );
  });
}
