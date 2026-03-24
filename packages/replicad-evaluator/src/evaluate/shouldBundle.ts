const IMPORT_RE = /^\s*import\s/m;
const REMOTE_IMPORT_RE = /from\s+["'](?:https?:\/\/|data:)/m;
const TYPESCRIPT_HINTS_RE =
  /\b(?:interface|type|enum|implements|readonly|public|private|protected)\b|:\s*[\w$][\w$<>, .[\]|&?:-]*(?=[,)=;])/m;

export function looksLikeTypeScript(code: string) {
  return TYPESCRIPT_HINTS_RE.test(code);
}

export function shouldBundle(code: string) {
  return (
    IMPORT_RE.test(code) ||
    REMOTE_IMPORT_RE.test(code) ||
    looksLikeTypeScript(code)
  );
}
