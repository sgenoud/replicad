import { expect, test } from "vitest";
import {
  EdgeFinder,
  makeBaseBox,
  topMost,
  type AnyShape,
  type FinderFunction,
} from "../src/index";

test("passes the shape to finder functions", () => {
  const shape = makeBaseBox(10, 10, 10);
  let receivedShape: AnyShape | undefined;

  const filleted = shape.fillet(1, (finder, filterShape) => {
    receivedShape = filterShape;
    return finder.when(topMost(filterShape)).parallelTo("XY");
  });

  expect(receivedShape).toBe(shape);

  filleted.delete();
  shape.delete();
});

test("selects elements touching a shape extremum", () => {
  const shape = makeBaseBox(10, 10, 10);

  const topEdges = new EdgeFinder()
    .when(topMost(shape))
    .inDirection("X")
    .find(shape);
  expect(topEdges).toHaveLength(2);

  topEdges.forEach((edge) => edge.delete());
  shape.delete();
});

test("finder functions can omit the shape argument", () => {
  const filter: FinderFunction<EdgeFinder, AnyShape> = (finder) =>
    finder.inDirection("Z");

  expect(filter).toBeTypeOf("function");
});
