import { Point } from "../geom.js";
import { compoundShapes } from "../shapeHelpers.js";
import { ExtrusionProfile } from "../addThickness.js";
import { AnyShape } from "../shapes.js";

import CompoundSketch from "./CompoundSketch";
import Sketch from "./Sketch";

export default class Sketches {
  sketches: Array<Sketch | CompoundSketch>;

  constructor(sketches: Array<Sketch | CompoundSketch>) {
    this.sketches = sketches;
  }

  wires(): AnyShape {
    const wires = this.sketches.map((s) =>
      s instanceof Sketch ? s.wire : s.wires
    );
    return compoundShapes(wires);
  }

  faces(): AnyShape {
    const faces = this.sketches.map((s) => s.face());
    return compoundShapes(faces);
  }

  /** Extrudes the sketch to a certain distance.(along the default direction
   * and origin of the sketch).
   *
   * You can define another extrusion direction or origin,
   *
   * It is also possible to twist extrude with an angle (in degrees), or to
   * give a profile to the extrusion (the endFactor will scale the face, and
   * the profile will define how the scale is applied (either linarly or with
   * a s-shape).
   */
  extrude(
    extrusionDistance: number,
    extrusionConfig: {
      extrusionDirection?: Point;
      extrusionProfile?: ExtrusionProfile;
      twistAngle?: number;
      origin?: Point;
    } = {}
  ): AnyShape {
    const extruded = this.sketches.map((s) =>
      s.extrude(extrusionDistance, extrusionConfig)
    );

    return compoundShapes(extruded);
  }

  /**
   * Revolves the drawing on an axis (defined by its direction and an origin
   * (defaults to the sketch origin)
   */
  revolve(revolutionAxis?: Point, config?: { origin?: Point }): AnyShape {
    return compoundShapes(
      this.sketches.map((s) => s.revolve(revolutionAxis, config))
    );
  }
}
