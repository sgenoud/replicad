import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

import { useRect } from "react-use-rect";

const SVGCanvasWrapper = styled.div`
  background-color: var(--bg-color);
  display: flex;
  flex: 1 1 auto;
`;

const SVGCanvas = styled.svg`
  background-color: var(--bg-color);
  max-width: 100vw;
  max-height: 100vh;
`;

const range = (start, end, step = 1) => {
  const result = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
};

const SVGGrid = ({ viewbox }) => {
  const { xMin, yMin, xMax, yMax, width, height } = viewbox;

  const gridStep = 10 ** (Math.ceil(Math.log10(Math.max(width, height))) - 2);

  const xGrid = range(
    Math.floor(xMin / gridStep) * gridStep,
    Math.ceil(xMax / gridStep) * gridStep,
    gridStep
  );
  const yGrid = range(
    Math.floor(yMin / gridStep) * gridStep,
    Math.ceil(yMax / gridStep) * gridStep,
    gridStep
  );

  const grid = [
    ...xGrid.map((x) => (
      <line
        key={`x${x}`}
        x1={x}
        y1={yMin}
        x2={x}
        y2={yMax}
        stroke="#ccc"
        vectorEffect="non-scaling-stroke"
        strokeWidth="0.5"
      />
    )),
    ...yGrid.map((y) => (
      <line
        key={`y${y}`}
        x1={xMin}
        y1={y}
        x2={xMax}
        y2={y}
        stroke="#ccc"
        vectorEffect="non-scaling-stroke"
        strokeWidth="0.5"
      />
    )),
  ];

  return (
    <>
      {grid}
      <line
        x1={xMin}
        y1={0}
        x2={xMax}
        y2={0}
        stroke="#ccc"
        vectorEffect="non-scaling-stroke"
        strokeWidth="5"
      />
      <line
        x1={0}
        y1={yMin}
        x2={0}
        y2={yMax}
        stroke="#ccc"
        vectorEffect="non-scaling-stroke"
        strokeWidth="5"
      />
    </>
  );
};

function parseViewbox(viewbox) {
  if (!viewbox) return {};
  const [x, y, width, height] = viewbox.split(" ").map((v) => parseFloat(v));
  return { xMin: x, yMin: y, xMax: x + width, yMax: y + height, width, height };
}

function mergeViewboxes(viewboxes) {
  const [xMin, yMin, xMax, yMax] = viewboxes.reduce(
    (acc, box) => {
      const [x1, y1, x2, y2] = acc;
      const { xMin, yMin, xMax, yMax } = parseViewbox(box);
      return [
        Math.min(xMin, x1),
        Math.min(yMin, y1),
        Math.max(xMax, x2),
        Math.max(yMax, y2),
      ];
    },
    [Infinity, Infinity, -Infinity, -Infinity]
  );

  return { xMin, yMin, xMax, yMax, width: xMax - xMin, height: yMax - yMin };
}

const stringifyViewbox = ({ xMin, yMin, xMax, yMax }) => {
  return [
    xMin.toFixed(2),
    yMin.toFixed(2),
    (xMax - xMin).toFixed(2),
    (yMax - yMin).toFixed(2),
  ].join(" ");
};

const dashArray = (strokeType) => {
  if (!strokeType) return undefined;
  if (strokeType === "solid") return undefined;
  if (strokeType === "dots") return "1, 2";
  if (strokeType === "dashes") return "5, 5";
  return undefined;
};

const ShapePath = ({ shape }) => {
  return (
    <path
      d={shape.paths?.flat(Infinity).join(" ")}
      strokeDasharray={dashArray(shape.strokeType)}
      vectorEffect="non-scaling-stroke"
      style={{ stroke: shape.color }}
    />
  );
};

const addMarginToViewbox = (viewbox, margin) => {
  const { xMin, yMin, xMax, yMax, width, height } = viewbox;
  return {
    xMin: xMin - margin * width,
    yMin: yMin - margin * height,
    xMax: xMax + margin * width,
    yMax: yMax + margin * height,
    width: width * (1 + 2 * margin),
    height: height * (1 + 2 * margin),
  };
};

const SVGWindow = ({ viewbox, withGrid, children }) => {
  const [clientRect, setRect] = useState(null);
  const [canvasRef] = useRect(setRect, { resize: true });

  const [adaptedViewbox, setAdaptedViewbox] = useState(viewbox);

  React.useEffect(() => {
    if (!clientRect) return;
    const marginedViewbox = addMarginToViewbox(viewbox, 0.1);

    const { width: rectWidth, height: rectHeight } = clientRect;
    const { width: boxWidth, height: boxHeight } = marginedViewbox;

    const rectRatio = rectWidth / rectHeight;
    const boxRatio = boxWidth / boxHeight;

    // we change the viewbox to fill the canvas while keeping the
    // coordinate system

    // First we decide which side we need to add padding to
    const paddingSide = rectRatio > boxRatio ? "width" : "height";

    if (paddingSide === "width") {
      const padding = rectRatio * boxHeight - boxWidth;
      setAdaptedViewbox({
        ...marginedViewbox,
        xMin: marginedViewbox.xMin - padding / 2,
        xMax: marginedViewbox.xMax + padding / 2,
        width: marginedViewbox.width + padding,
      });
    } else {
      const padding = boxWidth / rectRatio - boxHeight;
      setAdaptedViewbox({
        ...marginedViewbox,
        yMin: marginedViewbox.yMin - padding / 2,
        yMax: marginedViewbox.yMax + padding / 2,
        height: marginedViewbox.height + padding,
      });
    }
  }, [viewbox, clientRect]);

  return (
    <SVGCanvasWrapper ref={canvasRef}>
      <RawCanvas viewbox={adaptedViewbox} withGrid={withGrid}>
        {children}
      </RawCanvas>
    </SVGCanvasWrapper>
  );
};

const RawCanvas = ({ viewbox, withGrid, children }) => {
  return (
    <SVGCanvas
      viewBox={stringifyViewbox(viewbox)}
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      {withGrid && <SVGGrid viewbox={viewbox} />}
      <g stroke="#3c5a6e" vectorEffect="non-scaling-stroke" fill="none">
        {children}
      </g>
    </SVGCanvas>
  );
};

export default function SVGViewer({
  shape,
  withGrid = true,
  rawWindow = false,
}) {
  const Window = rawWindow ? RawCanvas : SVGWindow;
  if (shape && shape.format === "svg")
    return (
      <Window viewbox={parseViewbox(shape.viewbox)} withGrid={withGrid}>
        <ShapePath shape={shape} />
      </Window>
    );

  if (shape && shape.length && shape[0].format === "svg") {
    const viewbox = mergeViewboxes(shape.map((s) => s.viewbox));
    return (
      <Window viewbox={viewbox} withGrid={withGrid}>
        {shape.map((s) => {
          if (s && s.format === "svg")
            return <ShapePath shape={s} key={s.name} />;
          return null;
        })}
      </Window>
    );
  }
  return null;
}
