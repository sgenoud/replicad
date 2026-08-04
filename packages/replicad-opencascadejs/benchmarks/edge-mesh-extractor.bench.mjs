import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';

import initSingle from '../dist/replicad_single.js';

const HASH_CODE_MAX = 2_147_483_647;
const tolerance = 0.1;
const angularTolerance = 0.5;
const instances = Number.parseInt(process.env.BENCH_INSTANCES ?? '32', 10);
const iterations = Number.parseInt(process.env.BENCH_ITERATIONS ?? '10', 10);
const warmups = 3;

const distDir = fileURLToPath(new URL('../dist/', import.meta.url));
const wasmPath = join(distDir, 'replicad_single.wasm');

const withScope = (callback) => {
  const garbage = [];
  const track = (value) => {
    if (value && typeof value.delete === 'function') garbage.push(value);
    return value;
  };

  try {
    return callback(track);
  } finally {
    for (let index = garbage.length - 1; index >= 0; index--) garbage[index].delete();
  }
};

const listUnique = (oc, shape, kind, cast, track) => {
  const explorer = track(new oc.TopExp_Explorer(shape, kind, oc.TopAbs_ShapeEnum.TopAbs_SHAPE));
  const seen = [];

  while (explorer.More()) {
    const raw = track(explorer.Current());
    if (!seen.some((candidate) => candidate.IsSame(raw))) seen.push(track(cast(raw)));
    explorer.Next();
  }

  return seen;
};

// This is the pre-native meshEdges implementation from shapes.ts, expressed
// directly against the generated OpenCascade.js bindings.
const extractEdgesInJs = (oc, shape) =>
  withScope((track) => {
    const recordedEdges = new Set();
    const lines = [];
    const edgeGroups = [];
    const location = track(new oc.TopLoc_Location());
    const faceKind = oc.TopAbs_ShapeEnum.TopAbs_FACE;
    const edgeKind = oc.TopAbs_ShapeEnum.TopAbs_EDGE;

    const addEdge = () => {
      const start = lines.length;
      let previousPoint = null;

      return [
        (point) => {
          const currentPoint = [point.X(), point.Y(), point.Z()];
          if (previousPoint) lines.push(...previousPoint, ...currentPoint);
          previousPoint = currentPoint;
        },
        (edgeHash) => {
          edgeGroups.push({
            start: start / 3,
            count: (lines.length - start) / 3,
            edgeId: edgeHash,
          });
          recordedEdges.add(edgeHash);
        },
      ];
    };

    const faces = listUnique(oc, shape, faceKind, (raw) => oc.TopoDS.Face(raw), track);
    for (const face of faces) {
      const triangulation = track(oc.BRep_Tool.Triangulation(face, location, 0));
      if (!triangulation || triangulation.isNull()) continue;

      const edges = listUnique(oc, face, edgeKind, (raw) => oc.TopoDS.Edge(raw), track);
      for (const edge of edges) {
        const edgeHash = oc.OCJS_ShapeHasher.HashCode(edge, HASH_CODE_MAX);
        if (recordedEdges.has(edgeHash)) continue;

        const edgeLocation = track(new oc.TopLoc_Location());
        const polygon = track(oc.BRep_Tool.PolygonOnTriangulation(edge, triangulation, edgeLocation));
        if (!polygon || polygon.isNull()) continue;

        const nodeCount = polygon.NbNodes();
        if (nodeCount === 0) continue;
        const [recordPoint, done] = addEdge();
        for (let index = 1; index <= nodeCount; index++) {
          const node = track(triangulation.Node(polygon.Node(index)));
          const transformation = track(edgeLocation.Transformation());
          recordPoint(track(node.Transformed(transformation)));
        }
        done(edgeHash);
      }
    }

    const edges = listUnique(oc, shape, edgeKind, (raw) => oc.TopoDS.Edge(raw), track);
    for (const edge of edges) {
      const edgeHash = oc.OCJS_ShapeHasher.HashCode(edge, HASH_CODE_MAX);
      if (recordedEdges.has(edgeHash)) continue;

      const adaptor = track(new oc.BRepAdaptor_Curve(edge));
      const deflection = track(
        new oc.GCPnts_TangentialDeflection(adaptor, tolerance, angularTolerance, 2, 1e-9, 1e-7),
      );
      const [recordPoint, done] = addEdge();
      for (let index = 1; index <= deflection.NbPoints(); index++) {
        const point = track(deflection.Value(index));
        const transformation = track(location.Transformation());
        recordPoint(track(point.Transformed(transformation)));
      }
      done(edgeHash);
    }

    return { lines, edgeGroups };
  });

const extractEdgesInNative = (oc, shape) => {
  const raw = oc.ReplicadEdgeMeshExtractor.extract(shape, tolerance, angularTolerance);
  try {
    const buffer = oc.wasmMemory.buffer;
    const heapF32 = new Float32Array(buffer);
    const heapI32 = new Int32Array(buffer);
    const lines = Array.from(
      heapF32.subarray(raw.getLinesPtr() / 4, raw.getLinesPtr() / 4 + raw.getLinesSize()),
    );
    const groups = heapI32.subarray(
      raw.getEdgeGroupsPtr() / 4,
      raw.getEdgeGroupsPtr() / 4 + raw.getEdgeGroupsSize(),
    );
    const edgeGroups = [];
    for (let index = 0; index < groups.length; index += 3) {
      edgeGroups.push({ start: groups[index], count: groups[index + 1], edgeId: groups[index + 2] });
    }
    return { lines, edgeGroups };
  } finally {
    raw.delete();
  }
};

