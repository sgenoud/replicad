import { fileSave } from "browser-fs-access";
import builderAPI from "./builderAPI";

export default async (code, fileName) => {
  fileName =
    (await builderAPI.extractDefaultNameFromCode(code)) ||
    fileName ||
    "replicad-script";
  return fileSave(
    new Blob([code], {
      type: "application/javascript",
    }),
    {
      id: "save-js",
      fileName: `${fileName}.js`,
      description: "JS replicad script of the current geometry",
      extensions: [".js"],
    }
  );
};
