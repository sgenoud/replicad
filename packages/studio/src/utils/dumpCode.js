import JSZip from "jszip";

export async function dumpCode(rawCode) {
  const zip = new JSZip();
  zip.file("code.js", rawCode);
  const content = await zip.generateAsync({
    type: "base64",
    compression: "DEFLATE",
    compressionOptions: {
      level: 6,
    },
  });
  return encodeURIComponent(content);
}
