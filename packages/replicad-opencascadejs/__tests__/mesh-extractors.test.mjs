import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

import initMulti from "../dist/replicad_multi.js";
import initSingle from "../dist/replicad_single.js";

const require = createRequire(import.meta.url);
const initSingleCjs = require("replicad-opencascadejs");
const initMultiCjs = require("replicad-opencascadejs/multi");

const HASH_CODE_MAX = 2_147_483_647;
const TOLERANCE = 0.1;
const ANGULAR_TOLERANCE = 0.5;
const distDir = fileURLToPath(new URL("../dist/", import.meta.url));
const multiGluePath = join(distDir, "replicad_multi.js");

test("CommonJS entry points expose the existing module factories", async () => {
  expect(typeof initMultiCjs).toBe("function");
  const oc = await initSingleCjs({
    locateFile: () => join(distDir, "replicad_single.wasm"),
  });
  expect(typeof oc.BRepPrimAPI_MakeBox).toBe("function");
});
const runtimes = [
  {
    name: "single",
    wasmPath: join(distDir, "replicad_single.wasm"),
    initialize: (wasmPath) => initSingle({ locateFile: () => wasmPath }),
  },
  {
    name: "pthread",
    wasmPath: join(distDir, "replicad_multi.wasm"),
    initialize: (wasmPath) =>
      initMulti({
        locateFile: () => wasmPath,
        mainScriptUrlOrBlob: multiGluePath,
      }),
  },
];

const withDeletes = (callback) => {
  const owned = [];
  const track = (value) => {
    if (value && typeof value.delete === "function") owned.push(value);
    return value;
  };

  try {
    return callback(track);
  } finally {
    for (let index = owned.length - 1; index >= 0; index--)
      owned[index].delete();
  }
};

const readFloat32 = (oc, pointer, size) => {
  const heap = new Float32Array(oc.wasmMemory.buffer);
  return Array.from(heap.subarray(pointer / 4, pointer / 4 + size));
};

const readUint32 = (oc, pointer, size) => {
  const heap = new Uint32Array(oc.wasmMemory.buffer);
  return Array.from(heap.subarray(pointer / 4, pointer / 4 + size));
};

const readInt32 = (oc, pointer, size) => {
  const heap = new Int32Array(oc.wasmMemory.buffer);
  return Array.from(heap.subarray(pointer / 4, pointer / 4 + size));
};

const readFaceMesh = (oc, result) => ({
  vertices: readFloat32(oc, result.getVerticesPtr(), result.getVerticesSize()),
  normals: readFloat32(oc, result.getNormalsPtr(), result.getNormalsSize()),
  triangles: readUint32(
    oc,
    result.getTrianglesPtr(),
    result.getTrianglesSize()
  ),
  groups: readInt32(oc, result.getFaceGroupsPtr(), result.getFaceGroupsSize()),
});

const readEdgeMesh = (oc, result) => ({
  lines: readFloat32(oc, result.getLinesPtr(), result.getLinesSize()),
  groups: readInt32(oc, result.getEdgeGroupsPtr(), result.getEdgeGroupsSize()),
});

const assertFloatArraysClose = (actual, expected, tolerance = 1e-5) => {
  expect(actual.length).toBe(expected.length);
  for (let index = 0; index < actual.length; index++) {
    expect(
      Math.abs(actual[index] - expected[index]),
      `value ${index} differs: ${actual[index]} !== ${expected[index]}`
    ).toBeLessThanOrEqual(tolerance);
  }
};

const pushSegment = (lines, from, to) => {
  lines.push(
    Math.fround(from.X()),
    Math.fround(from.Y()),
    Math.fround(from.Z()),
    Math.fround(to.X()),
    Math.fround(to.Y()),
    Math.fround(to.Z())
  );
};

