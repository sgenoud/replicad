import type { ReplicadLike } from "./types";
export declare class BuilderHelper {
    private readonly replicad;
    private shapes;
    private faceFinder;
    private edgeFinder;
    constructor(replicad: ReplicadLike);
    debug(shape: any): any;
    d(shape: any): any;
    highlightFace(faceFinder: any): any;
    hf(faceFinder: any): any;
    highlightEdge(edgeFinder: any): any;
    he(edgeFinder: any): any;
    apply(config: Array<Record<string, any>>): Record<string, any>[];
}
