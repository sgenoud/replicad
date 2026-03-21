import { WrappingObj, GCWithScope } from "../register.js";
import { getOC } from "../oclib.js";
import { Bnd_Box2d } from "replicad-opencascadejs";

import { Point2D } from "./definitions.js";
import { reprPnt } from "./utils.js";
import { pnt } from "./ocWrapper.js";

export class BoundingBox2d extends WrappingObj<Bnd_Box2d> {
  constructor(wrapped?: Bnd_Box2d) {
    const oc = getOC();
    let boundBox = wrapped;
    if (!boundBox) {
      boundBox = new oc.Bnd_Box2d();
    }
    super(boundBox);
  }

  get repr(): string {
    const [min, max] = this.bounds;
    return `${reprPnt(min)} - ${reprPnt(max)}`;
  }

  get bounds(): [Point2D, Point2D] {
    return [
      [this.wrapped.GetXMin(), this.wrapped.GetYMin()],
      [this.wrapped.GetXMax(), this.wrapped.GetYMax()],
    ];
  }

  get center(): Point2D {
    const [[xmin, ymin], [xmax, ymax]] = this.bounds;
    return [xmin + (xmax - xmin) / 2, ymin + (ymax - ymin) / 2];
  }

  get width(): number {
    const [[xmin], [xmax]] = this.bounds;
    return Math.abs(xmax - xmin);
  }

  get height(): number {
    const [[, ymin], [, ymax]] = this.bounds;
    return Math.abs(ymax - ymin);
  }

  outsidePoint(paddingPercent = 1): Point2D {
    const [min, max] = this.bounds;
    const width = max[0] - min[0];
    const height = max[1] - min[1];

    return [
      max[0] + (width / 100) * paddingPercent,
      max[1] + (height / 100) * paddingPercent * 0.9,
    ];
  }

  add(other: BoundingBox2d) {
    this.wrapped.Add(other.wrapped);
  }

  isOut(other: BoundingBox2d): boolean {
    return this.wrapped.IsOut(other.wrapped);
  }

  containsPoint(other: Point2D): boolean {
    const r = GCWithScope();
    const point = r(pnt(other));
    return !this.wrapped.IsOut(point);
  }
}
