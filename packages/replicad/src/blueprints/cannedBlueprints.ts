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
