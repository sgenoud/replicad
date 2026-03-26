import type { Plugin } from "rollup";

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

export function rewriteReplicadImports(code: string) {
  if (!code.includes(`"replicad"`) && !code.includes(`'replicad'`)) {
    return code;
  }

  let transformed = code;

  transformed = transformed.replace(
    /import\s+\*\s+as\s+([\w$]+)\s+from\s+["']replicad["'];?/g,
    (_match, namespaceImport) => {
      return `const ${namespaceImport} = globalThis.replicad;`;
    }
  );

  transformed = transformed.replace(
    /import\s+([\w$]+)\s*,\s*{([^}]+)}\s+from\s+["']replicad["'];?/g,
    (_match, defaultImport, namedImports) => {
      return [
        `const ${defaultImport} = globalThis.replicad;`,
        `const { ${rewriteNamedImports(namedImports)} } = globalThis.replicad;`,
      ].join("\n");
    }
  );

  transformed = transformed.replace(
    /import\s+{([^}]+)}\s+from\s+["']replicad["'];?/g,
    (_match, namedImports) => {
      return `const { ${rewriteNamedImports(
        namedImports
      )} } = globalThis.replicad;`;
    }
  );

  transformed = transformed.replace(
    /import\s+([\w$]+)\s+from\s+["']replicad["'];?/g,
    (_match, defaultImport) => {
      return `const ${defaultImport} = globalThis.replicad;`;
    }
  );

  transformed = transformed.replace(/import\s+["']replicad["'];?/g, "");

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