const makeBenchmarkShape = (oc) => {
  const builder = new oc.TopoDS_Builder();
  const compound = new oc.TopoDS_Compound();
  builder.MakeCompound(compound);

  for (let index = 0; index < instances; index++) {
    // Use intrinsic primitive positions so this performance comparison is not
    // conflated with the separately known located-triangulation lookup issue.
    const position = new oc.gp_Pnt((index % 8) * 18, Math.floor(index / 8) * 18, 0);
    const axes = index % 2 === 0 ? null : new oc.gp_Ax2(position, oc.gp_Dir_D.Z);
    const maker = axes
      ? new oc.BRepPrimAPI_MakeTorus(axes, 4, 1.5)
      : new oc.BRepPrimAPI_MakeBox(position, 10, 8, 6);
    const source = maker.Shape();
    builder.Add(compound, source);

    source.delete();
    maker.delete();
    axes?.delete();
    position.delete();
  }

  builder.delete();
  return compound;
};

const assertParity = (jsResult, nativeResult) => {
  assert.equal(nativeResult.lines.length, jsResult.lines.length, 'line buffer lengths differ');
  assert.equal(nativeResult.edgeGroups.length, jsResult.edgeGroups.length, 'edge group counts differ');

  for (let index = 0; index < jsResult.lines.length; index++) {
    assert.ok(
      Math.abs(nativeResult.lines[index] - jsResult.lines[index]) <= 1e-5,
      `line value ${index} differs: ${nativeResult.lines[index]} !== ${jsResult.lines[index]}`,
    );
  }

  let hashMismatches = 0;
  for (let index = 0; index < jsResult.edgeGroups.length; index++) {
    const jsGroup = jsResult.edgeGroups[index];
    const nativeGroup = nativeResult.edgeGroups[index];
    assert.equal(nativeGroup.start, jsGroup.start, `edge group ${index} starts differ`);
    assert.equal(nativeGroup.count, jsGroup.count, `edge group ${index} counts differ`);
    if (nativeGroup.edgeId !== jsGroup.edgeId) hashMismatches++;
  }

  return hashMismatches;
};

const percentile = (values, fraction) => {
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * fraction))];
};

const summary = (name, values) => ({
  implementation: name,
  medianMs: percentile(values, 0.5).toFixed(3),
  p95Ms: percentile(values, 0.95).toFixed(3),
  minMs: Math.min(...values).toFixed(3),
});

assert.ok(Number.isInteger(instances) && instances > 0, 'BENCH_INSTANCES must be a positive integer');
assert.ok(Number.isInteger(iterations) && iterations > 0, 'BENCH_ITERATIONS must be a positive integer');
assert.ok(existsSync(wasmPath), `Missing ${wasmPath}; run pnpm build first`);

const oc = await initSingle({ locateFile: () => wasmPath });
const shape = makeBenchmarkShape(oc);

try {
  // Match Tau's render path: face extraction establishes the triangulation before
  // either edge implementation is measured.
  oc.ReplicadMeshExtractor.mesh(shape, tolerance, angularTolerance);

  const jsResult = extractEdgesInJs(oc, shape);
  const nativeResult = extractEdgesInNative(oc, shape);
  const hashMismatches = assertParity(jsResult, nativeResult);
  assert.equal(
    hashMismatches,
    0,
    `${hashMismatches}/${nativeResult.edgeGroups.length} edge-group hashes differ`,
  );
  const jsTimings = [];
  const nativeTimings = [];
  let consumed = 0;

  for (let index = -warmups; index < iterations; index++) {
    const order = index % 2 === 0 ? ['js', 'native'] : ['native', 'js'];
    for (const implementation of order) {
      const start = performance.now();
      const result = implementation === 'js' ? extractEdgesInJs(oc, shape) : extractEdgesInNative(oc, shape);
      const elapsed = performance.now() - start;
      consumed += result.lines.length + result.edgeGroups.length;
      if (index >= 0) (implementation === 'js' ? jsTimings : nativeTimings).push(elapsed);
    }
  }

  const jsMedian = percentile(jsTimings, 0.5);
  const nativeMedian = percentile(nativeTimings, 0.5);
  console.log(
    `shape instances: ${instances}; edge groups: ${nativeResult.edgeGroups.length}; segments: ${nativeResult.lines.length / 6}`,
  );
  console.table([summary('historical JS', jsTimings), summary('native C++', nativeTimings)]);
  console.log(`median speedup: ${(jsMedian / nativeMedian).toFixed(2)}x`);
  console.log(`hash mismatches: ${hashMismatches}/${nativeResult.edgeGroups.length}`);
  assert.ok(consumed > 0);
} finally {
  shape.delete();
}
