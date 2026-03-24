import type { CodeEvaluator, GenericRecord, RuntimeResolver } from "./types";
interface BuilderOptions {
    runtime: RuntimeResolver;
    codeEvaluator: CodeEvaluator;
}
export declare function createBuilder({ runtime, codeEvaluator }: BuilderOptions): {
    ready: () => Promise<boolean>;
    buildShapesFromCode: (code: string, params?: GenericRecord) => Promise<({
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
        solidType: "shape" | "mesh";
        labels: {
            label: string;
            from: [number, number, number];
            to: [number, number, number];
            offset?: [number, number, number] | undefined;
            color?: string | undefined;
            mode?: "length" | "point" | undefined;
            fontSize?: number | undefined;
            position?: "auto" | "side" | "top" | "bottom" | undefined;
        }[];
        mesh: any;
        edges: any;
        error: boolean;
        message: string | null;
        highlight: number[] | null;
    })[] | {
        error: boolean;
        message: string;
        stack: any;
    }>;
    computeLabels: (code: string, params?: GenericRecord) => Promise<any>;
    extractDefaultParamsFromCode: (code: string) => Promise<any>;
    extractDefaultNameFromCode: (code: string) => Promise<string | undefined>;
    extractDefaultParams: (code: string) => Promise<any>;
    extractDefaultName: (code: string) => Promise<string | undefined>;
    exportShape: (fileType?: string, shapeId?: string, meshConfig?: GenericRecord) => Promise<{
        blob: any;
        name: any;
    }[]>;
    loadFont: (fontData: string | ArrayBuffer, fontName?: string, forceUpdate?: boolean) => Promise<void>;
    faceInfo: (subshapeIndex: number, faceIndex: number, shapeId?: string) => {
        type: any;
        center: any;
        normal: any;
    } | null;
    edgeInfo: (subshapeIndex: number, edgeIndex: number, shapeId?: string) => {
        type: any;
        start: any;
        end: any;
        direction: any;
    } | null;
};
export {};
