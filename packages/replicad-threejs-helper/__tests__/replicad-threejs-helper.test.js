import { describe, expect, test } from "vitest";
import {
  BufferGeometry,
  Frustum,
  LineSegments,
  Matrix4,
  Mesh,
  OrthographicCamera,
  Raycaster,
  Vector3,
} from "three";
import {
  syncFaces,
  syncLines,
  syncLinesFromFaces,
} from "../lib/replicad-threejs-helper";

const triangleAt = (x) => ({
  vertices: [x, 0, 0, x + 2, 0, 0, x, 2, 0],
  triangles: [0, 1, 2],
});

const cases = [
  {
    name: "faces",
    createObject: (geometry) => new Mesh(geometry),
    sync: (geometry, x) => syncFaces(geometry, triangleAt(x)),
  },
  {
    name: "lines",
    createObject: (geometry) => new LineSegments(geometry),
    sync: (geometry, x) =>
      syncLines(geometry, { lines: [x, 0, 0, x + 2, 0, 0] }),
  },
  {
    name: "lines derived from faces",
    createObject: (geometry) => new LineSegments(geometry),
    sync: (geometry, x) => {
      const faces = new BufferGeometry();
      syncFaces(faces, triangleAt(x));
      syncLinesFromFaces(geometry, faces);
      faces.dispose();
    },
  },
];

const frustumAt = (x) => {
  const camera = new OrthographicCamera(-5, 5, 5, -5, 0.1, 100);
  camera.position.set(x, 0, 10);
  camera.updateMatrixWorld();
  return new Frustum().setFromProjectionMatrix(
    new Matrix4().multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    )
  );
};

describe.each(cases)("sync $name", ({ createObject, sync }) => {
  test("provides fresh bounds immediately after each sync", () => {
    const geometry = new BufferGeometry();
    for (const x of [0, 100, -100]) {
      sync(geometry, x);
      expect(geometry.boundingBox).not.toBeNull();
      expect(geometry.boundingSphere).not.toBeNull();
      expect(geometry.boundingBox.min.x).toBe(x);
      expect(geometry.boundingBox.max.x).toBe(x + 2);
      expect(geometry.boundingSphere.center.x).toBeCloseTo(x + 1);
      expect(geometry.boundingSphere.radius).toBeGreaterThan(0);
    }
    geometry.dispose();
  });

  test("refreshes cached bounds for frustum culling after position updates", () => {
    const geometry = new BufferGeometry();
    const object = createObject(geometry);
    sync(geometry, 0);
    const frustum = frustumAt(100);
    expect(frustum.intersectsObject(object)).toBe(false);

    sync(geometry, 100);
    expect(frustum.intersectsObject(object)).toBe(true);
    expect(geometry.boundingSphere.center.x).toBeCloseTo(101);
    expect(geometry.boundingBox.min.x).toBe(100);
    geometry.dispose();
    object.material.dispose();
  });

  test("refreshes cached bounds for raycasting without a render first", () => {
    const geometry = new BufferGeometry();
    const object = createObject(geometry);
    sync(geometry, 0);

    sync(geometry, 100);
    const raycaster = new Raycaster(
      new Vector3(100.5, 0.25, 10),
      new Vector3(0, 0, -1)
    );
    raycaster.params.Line.threshold = 0.5;
    expect(raycaster.intersectObject(object)).not.toHaveLength(0);
    geometry.dispose();
    object.material.dispose();
  });
});
