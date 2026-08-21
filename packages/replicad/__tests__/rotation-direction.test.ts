import { expect, test } from "vitest";
import {
  asDir,
  EdgeFinder,
  makeBaseBox,
  makeDirection,
  makeDirVector,
  resolveDirection,
} from "../src/index";
import type { Direction } from "../src/index";

test("resolves positive and negative named directions", () => {
  const directions: [Direction, number[]][] = [
    ["X", [1, 0, 0]],
    ["Y", [0, 1, 0]],
    ["Z", [0, 0, 1]],
    ["-X", [-1, 0, 0]],
    ["-Y", [0, -1, 0]],
    ["-Z", [0, 0, -1]],
  ];

  for (const [input, expected] of directions) {
    const direction = asDir(input);
    expect([direction.X(), direction.Y(), direction.Z()]).toEqual(expected);
    direction.delete();
  }

  expect(makeDirection).toBe(resolveDirection);
});

test("creates a vector without changing its magnitude", () => {
  const direction = makeDirVector([2, 0, 0]);

  expect(direction.toTuple()).toEqual([2, 0, 0]);

  direction.delete();
});

test("rejects an unknown named direction at runtime", () => {
  const expectedError =
    'Invalid direction "north". Expected one of: X, Y, Z, -X, -Y, -Z.';

  // @ts-expect-error JavaScript callers can pass values outside Direction.
  expect(() => resolveDirection("north")).toThrowError(expectedError);

  const finder = new EdgeFinder();
  // @ts-expect-error JavaScript callers can pass values outside Direction.
  expect(() => finder.inDirection("north")).toThrowError(expectedError);
});

test("finders accept point and named directions", () => {
  const shape = makeBaseBox(1, 2, 3);
  const axes: Direction[] = [[1, 0, 0], "X", "-X"];

  for (const axis of axes) {
    const edges = new EdgeFinder().inDirection(axis).find(shape);
    expect(edges).toHaveLength(4);
    edges.forEach((edge) => edge.delete());
  }

  shape.delete();
});

test("rotates a shape around a point or named direction", () => {
  const axes: Direction[] = [[1, 0, 0], "X", "-X"];

  for (const axis of axes) {
    const rotated = makeBaseBox(1, 2, 3).rotate(90, [0, 0, 0], axis);
    const bounds = rotated.boundingBox;

    expect(bounds.width).toBeCloseTo(1);
    expect(bounds.height).toBeCloseTo(3);
    expect(bounds.depth).toBeCloseTo(2);

    bounds.delete();
    rotated.delete();
  }
});
