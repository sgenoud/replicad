import { fileSave } from 'browser-fs-access'

export default (code, fileName) => {
  fileName = fileName ?? 'replicad-script'
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
