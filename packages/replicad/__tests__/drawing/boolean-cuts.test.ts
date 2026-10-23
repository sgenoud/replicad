import { expect, test } from "vitest";
import {
  Blueprints,
  drawRectangle,
  Drawing,
  measureVolume,
} from "../../src/index";

type SerializedProfile =
  | { type: "Blueprint" }
  | { type: "CompoundBlueprint"; blueprints: { type: "Blueprint" }[] };

function expectProfiles(
  drawing: Drawing,
  contourCounts: number[],
  expectedVolume: number
) {
  const shape:
    | SerializedProfile
    | { type: "Blueprints"; blueprints: SerializedProfile[] } = JSON.parse(
    drawing.serialize()
  );
  const profiles = shape.type === "Blueprints" ? shape.blueprints : [shape];
  expect(profiles).toHaveLength(contourCounts.length);
  profiles.forEach((profile, index) => {
    if (contourCounts[index] === 1) {
      expect(profile.type).toBe("Blueprint");
    } else {
      expect(profile.type).toBe("CompoundBlueprint");
      if (profile.type !== "CompoundBlueprint") {
        throw new Error("Expected an outer contour with holes");
      }
      expect(profile.blueprints).toHaveLength(contourCounts[index]);
      expect(profile.blueprints.every((bp) => bp.type === "Blueprint")).toBe(
        true
      );
    }
  });

  const solid = drawing.sketchOnPlane("XY").extrude(1);
  try {
    expect(measureVolume(solid)).toBeCloseTo(expectedVolume, 6);
  } finally {
    solid.delete();
  }
}

test.each([false, true])(
  "cuts two disjoint rectangles as holes in one profile (reversed: %s)",
  (reversed) => {
    const cutoutH = drawRectangle(5, 2);
    const cutters = [cutoutH.translate(0, -5), cutoutH.translate(0, 5)];
    if (reversed) cutters.reverse();
    const cutout = cutters[0].fuse(cutters[1]);
    const piece = drawRectangle(20, 20).cut(cutout);

    expectProfiles(piece, [3], 380);
  }
);

test.each([false, true])(
  "ignores an outside cutter while cutting a hole (reversed: %s)",
  (reversed) => {
    const cutters = [
      drawRectangle(5, 2).translate(0, -5),
      drawRectangle(5, 2).translate(30, 5),
    ];
    if (reversed) cutters.reverse();
    const piece = drawRectangle(20, 20).cut(cutters[0].fuse(cutters[1]));

    expectProfiles(piece, [2], 390);
  }
);

test("preserves an existing hole when a later cutter is outside", () => {
  const piece = drawRectangle(20, 20)
    .cut(drawRectangle(5, 2).translate(0, -5))
    .cut(drawRectangle(5, 2).translate(30, 5));

  expectProfiles(piece, [2], 390);
});

test.each([false, true])(
  "applies later cutters to every region after a split (reversed: %s)",
  (reversed) => {
    const cutters = [
      drawRectangle(2, 30).translate(-5, 0),
      drawRectangle(2, 30).translate(5, 0),
    ];
    if (reversed) cutters.reverse();
    const piece = drawRectangle(20, 20).cut(cutters[0].fuse(cutters[1]));

    expectProfiles(piece, [1, 1, 1], 320);
  }
);

test.each([false, true])(
  "combines a hole and an edge cut in one profile (reversed: %s)",
  (reversed) => {
    const cutters = [
      drawRectangle(5, 2).translate(0, -5),
      drawRectangle(5, 2).translate(9, 5),
    ];
    if (reversed) cutters.reverse();
    const piece = drawRectangle(20, 20).cut(cutters[0].fuse(cutters[1]));

    expectProfiles(piece, [2], 383);
  }
);

test.each([false, true])(
  "stays empty when a cutter removes the whole piece (reversed: %s)",
  (reversed) => {
    const cutters = [
      drawRectangle(30, 30),
      drawRectangle(5, 2).translate(30, 5),
    ];
    if (reversed) cutters.reverse();
    const piece = drawRectangle(20, 20).cut(cutters[0].fuse(cutters[1]));

    expect(piece.toSVGPaths()).toEqual([]);
  }
);

test("subtracting an empty cutter collection preserves the piece", () => {
  const piece = drawRectangle(20, 20).cut(new Drawing(new Blueprints([])));

  expectProfiles(piece, [1], 400);
});

test("cuts a disconnected workpiece without duplicating its regions", () => {
  const workpiece = drawRectangle(20, 20)
    .translate(-20, 0)
    .fuse(drawRectangle(20, 20).translate(20, 0));
  const cutout = drawRectangle(5, 2)
    .translate(-20, 0)
    .fuse(drawRectangle(5, 2).translate(20, 0));

  expectProfiles(workpiece.cut(cutout), [2, 2], 780);
});

test("an enclosing cutter still removes a profile with an existing hole", () => {
  const piece = drawRectangle(20, 20)
    .cut(drawRectangle(5, 2))
    .cut(drawRectangle(30, 30));

  expect(piece.toSVGPaths()).toEqual([]);
});

test("cuts two more holes in a profile with an existing hole", () => {
  const workpiece = drawRectangle(20, 20).cut(drawRectangle(5, 2));
  const cutout = drawRectangle(5, 2)
    .translate(0, -5)
    .fuse(drawRectangle(5, 2).translate(0, 5));

  expectProfiles(workpiece.cut(cutout), [4], 370);
});

test("keeps the island inside a compound cutter", () => {
  const cutter = drawRectangle(10, 10)
    .cut(drawRectangle(2, 2))
    .fuse(drawRectangle(5, 2).translate(30, 5));

  expectProfiles(drawRectangle(20, 20).cut(cutter), [2, 1], 304);
});
