import builderAPI from "./builderAPI";
import { fileSave } from "browser-fs-access";
import JSZip from "jszip/dist/jszip";

const EXTS = new Map([
  ["stl-binary", "stl"],
  ["step-assembly", "step"],
]);
const mapExt = (ext) => {
  if (EXTS.has(ext)) return EXTS.get(ext);
  return ext;
};

export default async function saveShapes(shapeId, fileType = "stl") {
  const shapes = await builderAPI.exportShape(fileType, shapeId);
  if (shapes.length === 1) {
    const { blob, name } = shapes[0];
    const ext = mapExt(fileType);

    await fileSave(blob, {
      fileName: `${name || "shape"}.${ext}`,
      extensions: [`.${ext}`],
      description: `Save ${name || "shape"} as ${fileType}`,
    });
    return;
  }

  const zip = new JSZip();
  shapes.forEach((shape, i) => {
    zip.file(`${shape.name || `shape-${i}`}.${mapExt(fileType)}`, shape.blob);
  });
  const zipBlob = await zip.generateAsync({ type: "blob" });
  await fileSave(zipBlob, {
    id: "exports",
    description: "Save zip",
    fileName: `${shapeId}.zip`,
    extensions: [".zip"],
  });
}
