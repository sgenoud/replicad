import { Plane, createNamedPlane } from "./geom.js";
import { RegisteredObj } from "./register.js";
import Sketch from "./Sketch.js";
import { getOC } from "./oclib.js";

export const makePlane = (plane = "XY", origin = [0, 0, 0]) => {
  if (plane instanceof Plane) {
    return plane.clone();
  } else {
    return createNamedPlane(plane, origin);
  }
};

export class BaseSketcher extends RegisteredObj {
  constructor(plane = "XY", origin = [0, 0, 0]) {
    super();
    this.oc = getOC();

    this.plane = makePlane(plane, origin);
  }

  delete() {
    this.plane.delete();
    super.delete();
  }

  buildWire() {
    throw new Error("build wire needs to be implemented by children classes");
  }

  _closeSketch() {
    // This needs to be implemented to ensure a sketch is closed
  }

  done() {
    const sketch = new Sketch(this.buildWire(), {
      defaultOrigin: this.plane.origin,
      defaultDirection: this.plane.zDir,
    });
    this.delete();
    return sketch;
  }

  close(shaperConfig) {
    this._closeSketch();
    if (!shaperConfig) return this.done();
    return this.done().fromConfig(shaperConfig);
  }
}

/*
 * adapted from https://stackoverflow.com/a/12329083
 */
function radianAngle(ux, uy, vx, vy) {
  const dot = ux * vx + uy * vy;
  const mod = Math.sqrt((ux * ux + uy * uy) * (vx * vx + vy * vy));
  let rad = Math.acos(dot / mod);
  if (ux * vy - uy * vx < 0.0) {
    rad = -rad;
  }
  return rad;
}

export function convertSvgEllipseParams(
  [x1, y1],
  [x2, y2],
  rx,
  ry,
  phi,
  fA,
  fS
) {
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
