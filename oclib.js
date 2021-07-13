const OC = {
  library: null,
};

export const setOC = (oc) => {
  OC.library = oc;
};

export const getOC = () => {
  if (!OC.library) throw new Error("oppencascade has not been loaded");
  return OC.library;
};
