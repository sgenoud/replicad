import { Geom2d_Curve } from "replicad-opencascadejs";
import { makePlane } from "../geomHelpers";
import {
  curvesAsEdgesOnFace,
  curvesAsEdgesOnPlane,
  curvesBoundingBox,
  mirrorTransform2d,
  rotateTransform2d,
  ScaleMode,
  stretchTransform2d,
  transformCurves,
  translationTransform2d,
} from "../curves";
import { make2dSegmentCurve, Point2D, BoundingBox2d } from "../lib2d";
import { assembleWire } from "../shapeHelpers";
import { Face } from "../shapes";
import Sketch from "../sketches/Sketch";

import { localGC } from "../register";
import { getOC } from "../oclib.js";
import { Plane, PlaneName, Point } from "../geom";
import { DEG2RAD } from "../constants";
import { BlueprintInterface } from "./lib";

/**
 * A Blueprint is an abstract Sketch, a 2D set of curves that can then be
 * sketched on different surfaces (faces or planes)
 *
 * You should create them by "sketching" with a `BlueprintSketcher`
 */
export default class Blueprint implements BlueprintInterface {
  curves: Geom2d_Curve[];
  protected _boundingBox: null | BoundingBox2d;
  constructor(curves: Geom2d_Curve[]) {
    this.curves = curves;
    this._boundingBox = null;
  }

  delete() {
    this.curves.forEach((c) => c.delete());
    if (this._boundingBox) this._boundingBox.delete();
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
    const [r, gc] = localGC();
    const transform = r(stretchTransform2d(ratio, direction, origin));
    const bp = new Blueprint(
      transformCurves(this.curves, transform).map((c) => c.get())
    );
    gc();
    return bp;
  }

  rotate(angle: number, center: Point2D): Blueprint {
    const [r, gc] = localGC();
    const transform = r(rotateTransform2d(angle * DEG2RAD, center));
    const bp = new Blueprint(
      transformCurves(this.curves, transform).map((c) => c.get())
    );
    gc();
    return bp;
  }

  translate(xDist: number, yDist: number): Blueprint {
    const [r, gc] = localGC();
    const transform = r(translationTransform2d([xDist, yDist]));
    const bp = new Blueprint(
      transformCurves(this.curves, transform).map((c) => c.get())
    );
    gc();
    return bp;
  }

  mirror(
    centerOrDirection: Point2D,
    origin: Point2D = [0, 0],
    mode: "center" | "plane" = "center"
  ): Blueprint {
    const [r, gc] = localGC();
    const transform = r(mirrorTransform2d(centerOrDirection, origin, mode));
    const bp = new Blueprint(
      transformCurves(this.curves, transform).map((c) => c.get())
    );
    gc();
    return bp;
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
    edges.forEach((e) => e.delete());

    return new Sketch(wire, {
      defaultOrigin: plane.origin,
      defaultDirection: plane.zDir,
    });
  }

  sketchOnFace(face: Face, scaleMode?: ScaleMode): Sketch {
    const oc = getOC();
    const [r, gc] = localGC();

    const edges = curvesAsEdgesOnFace(this.curves, face, scaleMode);
    const wire = assembleWire(edges);
    edges.forEach((e) => e.delete());

    oc.BRepLib.BuildCurves3d_2(wire.wrapped);

    const wireFixer = new oc.ShapeFix_Wire_2(wire.wrapped, face.wrapped, 1e-9);
    wireFixer.FixEdgeCurves();

    const sketch = new Sketch(wire);

    if (wire.isClosed) {
      const baseFace = r(sketch.clone().face());
      sketch.defaultOrigin = r(baseFace.pointOnSurface(0.5, 0.5));
      sketch.defaultDirection = r(r(baseFace.normalAt()));
      sketch.baseFace = face;
    } else {
      const startPoint = r(wire.startPoint);
      sketch.defaultOrigin = startPoint;
      sketch.defaultDirection = r(face.normalAt(startPoint));
      sketch.baseFace = face;
    }
    gc();
    return sketch;
  }

  get firstPoint(): Point2D {
    const c = this.curves[0];
    const pnt = c.Value(c.FirstParameter());
    const vec: Point2D = [pnt.X(), pnt.Y()];
    pnt.delete();
    return vec;
  }

  isInside(point: Point2D): boolean {
    const oc = getOC();
    const intersector = new oc.Geom2dAPI_InterCurveCurve_1();
    const segment = new oc.Handle_Geom2d_Curve_2(
      make2dSegmentCurve(point, this.boundingBox.outsidePoint())
    );
    let crossCounts = 0;

    this.curves.forEach((c) => {
      intersector.Init_1(segment, new oc.Handle_Geom2d_Curve_2(c), 1e-6);
      crossCounts += intersector.NbPoints();
    });

    return !!(crossCounts % 2);
  }
}
