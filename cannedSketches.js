import { assembleWire, makeCircle, makeEllipse } from "./shapeHelpers";
import { Vector } from "./geom";
import Sketcher from "./Sketcher";
import { makePlane } from "./sketcherlib.js";
import Sketch from "./Sketch.js";

export const sketchCircle = (radius, { plane: sourcePlane, origin } = {}) => {
  const plane = makePlane(sourcePlane, origin);
  const wire = assembleWire([makeCircle(radius, plane.origin, plane.zDir)]);
  const sketch = new Sketch(wire, {
    defaultOrigin: origin,
    defaultDirection: plane.zDir,
  });
  plane.delete();
  return sketch;
};

export const sketchEllipse = (
  xRadius = 1,
  yRadius = 2,
  { plane: sourcePlane, origin } = {}
) => {
  const plane = makePlane(sourcePlane, origin);
  const xDir = new Vector(plane.xDir);

  let majR = xRadius;
  let minR = yRadius;

  if (yRadius > xRadius) {
    xDir.rotate(90, plane.origin, plane.zDir);
    majR = yRadius;
    minR = xRadius;
  }

  const wire = assembleWire([
    makeEllipse(majR, minR, plane.origin, plane.zDir, xDir),
  ]);
  xDir.delete();

  const sketch = new Sketch(wire, {
    defaultOrigin: origin,
    defaultDirection: plane.zDir,
  });
  plane.delete();
  return sketch;
};

export const sketchRectangle = (xLength, yLength, { plane, origin } = {}) => {
  return new Sketcher(plane, origin)
    .movePointerTo([-xLength / 2, yLength / 2])
    .hLine(xLength)
    .vLine(-yLength)
    .hLine(-xLength)
    .vLine(yLength)
    .done();
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
  const sketch = new Sketcher(plane, origin).movePointerTo([
    points[points.length - 1][0],
    points[points.length - 1][1],
  ]);

  if (sagitta) {
    points.forEach(([x, y]) => sketch.sagittaArcTo([x, y], sagitta));
  } else {
    points.forEach(([x, y]) => sketch.lineTo([x, y]));
  }

  return sketch.done();
};

export const polysideInnerRadius = (outerRadius, sidesCount, sagitta = 0) => {
  const innerAngle = Math.PI / sidesCount; // Half of a side
  const innerRadius = Math.cos(innerAngle) * outerRadius;

  // Only a concave sagitta changes the inner radius
  if (sagitta <= 0) return innerRadius;
  return innerRadius - sagitta;
};

export const sketchFaceOffset = (face, offset) => {
  const defaultOrigin = face.center;
  const defaultDirection = face.normalAt();
  const wire = face.outerWire().offset2D(offset);

  const sketch = new Sketch(wire, { defaultOrigin, defaultDirection });
  defaultOrigin.delete();
  defaultDirection.delete();

  return sketch;
};
