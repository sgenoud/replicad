import { Point2D } from "./lib2d";
import Sketch from "./Sketch";

export type SplineConfig =
  | number
  | "symmetric"
  | Point2D
  | {
      endSkew?: number | "symmetric" | Point2D;
      startFactor?: number;
      endFactor?: number;
    };

export const defaultsSplineConfig = (
  config?: SplineConfig
): {
  endSkew: number | "symmetric" | Point2D;
  startFactor: number;
  endFactor: number;
} => {
  let conf: {
    endSkew: number | "symmetric" | Point2D;
    startFactor?: number;
    endFactor?: number;
  };
  if (!config || config === "symmetric" || typeof config === "number") {
    conf = { endSkew: (config ?? 0) as "symmetric" | number };
  } else {
    conf = { endSkew: 0, ...config };
  }
  const { endSkew, startFactor = 1, endFactor = 1 } = conf;

  return { endSkew, startFactor, endFactor };
};

/**
 * Sketchers allow the user to draw a two dimentional shape using segment of
 * curve. You start by defining where you sketch will start (with the method
 * `movePointerTo`.
 * Each sketching method corresponds to drawing a curve of some type (line,
 * arc, elliptic arc, bezier curve to a new point. The next segment will start
 * from the end point of the previous segment.
 * Once you end your sketch you will receive a `Sketch` object that allows you
 * to give some three dimentionlity to your finished sketch.
 */
export interface GenericSketcher {
  /**
   * Changes the point to start your drawing from
   */
  movePointerTo(point: Point2D): this;

  /**
   * jDraws a line from the current point to the point given in argument
   */
  lineTo(point: Point2D): this;
  /**
   * Draws a line at the horizontal distance xDist and the vertical distance
   * yDist of the current point
   */
  line(xDist: number, yDist: number): this;
  /**
   * Draws a vertical line of length distance from the current point
   */
  vLine(distance: number): this;
  /**
   * Draws an horizontal line of length distance from the current point
   */
  hLine(distance: number): this;
  /**
   * Draws a line from the current point to the point defined in polar
   * coordiates, of radius r and angle theta (in degrees) from the origin
   */
  polarLineTo([r, theta]: [number, number]): this;
  /**
   * Draws a line from the current point to the point defined in polar
   * coordiates, of radius r and angle theta (in degrees) from the current
   * point
   */
  polarLine(r: number, theta: number): this;
  /**
   * Draws a line from the current point as a tangent to the previous part of
   * curve drawn. The distance defines how long the line will be.
   */
  tangentLine(distance: number): this;

  /**
   * Draws an arc of circle by defining its end point and a third point through
   * which the arc will pass.
   */
  threePointsArcTo(end: Point2D, innerPoint: Point2D): this;
  /**
   * Draws an arc of circle by defining its end point and a third point through
   * which the arc will pass. Both poinats are defined in horizontal (x) and
   * vertical (y) distances from the start point.
   */
  threePointsArc(
    xDist: number,
    yDist: number,
    viaXDist: number,
    viaYDist: number
  ): this;
  /**
   * Draws an arc of circle by defining its end point and the sagitta - the
   * maximum distance between the arc and the straight line going from start
   * to end point.
   */
  sagittaArcTo(end: Point2D, sagitta: number): this;
  /**
   * Draws an arc of circle by defining its end point and the sagitta - the
   * maximum distance between the arc and the straight line going from start
   * to end point.The end point is defined by its horizontal and vertical
   * distances from the start point.
   */
  sagittaArc(xDist: number, yDist: number, sagitta: number): this;
  /**
   * Draws a vertical arc of circle by defining its end point and the sagitta
   * - the maximum distance between the arc and the straight line going from
   * start to end point.The end point is defined by its  vertical distance
   * from the start point.
   */
  vSagittaArc(distance: number, sagitta: number): this;
  /**
   * Draws an horizontal arc of circle by defining its end point and the
   * sagitta - the maximum distance between the arc and the straight line
   * going from start to end point.The end point is defined by its horizontal
   * distance from the start point.
   */
  hSagittaArc(distance: number, sagitta: number): this;
  /**
   * Draws an arc of circle from the current point as a tangent to the previous
   * part of curve drawn.
   */
  tangentArcTo(end: Point2D): this;
  /**
   * Draws an arc of circle from the current point as a tangent to the previous
   * part of curve drawn.The end point is defined by its horizontal and vertical
   * distances from the start point.
   */
  tangentArc(xDist: number, yDist: number): this;

