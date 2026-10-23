import { readFileSync } from "node:fs";
import { afterEach, beforeAll, expect, test, vi } from "vitest";
import * as opentype from "opentype.js";
import {
  Blueprint,
  CompoundBlueprint,
  drawText,
  loadFont,
  measureVolume,
  textBlueprints,
} from "../src/index";

const fontFamily = "text-migration-test";
let font: opentype.Font;
let fontData: ArrayBuffer;

function rectangle(
  path: opentype.Path,
  x: number,
  y: number,
  width: number,
  height: number
) {
  path.moveTo(x, y);
  path.lineTo(x + width, y);
  path.lineTo(x + width, y + height);
  path.lineTo(x, y + height);
  path.close();
}

function makeGlyph(character: string, draw: (path: opentype.Path) => void) {
  const path = new opentype.Path();
  draw(path);
  return new opentype.Glyph({
    name: character,
    unicode: character.codePointAt(0),
    advanceWidth: 700,
    path,
  });
}

beforeAll(async () => {
  // Generate a small, deterministic CFF font instead of downloading fixtures.
  const source = new opentype.Font({
    familyName: "TextMigrationTest",
    styleName: "Regular",
    unitsPerEm: 1000,
    ascender: 1000,
    descender: -200,
    glyphs: [
      new opentype.Glyph({
        name: ".notdef",
        advanceWidth: 700,
        path: new opentype.Path(),
      }),
      makeGlyph(" ", () => {}),
      makeGlyph("A", (p) => rectangle(p, 0, 0, 600, 800)),
      makeGlyph("O", (p) => {
        rectangle(p, 0, 0, 600, 800);
        rectangle(p, 100, 100, 400, 600);
      }),
      makeGlyph("B", (p) => {
        rectangle(p, 0, 0, 600, 800);
        rectangle(p, 100, 100, 400, 200);
        rectangle(p, 100, 500, 400, 200);
      }),
      makeGlyph("i", (p) => {
        rectangle(p, 100, 0, 200, 500);
        rectangle(p, 100, 600, 200, 200);
      }),
      makeGlyph("é", (p) => {
        rectangle(p, 0, 0, 600, 500);
        rectangle(p, 100, 600, 200, 200);
      }),
      makeGlyph("C", (p) => {
        p.moveTo(0, 0);
        p.curveTo(0, 800, 600, 800, 600, 0);
        p.close();
      }),
    ],
  });
  fontData = source.toArrayBuffer();
  font = await loadFont(fontData, fontFamily, true);
});

afterEach(() => vi.restoreAllMocks());

const studioFontData = () => {
  const data = readFileSync(
    new URL("../../studio/public/fonts/HKGrotesk-Regular.ttf", import.meta.url)
  );
  return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
};

test.each(["ab", "ça", "ça marche bien mon copain dis donc"])(
  "draws Studio's default font with multiple characters: '%s'",
  async (text) => {
    const studioFamily = "studio-text-regression";
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    await loadFont(studioFontData(), studioFamily, true);
    expect(warn).toHaveBeenCalledOnce();
    const drawing = drawText(text, { fontFamily: studioFamily });
    const paths = drawing.toSVGPaths().flat();
    expect(paths.length).toBeGreaterThan(0);
    expect(paths.every((path) => path.trimEnd().endsWith("Z"))).toBe(true);
    const solid = drawing.sketchOnPlane("XY").extrude(1);
    try {
      expect(measureVolume(solid)).toBeGreaterThan(0);
    } finally {
      solid.delete();
    }
  }
);

test("keeps supported composition and ligatures in Studio's font", async () => {
  vi.spyOn(console, "warn").mockImplementation(() => {});
  const studioFont = await loadFont(studioFontData(), "studio-features", true);
  expect(studioFont.tables.gsub.features).toContainEqual({
    tag: "ccmp",
    feature: { featureParams: 0, lookupListIndexes: [4, 5] },
  });
  expect(studioFont.stringToGlyphs("ffi")).toHaveLength(1);
  // The workaround must not replace accented characters with unaccented ones.
  expect(studioFont.stringToGlyphs("ça").map((glyph) => glyph.index)).toEqual([
    studioFont.charToGlyphIndex("ç"),
    studioFont.charToGlyphIndex("a"),
  ]);
});

function contoursOf(profiles: ReturnType<typeof textBlueprints>): Blueprint[] {
  return profiles.blueprints.flatMap((profile) =>
    profile instanceof CompoundBlueprint ? profile.blueprints : [profile]
  );
}

