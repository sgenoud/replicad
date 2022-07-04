import {
  BoundingBox2d,
  make2dCircle,
  make2dEllipse,
  make2dInerpolatedBSplineCurve,
  Point2D,
} from "./lib2d";
import {
  Blueprint,
  cut2D,
  DrawingInterface,
  fuse2D,
  polysidesBlueprint,
  roundedRectangleBlueprint,
  ScaleMode,
  Shape2D,
} from "./blueprints";
import { Plane, PlaneName, Point } from "./geom";
import { Face } from "./shapes";
import { BaseSketcher2d } from "./Sketcher2d";
import { SketchInterface, Sketches } from "./sketches";
import { GenericSketcher } from "./sketcherlib";
import { textBlueprints } from "./text";
import { BSplineApproximationConfig } from ".";

export class Drawing implements DrawingInterface {
  private innerShape: Shape2D;

  constructor(innerShape: Shape2D = null) {
    this.innerShape = innerShape;
  }

  clone(): Drawing {
    return new Drawing(this.innerShape?.clone() || null);
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

/**
 * Creates a drawing pen to programatically draw in 2D.
 *
 * @category Drawing
 */
export function draw(): DrawingPen {
  return new DrawingPen();
}

/**
 * Creates the `Drawing` of a rectangle with (optional) rounded corners.
 *
 * The rectangle is centered on [0, 0]
 *
 * @category Drawing
 */
export function drawRoundedRectangle(
  width: number,
  height: number,
  r: number | { rx?: number; ry?: number } = 0
): Drawing {
  return new Drawing(roundedRectangleBlueprint(width, height, r));
}
export const drawRectangle = drawRoundedRectangle;

/**
 * Creates the `Drawing` of a circle as one single curve.
 *
 * The circle is centered on [0, 0]
 *
 * @category Drawing
 */
export function drawSingleCircle(radius: number): Drawing {
  return new Drawing(new Blueprint([make2dCircle(radius)]));
}

/**
 * Creates the `Drawing` of an ellipse as one single curve.
 *
 * The ellipse is centered on [0, 0], with axes aligned with the coordinates.
 *
 * @category Drawing
 */
export function drawSingleEllipse(
  majorRadius: number,
  minorRadius: number
): Drawing {
  const [minor, major] = [majorRadius, minorRadius].sort((a, b) => a - b);
  const direction: Point2D = major === majorRadius ? [1, 0] : [0, 1];

  return new Drawing(new Blueprint([make2dEllipse(major, minor, direction)]));
}

/**
 * Creates the `Drawing` of a circle.
 *
 * The circle is centered on [0, 0]
 *
 * @category Drawing
 */
export function drawCircle(radius: number): Drawing {
  return draw()
    .movePointerTo([-radius, 0])
    .halfEllipse(2 * radius, 0, radius)
    .halfEllipse(-2 * radius, 0, radius)
    .close();
}

/**
 * Creates the `Drawing` of an ellipse.
 *
 * The ellipse is centered on [0, 0], with axes aligned with the coordinates.
 *
 * @category Drawing
 */
export function drawEllipse(majorRadius: number, minorRadius: number): Drawing {
  return draw()
    .movePointerTo([-majorRadius, 0])
    .halfEllipse(2 * majorRadius, 0, minorRadius)
    .halfEllipse(-2 * majorRadius, 0, minorRadius)
    .close();
}

/**
 * Creates the `Drawing` of an polygon in a defined plane
 *
 * The sides of the polygon can be arcs of circle with a defined sagitta.
 * The radius defines the out radius of the polygon without sagitta
 *
 * @category Drawing
 */
export function drawPolysides(
  radius: number,
  sidesCount: number,
  sagitta = 0
): Drawing {
  return new Drawing(polysidesBlueprint(radius, sidesCount, sagitta));
}

/**
 * Creates the `Drawing` of a text, in a defined font size and a font familiy
 * (which will be the default).
 *
 * @category Drawing
 */
export function drawText(
  text: string,
  { startX = 0, startY = 0, fontSize = 16, fontFamily = "default" } = {}
): Drawing {
  return new Drawing(
    textBlueprints(text, { startX, startY, fontSize, fontFamily })
  );
}

/**
 * Creates the `Drawing` by interpolating points as a curve
 *
 * The drawing will be a spline approximating the points. Note that the
 * degree should be at maximum 3 if you need to export the drawing as an SVG.
 *
 * @category Drawing
 */
export const drawPointsInterpolation = (
  points: Point2D[],
  approximationConfig: BSplineApproximationConfig = {}
): Drawing => {
  return new Drawing(
    new Blueprint([make2dInerpolatedBSplineCurve(points, approximationConfig)])
  );
};

/**
 * Creates the `Drawing` of parametric function
 *
 * The drawing will be a spline approximating the function. Note that the
 * degree should be at maximum 3 if you need to export the drawing as an SVG.
 *
 * @category Drawing
 */
export const drawParametricFunction = (
  func: (t: number) => Point2D,
  { pointsCount = 400, start = 0, stop = 1 } = {},
  approximationConfig: BSplineApproximationConfig = {}
): Drawing => {
  const stepSize = (stop - start) / pointsCount;
  const points = [...Array(pointsCount + 1).keys()].map((t) => {
    return func(start + t * stepSize);
  });

  return drawPointsInterpolation(points, approximationConfig);
};
