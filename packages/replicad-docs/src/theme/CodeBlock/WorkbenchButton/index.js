import React, { useCallback, useState, useRef, useEffect } from "react";
import clsx from "clsx";
import JSZip from "jszip";
// @ts-expect-error: TODO, we need to make theme-classic have type: module
import { translate } from "@docusaurus/Translate";
import styles from "./styles.module.css";

const exportCode = async (rawCode) => {
  const zip = new JSZip();
  zip.file("code.js", rawCode);
  const content = await zip.generateAsync({
    type: "base64",
    compression: "DEFLATE",
    compressionOptions: {
      level: 6,
    },
  });
  const code = encodeURIComponent(content);

  var url = new URL("https://studio.replicad.xyz/workbench");
  url.searchParams.set("code", code);

  return url.toString();
};

export default function WorkbenchButton({ code, className }) {
  const handleOpenInWorkbench = async () => {
    window.open(await exportCode(code), "_blank");
  };
  return (
    <button
      type="button"
      aria-label={translate({
        id: "theme.CodeBlock.workbenchButtonAriaLabel",
        message: "Open code in the workbench",
        description: "The ARIA label for copy code blocks button",
      })}
      title={translate({
        id: "theme.CodeBlock.copy",
        message: "Open in workbench",
        description: "The open in workbench button label on code blocks",
      })}
      className={clsx("clean-btn", className, styles.copyButton)}
      onClick={handleOpenInWorkbench}
    >
      <span className={styles.copyButtonIcons} aria-hidden="true">
        <svg
          className={styles.copyButtonIcon}
          viewBox="0 0 1200 1200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M889.2 121.2H752.4c-25.199 0-45.602-20.398-45.602-45.602L706.802 60h-213.6v15.602c0 25.199-20.398 45.602-45.602 45.602l-136.8-.004c-67.2 0-121.2 54-121.2 121.2v15.602h319.2v882h182.4v-882h319.2V242.4c0-67.199-54-121.2-121.2-121.2zm-228 182.4h-61.199v30H661.2v91.199h-45.602l.004 31.199h45.602v91.199h-45.602v30h45.602v91.199H600v30H661.2v91.199h-45.602v30H661.2v92.402h-45.602v30H661.2v91.199H600v30h61.2v45.602H538.8v-852H660v46.801zm-440.4-76.801c7.2-43.199 44.398-75.602 90-75.602h136.8c37.199 0 67.199-26.398 74.398-61.199h154.8c7.2 34.801 37.199 61.199 74.398 61.199h136.8c45.602 0 82.801 32.398 90 75.602z" />
        </svg>
      </span>
    </button>
  );
}
