export type GenericRecord = Record<string, any>;

export interface ReplicadLike extends GenericRecord {
  setOC?: (oc: any) => void;
  setManifold?: (manifold: any) => void;
  getFont?: () => unknown;
  loadFont?: (
    fontData: string | ArrayBuffer,
    fontName?: string,
    forceUpdate?: boolean
  ) => Promise<unknown>;
  exportSTEP?: (shapes: any[]) => Blob;
  MeshShape?: new (...args: any[]) => any;
  Sketch?: new (...args: any[]) => any;
  Sketches?: new (...args: any[]) => any;
  CompoundSketch?: new (...args: any[]) => any;
  Blueprint?: new (...args: any[]) => any;
  Blueprints?: new (...args: any[]) => any;
  CompoundBlueprint?: new (...args: any[]) => any;
  Drawing?: new (...args: any[]) => any;
  Vertex?: new (...args: any[]) => any;
  EdgeFinder?: new (...args: any[]) => any;
  FaceFinder?: new (...args: any[]) => any;
}

export interface RuntimeContext {
  replicad: ReplicadLike;
  oc: any;
  manifold?: any;
  fontPath?: string;
}

export type RuntimeResolver = () => Promise<RuntimeContext>;

export interface EvaluateModuleOptions {
  filename?: string;
  globals?: Record<string, unknown>;
}

export interface CodeEvaluator {
  runInContext<T = unknown>(
    code: string,
    context?: Record<string, unknown>
  ): T | Promise<T>;
  evaluateModule<TModule extends GenericRecord = GenericRecord>(
    code: string,
    options?: EvaluateModuleOptions
  ): Promise<TModule>;
}

export interface CreateEvaluatorOptions {
  replicad: ReplicadLike;
  oc?: any | Promise<any>;
  manifold?: any | Promise<any>;
  fontPath?: string;
  runtime?: RuntimeResolver;
  codeEvaluator?: CodeEvaluator;
  fetch?: typeof fetch;
  tempDir?: string;
}

export interface EvaluatorService {
  ready: () => Promise<boolean>;
  buildShapesFromCode: (code: string, params?: GenericRecord) => Promise<any>;
  computeLabels: (code: string, params?: GenericRecord) => Promise<any[]>;
  extractDefaultParamsFromCode: (code: string) => Promise<GenericRecord | null>;
  extractDefaultNameFromCode: (code: string) => Promise<string | undefined>;
  extractDefaultParams: (code: string) => Promise<GenericRecord | null>;
  extractDefaultName: (code: string) => Promise<string | undefined>;
  exportShape: (
    fileType?: string,
    shapeId?: string,
    meshConfig?: GenericRecord
  ) => Promise<any[]>;
  getShapeEntries: (shapeId?: string) => any[];
  loadFont: (
    fontData: string | ArrayBuffer,
    fontName?: string,
    forceUpdate?: boolean
  ) => Promise<void>;
  faceInfo: (
    subshapeIndex: number,
    faceIndex: number,
    shapeId?: string
  ) => GenericRecord | null;
  edgeInfo: (
    subshapeIndex: number,
    edgeIndex: number,
    shapeId?: string
  ) => GenericRecord | null;
}
