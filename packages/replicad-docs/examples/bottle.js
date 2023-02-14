const defaultParams = {
  width: 50,
  height: 70,
  thickness: 30,
};

const { draw, makeCylinder, makeOffset, FaceFinder } = replicad;

const main = (
  r,
  { width: myWidth, height: myHeight, thickness: myThickness }
) => {
  let shape = draw([-myWidth / 2, 0])
    .vLine(-myThickness / 4)
    .threePointsArc(myWidth, 0, myWidth / 2, -myThickness / 4)
    .vLine(myThickness / 4)
    .closeWithMirror()
    .sketchOnPlane()
    .extrude(myHeight)
    .fillet(myThickness / 12);

  const myNeckRadius = myThickness / 4;
  const myNeckHeight = myHeight / 10;
  const neck = makeCylinder(
    myNeckRadius,
    myNeckHeight,
    [0, 0, myHeight],
    [0, 0, 1]
  );

  shape = shape.fuse(neck);

  shape = shape.shell(myThickness / 50, (f) =>
    f.inPlane("XY", [0, 0, myHeight + myNeckHeight])
  );

  const neckFace = new FaceFinder()
    .containsPoint([0, myNeckRadius, myHeight])
    .ofSurfaceType("CYLINDRE")
    .find(shape.clone(), { unique: true });

  const bottomThreadFace = makeOffset(neckFace, -0.01 * myNeckRadius).faces[0];
  const baseThreadSketch = draw([0.75, 0.25])
    .halfEllipse(2, 0.5, 0.1)
    .close()
    .sketchOnFace(bottomThreadFace, "bounds");

  const topThreadFace = makeOffset(neckFace, 0.05 * myNeckRadius).faces[0];
  const topThreadSketch = draw([0.75, 0.25])
    .halfEllipse(2, 0.5, 0.05)
    .close()
    .sketchOnFace(topThreadFace, "bounds");

  const thread = baseThreadSketch.loftWith(topThreadSketch);

  return shape.fuse(thread);
};
