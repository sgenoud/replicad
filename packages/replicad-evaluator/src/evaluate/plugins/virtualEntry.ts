import type { Plugin } from "rollup";

export function createVirtualEntryPlugin(entryId: string, code: string): Plugin {
  return {
    name: "replicad-evaluator-virtual-entry",
    resolveId(id) {
      if (id === entryId) return id;
      return null;
    },
    load(id) {
      if (id === entryId) return code;
      return null;
    },
  };
}
