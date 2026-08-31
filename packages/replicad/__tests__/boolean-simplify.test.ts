import { expect, test } from "vitest";
import { FaceFinder, makeBaseBox, measureVolume } from "../src/index";

/**
 * Booleans end with `SimplifyResult`, which merges coplanar faces. That is usually what you
 * want, but on some shapes it turns a valid solid into an invalid one, and the damage only
 * surfaces later: a subsequent boolean returns an empty result while reporting no error.
 *
 * `simplify: false` gives callers a way out. Two boxes sharing a face make the effect easy to
 * see: simplified, the union is a single box (6 faces); unsimplified, the shared plane stays
 * split, so there are more.
 */
const faces = (shape: any): number => new FaceFinder().find(shape).length;

const twoBoxes = (): [any, any] => [
  makeBaseBox(10, 10, 10),
  makeBaseBox(10, 10, 10).translate([10, 0, 0]),
];

test("fuse simplifies coplanar faces by default", () => {
  const [a, b] = twoBoxes();
  expect(faces(a.fuse(b))).toBe(6);
});

test("fuse keeps the untouched result when simplify is false", () => {
  const [a, b] = twoBoxes();
  expect(faces(a.fuse(b, { simplify: false }))).toBeGreaterThan(6);
});

test("fuse with simplify: false preserves the volume", () => {
  const [a, b] = twoBoxes();
  const [c, d] = twoBoxes();
  expect(measureVolume(c.fuse(d, { simplify: false }))).toBeCloseTo(
    measureVolume(a.fuse(b)),
    6
  );
});

test("cut and intersect accept the same option", () => {
  const box = () => makeBaseBox(10, 10, 10);
  const tool = () => makeBaseBox(4, 4, 40).translate([0, 0, -20]);
  expect(measureVolume(box().cut(tool(), { simplify: false }))).toBeCloseTo(
    measureVolume(box().cut(tool())),
    6
  );
  expect(measureVolume(box().intersect(tool(), { simplify: false }))).toBeCloseTo(
    measureVolume(box().intersect(tool())),
    6
  );
});