  /**
   * Draws an arc of ellipse by defining its end point and an ellipse.
   *
   * The  shape of the ellipse is defined by both its radiuses, its angle
   * relative to the current coordinat system, as well as the long and sweep
   * flags (as defined for SVG paths)
   */
  ellipseTo(
    end: Point2D,
    horizontalRadius: number,
    verticalRadius: number,
    rotation: number,
    longAxis: boolean,
    sweep: boolean
  ): this;
  /**
   * Draws an arc of ellipse by defining its end point and an ellipse. The end
   * point is defined by distances from he start point.
   *
   * The  shape of the ellipse is defined by both its radiuses, its angle
   * relative to the current coordinat system, as well as the long and sweep
   * flags (as defined for SVG paths)
   */
  ellipse(
    xDist: number,
    yDist: number,
    horizontalRadius: number,
    verticalRadius: number,
    rotation: number,
    longAxis: boolean,
    sweep: boolean
  ): this;
  /**
   * Draws an arc as half an ellipse, defined by the sagitta of the ellipse
   * (which corresponds to the radius in the axe orthogonal to the straight
   * line).
   *
   * The sweep flag is to be understood as defined for SVG paths.
   */
  halfEllipseTo(end: Point2D, radius: number, sweep: boolean): this;

  /**
   * Draws an arc as half an ellipse, defined by the sagitta of the ellipse
   * (which corresponds to the radius in the axe orthogonal to the straight
   * line).The end point is defined by distances from he start point.
   *
   * The sweep flag is to be understood as defined for SVG paths.
   */
  halfEllipse(
    xDist: number,
    yDist: number,
    radius: number,
    sweep: boolean
  ): this;

  /**
   * Draws a generic bezier curve to the end point, going using a set of
   * control points.
   *
   * This is the generic definition of a bézier curve, you might want to use
   * either the quadratic or cubic (most common) version, unless you know
   * exactly what you are aiming at.
   */
  bezierCurveTo(end: Point2D, controlPoints: Point2D | Point2D[]): this;
  /**
   * Draws a quadratic bezier curve to the end point, using the single control
   * point.
   */
  quadraticBezierCurveTo(end: Point2D, controlPoint: Point2D): this;
  /**
   * Draws a cubic bezier curve to the end point, using the start  and end
   * control point to define its shape. This corresponds to the most commonly
   * used bezier curve.
   *
   * If you are struggling setting your control points, the smoothSpline might
   * be better for your needs.
   */
  cubicBezierCurveTo(
    end: Point2D,
    startControlPoint: Point2D,
    endControlPoint: Point2D
  ): this;
  /**
   * Draws a cubic bezier curve to the end point, attempting to make the line
   * smooth with the previous segment.
   *
   * It will base its first control point so that its tangent is the same than
   * the previous segment.
   *
   * The control point relative to the end is by default set to be in the
   * direction of the straight line between start and end. You can specifiy
   * the `endSkew` either as an angle (in degrees) to this direction, or as
   * an absolute direction in the coordinate system (a Point).
   *
   * The start- and end- factors decide on how far the control point is from
   * the start and end point. At a factor of 1, the distance corresponds to
   * a quarter of the straight line distance.
   */
  smoothSplineTo(end: Point2D, config?: SplineConfig): this;
  /**
   * Draws a cubic bezier curve to the end point, attempting to make the line
   * smooth with the previous segment. The end point is defined by its distance
   * to the first point.
   *
   * It will base its first control point so that its tangent is the same than
   * the previous segment.
   *
   * The control point relative to the end is by default set to be in the
   * direction of the straight line between start and end. You can specifiy
   * the `endSkew` either as an angle (in degrees) to this direction, or as
   * an absolute direction in the coordinate system (a Point).
   *
   * The start- and end- factors decide on how far the control point is from
   * the start and end point. At a factor of 1, the distance corresponds to
   * a quarter of the straight line distance.
   */
  smoothSpline(xDist: number, yDist: number, splineConfig: SplineConfig): this;

