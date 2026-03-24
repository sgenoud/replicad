import type { ReplicadLike } from "./types";
export declare function exportShapeEntries(replicad: ReplicadLike, shapesMemory: Record<string, any[]>, fileType?: string, shapeId?: string, meshConfig?: {
    tolerance: number;
    angularTolerance: number;
}): {
    blob: any;
    name: any;
}[];
