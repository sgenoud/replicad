import { expect, test } from "vitest";
import {
  CompoundBlueprint,
  drawRectangle,
  measureVolume,
  organiseBlueprints,
} from "../../src/index";

function permutations<T>(items: T[]): T[][] {
  if (items.length === 0) return [[]];
  return items.flatMap((item, index) =>
    permutations(items.filter((_, i) => i !== index)).map((rest) => [
      item,
      ...rest,
    ])
  );
}

test.each(permutations([0, 1, 2]).map((order) => ({ order })))(
  "groups two holes with their outer contour in order $order",
  ({ order }) => {
    // The holes are disjoint, but both overlap the outer contour's bounds.
    // With holes first, the outer contour must join their earlier groups.
    const contours = [
      drawRectangle(2, 2).translate(-2, 0).blueprint,
      drawRectangle(2, 2).translate(2, 0).blueprint,
      drawRectangle(10, 10).blueprint,
    ];
    try {
      const profiles = organiseBlueprints(order.map((i) => contours[i]));
      expect(profiles.blueprints).toHaveLength(1);
      const profile = profiles.blueprints[0];
      expect(profile).toBeInstanceOf(CompoundBlueprint);
      if (!(profile instanceof CompoundBlueprint)) {
        throw new Error("Expected an outer contour with two holes");
      }
      expect(profile.blueprints[0]).toBe(contours[2]);
      expect(new Set(profile.blueprints.slice(1))).toEqual(
        new Set(contours.slice(0, 2))
      );

      const solid = profiles.sketchOnPlane("XY").extrude(1);
      try {
        expect(measureVolume(solid)).toBeCloseTo(92, 6);
      } finally {
        solid.delete();
      }
    } finally {
      contours.forEach((contour) => contour.delete());
    }
  }
);

test.each(permutations([0, 1, 2, 3]).map((order) => ({ order })))(
  "preserves a nested island and its hole in order $order",
  ({ order }) => {
    const contours = [12, 10, 6, 2].map(
      (size) => drawRectangle(size, size).blueprint
    );
    try {
      const profiles = organiseBlueprints(order.map((i) => contours[i]));
      expect(profiles.blueprints).toHaveLength(2);
      for (const profile of profiles.blueprints) {
        expect(profile).toBeInstanceOf(CompoundBlueprint);
        if (profile instanceof CompoundBlueprint) {
          expect(profile.blueprints).toHaveLength(2);
        }
      }
      const solid = profiles.sketchOnPlane("XY").extrude(1);
      try {
        expect(measureVolume(solid)).toBeCloseTo(76, 6);
      } finally {
        solid.delete();
      }
    } finally {
      contours.forEach((contour) => contour.delete());
    }
  }
);

test.each(permutations([0, 1, 2, 3]).map((order) => ({ order })))(
  "keeps disconnected regions and their holes separate in order $order",
  ({ order }) => {
    const contours = [
      drawRectangle(2, 2).translate(-10, 0).blueprint,
      drawRectangle(2, 2).translate(10, 0).blueprint,
      drawRectangle(10, 10).translate(-10, 0).blueprint,
      drawRectangle(10, 10).translate(10, 0).blueprint,
    ];
    try {
      const profiles = organiseBlueprints(order.map((i) => contours[i]));
      const firstRegion = order[0] % 2;
      expect(profiles.blueprints).toHaveLength(2);
      profiles.blueprints.forEach((profile, index) => {
        expect(profile).toBeInstanceOf(CompoundBlueprint);
        if (profile instanceof CompoundBlueprint) {
          const region = (firstRegion + index) % 2;
          expect(profile.blueprints).toEqual([
            contours[region + 2],
            contours[region],
          ]);
        }
      });
      const solid = profiles.sketchOnPlane("XY").extrude(1);
      try {
        expect(measureVolume(solid)).toBeCloseTo(192, 6);
      } finally {
        solid.delete();
      }
    } finally {
      contours.forEach((contour) => contour.delete());
    }
  }
);

test("handles empty and single-contour inputs", () => {
  expect(organiseBlueprints([]).blueprints).toEqual([]);
  const contour = drawRectangle(10, 10).blueprint;
  try {
    expect(organiseBlueprints([contour]).blueprints).toEqual([contour]);
  } finally {
    contour.delete();
  }
});
