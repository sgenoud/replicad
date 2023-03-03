import type { gp_Ax2 } from "replicad-opencascadejs";
import { asDir, asPnt, makeAx2, Point, Vector } from "../geom";
import type { BoundingBox } from "../geom";
import { WrappingObj } from "../register";
export type CubeFace = "front" | "back" | "top" | "bottom" | "left" | "right";
export type ProjectionPlane =
  | "XY"
  | "XZ"
  | "YZ"
  | "YX"
  | "ZX"
  | "ZY"
  | "front"
  | "back"
  | "top"
  | "bottom"
  | "left"
  | "right";

const PROJECTION_PLANES: Record<ProjectionPlane, { dir: Point; xAxis: Point }> =
  {
    XY: { dir: [0, 0, 1], xAxis: [1, 0, 0] },
    XZ: { dir: [0, -1, 0], xAxis: [1, 0, 0] },
    YZ: { dir: [1, 0, 0], xAxis: [0, 1, 0] },
    YX: { dir: [0, 0, -1], xAxis: [0, 1, 0] },
    ZX: { dir: [0, 1, 0], xAxis: [0, 0, 1] },
    ZY: { dir: [-1, 0, 0], xAxis: [0, 0, 1] },

    front: { dir: [0, -1, 0], xAxis: [1, 0, 0] },
    back: { dir: [0, 1, 0], xAxis: [-1, 0, 0] },
    right: { dir: [-1, 0, 0], xAxis: [0, -1, 0] },
    left: { dir: [1, 0, 0], xAxis: [0, 1, 0] },
    bottom: { dir: [0, 0, 1], xAxis: [1, 0, 0] },
    top: { dir: [0, 0, -1], xAxis: [1, 0, 0] },
  };

export function isProjectionPlane(plane: unknown): plane is ProjectionPlane {
  return typeof plane === "string" && plane in PROJECTION_PLANES;
}

export function lookFromPlane(projectionPlane: ProjectionPlane) {
  const { dir, xAxis } = PROJECTION_PLANES[projectionPlane];
  return new ProjectionCamera([0, 0, 0], dir, xAxis);
}

function defaultXDir(direction: Point) {
  const dir = new Vector(direction);
  let yAxis: Point = new Vector([0, 0, 1]);
  let xAxis: Point = yAxis.cross(dir);
  if (xAxis.Length === 0) {
    yAxis = new Vector([0, 1, 0]);
    xAxis = yAxis.cross(dir);
  }
  return xAxis.normalize();
}

export class ProjectionCamera extends WrappingObj<gp_Ax2> {
  constructor(
    position: Point = [0, 0, 0],
    direction: Point = [0, 0, 1],
    xAxis?: Point
  ) {
    const xDir = xAxis ? new Vector(xAxis) : defaultXDir(direction);
    const ax2 = makeAx2(position, direction, xDir);
    super(ax2);
  }

  get position() {
    return new Vector(this.wrapped.Location());
  }

  get direction() {
    return new Vector(this.wrapped.Direction());
  }

  get xAxis() {
    return new Vector(this.wrapped.XDirection());
  }

  get yAxis() {
    return new Vector(this.wrapped.YDirection());
  }

  autoAxes() {
    const xAxis = defaultXDir(this.direction);
    this.wrapped.SetXDirection(asDir(xAxis));
  }

  setPosition(position: Point) {
    this.wrapped.SetLocation(asPnt(position));
    return this;
  }

  setXAxis(xAxis: Point) {
    this.wrapped.SetYDirection(asDir(xAxis));
    return this;
  }

  setYAxis(yAxis: Point) {
    this.wrapped.SetYDirection(asDir(yAxis));
    return this;
  }

  lookAt(shape: { boundingBox: BoundingBox } | Point) {
    const lootAtPoint = new Vector(
      "boundingBox" in shape ? shape.boundingBox.center : shape
    );
    const direction = this.position.sub(lootAtPoint).normalized();

    this.wrapped.SetDirection(direction.toDir());
    this.autoAxes();
    return this;
  }
}
