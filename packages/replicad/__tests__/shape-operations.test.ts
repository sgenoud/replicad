import { expect, test } from "vitest";
import {
  cast,
  Compound,
  FaceFinder,
  isShape3D,
  makeBaseBox,
  makePlane,
  measureVolume,
  topMost,
} from "../src/index";
import {
  cutShape,
  draftShape,
  fuseShapes,
  intersectShapes,
  shellShape,
  splitShape,
} from "../src/shapeFunctions/index";

const volumeOf = (rawShape: ReturnType<typeof fuseShapes>): number => {
  const shape = cast(rawShape);
  expect(isShape3D(shape)).toBe(true);
  if (!isShape3D(shape)) throw new Error("Expected a 3D shape");

  const volume = measureVolume(shape);
  shape.delete();
  return volume;
};

test("standalone boolean operations accept wrapped and raw shapes", () => {
  const left = makeBaseBox(10, 10, 10);
  const right = makeBaseBox(10, 10, 10).translateX(5);

  expect(volumeOf(fuseShapes(left, right.wrapped))).toBeCloseTo(1500);
  expect(volumeOf(cutShape(left.wrapped, right))).toBeCloseTo(500);
  expect(volumeOf(intersectShapes(left, right))).toBeCloseTo(500);

  const methodResult = left.fuse(right);
  expect(measureVolume(methodResult)).toBeCloseTo(1500);
  methodResult.delete();

  left.delete();
  right.delete();
});

test("split separates pieces by side and accepts a plane offset", () => {
  const shape = makeBaseBox(10, 10, 10);
  const result = shape.split("XY", 4);

  expect(result.positive).not.toBeInstanceOf(Compound);
  expect(result.negative).not.toBeInstanceOf(Compound);
  expect(result.on).toBeNull();
  expect(measureVolume(result.positive!.asShape3D())).toBeCloseTo(600);
  expect(measureVolume(result.negative!.asShape3D())).toBeCloseTo(400);

  result.positive!.delete();
  result.negative!.delete();
  shape.delete();
});

test("split returns a compound when one side has multiple pieces", () => {
  const block = makeBaseBox(6, 2, 4);
  const notch = makeBaseBox(2, 4, 3).translateZ(1);
  const shape = block.cut(notch);
  const plane = makePlane("XY", 2);
  const result = shape.split(plane);

  expect(result.positive).toBeInstanceOf(Compound);
  expect(result.negative).not.toBeInstanceOf(Compound);
  const positivePieces = result.positive!.solids;
  expect(positivePieces).toHaveLength(2);

  positivePieces.forEach((piece) => piece.delete());
  result.positive!.delete();
  result.negative!.delete();
  plane.delete();
  shape.delete();
  block.delete();
  notch.delete();
});

test("standalone split accepts wrapped shapes and leaves missed shapes whole", () => {
  const shape = makeBaseBox(10, 10, 10);
  const result = splitShape(shape, "XY", 20);

  expect(result.positive).toBeNull();
  expect(result.negative).not.toBeNull();
  expect(result.on).toBeNull();
  const piece = cast(result.negative!);
  expect(measureVolume(piece.asShape3D())).toBeCloseTo(1000);

  piece.delete();
  shape.delete();
});

test("standalone draft operation accepts explicitly selected faces", () => {
  const shape = makeBaseBox(10, 10, 10);
  const faces = new FaceFinder().atAngleWith("X").find(shape);
  const drafted = cast(
    draftShape(shape, { faces, angle: 5, neutralPlane: "XY" })
  );

  expect(isShape3D(drafted)).toBe(true);

  const methodInput = makeBaseBox(10, 10, 10);
  const methodResult = methodInput.draft(
    5,
    (finder) => finder.atAngleWith("X"),
    "XY"
  );
  expect(isShape3D(methodResult)).toBe(true);

  drafted.delete();
  methodResult.delete();
  methodInput.delete();
  faces.forEach((face) => face.delete());
  shape.delete();
});

test("standalone shell operation accepts explicitly selected faces", () => {
  const shape = makeBaseBox(10, 10, 10);
  const faces = shape.faces;
  let topFace = faces[0];
  let topZ = -Infinity;

  for (const face of faces) {
    const center = face.center;
    if (center.z > topZ) {
      topZ = center.z;
      topFace = face;
    }
    center.delete();
  }

  const shelled = cast(shellShape(shape, { faces: [topFace], thickness: 1 }));
  expect(isShape3D(shelled)).toBe(true);
  if (!isShape3D(shelled)) throw new Error("Expected a 3D shape");

  const directVolume = measureVolume(shelled);
  expect(directVolume).toBeGreaterThan(0);
  expect(directVolume).toBeLessThan(1000);

  const methodInput = makeBaseBox(10, 10, 10);
  const methodResult = methodInput.shell(1, (finder, target) =>
    finder.when(topMost(target)).parallelTo("XY")
  );
  expect(measureVolume(methodResult)).toBeCloseTo(directVolume);

  methodResult.delete();
  methodInput.delete();
  shelled.delete();
  faces.forEach((face) => face.delete());
  shape.delete();
});
