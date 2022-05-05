import { DEG2RAD } from "./constants";
import { Point2D, polarToCartesian } from "./lib2d";

type StartSplineTangent = number | Point2D;
export type SplineTangent = StartSplineTangent | "symmetric";

export type SplineConfig =
  | SplineTangent
  | {
      endTangent?: SplineTangent;
      startTangent?: StartSplineTangent;
      startFactor?: number;
      endFactor?: number;
    };

const isTangent = (c: unknown): c is SplineTangent =>
  c === "symmetric" ||
  typeof c === "number" ||
  (Array.isArray(c) && c.length === 2);

export const defaultsSplineConfig = (
  config?: SplineConfig
): {
  endTangent: Point2D | "symmetric";
  startTangent?: Point2D;
  startFactor: number;
  endFactor: number;
} => {
  let conf: {
    endTangent: SplineTangent;
    startFactor?: number;
    endFactor?: number;
    startTangent?: StartSplineTangent;
  };
  if (!config) conf = { endTangent: [1, 0] };
  else if (isTangent(config)) {
    conf = { endTangent: config };
  } else {
    conf = { endTangent: 0, ...config };
  }
  const {
    endTangent: endTgt,
    startFactor = 1,
    endFactor = 1,
    startTangent: startTgt,
  } = conf;

  let endTangent: Point2D | "symmetric";
  if (typeof endTgt === "number") {
    endTangent = polarToCartesian(1, endTgt * DEG2RAD);
  } else {
    endTangent = endTgt;
  }

  let startTangent: Point2D | undefined;
  if (typeof startTgt === "number") {
    startTangent = polarToCartesian(1, startTgt * DEG2RAD);
  } else {
    startTangent = startTgt;
  }

  return { endTangent, startFactor, endFactor, startTangent };
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
 *
 * @category Sketching
 */
export interface GenericSketcher<ReturnType> {
  /**
   * Changes the point to start your drawing from
   */
  movePointerTo(point: Point2D): this;

  /**
   * Draws a line from the current point to the point given in argument
   *
   * @category Line Segment
   */
  lineTo(point: Point2D): this;
  /**
   * Draws a line at the horizontal distance xDist and the vertical distance
   * yDist of the current point
   *
   * @category Line Segment
   */
  line(xDist: number, yDist: number): this;
  /**
   * Draws a vertical line of length distance from the current point
   *
   * @category Line Segment
   */
  vLine(distance: number): this;
  /**
   * Draws an horizontal line of length distance from the current point
   *
   * @category Line Segment
   */
  hLine(distance: number): this;
  /**
   * Draws a vertical line to the y coordinate
   *
   * @category Line Segment
   */
  vLineTo(yPos: number): this;
  /**
   * Draws an horizontal line to the x coordinate
   *
   * @category Line Segment
   */
  hLineTo(xPos: number): this;
  /**
   * Draws a line from the current point to the point defined in polar
   * coordiates, of radius r and angle theta (in degrees) from the origin
   *
   * @category Line Segment
   */
  polarLineTo([r, theta]: [number, number]): this;
  /**
   * Draws a line from the current point to the point defined in polar
   * coordiates, of radius r and angle theta (in degrees) from the current
   * point
   *
   * @category Line Segment
   */
  polarLine(r: number, theta: number): this;
  /**
   * Draws a line from the current point as a tangent to the previous part of
   * curve drawn. The distance defines how long the line will be.
   *
   * @category Line Segment
   */
  tangentLine(distance: number): this;

  /**
   * Draws an arc of circle by defining its end point and a third point through
   * which the arc will pass.
   *
   * @category Arc Segment
   */
  threePointsArcTo(end: Point2D, innerPoint: Point2D): this;
  /**
   * Draws an arc of circle by defining its end point and a third point through
   * which the arc will pass. Both poinats are defined in horizontal (x) and
   * vertical (y) distances from the start point.
   *
   * @category Arc Segment
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
   *
   * @category Arc Segment
   */
  sagittaArcTo(end: Point2D, sagitta: number): this;
  /**
   * Draws an arc of circle by defining its end point and the sagitta - the
   * maximum distance between the arc and the straight line going from start
   * to end point.The end point is defined by its horizontal and vertical
   * distances from the start point.
   *
   * @category Arc Segment
   */
  sagittaArc(xDist: number, yDist: number, sagitta: number): this;
  /**
   * Draws a vertical arc of circle by defining its end point and the sagitta
   * - the maximum distance between the arc and the straight line going from
   * start to end point.The end point is defined by its  vertical distance
   * from the start point.
   *
   * @category Arc Segment
   */
  vSagittaArc(distance: number, sagitta: number): this;
  /**
   * Draws an horizontal arc of circle by defining its end point and the
   * sagitta - the maximum distance between the arc and the straight line
   * going from start to end point.The end point is defined by its horizontal
   * distance from the start point.
   *
   * @category Arc Segment
   */
  hSagittaArc(distance: number, sagitta: number): this;
  /**
   * Draws an arc of circle from the current point as a tangent to the previous
   * part of curve drawn.
   *
   * @category Arc Segment
   */
  tangentArcTo(end: Point2D): this;
  /**
   * Draws an arc of circle from the current point as a tangent to the previous
   * part of curve drawn.The end point is defined by its horizontal and vertical
   * distances from the start point.
   *
   * @category Arc Segment
   */
  tangentArc(xDist: number, yDist: number): this;

  /**
   * Draws an arc of ellipse by defining its end point and an ellipse.
   *
   * The  shape of the ellipse is defined by both its radiuses, its angle
   * relative to the current coordinat system, as well as the long and sweep
   * flags (as defined for SVG paths)
   *
   * @category Ellipse Arc Segment
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
   *
   * @category Ellipse Arc Segment
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
   *
   * @category Ellipse Arc Segment
   */
  halfEllipseTo(end: Point2D, radius: number, sweep: boolean): this;

  /**
   * Draws an arc as half an ellipse, defined by the sagitta of the ellipse
   * (which corresponds to the radius in the axe orthogonal to the straight
   * line).The end point is defined by distances from he start point.
   *
   * The sweep flag is to be understood as defined for SVG paths.
   *
   * @category Ellipse Arc Segment
   */
  halfEllipse(
    xDist: number,
    yDist: number,
    radius: number,
    sweep: boolean
  ): this;

  /** Draws a generic bezier curve to the end point, going using a set of
   * control points.
   *
   * This is the generic definition of a bézier curve, you might want to use
   * either the quadratic or cubic (most common) version, unless you know
   * exactly what you are aiming at.
   *
   * @category Bezier Curve
   */
  bezierCurveTo(end: Point2D, controlPoints: Point2D | Point2D[]): this;
  /** Draws a quadratic bezier curve to the end point, using the single control
   * point.
   *
   * @category Bezier Curve
   */
  quadraticBezierCurveTo(end: Point2D, controlPoint: Point2D): this;
  /** Draws a cubic bezier curve to the end point, using the start  and end
   * control point to define its shape. This corresponds to the most commonly
   * used bezier curve.
   *
   * If you are struggling setting your control points, the smoothSpline might
   * be better for your needs.
   *
   * @category Bezier Curve
   */
  cubicBezierCurveTo(
    end: Point2D,
    startControlPoint: Point2D,
    endControlPoint: Point2D
  ): this;
  /** Draws a cubic bezier curve to the end point, attempting to make the line
   * smooth with the previous segment.
   *
   * It will base its first control point so that its tangent is the same than
   * the previous segment.
   *
   * The control point relative to the end is by default set to be in the
   * direction of the straight line between start and end. You can specifiy the
   * `endSkew` either as an angle (in degrees) to this direction, or as an
   * absolute direction in the coordinate system (a Point).
   *
   * The start- and end- factors decide on how far the control point is from
   * the start and end point. At a factor of 1, the distance corresponds to
   * a quarter of the straight line distance.
   *
   * @category Bezier Curve
   */
  smoothSplineTo(end: Point2D, config?: SplineConfig): this;
  /** Draws a cubic bezier curve to the end point, attempting to make the line
   * smooth with the previous segment. The end point is defined by its distance
   * to the first point.
   *
   * It will base its first control point so that its tangent is the same than
   * the previous segment. You can force another tangent by defining
   * `startTangent`.
   *
   * You can configure the tangent of the end point by configuring the
   * `endTangent`, either as "symmetric" to reproduce the start angle, as an
   * angle from the X axis (in the coordinate system) or a 2d direction (still
   * in the coordinate system.
   *
   * The start- and end- factors decide on how far the control point is from
   * the start and end point. At a factor of 1, the distance corresponds to
   * a quarter of the straight line distance.
   *
   * @category Bezier Curve
   */
  smoothSpline(xDist: number, yDist: number, splineConfig: SplineConfig): this;

  /**
   * Stop drawing and returns the sketch.
   */
  done(): ReturnType;
  /**
   * Stop drawing, make sure the sketch is closed (by adding a straight line to
   * from the last point to the first) and returns the sketch.
   */
  close(): ReturnType;
  /**
   * Stop drawing, make sure the sketch is closed (by mirroring the lines
   * between the first and last points drawn) and returns the sketch.
   */
  closeWithMirror(): ReturnType;
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
  rx: number;
  ry: number;
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
    rx,
    ry,
  };

  return outputObj;
}
