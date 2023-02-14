const defaultParams = {
  height: 85.0,
  width: 120.0,
  thickness: 2.0,
  holeDia: 50.0,
  hookHeight: 10.0,
};

const { drawCircle, draw, makePlane } = replicad;

function main(
  r,
  { width: inputWidth, height, thickness, holeDia, hookHeight }
) {
  const length = inputWidth;
  const width = inputWidth * 0.9;

  const tobleroneShape = draw([-width / 2, 0])
    .lineTo([0, height])
    .lineTo([width / 2, 0])
    .close()
    .sketchOnPlane("XZ", -length / 2)
    .extrude(length)
    .shell(thickness, (f) => f.parallelTo("XZ"))
    .fillet(thickness / 2, (e) =>
      e
        .inDirection("Y")
        .either([(f) => f.inPlane("XY"), (f) => f.inPlane("XY", height)])
    );

  const hole = drawCircle(holeDia / 2)
    .sketchOnPlane(makePlane("YZ").translate([-length / 2, 0, height / 3]))
    .extrude(length);

  const base = tobleroneShape.cut(hole);
  const body = base.clone().fuse(base.rotate(90));

  const hookWidth = length / 2;
  const hook = draw([0, hookHeight / 2])
    .smoothSplineTo([hookHeight / 2, 0], -45)
    .lineTo([hookWidth / 2, 0])
    .line(-hookWidth / 4, hookHeight / 2)
    .smoothSplineTo([0, hookHeight], {
      endTangent: 180,
      endFactor: 0.6,
    })
    .closeWithMirror()
    .sketchOnPlane("XZ")
    .extrude(thickness)
    .translate([0, thickness / 2, height - thickness / 2]);

  return body.fuse(hook);
}
