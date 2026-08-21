import { expect, test } from "vitest";
import { EdgeFinder, makeBaseBox } from "../src/index";

test("finds elements near a point within a tolerance", () => {
  const shape = makeBaseBox(10, 10, 10);
  const point: [number, number, number] = [0, 5, 0.1];

  expect(new EdgeFinder().containsPoint(point).find(shape)).toHaveLength(0);
  expect(new EdgeFinder().near(point, 0.05).find(shape)).toHaveLength(0);

  const nearbyEdges = new EdgeFinder().near(point, 0.2).find(shape);
  expect(nearbyEdges).toHaveLength(1);

  const edgesAtDistance = new EdgeFinder()
    .atDistance(0, point, 0.2)
    .find(shape);
  expect(edgesAtDistance).toHaveLength(1);

  nearbyEdges.forEach((edge) => edge.delete());
  edgesAtDistance.forEach((edge) => edge.delete());
  shape.delete();
});
