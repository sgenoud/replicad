const defaultParams = {
  height: 150,
  radius: 40,
  sidesCount: 12,
  sideRadius: -2,
  sideTwist: 6,
  endFactor: 1.5,
  topFillet: 0,
  bottomFillet: 5,

  holeMode: 1,
  wallThickness: 2,
};

/** @typedef { typeof import("replicad") } replicadLib */
/** @type {function(replicadLib, typeof defaultParams): any} */
const main = (
  {
    EdgeFinder,
    FaceFinder,
    sketchCircle,
    sketchPolysides,
    polysideInnerRadius,
  },
  {
    height,
    radius,
    sidesCount,
    sideRadius,
    sideTwist,
    endFactor,
    topFillet,
    bottomFillet,
    holeMode,
    wallThickness,
  }
) => {
  const extrusionProfile = endFactor
    ? { profile: "s-curve", endFactor }
    : undefined;
  const twistAngle = (360 / sidesCount) * sideTwist;

  let shape = sketchPolysides(radius, sidesCount, sideRadius).extrude(height, {
    twistAngle,
    extrusionProfile,
  });

  if (bottomFillet) {
    shape = shape.fillet({
      filter: new EdgeFinder().inPlane("XY"),
      radius: bottomFillet,
    });
  }

  if (holeMode === 1 || holeMode === 2) {
    const holeHeight = height - wallThickness;

    let hole;
    if (holeMode === 1) {
      const insideRadius =
        polysideInnerRadius(radius, sidesCount, sideRadius) - wallThickness;

      hole = sketchCircle(insideRadius).extrude(holeHeight, {
        extrusionProfile,
      });

      shape = shape.cut(
        hole
          .fillet({
            filter: new EdgeFinder().inPlane("XY"),
            radius: Math.max(wallThickness / 3, bottomFillet - wallThickness),
          })
          .translate([0, 0, wallThickness])
      );
    } else if (holeMode === 2) {
      shape = shape.shell({
        filter: new FaceFinder().inPlane("XY", height),
        thickness: wallThickness,
      });
    }
  }

  if (topFillet) {
    shape = shape.fillet({
      filter: new EdgeFinder().inPlane("XY", height),
      radius: topFillet,
    });
  }
  return shape;
};
