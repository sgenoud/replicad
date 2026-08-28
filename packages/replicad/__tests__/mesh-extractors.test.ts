import { expect, test } from "vitest";
import { makeBaseBox, mesh, meshEdges, triangulateFace } from "../src/index";

test("native mesh groups preserve public shape hashes", () => {
  const shape = makeBaseBox(10, 20, 30);
  const shapeMesh = shape.mesh();
  const edgeMesh = shape.meshEdges();

  expect(shapeMesh.faceGroups.map(({ faceId }) => faceId)).toEqual(
    shape.faces.map(({ hashCode }) => hashCode)
  );
  expect(edgeMesh.edgeGroups.map(({ edgeId }) => edgeId)).toEqual(
    shape.edges.map(({ hashCode }) => hashCode)
  );
  expect(edgeMesh.edgeGroups).toHaveLength(12);
  expect(
    edgeMesh.edgeGroups.every(
      ({ start, count }) =>
        start >= 0 && count >= 2 && start + count <= edgeMesh.lines.length / 3
    )
  ).toBe(true);

  expect(mesh(shape)).toEqual(mesh(shape.wrapped));
  expect(meshEdges(shape)).toEqual(meshEdges(shape.wrapped));

  const face = shape.faces[0];
  expect(triangulateFace(face)).toEqual(face.triangulation());
  face.delete();
  shape.delete();
});
