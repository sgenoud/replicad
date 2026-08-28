import type { TopoDS_Face, TopoDS_Shape } from "replicad-opencascadejs";

import { getOC } from "./oclib.js";
import { GCWithScope } from "./register.js";

export interface WrappedTopoShape<Type extends TopoDS_Shape = TopoDS_Shape> {
  readonly wrapped: Type;
}

export type ShapeInput<Type extends TopoDS_Shape = TopoDS_Shape> =
  | Type
  | WrappedTopoShape<Type>;

export interface MeshOptions {
  tolerance?: number;
  angularTolerance?: number;
}

export interface FaceTriangulation {
  vertices: number[];
  trianglesIndexes: number[];
  verticesNormals: number[];
}

export interface ShapeMesh {
  triangles: number[];
  vertices: number[];
  normals: number[];
  faceGroups: { start: number; count: number; faceId: number }[];
}

export interface ShapeEdgeMesh {
  lines: number[];
  edgeGroups: { start: number; count: number; edgeId: number }[];
}

type MeshHeap = Float32Array | Uint32Array | Int32Array;

export const unwrapShape = <Type extends TopoDS_Shape>(
  shape: ShapeInput<Type>
): Type => {
  return "wrapped" in shape ? shape.wrapped : shape;
};

const extractFromPointer = (
  heap: MeshHeap,
  pointer: number,
  size: number
): number[] => {
  // The extractor exposes pointers as signed 32 bit integers. Above 2GiB of
  // heap they come back negative, so read them as unsigned byte offsets before
  // converting them to typed-array indexes.
  const start = (pointer >>> 0) / heap.BYTES_PER_ELEMENT;
  return Array.from(heap.subarray(start, start + size));
};

export function prepareShapeForMesh(
  shapeInput: ShapeInput,
  { tolerance = 1e-3, angularTolerance = 0.1 }: MeshOptions = {}
): void {
  const oc = getOC();
  const shape = unwrapShape(shapeInput);

  // ReplicadMeshExtractor.mesh clears cached triangulations before rebuilding
  // so the requested tolerance is honored even after a finer prior mesh.
  oc.ReplicadMeshExtractor.mesh(shape, tolerance, angularTolerance);
}

/**
 * Exports a shape as triangles suitable for use by rendering libraries.
 *
 * @category Shape Export
 */
export function mesh(
  shapeInput: ShapeInput,
  { tolerance = 1e-3, angularTolerance = 0.1 }: MeshOptions = {}
): ShapeMesh {
  const oc = getOC();
  const shape = unwrapShape(shapeInput);
  const raw = oc.ReplicadMeshExtractor.extract(
    shape,
    tolerance,
    angularTolerance,
    false
  );

  // Take fresh typed-array views off the live WebAssembly.Memory buffer AFTER
  // extract() has returned. extract() may trigger memory.grow() which detaches
  // any previously-cached HEAP* views.
  const buffer = oc.wasmMemory.buffer;
  const heapF32 = new Float32Array(buffer);
  const heapU32 = new Uint32Array(buffer);
  const heapI32 = new Int32Array(buffer);

  const vertices = extractFromPointer(
    heapF32,
    raw.getVerticesPtr(),
    raw.getVerticesSize()
  );
  const normals = extractFromPointer(
    heapF32,
    raw.getNormalsPtr(),
    raw.getNormalsSize()
  );
  const triangles = extractFromPointer(
    heapU32,
    raw.getTrianglesPtr(),
    raw.getTrianglesSize()
  );

  const groupsRaw = extractFromPointer(
    heapI32,
    raw.getFaceGroupsPtr(),
    raw.getFaceGroupsSize()
  );
  const faceGroups: ShapeMesh["faceGroups"] = [];
  for (let i = 0; i < groupsRaw.length; i += 3) {
    faceGroups.push({
      start: groupsRaw[i],
      count: groupsRaw[i + 1],
      faceId: groupsRaw[i + 2],
    });
  }

  raw.delete();

  return { triangles, vertices, normals, faceGroups };
}

