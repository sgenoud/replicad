const { draw, deserializeDrawing, deserializeShape } = replicad;

const main = () => {
  const baseWidth = 20;
  const height = 100;

  // Create 2d Drawing
  const profile = draw()
    .hLine(baseWidth)
    .smoothSplineTo([baseWidth * 1.5, height * 0.2], {
      endTangent: [0, 1],
    })
    .smoothSplineTo([baseWidth * 0.7, height * 0.7], {
      endTangent: [0, 1],
      startFactor: 3,
    })
    .smoothSplineTo([baseWidth, height], {
      endTangent: [0, 1],
      startFactor: 3,
    })
    .lineTo([0, height])
    .close();

  // Create a Shape
  const solid = profile
    .sketchOnPlane("XZ")
    .revolve()
    .shell(5, (f) => f.containsPoint([0, 0, height]))
    .fillet(1.7, (e) => e.inPlane("XY", height));

  // Example serializing and deserializing a 2D Drawing
  const drawingStr = profile.serialize();
  console.log("serialized drawing: ");
  console.log(drawingStr);
  const deserializedDrawing = deserializeDrawing(drawingStr);

  // Example serializing and deserializing a 3D Shape
  const solidStr = solid.serialize();
  console.log("serialized 3d solid: ");
  console.log(solidStr);
  const deserializedShape = deserializeShape(solidStr);

  // Example serializing a shape directly to the virtual FS
  const oc = replicad.getOC();
  oc.BinTools.Write_3(
    solid._wrapped,
    "some_file.brep",
    new oc.Message_ProgressRange_1()
  );
  console.log("serialized to file contents: ");
  console.log(oc.FS.readFile("some_file.brep"));
  const resultShape = profile.sketchOnPlane("XZ").extrude(3);
  oc.BinTools.Read_2(
    resultShape._wrapped,
    "some_file.brep",
    new oc.Message_ProgressRange_1()
  );
  // resultShape now contains the deseralized object.
  // Note this silently fails if file isn't found

  return deserializedShape;
};
