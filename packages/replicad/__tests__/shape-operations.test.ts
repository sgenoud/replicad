import { expect, test } from "vitest";
import {
  cast,
  cutShape,
  fuseShapes,
  intersectShapes,
  isShape3D,
  makeBaseBox,
  measureVolume,
  shellShape,
  topMost,
} from "../src/index";

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
