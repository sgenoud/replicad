import { Point2D, BoundingBox2d } from "../lib2d";
import Blueprint from "./Blueprint";
import CompoundBlueprint from "./CompoundBlueprint";
import { BlueprintInterface } from "./lib";

import { Face } from "../shapes";

import { Plane, PlaneName, Point } from "../geom";

import { ScaleMode } from "../curves";
import Sketches from "../sketches/Sketches";

export default class Blueprints implements BlueprintInterface {
  blueprints: Array<Blueprint | CompoundBlueprint>;
  protected _boundingBox: BoundingBox2d | null;
  constructor(blueprints: Array<Blueprint | CompoundBlueprint>) {
    this.blueprints = blueprints;
    this._boundingBox = null;
  }

  get boundingBox(): BoundingBox2d {
    if (!this._boundingBox) {
      const box = new BoundingBox2d();
      this.blueprints.forEach((b) => box.add(b.boundingBox));
      this._boundingBox = box;
    }
    return this._boundingBox;
  }

  stretch(ratio: number, direction: Point2D, origin: Point2D): Blueprints {
    return new Blueprints(
      this.blueprints.map((bp) => bp.stretch(ratio, direction, origin))
    );
  }

  rotate(angle: number, center: Point2D): Blueprints {
    return new Blueprints(
      this.blueprints.map((bp) => bp.rotate(angle, center))
    );
  }

  translate(xDist: number, yDist: number): Blueprints {
    return new Blueprints(
      this.blueprints.map((bp) => bp.translate(xDist, yDist))
    );
  }

  mirror(
    centerOrDirection: Point2D,
    origin?: Point2D,
    mode?: "center" | "plane"
  ): Blueprints {
    return new Blueprints(
      this.blueprints.map((bp) => bp.mirror(centerOrDirection, origin, mode))
    );
  }

  sketchOnPlane(plane: Plane): Sketches;
  sketchOnPlane(plane?: PlaneName, origin?: Point | number): Sketches;
  sketchOnPlane(plane?: PlaneName | Plane, origin?: Point | number): Sketches {
    return new Sketches(
      this.blueprints.map((bp) =>
        plane ? bp.sketchOnPlane() : bp.sketchOnPlane(plane, origin)
      )
    );
  }

  sketchOnFace(face: Face, scaleMode?: ScaleMode): Sketches {
    return new Sketches(
      this.blueprints.map((bp) => bp.sketchOnFace(face, scaleMode))
    );
  }
}
