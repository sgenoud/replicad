import "./setup";
import { describe, it, expect } from "vitest";
import { sketchRectangle } from "../src/index";
import type { Direction } from "../src/index";

describe("revolve with angle parameter", () => {
  it("creates a full revolution by default (360°)", () => {
    const axes: Direction[] = [[0, 0, 1], "Z"];

    for (const axis of axes) {
      const shape = sketchRectangle(5, 3, { origin: [10, 0] }).revolve(axis);
      expect(shape).toBeTruthy();
      // Full revolution creates a closed solid (torus-like)
      const bbox = shape.boundingBox;
      expect(bbox.width).toBeGreaterThan(0);
    }
  });

  it("creates a partial revolution with angle=180", () => {
    const axes: Direction[] = [[0, 0, 1], "Z"];

    for (const axis of axes) {
      const full = sketchRectangle(5, 3, { origin: [10, 0] }).revolve(axis);
      const half = sketchRectangle(5, 3, { origin: [10, 0] }).revolve(axis, {
        angle: 180
      });
      expect(half).toBeTruthy();
      // Half revolution should be roughly half the width of full
      const fullBox = full.boundingBox;
      const halfBox = half.boundingBox;
      expect(halfBox.width).toBeLessThan(fullBox.width * 1.1);
      expect(halfBox.width).toBeGreaterThan(0);
    }
  });

  it("creates a quarter revolution with angle=90", () => {
    const axes: Direction[] = [[0, 0, 1], "Z"];

    for (const axis of axes) {
      const quarter = sketchRectangle(5, 3, { origin: [10, 0] }).revolve(axis, {
        angle: 90
      });
      expect(quarter).toBeTruthy();
      const bbox = quarter.boundingBox;
      expect(bbox.width).toBeGreaterThan(0);
      expect(bbox.height).toBeGreaterThan(0);
    }
  });

  it("supports origin parameter alongside angle", () => {
    const axes: Direction[] = [[0, 0, 1], "Z"];

    for (const axis of axes) {
      const shape = sketchRectangle(5, 3).revolve(axis, {
        origin: [10, 0, 0],
        angle: 270
      });
      expect(shape).toBeTruthy();
      const bbox = shape.boundingBox;
      expect(bbox.width).toBeGreaterThan(0);
    }
  });
});
