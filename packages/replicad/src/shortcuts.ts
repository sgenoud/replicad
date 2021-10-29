import { Shape3D } from "./shapes";
import Sketcher from "./Sketcher";

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
