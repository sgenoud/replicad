export const BASE_PATH =
  "https://raw.githubusercontent.com/sgenoud/replicad/main/packages/replicad-docs/examples/";

export const iframePath = (filename) => {
  return `https://studio.replicad.xyz/share/${encodeURIComponent(
    BASE_PATH + filename
  )}`;
};
