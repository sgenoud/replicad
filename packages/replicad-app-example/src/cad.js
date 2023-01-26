import { drawRoundedRectangle } from "replicad";

// The replicad code! Not much there!
export function drawBox(thickness) {
  return drawRoundedRectangle(30, 50)
    .sketchOnPlane()
    .extrude(20)
    .shell(thickness, (f) => f.inPlane("XY", 20));
}
