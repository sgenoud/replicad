import { localGC } from "../register";
import { ExtrudeUntilOptions } from "./lib";
import { Point, AxisName } from "../geom.js";
import { compoundShapes } from "../shapeHelpers.js";
import { ExtrusionProfile } from "../addThickness.js";
import { AnyShape, Face, Shape3D } from "../shapes.js";

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

  /**
   * Extrudes each sketch up to the same limiting face, returning only the
   * extrusions. The face is not consumed. Each sketch uses its default
   * direction unless overridden and is consumed when its extrusion succeeds.
   */
  extrudeUntil(
    limitingFace: Face,
    extrusionConfig: ExtrudeUntilOptions = {}
  ): Shape3D {
    const [r, gc] = localGC();
    try {
      const solids = this.sketches.map((sketch) =>
        r(sketch.extrudeUntil(limitingFace, extrusionConfig))
      );
      return compoundShapes(solids).asShape3D();
    } finally {
      gc();
    }
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
  revolve(
    revolutionAxis?: Point | AxisName,
    config?: { origin?: Point; angle?: number }
  ): AnyShape {
    return compoundShapes(
      this.sketches.map((s) => s.revolve(revolutionAxis, config))
    );
  }
}
