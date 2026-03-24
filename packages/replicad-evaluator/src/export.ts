import type { ReplicadLike } from "./types";

const DEFAULT_MESH_CONFIG = {
  tolerance: 0.01,
  angularTolerance: 30,
};

const isMeshShape = (replicad: ReplicadLike, shape: any) => {
  if (typeof replicad.MeshShape === "function") {
    return shape instanceof replicad.MeshShape;
  }
  return !shape?.blobSTEP && !!shape?.mesh;
};

const buildBlob = (
  shape: any,
  fileType: string,
  meshConfig = DEFAULT_MESH_CONFIG
) => {
  if (fileType === "stl") return shape.blobSTL(meshConfig);
  if (fileType === "stl-binary") {
    return shape.blobSTL({ ...meshConfig, binary: true });
  }
  if (fileType === "step") return shape.blobSTEP();
  throw new Error(`Filetype "${fileType}" unknown for export.`);
};

export function exportShapeEntries(
  replicad: ReplicadLike,
  shapesMemory: Record<string, any[]>,
  fileType = "stl",
  shapeId = "defaultShape",
  meshConfig = DEFAULT_MESH_CONFIG
) {
  if (!shapesMemory[shapeId]) {
    throw new Error(`Shape ${shapeId} not computed yet`);
  }

  const isStepExport = fileType === "step" || fileType === "step-assembly";
  const exportableShapes = isStepExport
    ? shapesMemory[shapeId].filter(({ shape }) => !isMeshShape(replicad, shape))
    : shapesMemory[shapeId];

  if (isStepExport && exportableShapes.length === 0) {
    throw new Error(
      "STEP export is not supported for mesh shapes. No exportable shapes found."
    );
  }

  if (fileType === "step-assembly") {
    if (!replicad.exportSTEP) {
      throw new Error("replicad.exportSTEP is not available");
    }
    return [
      {
        blob: replicad.exportSTEP(exportableShapes),
        name: shapeId,
      },
    ];
  }

  return exportableShapes.map(({ shape, name }) => ({
    blob: buildBlob(shape, fileType, meshConfig),
    name,
  }));
}
