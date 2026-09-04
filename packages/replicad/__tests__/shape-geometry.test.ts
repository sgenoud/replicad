import { expect, test } from "vitest";
import { makeBaseBox } from "../src/index";
import {
  curvePointAt,
  curveTangentAt,
  curveType,
  faceCenter,
  faceNormalAt,
  faceUVBounds,
  faceUVCoordinates,
  pointOnFace,
  surfaceType,
} from "../src/shapeFunctions/index";

test("standalone curve geometry functions match the wrapper API", () => {
  const shape = makeBaseBox(10, 20, 30);
  const edges = shape.edges;
  const curve = edges[0].curve;

  const directPoint = curvePointAt(curve, 0.25);
  const methodPoint = curve.pointAt(0.25);
  const directTangent = curveTangentAt(curve, 0.25);
  const methodTangent = curve.tangentAt(0.25);

  expect(directPoint.toTuple()).toEqual(methodPoint.toTuple());
  expect(directTangent.toTuple()).toEqual(methodTangent.toTuple());
  expect(curveType(curve)).toBe(curve.curveType);

  directPoint.delete();
  methodPoint.delete();
  directTangent.delete();
  methodTangent.delete();
  curve.delete();
  edges.forEach((edge) => edge.delete());
  shape.delete();
});

test("standalone face geometry functions match the wrapper API", () => {
  const shape = makeBaseBox(10, 20, 30);
  const faces = shape.faces;
  const face = faces[0];
  const surface = face.surface;

  const directPoint = pointOnFace(face, 0.5, 0.5);
  const methodPoint = face.pointOnSurface(0.5, 0.5);
  const directNormal = faceNormalAt(face);
  const methodNormal = face.normalAt();
  const directCenter = faceCenter(face);
  const methodCenter = face.center;

  expect(faceUVBounds(face)).toEqual(face.UVBounds);
  expect(faceUVCoordinates(face, directPoint)).toEqual(
    face.uvCoordinates(directPoint)
  );
  expect(directPoint.toTuple()).toEqual(methodPoint.toTuple());
  expect(directNormal.toTuple()).toEqual(methodNormal.toTuple());
  expect(directCenter.toTuple()).toEqual(methodCenter.toTuple());
  expect(surfaceType(surface)).toBe(surface.surfaceType);

  directPoint.delete();
  methodPoint.delete();
  directNormal.delete();
  methodNormal.delete();
  directCenter.delete();
  methodCenter.delete();
  surface.delete();
  faces.forEach((item) => item.delete());
  shape.delete();
});
