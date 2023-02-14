const { drawCircle, drawParametricFunction } = replicad;

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

const main = (r, { height }) => {
  const base = drawParametricFunction((t) => gear(2 * Math.PI * t, 6, 1))
    .sketchOnPlane()
    .extrude(height, { twistAngle: 90 });

  const hole = drawCircle(2).sketchOnPlane().extrude(height);

  return base.cut(hole);
};
