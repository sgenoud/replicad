import { ProjectionCamera, drawProjection } from "replicad";

export type ProjectMode = false | "visible" | "hidden";

type Viewbox = {
  xMin: number;
  yMin: number;
  xMax: number;
  yMax: number;
  width: number;
  height: number;
};

function parseViewbox(viewbox?: string): Partial<Viewbox> {
  if (!viewbox) return {};
  const [x, y, width, height] = viewbox.split(" ").map((value) => {
    return Number.parseFloat(value);
  });

  return {
    xMin: x,
    yMin: y,
    xMax: x + width,
    yMax: y + height,
    width,
    height,
  };
}

function mergeViewboxes(viewboxes: string[]): Viewbox {
  const [xMin, yMin, xMax, yMax] = viewboxes.reduce(
    (acc, viewbox) => {
      const [currentXMin, currentYMin, currentXMax, currentYMax] = acc;
      const parsed = parseViewbox(viewbox);

      return [
        Math.min(parsed.xMin ?? currentXMin, currentXMin),
        Math.min(parsed.yMin ?? currentYMin, currentYMin),
        Math.max(parsed.xMax ?? currentXMax, currentXMax),
        Math.max(parsed.yMax ?? currentYMax, currentYMax),
      ];
    },
    [Infinity, Infinity, -Infinity, -Infinity]
  );

  return {
    xMin,
    yMin,
    xMax,
    yMax,
    width: xMax - xMin,
    height: yMax - yMin,
  };
}

function stringifyViewbox({ xMin, yMin, xMax, yMax }: Viewbox) {
  return [
    xMin.toFixed(2),
    yMin.toFixed(2),
    (xMax - xMin).toFixed(2),
    (yMax - yMin).toFixed(2),
  ].join(" ");
}

function mainSvg(viewbox: string, body: string) {
  return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="${viewbox}" fill="none" stroke="black" stroke-width="0.2%" vector-effect="non-scaling-stroke">
${body}
</svg>`;
}

function pathElements(
  drawing: { toSVGPaths: () => string[] | string[][] },
  attributes = ""
) {
  return drawing
    .toSVGPaths()
    .flat(Infinity)
    .map((path) => `<path${attributes} d="${path}" />`)
    .join("\n");
}

function writeSvg(visible: any, hidden?: any) {
  const visiblePath = pathElements(visible);

  if (!hidden) {
    return mainSvg(visible.toSVGViewBox(), visiblePath);
  }

  const viewbox = stringifyViewbox(
    mergeViewboxes([visible.toSVGViewBox(), hidden.toSVGViewBox()])
  );
  const hiddenPath = pathElements(hidden, ' stroke-dasharray="1,1" opacity="0.1"');

  return mainSvg(viewbox, `${visiblePath}\n${hiddenPath}`);
}

export function prettyProjectionSvg(
  shape: any,
  projectMode: Exclude<ProjectMode, false> = "visible"
) {
  if (!shape?.boundingBox) {
    throw new Error(
      "Projection export requires a 3D shape as the first result"
    );
  }

  const bbox = shape.boundingBox;
  const center = bbox.center;
  const maxSide = Math.max(bbox.width, bbox.height, bbox.depth);
  const corner: [number, number, number] = [
    center[0] + maxSide,
    center[1] - maxSide,
    center[2] + maxSide,
  ];
  const camera = new ProjectionCamera(corner).lookAt(center);
  const { visible, hidden } = drawProjection(shape, camera);

  return writeSvg(visible, projectMode === "hidden" ? hidden : undefined);
}
