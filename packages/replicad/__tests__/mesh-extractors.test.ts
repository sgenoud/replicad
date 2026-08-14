import { expect, test } from "vitest";
import { makeBaseBox } from "../src/index";

test("native mesh groups preserve public shape hashes", () => {
  const shape = makeBaseBox(10, 20, 30);
  const mesh = shape.mesh();
  const edgeMesh = shape.meshEdges();

  expect(mesh.faceGroups.map(({ faceId }) => faceId)).toEqual(
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
});