  /**
   * Stop drawing and returns the sketch.
   */
  done(): Sketch;
  /**
   * Stop drawing, make sure the sketch is closed (by adding a straight line to
   * from the last point to the first) and returns the sketch.
   */
  close(): Sketch;
  /**
   * Stop drawing, make sure the sketch is closed (by mirroring the lines
   * between the first and last points drawn) and returns the sketch.
   */
  closeWithMirror(): Sketch;
}

/*
 * adapted from https://stackoverflow.com/a/12329083
 */
function radianAngle(ux: number, uy: number, vx: number, vy: number): number {
  const dot = ux * vx + uy * vy;
  const mod = Math.sqrt((ux * ux + uy * uy) * (vx * vx + vy * vy));
  let rad = Math.acos(dot / mod);
  if (ux * vy - uy * vx < 0.0) {
    rad = -rad;
  }
  return rad;
}

export function convertSvgEllipseParams(
  [x1, y1]: [number, number],
  [x2, y2]: [number, number],
  rx: number,
  ry: number,
  phi: number,
  fA: boolean,
  fS: boolean
): {
  cx: number;
  cy: number;
  startAngle: number;
  deltaAngle: number;
  endAngle: number;
  clockwise: boolean;
} {
  const PIx2 = Math.PI * 2.0;

  if (rx < 0) {
    rx = -rx;
  }
  if (ry < 0) {
    ry = -ry;
  }
  if (rx == 0.0 || ry == 0.0) {
    // invalid arguments
    throw Error("rx and ry can not be 0");
  }

  const s_phi = Math.sin(phi);
  const c_phi = Math.cos(phi);
  const hd_x = (x1 - x2) / 2.0; // half diff of x
  const hd_y = (y1 - y2) / 2.0; // half diff of y
  const hs_x = (x1 + x2) / 2.0; // half sum of x
  const hs_y = (y1 + y2) / 2.0; // half sum of y

  // F6.5.1
  const x1_ = c_phi * hd_x + s_phi * hd_y;
  const y1_ = c_phi * hd_y - s_phi * hd_x;

  // F.6.6 Correction of out-of-range radii
  //   Step 3: Ensure radii are large enough
  const lambda = (x1_ * x1_) / (rx * rx) + (y1_ * y1_) / (ry * ry);
  if (lambda > 1) {
    rx = rx * Math.sqrt(lambda);
    ry = ry * Math.sqrt(lambda);
  }

  const rxry = rx * ry;
  const rxy1_ = rx * y1_;
  const ryx1_ = ry * x1_;
  const sum_of_sq = rxy1_ * rxy1_ + ryx1_ * ryx1_; // sum of square
  if (!sum_of_sq) {
    throw Error("start point can not be same as end point");
  }
  let coe = Math.sqrt(Math.abs((rxry * rxry - sum_of_sq) / sum_of_sq));
  if (fA == fS) {
    coe = -coe;
  }

  // F6.5.2
  const cx_ = (coe * rxy1_) / ry;
  const cy_ = (-coe * ryx1_) / rx;

  // F6.5.3
  const cx = c_phi * cx_ - s_phi * cy_ + hs_x;
  const cy = s_phi * cx_ + c_phi * cy_ + hs_y;

  const xcr1 = (x1_ - cx_) / rx;
  const xcr2 = (x1_ + cx_) / rx;
  const ycr1 = (y1_ - cy_) / ry;
  const ycr2 = (y1_ + cy_) / ry;

  // F6.5.5
  const startAngle = radianAngle(1.0, 0.0, xcr1, ycr1);

  // F6.5.6
  let deltaAngle = radianAngle(xcr1, ycr1, -xcr2, -ycr2);
  while (deltaAngle > PIx2) {
    deltaAngle -= PIx2;
  }
  while (deltaAngle < 0.0) {
    deltaAngle += PIx2;
  }
  if (!fS) {
    deltaAngle -= PIx2;
  }
  let endAngle = startAngle + deltaAngle;
  while (endAngle > PIx2) {
    endAngle -= PIx2;
  }
  while (endAngle < 0.0) {
    endAngle += PIx2;
  }

  const outputObj = {
    cx: cx,
    cy: cy,
    startAngle: startAngle,
    deltaAngle: deltaAngle,
    endAngle: endAngle,
    clockwise: !!fS,
  };

  return outputObj;
}
