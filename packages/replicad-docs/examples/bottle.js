const defaultParams = {
  width: 50,
  height: 70,
  thickness: 30,
};

const main = (
  { Sketcher, FaceSketcher, localGC, makeCylinder, makeOffset, FaceFinder },
  { width: myWidth, height: myHeight, thickness: myThickness }
) => {
  let shape = new Sketcher()
    .movePointerTo([-myWidth / 2, 0])
    .vLine(-myThickness / 4)
    .threePointsArc(myWidth, 0, myWidth / 2, -myThickness / 4)
    .vLine(myThickness / 4)
    .closeWithMirror()
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

  shape = shape.shell({
    filter: new FaceFinder().inPlane("XY", [0, 0, myHeight + myNeckHeight]),
    thickness: myThickness / 50,
  });

  const [r, gc] = localGC();

  const neckFace = r(
    new FaceFinder()
      .containsPoint([0, myNeckRadius, myHeight])
      .ofSurfaceType("CYLINDRE")
      .find(shape.clone(), { unique: true })
  );

  const bottomThreadFace = r(
    r(makeOffset(neckFace, -0.01 * myNeckRadius)).faces[0]
  );
  const baseThreadSketch = new FaceSketcher(bottomThreadFace)
    .movePointerTo([0.75, 0.25])
    .halfEllipse(2, 0.5, 0.1)
    .close();

  const topThreadFace = r(
    r(makeOffset(neckFace, 0.05 * myNeckRadius)).faces[0]
  );
  const topThreadSketch = new FaceSketcher(topThreadFace)
    .movePointerTo([0.75, 0.25])
    .halfEllipse(2, 0.5, 0.05)
    .close();

  const thread = baseThreadSketch.loftWith(topThreadSketch);
  gc();

  return shape.fuse(thread);
};
