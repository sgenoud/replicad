import opencascade from "replicad-opencascadejs";
import opencascadeWasm from "replicad-opencascadejs/wasm?url";

export default async () => {
  const OC = await opencascade({
    locateFile: () => opencascadeWasm,
  });

  return OC;
};
