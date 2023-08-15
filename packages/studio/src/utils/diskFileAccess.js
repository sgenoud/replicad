import { fileOpen } from "browser-fs-access";
import { get, set } from "idb-keyval";

const HANDLE_ID = "file-handle";

export const requestFile = async () => {
  const blob = await fileOpen({ id: "source" });
  if (!blob?.handle) return;

  set(HANDLE_ID, blob.handle);
  return blob.handle;
};

export const loadFile = async () => {
  const handle = await get(HANDLE_ID);
  if (!handle) return;

  if ((await handle.queryPermission({ mode: "read" })) === "granted") {
    return handle;
  }
  if ((await handle.requestPermission({ mode: "read" })) === "granted") {
    return handle;
  }
};

export const clearFileSave = async () => {
  set(HANDLE_ID, null);
};

export const getSavedHandleName = async () => {
  const handle = await get(HANDLE_ID);
  if (!handle) return;
  return handle.name;
};
