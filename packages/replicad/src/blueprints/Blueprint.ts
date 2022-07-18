import { makePlane } from "../geomHelpers";
import {
  curvesAsEdgesOnFace,
  curvesAsEdgesOnPlane,
  curvesBoundingBox,
  mirrorTransform2d,
  rotateTransform2d,
  ScaleMode,
  stretchTransform2d,
  scaleTransform2d,
  translationTransform2d,
} from "../curves";
import {
  adaptedCurveToPathElem,
  make2dSegmentCurve,
  Point2D,
  BoundingBox2d,
  Curve2D,
  samePoint,
  isPoint2D,
} from "../lib2d";
import { assembleWire } from "../shapeHelpers";
import { Face } from "../shapes";
import Sketch from "../sketches/Sketch";

import { getOC } from "../oclib.js";
import { Plane, PlaneName, Point } from "../geom";
import { DEG2RAD } from "../constants";
import { DrawingInterface } from "./lib";
import round5 from "../utils/round5";
import { asSVG, viewbox } from "./svg";
import { GCWithScope } from "../register";

/**
 * A Blueprint is an abstract Sketch, a 2D set of curves that can then be
 * sketched on different surfaces (faces or planes)
 *
 * You should create them by "sketching" with a `BlueprintSketcher`
 */
export default class Blueprint implements DrawingInterface {
  curves: Curve2D[];
  protected _boundingBox: null | BoundingBox2d;
  constructor(curves: Curve2D[]) {
    this.curves = curves;
    this._boundingBox = null;
  }

  delete() {
    this.curves.forEach((c) => c.delete());
    if (this._boundingBox) this._boundingBox.delete();
  }

  clone() {
    return new Blueprint(this.curves);
  }

  get boundingBox(): BoundingBox2d {
    if (!this._boundingBox) {
      this._boundingBox = curvesBoundingBox(this.curves);
    }
    return this._boundingBox;
  }

  stretch(
    ratio: number,
    direction: Point2D,
    origin: Point2D = [0, 0]
  ): Blueprint {
    const curves = stretchTransform2d(ratio, direction, origin).transformCurves(
      this.curves
    );
    return new Blueprint(curves);
  }

  scale(scaleFactor: number, center?: Point2D): Blueprint {
    const centerPoint = center || this.boundingBox.center;
    const curves = scaleTransform2d(scaleFactor, centerPoint).transformCurves(
      this.curves
    );
    return new Blueprint(curves);
  }

  rotate(angle: number, center: Point2D): Blueprint {
    const curves = rotateTransform2d(angle * DEG2RAD, center).transformCurves(
      this.curves
    );
    return new Blueprint(curves);
  }

  translate(xDist: number, yDist: number): Blueprint;
  translate(translationVector: Point2D): Blueprint;
  translate(xDistOrPoint: number | Point2D, yDist = 0): Blueprint {
    const translationVector = isPoint2D(xDistOrPoint)
      ? xDistOrPoint
      : ([xDistOrPoint, yDist] as Point2D);
    const curves = translationTransform2d(translationVector).transformCurves(
      this.curves
    );
    return new Blueprint(curves);
  }

  mirror(
    centerOrDirection: Point2D,
    origin: Point2D = [0, 0],
    mode: "center" | "plane" = "center"
  ): Blueprint {
    const curves = mirrorTransform2d(
      centerOrDirection,
      origin,
      mode
    ).transformCurves(this.curves);
    return new Blueprint(curves);
  }

  sketchOnPlane(
    inputPlane?: PlaneName | Plane,
    origin?: Point | number
  ): Sketch {
    const plane =
      inputPlane instanceof Plane
        ? makePlane(inputPlane)
        : makePlane(inputPlane, origin);

    const edges = curvesAsEdgesOnPlane(this.curves, plane);
    const wire = assembleWire(edges);

    return new Sketch(wire, {
      defaultOrigin: plane.origin,
      defaultDirection: plane.zDir,
    });
  }

  sketchOnFace(face: Face, scaleMode?: ScaleMode): Sketch {
    const oc = getOC();

    const edges = curvesAsEdgesOnFace(this.curves, face, scaleMode);
    const wire = assembleWire(edges);

    oc.BRepLib.BuildCurves3d_2(wire.wrapped);

    const wireFixer = new oc.ShapeFix_Wire_2(wire.wrapped, face.wrapped, 1e-9);
    wireFixer.FixEdgeCurves();
    wireFixer.delete();

    const sketch = new Sketch(wire);

    if (wire.isClosed) {
      const baseFace = sketch.clone().face();
      sketch.defaultOrigin = baseFace.pointOnSurface(0.5, 0.5);
      sketch.defaultDirection = baseFace.normalAt();
      sketch.baseFace = face;
    } else {
      const startPoint = wire.startPoint;
      sketch.defaultOrigin = startPoint;
      sketch.defaultDirection = face.normalAt(startPoint);
      sketch.baseFace = face;
    }
    return sketch;
  }

  toSVGPathD() {
    const r = GCWithScope();
    const bp = this.clone().mirror([1, 0], [0, 0], "plane");

    const path = bp.curves.map((c) => {
      return adaptedCurveToPathElem(r(c.adaptor()), c.lastPoint);
    });

    const [startX, startY] = bp.curves[0].firstPoint;
    return `M ${round5(startX)} ${round5(startY)} ${path.join(" ")}${
      bp.isClosed() ? " Z" : ""
    }`;
  }

  toSVGPath() {
    return `<path d="${this.toSVGPathD()}" />`;
  }

  toSVGViewBox(margin = 1) {
    return viewbox(this.boundingBox, margin);
  }

  toSVGPaths() {
    return [this.toSVGPathD()];
  }

  toSVG(margin = 1) {
    return asSVG(this.toSVGPath(), this.boundingBox, margin);
  }

  get firstPoint(): Point2D {
    return this.curves[0].firstPoint;
  }

  get lastPoint(): Point2D {
    return this.curves[this.curves.length - 1].lastPoint;
  }

  isInside(point: Point2D): boolean {
    if (!this.boundingBox.containsPoint(point)) return false;

    const oc = getOC();
    const intersector = new oc.Geom2dAPI_InterCurveCurve_1();
    const segment = make2dSegmentCurve(point, this.boundingBox.outsidePoint());
    let crossCounts = 0;

    const onCurve = this.curves.find((c) => c.isOnCurve(point));
    if (onCurve) return false;

    this.curves.forEach((c) => {
      if (c.boundingBox.isOut(segment.boundingBox)) return;
      intersector.Init_1(segment.wrapped, c.wrapped, 1e-9);
      crossCounts += intersector.NbPoints();
    });

    intersector.delete();

    return !!(crossCounts % 2);
  }

  isClosed() {
    return samePoint(this.firstPoint, this.lastPoint);
  }

  intersects(other: Blueprint) {
    const oc = getOC();
    const intersector = new oc.Geom2dAPI_InterCurveCurve_1();

    if (this.boundingBox.isOut(other.boundingBox)) return false;

    for (const myCurve of this.curves) {
      for (const otherCurve of other.curves) {
        if (myCurve.boundingBox.isOut(otherCurve.boundingBox)) continue;

        intersector.Init_1(myCurve.wrapped, otherCurve.wrapped, 1e-9);
        if (intersector.NbPoints() || intersector.NbSegments()) return true;
      }
    }
    intersector.delete();
    return false;
  }
}
