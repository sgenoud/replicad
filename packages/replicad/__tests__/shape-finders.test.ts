import { expect, expectTypeOf, test, vi } from "vitest";
import {
  Edge,
  EdgeFinder,
  Face,
  FaceFinder,
  makeBaseBox,
  topMost,
} from "../src/index";

test("findFace returns a unique face and passes the shape to the callback", () => {
  const shape = makeBaseBox(10, 20, 30);
  const face = shape.findFace((finder, filterShape) => {
    expect(finder).toBeInstanceOf(FaceFinder);
    expect(filterShape).toBe(shape);
    return finder.when(topMost(filterShape)).parallelTo("XY");
  });

  expectTypeOf(face).toEqualTypeOf<Face>();
  expect(face).toBeInstanceOf(Face);
  const center = face.center;
  expect(center.z).toBeCloseTo(30);

  center.delete();
  face.delete();
  shape.delete();
});

test("findEdge returns a unique edge and passes the shape to the callback", () => {
  const shape = makeBaseBox(10, 20, 30);
  const edge = shape.findEdge((finder, filterShape) => {
    expect(finder).toBeInstanceOf(EdgeFinder);
    expect(filterShape).toBe(shape);
    return finder.inDirection("X").containsPoint([0, 10, 30]);
  });

  expectTypeOf(edge).toEqualTypeOf<Edge>();
  expect(edge).toBeInstanceOf(Edge);
  expect(edge.length).toBeCloseTo(10);

  edge.delete();
  shape.delete();
});

test("plural finders return arrays and use fresh finders on each call", () => {
  const shape = makeBaseBox(10, 20, 30);
  const faces = shape.findFaces((finder, filterShape) => {
    expect(filterShape).toBe(shape);
    return finder.parallelTo("XY");
  });
  const edges = shape.findEdges((finder, filterShape) => {
    expect(filterShape).toBe(shape);
    return finder.inDirection("Z");
  });
  const allFaces = shape.findFaces((finder) => finder);
  const allEdges = shape.findEdges((finder) => finder);

  expectTypeOf(faces).toEqualTypeOf<Face[]>();
  expectTypeOf(edges).toEqualTypeOf<Edge[]>();
  expect(faces).toHaveLength(2);
  expect(edges).toHaveLength(4);
  expect(allFaces).toHaveLength(6);
  expect(allEdges).toHaveLength(12);

  [...faces, ...edges, ...allFaces, ...allEdges].forEach((item) => item.delete());
  shape.delete();
});

test("plural finders return empty arrays when nothing matches", () => {
  const shape = makeBaseBox(10, 20, 30);

  expect(shape.findFaces((finder) => finder.inPlane("XY", 100))).toEqual([]);
  expect(shape.findEdges((finder) => finder.ofLength(100))).toEqual([]);

  shape.delete();
});

test("singular finders reject both missing and ambiguous matches", () => {
  const shape = makeBaseBox(10, 20, 30);
  const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

  try {
    expect(() =>
      shape.findFace((finder) => finder.inPlane("XY", 100))
    ).toThrow("Finder has not found a unique solution");
    expect(() => shape.findFace((finder) => finder.parallelTo("XY"))).toThrow(
      "Finder has not found a unique solution"
    );
    expect(() => shape.findEdge((finder) => finder.ofLength(100))).toThrow(
      "Finder has not found a unique solution"
    );
    expect(() => shape.findEdge((finder) => finder.inDirection("Z"))).toThrow(
      "Finder has not found a unique solution"
    );
  } finally {
    consoleError.mockRestore();
    shape.delete();
  }
});

test("finders are available on faces as well as solids", () => {
  const shape = makeBaseBox(10, 20, 30);
  const face = shape.findFace((finder) => finder.inPlane("XY", 30));
  const edges = face.findEdges((finder) => finder.inDirection("X"));

  expect(edges).toHaveLength(2);

  edges.forEach((edge) => edge.delete());
  face.delete();
  shape.delete();
});
