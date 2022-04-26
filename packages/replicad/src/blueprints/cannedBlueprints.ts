import Blueprint from "./Blueprint";
import { BlueprintSketcher } from "../Sketcher2d";

export const polysidesBlueprint = (
  radius: number,
  sidesCount: number,
  sagitta = 0
): Blueprint => {
  const points = [...Array(sidesCount).keys()].map((i) => {
    const theta = -((Math.PI * 2) / sidesCount) * i;
    return [radius * Math.sin(theta), radius * Math.cos(theta)];
  });

  // We start with the last point to make sure the shape is complete
  const blueprint = new BlueprintSketcher().movePointerTo([
    points[points.length - 1][0],
    points[points.length - 1][1],
  ]);

  if (sagitta) {
    points.forEach(([x, y]) => blueprint.sagittaArcTo([x, y], sagitta));
  } else {
    points.forEach(([x, y]) => blueprint.lineTo([x, y]));
  }

  return blueprint.done();
};

export const roundedRectangleBlueprint = (
  width: number,
  height: number,
  r: number | { rx?: number; ry?: number } = 0
) => {
  const { rx: inputRx = 0, ry: inputRy = 0 } =
    typeof r === "number" ? { ry: r, rx: r } : r;

  let rx = Math.min(inputRx, width / 2);
  let ry = Math.min(inputRy, height / 2);

  const withRadius = rx && ry;
  if (!withRadius) {
    rx = 0;
    ry = 0;
  }

  const sk = new BlueprintSketcher([
    Math.min(0, -(width / 2 - rx)),
    -height / 2,
  ]);

  if (rx < width / 2) {
    sk.hLine(width - 2 * rx);
  }
  if (withRadius) {
    sk.ellipse(rx, ry, rx, ry, 0, false, true);
  }
  if (ry < height / 2) {
    sk.vLine(height - 2 * ry);
  }
  if (withRadius) {
    sk.ellipse(-rx, ry, rx, ry, 0, false, true);
  }
  if (rx < width / 2) {
    sk.hLine(-(width - 2 * rx));
  }
  if (withRadius) {
    sk.ellipse(-rx, -ry, rx, ry, 0, false, true);
  }
  if (ry < height / 2) {
    sk.vLine(-(height - 2 * ry));
  }
  if (withRadius) {
    sk.ellipse(rx, -ry, rx, ry, 0, false, true);
  }
  return sk.close();
};
