import { getOC } from "../oclib";
import { GCWithScope } from "../register";
import { approximateAsBSpline } from "./approximations";
import { Curve2D } from "./Curve2D";
import { Point2D } from "./definitions";
import { selfIntersections } from "./intersections";
import { make2dSegmentCurve } from "./makeCurves";
import { add2d, normalize2d, subtract2d } from "./vectorOperations";

const offsetEndPoints = (
  firstPoint: Point2D,
  lastPoint: Point2D,
  offset: number
) => {
  const tangent = normalize2d(subtract2d(lastPoint, firstPoint));
  const normal = [tangent[1], -tangent[0]];

  const offsetVec: Point2D = [normal[0] * offset, normal[1] * offset];

  return {
    firstPoint: add2d(firstPoint, offsetVec),
    lastPoint: add2d(lastPoint, offsetVec),
  };
};

export const make2dOffset = (
  curve: Curve2D,
  offset: number
): Curve2D | { collapsed: true; firstPoint: Point2D; lastPoint: Point2D } => {
  const r = GCWithScope();
  const curveType = curve.geomType;

  if (curveType === "CIRCLE") {
    const circle = r(r(curve.adaptor()).Circle());
    const radius = circle.Radius();

    const orientationCorrection = circle.IsDirect() ? 1 : -1;
    const orientedOffset = offset * orientationCorrection;

    const newRadius = radius + orientedOffset;

    if (newRadius < 1e-10) {
      const centerPos = r(circle.Location());
      const center: Point2D = [centerPos.X(), centerPos.Y()];

      // We replace collapsed arcs by a segment of line
      const offsetViaCenter = (point: Point2D): Point2D => {
        const [x, y] = normalize2d(subtract2d(point, center));
        return add2d(point, [orientedOffset * x, orientedOffset * y]);
      };

      return {
        collapsed: true,
        firstPoint: offsetViaCenter(curve.firstPoint),
        lastPoint: offsetViaCenter(curve.lastPoint),
      };
    }

    const oc = getOC();
    const newCircle = new oc.gp_Circ2d_3(circle.Axis(), newRadius);
    const newInnerCurve = new oc.Geom2d_Circle_1(newCircle);
    const newCurve = new oc.Geom2d_TrimmedCurve(
      new oc.Handle_Geom2d_Curve_2(newInnerCurve),
      curve.firstParameter,
      curve.lastParameter,
      true,
      true
    );

    return new Curve2D(new oc.Handle_Geom2d_Curve_2(newCurve));
  }

  if (curveType === "LINE") {
    const { firstPoint, lastPoint } = offsetEndPoints(
      curve.firstPoint,
      curve.lastPoint,
      offset
    );

    return make2dSegmentCurve(firstPoint, lastPoint);
  }

  // We should compute the analytic offset for a curve

  const oc = getOC();

  const offsetCurve = new Curve2D(
    new oc.Handle_Geom2d_Curve_2(
      new oc.Geom2d_OffsetCurve(curve.wrapped, offset, true)
    )
  );

  // While return the offset curve itself would be the more correct thing to do,
  // opencascade does some weird stuff with it (for instance after mirroring it)
  // This approximates it with a continuous bspline
  const approximation = approximateAsBSpline(offsetCurve.adaptor());

  // We need a better way to handle curves that self intersect, for now we
  // replace them with a line
  if (selfIntersections(approximation).length) {
    return {
      collapsed: true,
      firstPoint: approximation.firstPoint,
      lastPoint: approximation.lastPoint,
    };
  }

  return approximation;
};
