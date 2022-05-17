import { BoundingBox2d, Point2D } from "./lib2d";
import {
  Blueprint,
  cut2D,
  DrawingInterface,
  fuse2D,
  ScaleMode,
  Shape2D,
} from "./blueprints";
import { Plane, PlaneName, Point } from "./geom";
import { Face } from "./shapes";
import { BaseSketcher2d } from "./Sketcher2d";
import { SketchInterface, Sketches } from "./sketches";
import { GenericSketcher } from "./sketcherlib";

export class Drawing implements DrawingInterface {
  private innerShape: Shape2D;

  constructor(innerShape: Shape2D = null) {
    this.innerShape = innerShape;
  }

  get boundingBox(): BoundingBox2d {
    if (!this.innerShape) return new BoundingBox2d();
    return this.innerShape.boundingBox;
  }
  stretch(ratio: number, direction: Point2D, origin: Point2D): Drawing {
    if (!this.innerShape) return new Drawing();
    return new Drawing(this.innerShape.stretch(ratio, direction, origin));
  }

  rotate(angle: number, center: Point2D): Drawing {
    if (!this.innerShape) return new Drawing();
    return new Drawing(this.innerShape.rotate(angle, center));
  }
  translate(xDist: number, yDist: number): Drawing {
    if (!this.innerShape) return new Drawing();
    return new Drawing(this.innerShape.translate(xDist, yDist));
  }

  mirror(
    centerOrDirection: Point2D,
    origin?: Point2D,
    mode?: "center" | "plane"
  ): Drawing {
    if (!this.innerShape) return new Drawing();
    return new Drawing(this.innerShape.mirror(centerOrDirection, origin, mode));
  }

  sketchOnPlane(inputPlane: Plane): SketchInterface | Sketches;
  sketchOnPlane(
    inputPlane?: PlaneName,
    origin?: Point | number
  ): SketchInterface | Sketches;
  sketchOnPlane(
    inputPlane?: PlaneName | Plane,
    origin?: Point | number
  ): SketchInterface | Sketches {
    if (!this.innerShape) throw new Error("Trying to sketch an empty drawing");
    return this.innerShape.sketchOnPlane(inputPlane, origin);
  }

  sketchOnFace(face: Face, scaleMode: ScaleMode): SketchInterface | Sketches {
    if (!this.innerShape) throw new Error("Trying to sketch an empty drawing");
    return this.innerShape.sketchOnFace(face, scaleMode);
  }

  cut(other: Drawing): Drawing {
    return new Drawing(cut2D(this.innerShape, other.innerShape));
  }

  fuse(other: Drawing): Drawing {
    return new Drawing(fuse2D(this.innerShape, other.innerShape));
  }

  toSVG(margin: number): string {
    return this.innerShape?.toSVG(margin) || "";
  }

  toSVGViewBox(margin = 1): string {
    return this.innerShape?.toSVGViewBox(margin) || "";
  }

  toSVGPaths(): string[] | string[][] {
    return this.innerShape?.toSVGPaths() || [];
  }
}

export class DrawingPen
  extends BaseSketcher2d
  implements GenericSketcher<Drawing>
{
  constructor(origin: Point2D = [0, 0]) {
    super();
    this.pointer = origin;
    this.firstPoint = origin;

    this.pendingCurves = [];
  }

  done(): Drawing {
    return new Drawing(new Blueprint(this.pendingCurves));
  }

  close(): Drawing {
    this._closeSketch();
    return this.done();
  }

  closeWithMirror(): Drawing {
    this._closeWithMirror();
    return this.close();
  }
}

export function draw() {
  return new DrawingPen();
}
