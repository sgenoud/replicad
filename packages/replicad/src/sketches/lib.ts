import { Face, Shape3D } from "../shapes";
import { Point } from "../geom";

import { ExtrusionProfile, LoftConfig } from "../addThickness.js";

export interface SketchInterface {
  /**
   * Transforms the lines into a face. The lines should be closed.
   */
  face(): Face;

  /**
   * Revolves the drawing on an axis (defined by its direction and an origin
   * (defaults to the sketch origin)
   */
  revolve(revolutionAxis?: Point, config?: { origin?: Point }): Shape3D;

  /**
   * Extrudes the sketch to a certain distance.(along the default direction
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
    extrusionConfig?: {
      extrusionDirection?: Point;
      extrusionProfile?: ExtrusionProfile;
      twistAngle?: number;
      origin?: Point;
    }
  ): Shape3D;

  /**
   * Loft between this sketch and another sketch (or an array of them)
   *
   * You can also define a `startPoint` for the loft (that will be placed
   * before this sketch) and an `endPoint` after the last one.
   *
   * You can also define if you want the loft to result in a ruled surface.
   *
   * Note that all sketches will be deleted by this operation
   */
  loftWith(
    otherSketches: this | this[],
    loftConfig: LoftConfig,
    returnShell?: boolean
  ): Shape3D;
}
