import Sketcher from "./Sketcher.js";

export const makeBaseBox = (xLength, yLength, zLength) => {
  return new Sketcher()
    .movePointer(-xLength / 2, yLength / 2)
    .hLine(xLength)
    .vLine(-yLength)
    .hLine(-xLength)
    .close({
      returnType: "solid",
      extrusionDistance: zLength,
    });
};
