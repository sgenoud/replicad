import { BoundingBox2d } from "../lib2d";

export const viewbox = (bbox: BoundingBox2d, margin = 1) => {
  const minX = bbox.bounds[0][0] - margin;
  const minY = -bbox.bounds[1][1] - margin;

  return `${minX} ${minY} ${bbox.width + 2 * margin} ${
    bbox.height + 2 * margin
  }`;
};

export const asSVG = (body: string, boundingBox: BoundingBox2d, margin = 1) => {
  const vbox = viewbox(boundingBox, margin);
  return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="${vbox}" fill="none" stroke="black" stroke-width="0.6%" vector-effect="non-scaling-stroke">
    ${body}
</svg>`;
};
