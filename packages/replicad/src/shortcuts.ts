import { Shape3D } from "./shapes";
import Sketcher from "./Sketcher";

/**
 * Builds a rectangular box of the given lengths.
 *
 * The box is centred on the origin in X and Y (spanning `[-x/2, +x/2]` and
 * `[-y/2, +y/2]`) and corner-based in Z (spanning `[0, +z]`). Translate by
 * `[0, 0, -z/2]` to centre the box fully, or use {@link makeBox} when you
 * want explicit two-corner control.
 *
 * @example
 * const slab = makeBaseBox(30, 50, 10);
 * // slab spans x: [-15, 15], y: [-25, 25], z: [0, 10]
 *
 * @category Solids
 */
export const makeBaseBox = (
  xLength: number,
  yLength: number,
  zLength: number
): Shape3D => {
  return new Sketcher()
    .movePointerTo([-xLength / 2, yLength / 2])
    .hLine(xLength)
    .vLine(-yLength)
    .hLine(-xLength)
    .close()
    .extrude(zLength);
};
