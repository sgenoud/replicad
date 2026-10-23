import type { Font } from "opentype.js";

// The upstream declarations do not describe parsed GSUB tables.
interface SubstitutionSubtable {
  substFormat: number;
  lookupType?: number;
  extension?: SubstitutionSubtable;
}

interface SubstitutionLookup {
  lookupType: number;
  subtables: SubstitutionSubtable[];
}

interface SubstitutionTable {
  features: Array<{
    tag: string;
    feature: { lookupListIndexes: number[] };
  }>;
  lookups: SubstitutionLookup[];
}

function unsupportedChaining(
  lookupType: number,
  subtable: SubstitutionSubtable
): boolean {
  if (
    lookupType === 7 &&
    subtable.substFormat === 1 &&
    subtable.lookupType !== undefined &&
    subtable.extension
  ) {
    return unsupportedChaining(subtable.lookupType, subtable.extension);
  }
  return (
    lookupType === 6 &&
    (subtable.substFormat === 1 || subtable.substFormat === 2)
  );
}

/**
 * opentype.js 2.0 unconditionally applies ccmp to multi-character strings, but
 * cannot execute chaining formats 1/2. HKGrotesk (Studio's default) uses format 2.
 * Skip only these unsupported composition subtables, retaining supported ccmp
 * rules and other features such as liga. This is a compatibility workaround,
 * not full support for contextual composition; remove when upstream fixes it.
 */
export function prepareFontForText(font: Font, fontFamily: string): void {
  const gsub = font.tables.gsub as unknown as SubstitutionTable | undefined;
  if (!gsub) return;

  let skipped = false;
  for (const { tag, feature } of gsub.features) {
    if (tag !== "ccmp") continue;
    feature.lookupListIndexes = feature.lookupListIndexes.flatMap((index) => {
      const lookup = gsub.lookups[index];
      const subtables = lookup.subtables.filter(
        (subtable) => !unsupportedChaining(lookup.lookupType, subtable)
      );
      if (subtables.length === lookup.subtables.length) return [index];
      skipped = true;
      if (!subtables.length) return [];

      // Do not change the original lookup: other features can share it.
      const replacementIndex = gsub.lookups.length;
      gsub.lookups.push({ ...lookup, subtables });
      return [replacementIndex];
    });
  }

  if (skipped) {
    console.warn(
      `Font "${fontFamily}": skipping contextual composition rules unsupported by opentype.js 2.0 (GSUB type 6, formats 1/2). Some combining marks may render differently.`
    );
  }
}
