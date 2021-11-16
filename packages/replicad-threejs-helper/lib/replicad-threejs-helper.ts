import { BufferGeometry, Float32BufferAttribute, EdgesGeometry } from "three";

export interface ReplicadMeshedFaces {
  vertices: number[];
  triangles: number[];
  normals?: number[];
  faceGroups?: { start: number; count: number; faceId: number }[];
}

export interface ReplicadMeshedEdges {
  lines: number[];
  edgeGroups?: { start: number; count: number; edgeId: number }[];
}

export interface ReplicadMesh {
  name?: string;
  faces: ReplicadMeshedFaces;
  edges?: ReplicadMeshedEdges;
}

export interface ThreeGeometry {
  faces: BufferGeometry;
  lines: BufferGeometry;
}

/**
 * Create or update a set of threejs geometries from some meshed edges and
 * faces from replicad
 */
export function syncGeometries(
  replicadMeshes: ReplicadMesh[],
  inputGeometries: ThreeGeometry[] = []
): ThreeGeometry[] {
  let geometries = inputGeometries;
  if (inputGeometries.length !== replicadMeshes.length) {
    inputGeometries.forEach(({ lines, faces }) => {
      faces.dispose();
      lines.dispose();
    });
    geometries = replicadMeshes.map(({ name }) => ({
      name,
      faces: new BufferGeometry(),
      lines: new BufferGeometry(),
    }));
  }

  geometries.forEach(({ faces, lines }, i) => {
    syncFaces(faces, replicadMeshes[i].faces);
    syncLines(lines, replicadMeshes[i].edges, faces);
  });

  return geometries;
}

/**
 * Update a threejs BufferGeometry from some meshed faces from replicad.
 */
export function syncFaces(
  faces: BufferGeometry,
  replicadMesh: ReplicadMeshedFaces,
  highlight?: number[]
): void {
  faces.clearGroups();
  delete faces.userData.faceGroups;
  faces.setIndex(replicadMesh.triangles);
  faces.setAttribute(
    "position",
    new Float32BufferAttribute(replicadMesh.vertices, 3)
  );

  // If you want to change the way colors are applied to different faces you
  // can change the following code. The group id will correspond to the index
  // of the materials you link to the mesh of this geometry
  //
  // This only works with two materials, the standard one, and the highlight
  // one.
  if (replicadMesh.faceGroups) {
    let shouldHighlight = new Set();
    if (highlight) {
      shouldHighlight = new Set(highlight);
    }
    faces.userData.faceGroups = replicadMesh.faceGroups;
    replicadMesh.faceGroups.forEach(({ start, count, faceId }) => {
      faces.addGroup(start, count, shouldHighlight.has(faceId) ? 1 : 0);
    });
  } else {
    faces.addGroup(0, replicadMesh.triangles.length, 0);
  }

  if (replicadMesh.normals && replicadMesh.normals.length) {
    faces.setAttribute(
      "normal",
      new Float32BufferAttribute(replicadMesh.normals, 3)
    );
  } else {
    faces.computeVertexNormals();
  }

  faces.computeBoundingBox();
}

/**
 * Update a threejs BufferGeometry from meshed edges from replicad.
 */
export function syncLines(
  lines: BufferGeometry,
  edges: ReplicadMeshedEdges | undefined,
  shapeGeometry: BufferGeometry,
  highlight?: number[]
): void {
  lines.clearGroups();
  delete lines.userData.edgeGroups;

  if (edges && edges.lines.length) {
    lines.setAttribute("position", new Float32BufferAttribute(edges.lines, 3));
  } else {
    lines.copy(new EdgesGeometry(shapeGeometry, 2));
  }

  if (!edges) return;
  if (edges.edgeGroups) {
    let shouldHighlight = new Set();
    if (highlight) {
      shouldHighlight = new Set(highlight);
    }
    lines.userData.edgeGroups = edges.edgeGroups;
    edges.edgeGroups.forEach(({ start, count, edgeId }) => {
      lines.addGroup(start, count, shouldHighlight.has(edgeId) ? 1 : 0);
    });
  } else {
    lines.addGroup(0, edges.lines.length / 3, 0);
  }
}

const groupFinder =
  (faceIndex: number) =>
  ({ start, count }: { start: number; count: number }) => {
    return faceIndex >= start && faceIndex < start + count;
  };

/**
 * Changes the material used to represent a certain face or edge by the index
 * of its group
 */
export function toggleHighlight(
  groupIndex: number,
  geometry: BufferGeometry
): void {
  const group = geometry.groups.find(groupFinder(groupIndex));
  if (group) {
    group.materialIndex = group.materialIndex ? 0 : 1;
    // @ts-expect-error types not up to date
    geometry.groupsNeedUpdate = true;
  }
}

/**
 * Set all the materials used to the default one.
 */
export function clearHighlights(geometry: BufferGeometry): void {
  geometry.groups.forEach((g) => {
    if (g.materialIndex !== 0) {
      // @ts-expect-error types not up to date
      geometry.groupsNeedUpdate = true;
      g.materialIndex = 0;
    }
  });
}

/**
 * Make sure that the elements highlighted in the geometry are only the ones in
 * the elements param.
 */
export function highlightInGeometry(
  elements: number[],
  geometry: ThreeGeometry
): void {
  const groupIndices = new Set(elements);

  // @ts-expect-error types not up to date
  geometry.groups.forEach(
    (group: { materialIndex: number }, groupIndex: number) => {
      const shouldHighlight = groupIndices.has(groupIndex);
      const isHighlighted = group.materialIndex === 1;
      if (shouldHighlight === isHighlighted) return;

      group.materialIndex = shouldHighlight ? 1 : 0;

      // @ts-expect-error types not up to date
      geometry.groupsNeedUpdate = true;
    }
  );
}

export function getFaceId(faceIndex: number, geometry: BufferGeometry): number {
  const { faceId } =
    geometry.userData.faceGroups.find(groupFinder(faceIndex * 3)) || {};
  return faceId;
}

export function getEdgeId(edgeIndex: number, geometry: BufferGeometry): number {
  const { edgeId } =
    geometry.userData.edgeGroups.find(groupFinder(edgeIndex)) || {};
  return edgeId;
}

export function getFaceIndex(
  faceIndex: number,
  geometry: BufferGeometry
): number {
  return geometry.groups.findIndex(groupFinder(faceIndex * 3));
}

export function getEdgeIndex(
  edgeIndex: number,
  geometry: BufferGeometry
): number {
  return geometry.groups.findIndex(groupFinder(edgeIndex));
}