const expectedEdges = (oc, shape) =>
  withDeletes((track) => {
    const seen = [];
    const lines = [];
    const groups = [];
    const faceExplorer = track(
      new oc.TopExp_Explorer(
        shape,
        oc.TopAbs_ShapeEnum.TopAbs_FACE,
        oc.TopAbs_ShapeEnum.TopAbs_SHAPE
      )
    );

    while (faceExplorer.More()) {
      const rawFace = track(faceExplorer.Current());
      const face = track(oc.TopoDS.Face(rawFace));
      const faceLocation = track(new oc.TopLoc_Location());
      const triangulation = track(
        oc.BRep_Tool.Triangulation(face, faceLocation, 0)
      );

      if (triangulation && !triangulation.isNull()) {
        const edgeExplorer = track(
          new oc.TopExp_Explorer(
            face,
            oc.TopAbs_ShapeEnum.TopAbs_EDGE,
            oc.TopAbs_ShapeEnum.TopAbs_SHAPE
          )
        );

        while (edgeExplorer.More()) {
          const rawEdge = track(edgeExplorer.Current());
          const edge = track(oc.TopoDS.Edge(rawEdge));
          if (!seen.some((candidate) => candidate.IsSame(edge))) {
            const polygon = track(
              oc.BRep_Tool.PolygonOnTriangulation(
                edge,
                triangulation,
                faceLocation
              )
            );
            if (polygon && !polygon.isNull() && polygon.NbNodes() >= 2) {
              seen.push(edge);
              const start = lines.length / 3;
              const transformation = track(faceLocation.Transformation());
              let previous = null;

              for (let index = 1; index <= polygon.NbNodes(); index++) {
                const node = track(triangulation.Node(polygon.Node(index)));
                const point = track(node.Transformed(transformation));
                if (previous) pushSegment(lines, previous, point);
                previous = point;
              }

              groups.push(
                start,
                lines.length / 3 - start,
                oc.OCJS_ShapeHasher.HashCode(edge, HASH_CODE_MAX)
              );
            }
          }
          edgeExplorer.Next();
        }
      }
      faceExplorer.Next();
    }

    const edgeExplorer = track(
      new oc.TopExp_Explorer(
        shape,
        oc.TopAbs_ShapeEnum.TopAbs_EDGE,
        oc.TopAbs_ShapeEnum.TopAbs_SHAPE
      )
    );

    while (edgeExplorer.More()) {
      const rawEdge = track(edgeExplorer.Current());
      const edge = track(oc.TopoDS.Edge(rawEdge));
      if (!seen.some((candidate) => candidate.IsSame(edge))) {
        const adaptor = track(new oc.BRepAdaptor_Curve(edge));
        const deflection = track(new oc.GCPnts_TangentialDeflection());
        deflection.Initialize(
          adaptor,
          ANGULAR_TOLERANCE,
          TOLERANCE,
          2,
          1e-9,
          1e-7
        );

        if (deflection.NbPoints() >= 2) {
          seen.push(edge);
          const start = lines.length / 3;
          let previous = null;
          for (let index = 1; index <= deflection.NbPoints(); index++) {
            const point = track(deflection.Value(index));
            if (previous) pushSegment(lines, previous, point);
            previous = point;
          }
          groups.push(
            start,
            lines.length / 3 - start,
            oc.OCJS_ShapeHasher.HashCode(edge, HASH_CODE_MAX)
          );
        }
      }
      edgeExplorer.Next();
    }

    return { lines, groups };
  });

const expectedFaceIds = (oc, shape) =>
  withDeletes((track) => {
    const ids = [];
    const explorer = track(
      new oc.TopExp_Explorer(
        shape,
        oc.TopAbs_ShapeEnum.TopAbs_FACE,
        oc.TopAbs_ShapeEnum.TopAbs_SHAPE
      )
    );

    while (explorer.More()) {
      const raw = track(explorer.Current());
      const face = track(oc.TopoDS.Face(raw));
      const location = track(new oc.TopLoc_Location());
      const triangulation = track(
        oc.BRep_Tool.Triangulation(face, location, 0)
      );
      if (triangulation && !triangulation.isNull()) {
        ids.push(oc.OCJS_ShapeHasher.HashCode(face, HASH_CODE_MAX));
      }
      explorer.Next();
    }

    return ids;
  });

