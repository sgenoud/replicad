import { expect, test } from "vitest";
import { cast, isShape3D, makeBaseBox, measureVolume } from "../src/index";
import { chamferShape, filletShape } from "../src/shapeFunctions/index";

const asVolume = (rawShape: ReturnType<typeof filletShape>): number => {
  const shape = cast(rawShape);
  expect(isShape3D(shape)).toBe(true);
  if (!isShape3D(shape)) throw new Error("Expected a 3D shape");

  const volume = measureVolume(shape);
  shape.delete();
  return volume;
};

test("standalone fillet accepts explicit edge configurations", () => {
  const shape = makeBaseBox(10, 10, 10);
  const edges = shape.edges;
  const directVolume = asVolume(
    filletShape(
      shape,
      edges.map((edge) => ({ edge, radius: 1 }))
    )
  );

  const methodResult = shape.fillet(1);
  expect(measureVolume(methodResult)).toBeCloseTo(directVolume);

  methodResult.delete();
  edges.forEach((edge) => edge.delete());
  shape.delete();
});

test("standalone chamfer accepts explicit edge configurations", () => {
  const shape = makeBaseBox(10, 10, 10);
  const edges = shape.edges;
  const directVolume = asVolume(
    chamferShape(
      shape.wrapped,
      edges.map((edge) => ({ edge: edge.wrapped, radius: 1 }))
    )
  );

  const methodResult = shape.chamfer(1);
  expect(measureVolume(methodResult)).toBeCloseTo(directVolume);

  methodResult.delete();
  edges.forEach((edge) => edge.delete());
  shape.delete();
});
