import type { Plugin } from "rollup";

const REMOTE_ID_RE = /^(https?:\/\/|data:)/;

const isRemoteId = (id: string) => REMOTE_ID_RE.test(id);

export function createUrlResolverPlugin(fetchImpl?: typeof fetch): Plugin {
  const fetcher = fetchImpl ?? globalThis.fetch;
  const requestCache = new Map<string, Promise<string>>();

  return {
    name: "replicad-evaluator-url-resolver",
    async resolveId(source, importer) {
      if (source === "replicad") return null;
      if (isRemoteId(source)) return source;
      if (importer && /^https?:\/\//.test(importer) && source.startsWith(".")) {
        return new URL(source, importer).href;
      }
      return null;
    },
    async load(id) {
      if (!isRemoteId(id)) return null;
      if (!fetcher) {
        throw new Error("fetch is required to resolve remote modules");
      }
      if (!requestCache.has(id)) {
        requestCache.set(
          id,
          fetcher(id).then(async (response) => {
            if (!response.ok) {
              throw new Error(`Could not fetch ${id}: ${response.status}`);
            }
            return await response.text();
          })
        );
      }
      return await requestCache.get(id)!;
    },
  };
}
