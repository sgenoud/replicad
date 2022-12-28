import { Point2D, BoundingBox2d } from "../lib2d";
import Blueprint from "./Blueprint";
import { DrawingInterface } from "./lib";
import { asSVG, viewbox } from "./svg";

import { Face } from "../shapes";

import { Plane, PlaneName, Point } from "../geom";

import { ScaleMode } from "../curves";
import CompoundSketch from "../sketches/CompoundSketch";

export default class CompoundBlueprint implements DrawingInterface {
  blueprints: Blueprint[];
  protected _boundingBox: BoundingBox2d | null;

  constructor(blueprints: Blueprint[]) {
    this.blueprints = blueprints;
    this._boundingBox = null;
  }

  clone() {
    return new CompoundBlueprint(this.blueprints);
  }

  get boundingBox(): BoundingBox2d {
    if (!this._boundingBox) {
      const box = new BoundingBox2d();
      this.blueprints.forEach((b) => box.add(b.boundingBox));
      this._boundingBox = box;
    }
    return this._boundingBox;
  }

  stretch(
    ratio: number,
    direction: Point2D,
    origin: Point2D
  ): CompoundBlueprint {
    return new CompoundBlueprint(
      this.blueprints.map((bp) => bp.stretch(ratio, direction, origin))
    );
  }

  rotate(angle: number, center: Point2D): CompoundBlueprint {
    return new CompoundBlueprint(
      this.blueprints.map((bp) => bp.rotate(angle, center))
    );
  }

  scale(scaleFactor: number, center?: Point2D): CompoundBlueprint {
    const centerPoint = center || this.boundingBox.center;
    return new CompoundBlueprint(
      this.blueprints.map((bp) => bp.scale(scaleFactor, centerPoint))
    );
  }

  translate(xDist: number, yDist: number): CompoundBlueprint;
  translate(translationVector: Point2D): CompoundBlueprint;
  translate(xDistOrPoint: number | Point2D, yDist = 0): CompoundBlueprint {
    return new CompoundBlueprint(
      this.blueprints.map((bp) => bp.translate(xDistOrPoint as any, yDist))
    );
  }

  mirror(
    centerOrDirection: Point2D,
    origin?: Point2D,
    mode?: "center" | "plane"
  ): CompoundBlueprint {
    return new CompoundBlueprint(
      this.blueprints.map((bp) => bp.mirror(centerOrDirection, origin, mode))
    );
  }

  sketchOnPlane(
    plane?: PlaneName | Plane,
    origin?: Point | number
  ): CompoundSketch {
    const sketches = this.blueprints.map((blueprint) =>
      blueprint.sketchOnPlane(plane, origin)
    );

    return new CompoundSketch(sketches);
  }

  sketchOnFace(face: Face, scaleMode?: ScaleMode): CompoundSketch {
    const sketches = this.blueprints.map((blueprint) =>
      blueprint.sketchOnFace(face, scaleMode)
    );

    return new CompoundSketch(sketches);
  }

  toSVGViewBox(margin = 1) {
    return viewbox(this.boundingBox, margin);
  }

  toSVGPaths() {
    return this.blueprints.flatMap((bp) => bp.toSVGPaths());
  }

  toSVGGroup() {
    return `<g>${this.blueprints.map((b) => b.toSVGPath())}</g>`;
  }

  toSVG(margin = 1) {
    return asSVG(this.toSVGGroup(), this.boundingBox, margin);
  }
}