for (const runtime of runtimes) {
  const init = async () => {
    expect(
      existsSync(runtime.wasmPath),
      `Missing ${runtime.wasmPath}; run pnpm build first`
    ).toBe(true);
    return runtime.initialize(runtime.wasmPath);
  };
  const variantTest = (name, callback) =>
    test(`${runtime.name}: ${name}`, callback);

  variantTest(
    "bounded shape hashing preserves the historical public contract",
    async () => {
      const oc = await init();
      const box = new oc.BRepPrimAPI_MakeBox(10, 20, 30);
      const shape = box.Shape();
      const reversed = shape.Reversed();
      const transform = new oc.gp_Trsf();
      const translation = new oc.gp_Vec(40, 50, 60);
      transform.SetTranslation(translation);
      const moved = new oc.BRepBuilderAPI_Transform(
        shape,
        transform,
        false,
        false
      );
      const movedShape = moved.Shape();

      try {
        for (const upperBound of [1, 7, 1_024, HASH_CODE_MAX]) {
          const hash = oc.OCJS_ShapeHasher.HashCode(shape, upperBound);
          expect(hash).toBeGreaterThanOrEqual(1);
          expect(hash).toBeLessThanOrEqual(upperBound);
          expect(oc.OCJS_ShapeHasher.HashCode(shape, upperBound)).toBe(hash);
          expect(oc.OCJS_ShapeHasher.HashCode(reversed, upperBound)).toBe(hash);
        }

        expect(oc.OCJS_ShapeHasher.HashCode(shape, HASH_CODE_MAX)).not.toBe(
          oc.OCJS_ShapeHasher.HashCode(movedShape, HASH_CODE_MAX)
        );
      } finally {
        movedShape.delete();
        moved.delete();
        translation.delete();
        transform.delete();
        reversed.delete();
        shape.delete();
        box.delete();
      }
    }
  );

  variantTest(
    "face and edge groups use bounded public hashes and line-vertex ranges",
    async () => {
      const oc = await init();
      const box = new oc.BRepPrimAPI_MakeBox(10, 20, 30);
      const shape = box.Shape();
      const faceResult = oc.ReplicadMeshExtractor.extract(
        shape,
        TOLERANCE,
        ANGULAR_TOLERANCE,
        false
      );
      const edgeResult = oc.ReplicadEdgeMeshExtractor.extract(
        shape,
        TOLERANCE,
        ANGULAR_TOLERANCE
      );

      try {
        const faceMesh = readFaceMesh(oc, faceResult);
        const edgeMesh = readEdgeMesh(oc, edgeResult);
        const faceIds = expectedFaceIds(oc, shape);
        const expectedEdgeMesh = expectedEdges(oc, shape);

        expect(faceMesh.groups.filter((_, index) => index % 3 === 2)).toEqual(
          faceIds
        );
        expect(edgeMesh.groups).toEqual(expectedEdgeMesh.groups);
        expect(edgeMesh.groups.length / 3).toBe(12);

        let lineVertexTotal = 0;
        for (let index = 0; index < edgeMesh.groups.length; index += 3) {
          const start = edgeMesh.groups[index];
          const lineVertexCount = edgeMesh.groups[index + 1];
          expect(start).toBe(lineVertexTotal);
          expect(lineVertexCount % 2).toBe(0);
          lineVertexTotal += lineVertexCount;
        }
        expect(lineVertexTotal).toBe(edgeMesh.lines.length / 3);
      } finally {
        edgeResult.delete();
        faceResult.delete();
        shape.delete();
        box.delete();
      }
    }
  );

  variantTest(
    "located face edges follow triangulation nodes in the face location",
    async () => {
      const oc = await init();
      const torus = new oc.BRepPrimAPI_MakeTorus(12, 3);
      const source = torus.Shape();
      const transform = new oc.gp_Trsf();
      const axis = new oc.gp_Ax1(oc.gp_Dir_D.Z);
      const translation = new oc.gp_Vec(30, -20, 11);
      transform.SetRotation(axis, Math.PI / 5);
      transform.SetTranslationPart(translation);
      const moved = new oc.BRepBuilderAPI_Transform(
        source,
        transform,
        false,
        false
      );
      const shape = moved.Shape();
      const result = oc.ReplicadEdgeMeshExtractor.extract(
        shape,
        TOLERANCE,
        ANGULAR_TOLERANCE
      );

      try {
        const actual = readEdgeMesh(oc, result);
        const expected = expectedEdges(oc, shape);
        assertFloatArraysClose(actual.lines, expected.lines);
        expect(actual.groups).toEqual(expected.groups);
      } finally {
        result.delete();
        shape.delete();
        moved.delete();
        translation.delete();
        axis.delete();
        transform.delete();
        source.delete();
        torus.delete();
      }
    }
  );

  variantTest(
    "curved free edges use angular then linear tangential deflection",
    async () => {
      const oc = await init();
      const center = new oc.gp_Pnt(0, 0, 0);
      const axes = new oc.gp_Ax2(center, oc.gp_Dir_D.Z);
      const circle = new oc.gp_Circ(axes, 20);
      const maker = new oc.BRepBuilderAPI_MakeEdge(circle, 0, Math.PI * 1.75);
      const edge = maker.Edge();
      const regularResult = oc.ReplicadEdgeMeshExtractor.extract(
        edge,
        TOLERANCE,
        ANGULAR_TOLERANCE
      );

      try {
        const expected = expectedEdges(oc, edge);
        const regular = readEdgeMesh(oc, regularResult);
        assertFloatArraysClose(regular.lines, expected.lines);
        expect(regular.groups).toEqual(expected.groups);
      } finally {
        regularResult.delete();
        edge.delete();
        maker.delete();
        circle.delete();
        axes.delete();
        center.delete();
      }
    }
  );
}
