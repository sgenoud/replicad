import { sketchRectangle, FaceFinder } from "replicad";

// The replicad code! Not much there!
export function drawBox(thickness) {
  return sketchRectangle(30, 50)
    .extrude(20)
    .shell({
      filter: new FaceFinder().inPlane("XY", 20),
      thickness,
    });
}
