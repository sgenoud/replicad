'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var three = require('three');

/**
 * Create or update a set of threejs geometries from some meshed edges and
 * faces from replicad
 */
function syncGeometries(replicadMeshes, inputGeometries = []) {
    let geometries = inputGeometries;
    if (inputGeometries.length !== replicadMeshes.length) {
        inputGeometries.forEach(({ lines, faces }) => {
            faces.dispose();
            lines.dispose();
        });
        geometries = replicadMeshes.map(({ name }) => ({
            name,
            faces: new three.BufferGeometry(),
            lines: new three.BufferGeometry(),
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
function syncFaces(faces, replicadMesh, highlight) {
    faces.clearGroups();
    delete faces.userData.faceGroups;
    faces.setIndex(replicadMesh.triangles);
    faces.setAttribute("position", new three.Float32BufferAttribute(replicadMesh.vertices, 3));
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
    }
    else {
        faces.addGroup(0, replicadMesh.triangles.length, 0);
    }
    if (replicadMesh.normals && replicadMesh.normals.length) {
        faces.setAttribute("normal", new three.Float32BufferAttribute(replicadMesh.normals, 3));
    }
    else {
        faces.computeVertexNormals();
    }
    faces.computeBoundingBox();
}
/**
 * Update a threejs BufferGeometry from meshed edges from replicad.
 */
function syncLines(lines, edges, shapeGeometry, highlight) {
    lines.clearGroups();
    delete lines.userData.edgeGroups;
    if (edges && edges.lines.length) {
        lines.setAttribute("position", new three.Float32BufferAttribute(edges.lines, 3));
    }
    else {
        lines.copy(new three.EdgesGeometry(shapeGeometry, 2));
    }
    if (!edges)
        return;
    if (edges.edgeGroups) {
        let shouldHighlight = new Set();
        if (highlight) {
            shouldHighlight = new Set(highlight);
        }
        lines.userData.edgeGroups = edges.edgeGroups;
        edges.edgeGroups.forEach(({ start, count, edgeId }) => {
            lines.addGroup(start, count, shouldHighlight.has(edgeId) ? 1 : 0);
        });
    }
    else {
        lines.addGroup(0, edges.lines.length / 3, 0);
    }
}
const groupFinder = (faceIndex) => ({ start, count }) => {
    return faceIndex >= start && faceIndex < start + count;
};
/**
 * Changes the material used to represent a certain face or edge by the index
 * of its group
 */
function toggleHighlight(groupIndex, geometry) {
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
function clearHighlights(geometry) {
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
function highlightInGeometry(elements, geometry) {
    const groupIndices = new Set(elements);
    // @ts-expect-error types not up to date
    geometry.groups.forEach((group, groupIndex) => {
        const shouldHighlight = groupIndices.has(groupIndex);
        const isHighlighted = group.materialIndex === 1;
        if (shouldHighlight === isHighlighted)
            return;
        group.materialIndex = shouldHighlight ? 1 : 0;
        // @ts-expect-error types not up to date
        geometry.groupsNeedUpdate = true;
    });
}
function getFaceId(faceIndex, geometry) {
    const { faceId } = geometry.userData.faceGroups.find(groupFinder(faceIndex * 3)) || {};
    return faceId;
}
function getEdgeId(edgeIndex, geometry) {
    const { edgeId } = geometry.userData.edgeGroups.find(groupFinder(edgeIndex)) || {};
    return edgeId;
}
function getFaceIndex(faceIndex, geometry) {
    return geometry.groups.findIndex(groupFinder(faceIndex * 3));
}
function getEdgeIndex(edgeIndex, geometry) {
    return geometry.groups.findIndex(groupFinder(edgeIndex));
}

exports.clearHighlights = clearHighlights;
exports.getEdgeId = getEdgeId;
exports.getEdgeIndex = getEdgeIndex;
exports.getFaceId = getFaceId;
exports.getFaceIndex = getFaceIndex;
exports.highlightInGeometry = highlightInGeometry;
exports.syncFaces = syncFaces;
exports.syncGeometries = syncGeometries;
exports.syncLines = syncLines;
exports.toggleHighlight = toggleHighlight;
//# sourceMappingURL=replicad-threejs-helper.js.map
