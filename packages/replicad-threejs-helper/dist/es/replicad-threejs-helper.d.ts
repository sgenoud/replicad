import { BufferGeometry } from "three";
interface ReplicadMeshedFaces {
    vertices: number[];
    triangles: number[];
    normals?: number[];
    faceGroups?: {
        start: number;
        count: number;
        faceId: number;
    }[];
}
interface ReplicadMeshedEdges {
    lines: number[];
    edgeGroups?: {
        start: number;
        count: number;
        edgeId: number;
    }[];
}
interface ReplicadMesh {
    name?: string;
    faces: ReplicadMeshedFaces;
    edges?: ReplicadMeshedEdges;
}
interface ThreeGeometry {
    faces: BufferGeometry;
    lines: BufferGeometry;
}
/**
 * Create or update a set of threejs geometries from some meshed edges and
 * faces from replicad
 */
declare function syncGeometries(replicadMeshes: ReplicadMesh[], inputGeometries?: ThreeGeometry[]): ThreeGeometry[];
/**
 * Update a threejs BufferGeometry from some meshed faces from replicad.
 */
declare function syncFaces(faces: BufferGeometry, replicadMesh: ReplicadMeshedFaces, highlight?: number[]): void;
/**
 * Update a threejs BufferGeometry from meshed edges from replicad.
 */
declare function syncLines(lines: BufferGeometry, edges: ReplicadMeshedEdges | undefined, shapeGeometry: BufferGeometry, highlight?: number[]): void;
/**
 * Changes the material used to represent a certain face or edge by the index
 * of its group
 */
declare function toggleHighlight(groupIndex: number, geometry: BufferGeometry): void;
/**
 * Set all the materials used to the default one.
 */
declare function clearHighlights(geometry: BufferGeometry): void;
/**
 * Make sure that the elements highlighted in the geometry are only the ones in
 * the elements param.
 */
declare function highlightInGeometry(elements: number[], geometry: ThreeGeometry): void;
declare function getFaceId(faceIndex: number, geometry: BufferGeometry): number;
declare function getEdgeId(edgeIndex: number, geometry: BufferGeometry): number;
declare function getFaceIndex(faceIndex: number, geometry: BufferGeometry): number;
declare function getEdgeIndex(edgeIndex: number, geometry: BufferGeometry): number;
export { ReplicadMeshedFaces, ReplicadMeshedEdges, ReplicadMesh, ThreeGeometry, syncGeometries, syncFaces, syncLines, toggleHighlight, clearHighlights, highlightInGeometry, getFaceId, getEdgeId, getFaceIndex, getEdgeIndex };