/**
 * Exports a shape's edges as lines suitable for use by rendering libraries.
 *
 * @category Shape Export
 */
export function meshEdges(
  shapeInput: ShapeInput,
  { tolerance = 1e-3, angularTolerance = 0.1 }: MeshOptions = {}
): ShapeEdgeMesh {
  const oc = getOC();
  const shape = unwrapShape(shapeInput);
  const raw = oc.ReplicadEdgeMeshExtractor.extract(
    shape,
    tolerance,
    angularTolerance
  );

  // Take fresh views after extract() in case it grew the WASM memory.
  const buffer = oc.wasmMemory.buffer;
  const heapF32 = new Float32Array(buffer);
  const heapI32 = new Int32Array(buffer);

  const lines = extractFromPointer(
    heapF32,
    raw.getLinesPtr(),
    raw.getLinesSize()
  );

  const groupsRaw = extractFromPointer(
    heapI32,
    raw.getEdgeGroupsPtr(),
    raw.getEdgeGroupsSize()
  );
  const edgeGroups: ShapeEdgeMesh["edgeGroups"] = [];
  for (let i = 0; i < groupsRaw.length; i += 3) {
    edgeGroups.push({
      start: groupsRaw[i],
      count: groupsRaw[i + 1],
      edgeId: groupsRaw[i + 2],
    });
  }

  raw.delete();

  return { lines, edgeGroups };
}

/**
 * Returns the cached triangulation of a face, if one is available.
 *
 * @category Shape Export
 */
export function triangulateFace(
  faceInput: ShapeInput<TopoDS_Face>,
  index0 = 0
): FaceTriangulation | null {
  const oc = getOC();
  const face = unwrapShape(faceInput);
  const r = GCWithScope();

  const location = r(new oc.TopLoc_Location());
  const triangulation = r(oc.BRep_Tool.Triangulation(face, location, 0));

  if (!triangulation || triangulation.isNull()) return null;

  const transformation = r(location.Transformation());
  const result: FaceTriangulation = {
    vertices: [],
    trianglesIndexes: [],
    verticesNormals: [],
  };

  const nbNodes = triangulation.NbNodes();
  result.vertices = new Array(nbNodes * 3);
  for (let i = 1; i <= nbNodes; i++) {
    const point = r(r(triangulation.Node(i)).Transformed(transformation));
    result.vertices[(i - 1) * 3] = point.X();
    result.vertices[(i - 1) * 3 + 1] = point.Y();
    result.vertices[(i - 1) * 3 + 2] = point.Z();
  }

  const isForward = face.Orientation() === oc.TopAbs_Orientation.TopAbs_FORWARD;
  const normalSign = isForward ? 1 : -1;

  if (!triangulation.HasNormals()) triangulation.ComputeNormals();
  result.verticesNormals = new Array(nbNodes * 3);
  for (let i = 1; i <= nbNodes; i++) {
    const normal = r(r(triangulation.Normal(i)).Transformed(transformation));
    result.verticesNormals[(i - 1) * 3] = normal.X() * normalSign;
    result.verticesNormals[(i - 1) * 3 + 1] = normal.Y() * normalSign;
    result.verticesNormals[(i - 1) * 3 + 2] = normal.Z() * normalSign;
  }

  const nbTriangles = triangulation.NbTriangles();
  result.trianglesIndexes = new Array(nbTriangles * 3);
  for (let nt = 1; nt <= nbTriangles; nt++) {
    const triangle = r(triangulation.Triangle(nt));
    let n1 = triangle.Value(1);
    let n2 = triangle.Value(2);
    const n3 = triangle.Value(3);
    if (!isForward) [n1, n2] = [n2, n1];

    result.trianglesIndexes[(nt - 1) * 3] = n1 - 1 + index0;
    result.trianglesIndexes[(nt - 1) * 3 + 1] = n2 - 1 + index0;
    result.trianglesIndexes[(nt - 1) * 3 + 2] = n3 - 1 + index0;
  }

  return result;
}
