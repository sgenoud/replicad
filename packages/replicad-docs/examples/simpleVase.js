const { draw } = replicad;

const defaultParams = {
  height: 100,
  baseWidth: 20,
  wallThickness: 5,
  lowerCircleRadius: 1.5,
  lowerCirclePosition: 0.25,
  higherCircleRadius: 0.75,
  higherCirclePosition: 0.75,
  topRadius: 0.9,
  topFillet: true,
  bottomHeavy: true,
};

const main = (
  r,
  {
    height,
    baseWidth,
    wallThickness,
    lowerCirclePosition,
    lowerCircleRadius,
    higherCircleRadius,
    higherCirclePosition,
    topRadius,
    topFillet,
    bottomHeavy,
  }
) => {
  const splinesConfig = [
    { position: lowerCirclePosition, radius: lowerCircleRadius },
    {
      position: higherCirclePosition,
      radius: higherCircleRadius,
      startFactor: bottomHeavy ? 3 : 1,
    },
    { position: 1, radius: topRadius, startFactor: bottomHeavy ? 3 : 1 },
  ];

  const sketchVaseProfile = draw().hLine(baseWidth);

  splinesConfig.forEach(({ position, radius, startFactor, endFactor }) => {
    sketchVaseProfile.smoothSplineTo([baseWidth * radius, height * position], {
      endTangent: [0, 1],
      startFactor,
      endFactor,
    });
  });

  let vase = sketchVaseProfile
    .lineTo([0, height])
    .close()
    .sketchOnPlane("XZ")
    .revolve();

  if (wallThickness) {
    vase = vase.shell(wallThickness, (f) => f.containsPoint([0, 0, height]));
  }

  if (topFillet) {
    vase = vase.fillet(wallThickness / 3, (e) => e.inPlane("XY", height));
  }

  return vase;
};
