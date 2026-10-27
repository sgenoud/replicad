import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";

import initMulti from "../dist/replicad_multi.js";
import initSingle from "../dist/replicad_single.js";

// delete() must free what the C++ object owns, not just its handle: a loop that
// makes and deletes objects has to leave the WebAssembly heap where it was.
// (https://github.com/sgenoud/replicad/issues/282)

const distDir = fileURLToPath(new URL("../dist/", import.meta.url));
const multiGluePath = join(distDir, "replicad_multi.js");

const runtimes = [
  {
    name: "single",
    initialize: () =>
      initSingle({ locateFile: () => join(distDir, "replicad_single.wasm") }),
  },
  {
    name: "pthread",
    initialize: () =>
      initMulti({
        locateFile: () => join(distDir, "replicad_multi.wasm"),
        mainScriptUrlOrBlob: multiGluePath,
      }),
  },
];

const MB = 1024 * 1024;

// The boolean and fillet loops run for several seconds.
const TIMEOUT = 60_000;

// Each loop makes far more than it may grow by: about 480 MB of arrays, and a
// few hundred megabytes of boolean and fillet work.
const ALLOWED_GROWTH = 32 * MB;

function heapGrowth(oc, iterations, makeAndDelete) {
  // A first pass sizes the heap for one iteration.
  makeAndDelete();
  const before = oc.wasmMemory.buffer.byteLength;
  for (let i = 0; i < iterations; i++) makeAndDelete();
  return oc.wasmMemory.buffer.byteLength - before;
}

function box(oc) {
  const maker = new oc.BRepPrimAPI_MakeBox(40, 30, 20);
  const shape = maker.Shape();
  maker.delete();
  return shape;
}

function cylinder(oc) {
  const point = new oc.gp_Pnt(20, 15, -1);
  const direction = new oc.gp_Dir(0, 0, 1);
  const axis = new oc.gp_Ax2(point, direction);
  const maker = new oc.BRepPrimAPI_MakeCylinder(axis, 4, 22);
  const shape = maker.Shape();
  for (const o of [maker, axis, direction, point]) o.delete();
  return shape;
}

describe.each(runtimes)(
  "$name runtime frees memory on delete()",
  ({ initialize }) => {
    test(
      "an NCollection_Array1's buffer",
      async () => {
        const oc = await initialize();
        const growth = heapGrowth(oc, 200, () =>
          new oc.NCollection_Array1_gp_Pnt(1, 100_000).delete()
        );
        expect(growth).toBeLessThan(ALLOWED_GROWTH);
      },
      TIMEOUT
    );

    test(
      "a boolean cut, its arguments and its result",
      async () => {
        const oc = await initialize();
        const growth = heapGrowth(oc, 2000, () => {
          const target = box(oc);
          const tool = cylinder(oc);
          const progress = new oc.Message_ProgressRange();
          const cut = new oc.BRepAlgoAPI_Cut(target, tool, progress);
          const result = cut.Shape();
          for (const o of [result, cut, progress, tool, target]) o.delete();
        });
        expect(growth).toBeLessThan(ALLOWED_GROWTH);
      },
      TIMEOUT
    );

    test(
      "a fillet of every edge of a box",
      async () => {
        const oc = await initialize();
        const growth = heapGrowth(oc, 1000, () => {
          const target = box(oc);
          const fillet = new oc.BRepFilletAPI_MakeFillet(
            target,
            oc.ChFi3d_FilletShape.ChFi3d_Rational
          );
          const explorer = new oc.TopExp_Explorer(
            target,
            oc.TopAbs_ShapeEnum.TopAbs_EDGE,
            oc.TopAbs_ShapeEnum.TopAbs_SHAPE
          );
          for (; explorer.More(); explorer.Next()) {
            const current = explorer.Current();
            const edge = oc.TopoDS.Edge(current);
            fillet.Add(2, edge);
            edge.delete();
            current.delete();
          }
          const progress = new oc.Message_ProgressRange();
          fillet.Build(progress);
          const result = fillet.Shape();
          for (const o of [result, progress, fillet, explorer, target])
            o.delete();
        });
        expect(growth).toBeLessThan(ALLOWED_GROWTH);
      },
      TIMEOUT
    );
  }
);
