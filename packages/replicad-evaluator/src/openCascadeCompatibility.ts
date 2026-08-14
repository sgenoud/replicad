import type { OpenCascadeCompatibilityReplacement } from "./types";

const LEGACY_MEMBER_ERROR =
  /(?:^|\s)(?:(globalThis)\.)?((?:[A-Za-z_$][\w$]*\.)*)([A-Za-z_$][\w$]*_\d+) is not (?:a function|a constructor)/;
const NUMBERED_SUFFIX = /_\d+$/;
const MAX_RETRIES = 20;

interface PatchedProperty {
  owner: Record<string, any>;
  property: string;
  descriptor?: PropertyDescriptor;
}

function detectLegacyMember(error: unknown) {
  const message =
    error && typeof error === "object" && "message" in error
      ? String((error as { message?: unknown }).message)
      : String(error);
  const match = message.match(LEGACY_MEMBER_ERROR);
  if (!match) return null;

  const ownerPath = match[2].slice(0, -1);
  const legacyMember = match[3];
  return {
    // An unqualified missing class name most commonly came from destructuring oc.
    ownerParts: ownerPath ? ownerPath.split(".") : ["oc"],
    legacyMember,
    replacementMember: legacyMember.replace(NUMBERED_SUFFIX, ""),
  };
}

function resolveOwner(
  roots: Record<string, any>,
  ownerParts: string[]
): Record<string, any> | null {
  const [rootName, ...propertyPath] = ownerParts;
  let owner = roots[rootName];
  if (!owner) return null;

  for (const property of propertyPath) {
    owner = owner?.[property];
    if (!owner) return null;
  }

  return owner;
}

/**
 * Temporarily restores numbered names exposed by older opencascade.js builds.
 * The callback is retried once for every missing alias it encounters.
 */
export function createOpenCascadeCompatibilitySession(
  roots: Record<string, any>
) {
  const replacements: OpenCascadeCompatibilityReplacement[] = [];
  const patchedProperties: PatchedProperty[] = [];
  const attempted = new Set<string>();

  const tryPatch = (error: unknown) => {
    const detected = detectLegacyMember(error);
    if (!detected) return false;

    const { ownerParts, legacyMember, replacementMember } = detected;
    const legacyPath = [...ownerParts, legacyMember].join(".");
    if (attempted.has(legacyPath)) return false;
    attempted.add(legacyPath);

    const owner = resolveOwner(roots, ownerParts);
    if (!owner || !(replacementMember in owner)) return false;

    const descriptor = Object.getOwnPropertyDescriptor(owner, legacyMember);
    try {
      Object.defineProperty(owner, legacyMember, {
        configurable: true,
        writable: true,
        value: owner[replacementMember],
      });
    } catch {
      return false;
    }

    patchedProperties.push({ owner, property: legacyMember, descriptor });
    replacements.push({
      legacy: legacyPath,
      replacement: [...ownerParts, replacementMember].join("."),
    });
    return true;
  };

  return {
    replacements,

    async run<T>(callback: () => T | Promise<T>): Promise<T> {
      for (let retry = 0; ; retry += 1) {
        try {
          return await callback();
        } catch (error) {
          if (retry >= MAX_RETRIES || !tryPatch(error)) throw error;
        }
      }
    },

    restore() {
      for (const {
        owner,
        property,
        descriptor,
      } of patchedProperties.reverse()) {
        if (descriptor) {
          Object.defineProperty(owner, property, descriptor);
        } else {
          delete owner[property];
        }
      }
    },
  };
}
