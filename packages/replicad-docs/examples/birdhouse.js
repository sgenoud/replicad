const defaultParams = {
  height: 85.0,
  width: 120.0,
  thickness: 2.0,
  holeDia: 50.0,
  hookHeight: 10.0,
};

/** @typedef { typeof import("replicad") } replicadLib */
/** @type {function(replicadLib, typeof defaultParams): any} */
function main(
  { Sketcher, sketchCircle },
  { width: inputWidth, height, thickness, holeDia, hookHeight }
) {
  const length = inputWidth;
  const width = inputWidth * 0.9;

  const tobleroneShape = new Sketcher("XZ", -length / 2)
    .movePointerTo([-width / 2, 0])
    .lineTo([0, height])
    .lineTo([width / 2, 0])
    .close()
    .extrude(length)
    .shell(thickness, (f) => f.parallelTo("XZ"))
    .fillet(thickness / 2, (e) =>
      e
        .inDirection("Y")
        .either([(f) => f.inPlane("XY"), (f) => f.inPlane("XY", height)])
    );

  const hole = sketchCircle(holeDia / 2, {
    plane: "YZ",
    origin: [-length / 2, 0, height / 3],
  }).extrude(length);

  const base = tobleroneShape.cut(hole);
  const body = base.clone().fuse(base.rotate(90));

  const hookWidth = length / 2;
  const hook = new Sketcher("XZ")
    .movePointerTo([0, hookHeight / 2])
    .smoothSplineTo([hookHeight / 2, 0], -45)
    .lineTo([hookWidth / 2, 0])
    .line(-hookWidth / 4, hookHeight / 2)
    .smoothSplineTo([0, hookHeight], {
      endTangent: 180,
      endFactor: 0.6,
    })
    .closeWithMirror()
    .extrude(thickness)
    .translate([0, thickness / 2, height - thickness / 2]);

  return body.fuse(hook);
}
