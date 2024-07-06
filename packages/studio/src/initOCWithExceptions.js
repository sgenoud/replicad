import opencascade from "replicad-opencascadejs/src/replicad_with_exceptions.js";
import opencascadeWasm from "replicad-opencascadejs/src/replicad_with_exceptions.wasm?url";

export default async () => {
  const OC = await opencascade({
    locateFile: () => opencascadeWasm,
  });

  return OC;
};
