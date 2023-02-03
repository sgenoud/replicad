import { expect, test } from "vitest";
import {
  drawRoundedRectangle,
  draw,
  drawCircle,
  drawPolysides,
  Drawing,
} from "../../src/index";

const ex1Vertexes = [
  [100, 100, -0.5],
  [80, 90, 0.374794619217547],
  [210, 0, 0],
  [230, 0, 1],
  [320, 0, -0.5],
  [280, 0, 0.5],
  [390, 210, 0],
  [280, 120, 0.5],
];

const ex2Vertexes = [
  [0, 25, 1],
  [0, 0, 0],
  [2, 0, 1],
  [10, 0, -0.5],
  [8, 9, 0.374794619217547],
  [21, 0, 0],
  [23, 0, 1],
  [32, 0, -0.5],
  [28, 0, 0.5],
  [39, 21, 0],
  [28, 12, 0],
];

const drawVertexes = (vertexes) => {
  const [x0, y0, b0] = vertexes[0];
  const d = draw([x0, y0]);

  let bulge = b0;

  for (let i = 1; i < vertexes.length; i++) {
    const [x, y, b] = vertexes[i];
    d.bulgeArcTo([x, y], bulge);
    bulge = b;
  }
  d.bulgeArcTo([x0, y0], bulge);
  return d.close();
};

const splineVase = ({
  height = 100,
  baseWidth = 20,
  lowerCircleRadius = 1.5,
  lowerCirclPosition = 0.25,
  higherCircleRadius = 0.75,
  higherCirclePosition = 0.75,
  topRadius = 0.9,
  bottomHeavy = true,
} = {}) => {
  const splinesConfig = [
    { position: lowerCirclPosition, radius: lowerCircleRadius },
    {
      position: higherCirclePosition,
      radius: higherCircleRadius,
      startFactor: bottomHeavy ? 3 : 1,
    },
    { position: 1, radius: topRadius, startFactor: bottomHeavy ? 3 : 1 },
  ];

  const sketchVaseProfile = draw().hLine(baseWidth);

  splinesConfig.forEach(({ position, radius, startFactor }) => {
    sketchVaseProfile.smoothSplineTo([baseWidth * radius, height * position], {
      endTangent: [0, 1],
      startFactor,
    });
  });
  return sketchVaseProfile.lineTo([0, height]).closeWithMirror();
};

test.each([-75, -50, -25, -10, -1, 1, 10, 25, 50])(
  "offset complex shape 1, with offset %d",
  (offsetVal) => {
    expect(
      drawVertexes(ex1Vertexes).offset(offsetVal).toSVG()
    ).toMatchSVGSnapshot();
  }
);

test.each([-10, -5, -2, -1, 1, 20])(
  "offset complex shape 2, with offset %d",
  (offsetVal) => {
    expect(
      drawVertexes(ex2Vertexes).offset(offsetVal).toSVG()
    ).toMatchSVGSnapshot();
  }
);

test.each([-1, 1, 5, 10])("offset vase, with offset %d", (offsetVal) => {
  expect(splineVase().offset(offsetVal).toSVG()).toMatchSVGSnapshot();
});
