const hypocycloid = (t, r1, r2) => {
  return [
    (r1 - r2) * Math.cos(t) + r2 * Math.cos((r1 / r2) * t - t),
    (r1 - r2) * Math.sin(t) + r2 * Math.sin(-((r1 / r2) * t - t)),
  ];
};

const epicycloid = (t, r1, r2) => {
  return [
    (r1 + r2) * Math.cos(t) - r2 * Math.cos((r1 / r2) * t + t),
    (r1 + r2) * Math.sin(t) - r2 * Math.sin((r1 / r2) * t + t),
  ];
};

const gear = (t, r1 = 4, r2 = 1) => {
  if ((-1) ** (1 + Math.floor((t / 2 / Math.PI) * (r1 / r2))) < 0)
    return epicycloid(t, r1, r2);
  else return hypocycloid(t, r1, r2);
};

const defaultParams = {
  height: 15,
};

/** @typedef { typeof import("replicad") } replicadLib */
/** @type {function(replicadLib, typeof defaultParams): any} */
const main = ({ sketchCircle, sketchParametricFunction }, { height }) => {
  const base = sketchParametricFunction((t) =>
    gear(2 * Math.PI * t, 6, 1)
  ).extrude(height, { twistAngle: 90 });

  const hole = sketchCircle(2).extrude(height);

  return base.cut(hole);
};
