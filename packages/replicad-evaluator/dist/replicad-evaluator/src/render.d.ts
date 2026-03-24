import type { ReplicadLike } from "./types";
interface Meshable {
    mesh: (config?: {
        tolerance: number;
        angularTolerance: number;
    } | number) => any;
    meshEdges?: (config: {
        keepMesh: boolean;
    }) => any;
}
interface SVGable {
    toSVGPaths: () => any;
    toSVGViewBox: () => any;
}
type LabelConfig = {
    label: string;
    from: [number, number, number];
    to: [number, number, number];
    offset?: [number, number, number];
    color?: string;
    mode?: "length" | "point";
    fontSize?: number;
    position?: "auto" | "side" | "top" | "bottom";
};
type SolidType = "shape" | "mesh";
export type CleanConfig = {
    name: string;
    shape: Meshable | SVGable;
    color?: string;
    opacity?: number;
    solidType?: SolidType;
    highlight?: any;
    strokeType?: string;
    labels: LabelConfig[];
};
export declare class ShapeStandardizer {
    private readonly replicad;
    private shapeAdapters;
    constructor(replicad: ReplicadLike);
    registerAdapter(name: string, adapter: (shape: any) => any): void;
    adaptShape(shape: any): any;
    standardizeShape<T extends {
        shape: unknown;
    }>(shapes: T[]): Array<T & {
        shape: Meshable | SVGable;
    }>;
}
export declare function render(replicad: ReplicadLike, shapes: Array<CleanConfig>): ({
    name: string;
    color: string | undefined;
    strokeType: string | undefined;
    opacity: number | undefined;
    format: string;
    paths: any;
    viewbox: any;
} | {
    name: string;
    color: string | undefined;
    opacity: number | undefined;
    solidType: SolidType;
    labels: LabelConfig[];
    mesh: any;
    edges: any;
    error: boolean;
    message: string | null;
    highlight: number[] | null;
})[];
interface RenderOutputOptions {
    replicad: ReplicadLike;
    shapeStandardizer?: ShapeStandardizer;
    beforeRender?: (shapes: CleanConfig[]) => CleanConfig[];
    defaultName?: string;
}
export declare function renderOutput(shapes: unknown, options: RenderOutputOptions): ({
    name: string;
    color: string | undefined;
    strokeType: string | undefined;
    opacity: number | undefined;
    format: string;
    paths: any;
    viewbox: any;
} | {
    name: string;
    color: string | undefined;
    opacity: number | undefined;
    solidType: SolidType;
    labels: LabelConfig[];
    mesh: any;
    edges: any;
    error: boolean;
    message: string | null;
    highlight: number[] | null;
})[];
export {};
