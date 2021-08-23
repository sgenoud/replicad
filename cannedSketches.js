import { assembleWire, makeCircle } from "./shapeHelpers";
import Sketcher, { BaseSketcher } from "./Sketcher";

class CicleSketcher extends BaseSketcher {
  constructor(radius = 1, plane, origin) {
    super(plane, origin);
    this.radius = radius;
  }

  buildWire() {
    return assembleWire([
      makeCircle(this.radius, this.plane.origin, this.plane.zDir),
    ]);
  }
}

export const sketchCircle = (radius, { plane, origin } = {}) => {
  return new CicleSketcher(radius, plane, origin);
};

export const sketchPolysides = (
  radius,
  sidesCount,
  sagitta = 0,
  { plane, origin } = {}
) => {
  const points = [...Array(sidesCount).keys()].map((i) => {
    const theta = ((Math.PI * 2) / sidesCount) * i;
    return [radius * Math.sin(theta), radius * Math.cos(theta)];
  });

  // We start with the last point to make sure the shape is complete
  const sketch = new Sketcher(plane, origin).movePointer(
    points[points.length - 1][0],
    points[points.length - 1][1]
  );

  if (sagitta) {
    points.forEach(([x, y]) => sketch.sagittaArcTo([x, y], sagitta));
  } else {
    points.forEach(([x, y]) => sketch.lineTo(x, y));
  }

  return sketch;
};

export const polysideInnerRadius = (outerRadius, sidesCount, sagitta = 0) => {
  const innerAngle = Math.PI / sidesCount; // Half of a side
  const innerRadius = Math.cos(innerAngle) * outerRadius;

  // Only a concave sagitta changes the inner radius
  if (sagitta <= 0) return innerRadius;
  return innerRadius - sagitta;
};
