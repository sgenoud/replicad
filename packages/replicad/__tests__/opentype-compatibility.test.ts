import type { Font } from "opentype.js";
import { afterEach, expect, test, vi } from "vitest";
import { prepareFontForText } from "../src/utils/opentype";

const mockFont = (gsub?: unknown) => ({ tables: { gsub } } as unknown as Font);

afterEach(() => vi.restoreAllMocks());

test("leaves fonts without GSUB unchanged", () => {
  const font = mockFont();
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  prepareFontForText(font, "test");
  expect(font.tables.gsub).toBeUndefined();
  expect(warn).not.toHaveBeenCalled();
});

test.each([1, 2])(
  "removes unsupported chaining format %s only from composition features",
  (substFormat) => {
    const lookups = [
      { lookupType: 6, subtables: [{ substFormat }] },
      { lookupType: 4, subtables: [{ substFormat: 1 }] },
    ];
    const ccmp = { lookupListIndexes: [0, 1] };
    const liga = { lookupListIndexes: [0, 1] };
    const font = mockFont({
      features: [
        { tag: "ccmp", feature: ccmp },
        { tag: "liga", feature: liga },
      ],
      lookups,
    });
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    prepareFontForText(font, "test");
    expect(ccmp.lookupListIndexes).toEqual([1]);
    expect(liga.lookupListIndexes).toEqual([0, 1]);
    expect(lookups[0].subtables).toEqual([{ substFormat }]);
    expect(warn).toHaveBeenCalledExactlyOnceWith(
      expect.stringContaining('Font "test": skipping contextual composition')
    );
  }
);

test("retains supported subtables without changing a shared lookup", () => {
  const supported = { substFormat: 3 };
  const unsupported = { substFormat: 2 };
  const original = {
    lookupType: 6,
    lookupFlag: 0,
    subtables: [unsupported, supported],
  };
  const lookups = [original];
  const ccmp = { lookupListIndexes: [0] };
  const liga = { lookupListIndexes: [0] };
  const font = mockFont({
    features: [
      { tag: "ccmp", feature: ccmp },
      { tag: "liga", feature: liga },
    ],
    lookups,
  });
  vi.spyOn(console, "warn").mockImplementation(() => {});
  prepareFontForText(font, "test");
  expect(ccmp.lookupListIndexes).toEqual([1]);
  expect(liga.lookupListIndexes).toEqual([0]);
  expect(original.subtables).toEqual([unsupported, supported]);
  expect(lookups[1]).toEqual({ ...original, subtables: [supported] });
});

test("handles unsupported chaining inside extension lookups", () => {
  const ccmp = { lookupListIndexes: [0] };
  const font = mockFont({
    features: [{ tag: "ccmp", feature: ccmp }],
    lookups: [
      {
        lookupType: 7,
        subtables: [
          { substFormat: 1, lookupType: 6, extension: { substFormat: 2 } },
        ],
      },
    ],
  });
  vi.spyOn(console, "warn").mockImplementation(() => {});
  prepareFontForText(font, "test");
  expect(ccmp.lookupListIndexes).toEqual([]);
});

test("does not modify supported composition or report a warning", () => {
  const gsub = {
    features: [{ tag: "ccmp", feature: { lookupListIndexes: [0, 1] } }],
    lookups: [
      { lookupType: 4, subtables: [{ substFormat: 1 }] },
      { lookupType: 6, subtables: [{ substFormat: 3 }] },
    ],
  };
  const original = JSON.stringify(gsub);
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  prepareFontForText(mockFont(gsub), "test");
  expect(JSON.stringify(gsub)).toBe(original);
  expect(warn).not.toHaveBeenCalled();
});
