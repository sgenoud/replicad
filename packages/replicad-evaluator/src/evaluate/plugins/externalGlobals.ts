import type { Plugin } from "rollup";

/**
 * The modules that are provided by the runtime instead of being bundled, and
 * the global they are exposed as.
 *
 * Ordered from the most specific specifier to the least, so that
 * `replicad/shape-functions` is never matched by the `replicad` rule.
 */
const EXTERNAL_MODULES: { module: string; global: string }[] = [
  { module: "replicad/shape-functions", global: "replicadShapeFns" },
  { module: "replicad", global: "replicad" },
];

export function createExternalGlobalsPlugin(): Plugin {
  return {
    name: "replicad-evaluator-external-globals",
    transform(code) {
      const transformed = rewriteReplicadImports(code);

      if (transformed === code) {
        return null;
      }

      return {
        code: transformed,
        map: null,
      };
    },
  };
}

export function isExternalModule(source: string) {
  return EXTERNAL_MODULES.some(({ module }) => module === source);
}

const quoted = (module: string) => `["']${module.replace("/", "\\/")}["']`;

export function rewriteReplicadImports(code: string) {
  if (!code.includes(`"replicad`) && !code.includes(`'replicad`)) {
    return code;
  }

  return EXTERNAL_MODULES.reduce(
    (transformed, { module, global }) =>
      rewriteModuleImports(transformed, module, global),
    code
  );
}

function rewriteModuleImports(code: string, module: string, global: string) {
  const from = `\\s+from\\s+${quoted(module)};?`;
  let transformed = code;

  transformed = transformed.replace(
    new RegExp(`import\\s+\\*\\s+as\\s+([\\w$]+)${from}`, "g"),
    (_match, namespaceImport) => {
      return `const ${namespaceImport} = globalThis.${global};`;
    }
  );

  transformed = transformed.replace(
    new RegExp(`import\\s+([\\w$]+)\\s*,\\s*{([^}]+)}${from}`, "g"),
    (_match, defaultImport, namedImports) => {
      return [
        `const ${defaultImport} = globalThis.${global};`,
        `const { ${rewriteNamedImports(
          namedImports
        )} } = globalThis.${global};`,
      ].join("\n");
    }
  );

  transformed = transformed.replace(
    new RegExp(`import\\s+{([^}]+)}${from}`, "g"),
    (_match, namedImports) => {
      return `const { ${rewriteNamedImports(
        namedImports
      )} } = globalThis.${global};`;
    }
  );

  transformed = transformed.replace(
    new RegExp(`import\\s+([\\w$]+)${from}`, "g"),
    (_match, defaultImport) => {
      return `const ${defaultImport} = globalThis.${global};`;
    }
  );

  transformed = transformed.replace(
    new RegExp(`import\\s+${quoted(module)};?`, "g"),
    ""
  );

  return transformed;
}

function rewriteNamedImports(namedImports: string) {
  return namedImports
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      if (!entry.includes(" as ")) return entry;
      const [imported, local] = entry.split(/\s+as\s+/);
      return `${imported.trim()}: ${local.trim()}`;
    })
    .join(", ");
}