test.each([
  { text: "A", regions: 1, contours: 1, area: 480000 },
  { text: "O", regions: 1, contours: 2, area: 240000 },
  { text: "B", regions: 1, contours: 3, area: 320000 },
  { text: "i", regions: 2, contours: 2, area: 140000 },
  { text: "é", regions: 2, contours: 2, area: 340000 },
  { text: "AO", regions: 2, contours: 3, area: 720000 },
  { text: "A O", regions: 2, contours: 3, area: 720000 },
])("closes and extrudes filled outlines for '$text'", (example) => {
  // v2 deliberately omits Z in the paths returned for filled glyphs.
  expect(font.getPath(example.text, 0, 0, 1000).commands).not.toContainEqual({
    type: "Z",
  });
  const profiles = textBlueprints(example.text, { fontFamily, fontSize: 1000 });
  const contours = contoursOf(profiles);
  try {
    expect(profiles.blueprints).toHaveLength(example.regions);
    expect(contours).toHaveLength(example.contours);
    expect(contours.every((contour) => contour.isClosed())).toBe(true);
    const solid = profiles.sketchOnPlane("XY").extrude(2);
    try {
      expect(measureVolume(solid)).toBeCloseTo(example.area * 2, 4);
    } finally {
      solid.delete();
    }
  } finally {
    contours.forEach((contour) => contour.delete());
  }
});

test.each(["", " ", "   "])("handles text with no outlines: '%s'", (text) => {
  expect(textBlueprints(text, { fontFamily }).blueprints).toEqual([]);
});

test("preserves font size, position and whitespace advances", () => {
  const profiles = textBlueprints("A A", {
    fontFamily,
    fontSize: 10,
    startX: 3,
    startY: 4,
  });
  try {
    const [[xmin, ymin], [xmax, ymax]] = profiles.boundingBox.bounds;
    // Preserve the existing convention: startX is negated, startY is not.
    // OpenCascade pads bounds by its geometric tolerance.
    expect(xmin).toBeCloseTo(-3, 5);
    expect(ymin).toBeCloseTo(4, 5);
    expect(xmax).toBeCloseTo(17, 5);
    expect(ymax).toBeCloseTo(12, 5);
  } finally {
    contoursOf(profiles).forEach((contour) => contour.delete());
    profiles.boundingBox.delete();
  }
});

test("preserves cubic curves from CFF outlines", () => {
  expect(
    font.getPath("C", 0, 0, 1000).commands.some((c) => c.type === "C")
  ).toBe(true);
  const profiles = textBlueprints("C", { fontFamily, fontSize: 1000 });
  try {
    expect(profiles.blueprints).toHaveLength(1);
    expect(contoursOf(profiles)[0].isClosed()).toBe(true);
    const solid = profiles.sketchOnPlane("XY").extrude(1);
    try {
      expect(measureVolume(solid)).toBeGreaterThan(0);
    } finally {
      solid.delete();
    }
  } finally {
    contoursOf(profiles).forEach((contour) => contour.delete());
  }
});

test.each([false, true])(
  "handles quadratic outlines with explicit closure=%s",
  (explicitClosure) => {
    // Keep Q commands intact: serializing our fixture as CFF converts Q to C.
    const path = new opentype.Path();
    path.moveTo(0, 0);
    path.quadraticCurveTo(5, -10, 10, 0);
    if (explicitClosure) path.close();
    vi.spyOn(font, "getPath").mockReturnValue(path);
    const profiles = textBlueprints("A", { fontFamily });
    try {
      expect(profiles.blueprints).toHaveLength(1);
      expect(contoursOf(profiles)[0].isClosed()).toBe(true);
      const solid = profiles.sketchOnPlane("XY").extrude(1);
      try {
        expect(measureVolume(solid)).toBeCloseTo(100 / 3, 6);
      } finally {
        solid.delete();
      }
    } finally {
      contoursOf(profiles).forEach((contour) => contour.delete());
    }
  }
);

test("uses base outlines rather than color layers or SVG glyphs", () => {
  const glyph = font.charToGlyph("A");
  // These are v2 methods, absent from the current @types/opentype.js package.
  const layeredGlyph = glyph as opentype.Glyph & {
    getLayers: () => unknown[];
    getSvgImage: () => unknown;
  };
  const getLayers = vi
    .spyOn(layeredGlyph, "getLayers")
    .mockImplementation(() => {
      throw new Error("CAD must not request color layers");
    });
  const getSvgImage = vi
    .spyOn(layeredGlyph, "getSvgImage")
    .mockImplementation(() => {
      throw new Error("CAD must not request SVG images");
    });
  const profiles = textBlueprints("A", { fontFamily });
  try {
    expect(profiles.blueprints).toHaveLength(1);
    expect(getLayers).not.toHaveBeenCalled();
    expect(getSvgImage).not.toHaveBeenCalled();
  } finally {
    contoursOf(profiles).forEach((contour) => contour.delete());
  }
});

test("loads font URLs and preserves the family cache and force option", async () => {
  const fetchMock = vi.fn().mockResolvedValue({
    arrayBuffer: async () => fontData,
  });
  vi.stubGlobal("fetch", fetchMock);
  try {
    const first = await loadFont("/fixture.otf", "text-url-test", true);
    expect(fetchMock).toHaveBeenCalledWith("/fixture.otf");
    expect(await loadFont("/fixture.otf", "text-url-test")).toBe(first);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(await loadFont("/fixture.otf", "text-url-test", true)).not.toBe(
      first
    );
    expect(fetchMock).toHaveBeenCalledTimes(2);
  } finally {
    vi.unstubAllGlobals();
  }
});
