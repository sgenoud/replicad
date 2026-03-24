import normalizeColor from "./normalizeColor";
import type { ReplicadLike } from "./types";

interface Meshable {
  mesh: (
    config?: { tolerance: number; angularTolerance: number } | number
  ) => any;
  meshEdges?: (config: { keepMesh: boolean }) => any;
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

type InputShape = {
  shape: unknown;
  name?: string;
  color?: string;
  opacity?: number;
  solidType?: SolidType;
  highlight?: any;
  highlightEdge?: any;
  highlightFace?: any;
  strokeType?: string;
  labels?: LabelConfig[];
};

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

type SVGShapeConfiguration = {
  name: string;
  shape: SVGable;
  color?: string;
  opacity?: number;
  strokeType?: string;
};

type MeshableConfiguration = {
  name: string;
  shape: Meshable;
  color?: string;
  opacity?: number;
  solidType?: SolidType;
  highlight?: any;
  labels: LabelConfig[];
};

const isInstanceOf = (value: any, maybeConstructor: any) => {
  return typeof maybeConstructor === "function" && value instanceof maybeConstructor;
};

const isSVGable = (replicad: ReplicadLike, shape: any): shape is SVGable => {
  return (
    isInstanceOf(shape, replicad.Blueprint) ||
    isInstanceOf(shape, replicad.Blueprints) ||
    isInstanceOf(shape, replicad.CompoundBlueprint) ||
    isInstanceOf(shape, replicad.Drawing) ||
    (!!shape?.toSVGPaths && !!shape?.toSVGViewBox)
  );
};

const isMeshable = (shape: any): shape is Meshable => {
  return !!shape?.mesh;
};

const inferSolidType = (replicad: ReplicadLike, shape: any): SolidType => {
  if (isInstanceOf(shape, replicad.MeshShape)) return "mesh";
  return "shape";
};

function createBasicShapeConfig(
  inputShapes: unknown | unknown[] | InputShape[] | InputShape,
  baseName = "Shape"
): Array<InputShape & { name: string }> {
  let shapes: unknown[] = [];

  if (!inputShapes) return [];

  if (Array.isArray(inputShapes)) shapes = inputShapes;
  else shapes = [inputShapes];

  return shapes
    .map((inputShape: any) => {
      if (!inputShape.shape) {
        return {
          shape: inputShape,
        };
      }
      return inputShape;
    })
    .map((inputShape, index) => {
      const { name, ...rest } = inputShape;
      const shapeIndex = shapes.length > 1 ? ` ${index}` : "";

      return {
        name: name || `${baseName}${shapeIndex}`,
        ...rest,
      };
    });
}

function normalizeColorAndOpacity<T extends Record<string, any>>(
  shape: T
): T & { color: string | undefined; opacity: number | undefined } {
  const { color, opacity, ...rest } = shape;

  const normalizedColor = color ? normalizeColor(color) : undefined;
  let configuredOpacity: undefined | number = opacity;

  if (normalizedColor && normalizedColor.alpha !== 1) {
    configuredOpacity = opacity ?? normalizedColor.alpha;
  }

  return {
    ...rest,
    color: normalizedColor?.color,
    opacity: configuredOpacity,
  };
}

function normalizeHighlight<T extends Record<string, any>>(
  replicad: ReplicadLike,
  config: T
) {
  const {
    highlight: inputHighlight,
    highlightEdge,
    highlightFace,
    ...rest
  } = config;

  const highlight =
    (inputHighlight && typeof inputHighlight.find === "function"
      ? inputHighlight
      : null) ||
    (highlightEdge && replicad.EdgeFinder
      ? highlightEdge(new replicad.EdgeFinder())
      : null) ||
    (highlightFace && replicad.FaceFinder
      ? highlightFace(new replicad.FaceFinder())
      : null);

  return {
    ...rest,
    highlight,
  };
}

function normalizeLabels<T extends Record<string, any>>(
  replicad: ReplicadLike,
  config: T
) {
  const { labels = [], ...rest } = config;

  const filteredLabels = labels
    .filter((labelConfig: any) => {
      return (
        labelConfig && labelConfig.label && labelConfig.from && labelConfig.to
      );
    })
    .map((labelConfig: any) => {
      const {
        label,
        from: fromInput,
        to: toInput,
        offset: offsetInput,
        color,
        mode,
        fontSize,
        position,
      } = labelConfig;

      const from = isInstanceOf(fromInput, replicad.Vertex)
        ? fromInput.asTuple()
        : fromInput;
      const to = isInstanceOf(toInput, replicad.Vertex)
        ? toInput.asTuple()
        : toInput;
      const offset = isInstanceOf(offsetInput, replicad.Vertex)
        ? offsetInput.asTuple()
        : offsetInput;

      return {
        label: label ?? "Label",
        from,
        to,
        offset,
        color,
        mode,
        fontSize,
        position,
      };
    });

  return {
    ...rest,
    labels: filteredLabels,
  };
}

function checkShapeConfigIsValid<T extends Record<string, any> & { shape: unknown }>(
  replicad: ReplicadLike,
  shape: T
): shape is T & { shape: Meshable | SVGable } {
  return isSVGable(replicad, shape.shape) || isMeshable(shape.shape);
}

const adaptSketch = (replicad: ReplicadLike, shape: any) => {
  if (!isInstanceOf(shape, replicad.Sketch)) return shape;
  if (shape.wire.isClosed) return shape.face();
  return shape.wire;
};

const adaptSketches = (replicad: ReplicadLike, shape: any) => {
  const isSketches =
    isInstanceOf(shape, replicad.Sketches) ||
    isInstanceOf(shape, replicad.CompoundSketch);
  if (!isSketches) return shape;

  return shape.wires;
};

export class ShapeStandardizer {
  private readonly replicad: ReplicadLike;

  private shapeAdapters: Record<string, (shape: any) => any>;

  constructor(replicad: ReplicadLike) {
    this.replicad = replicad;
    this.shapeAdapters = {
      sketch: (shape) => adaptSketch(this.replicad, shape),
      sketches: (shape) => adaptSketches(this.replicad, shape),
    };
  }

  registerAdapter(name: string, adapter: (shape: any) => any) {
    this.shapeAdapters[name] = adapter;
  }

  adaptShape(shape: any) {
    Object.values(this.shapeAdapters).forEach((adapter) => {
      shape = adapter(shape);
    });
    return shape;
  }

  standardizeShape<T extends { shape: unknown }>(
    shapes: T[]
  ): Array<T & { shape: Meshable | SVGable }> {
    return shapes
      .map(({ shape, ...rest }) => ({
        shape: this.adaptShape(shape),
        ...rest,
      }))
      .filter((shape): shape is T & { shape: Meshable | SVGable } =>
        checkShapeConfigIsValid(this.replicad, shape)
      );
  }
}

function renderSVG(shapeConfig: SVGShapeConfiguration) {
  const { name, shape, color, strokeType, opacity } = shapeConfig;
  return {
    name,
    color,
    strokeType,
    opacity,
    format: "svg",
    paths: shape.toSVGPaths(),
    viewbox: shape.toSVGViewBox(),
  };
}

function renderMesh(replicad: ReplicadLike, shapeConfig: MeshableConfiguration) {
  const { name, shape, color, opacity, labels, highlight, solidType } =
    shapeConfig;
  const shapeInfo = {
    name,
    color,
    opacity,
    solidType: solidType || inferSolidType(replicad, shape),
    labels,
    mesh: null as any,
    edges: null as any,
    error: false,
    message: null as string | null,
    highlight: null as number[] | null,
  };

  try {
    const hasMeshEdges = typeof shape.meshEdges === "function";
    const mesh = hasMeshEdges
      ? shape.mesh({
          tolerance: 0.1,
          angularTolerance: 30,
        })
      : shape.mesh();

    if (mesh) {
      if (!Array.isArray(mesh.vertices) && ArrayBuffer.isView(mesh.vertices)) {
        mesh.vertices = Array.from(mesh.vertices);
      }
      if (!Array.isArray(mesh.triangles) && ArrayBuffer.isView(mesh.triangles)) {
        mesh.triangles = Array.from(mesh.triangles);
      }
      if (!Array.isArray(mesh.normals) && ArrayBuffer.isView(mesh.normals)) {
        mesh.normals = Array.from(mesh.normals);
      }
      if (
        Array.isArray(mesh.normals) &&
        Array.isArray(mesh.vertices) &&
        mesh.normals.length !== mesh.vertices.length
      ) {
        delete mesh.normals;
      }
    }

    shapeInfo.mesh = mesh;
    if (hasMeshEdges) {
      shapeInfo.edges = shape.meshEdges({ keepMesh: true });
    }
  } catch (error: any) {
    console.error(error);
    shapeInfo.error = true;
    shapeInfo.message = error?.message || "Could not generate the mesh";
    return shapeInfo;
  }

  if (highlight) {
    try {
      shapeInfo.highlight = highlight.find(shape).map((subshape: any) => {
        return subshape.hashCode;
      });
    } catch (error) {
      console.error(error);
    }
  }

  return shapeInfo;
}

export function render(replicad: ReplicadLike, shapes: Array<CleanConfig>) {
  return shapes.map((shapeConfig) => {
    if (isSVGable(replicad, shapeConfig.shape)) {
      return renderSVG(shapeConfig as SVGShapeConfiguration);
    }
    return renderMesh(replicad, shapeConfig as MeshableConfiguration);
  });
}

interface RenderOutputOptions {
  replicad: ReplicadLike;
  shapeStandardizer?: ShapeStandardizer;
  beforeRender?: (shapes: CleanConfig[]) => CleanConfig[];
  defaultName?: string;
}

export function renderOutput(
  shapes: unknown,
  options: RenderOutputOptions
) {
  const {
    replicad,
    shapeStandardizer,
    beforeRender,
    defaultName = "Shape",
  } = options;

  const standardizer = shapeStandardizer || new ShapeStandardizer(replicad);

  const baseShape = createBasicShapeConfig(shapes, defaultName)
    .map(normalizeColorAndOpacity)
    .map((shape) => normalizeHighlight(replicad, shape))
    .map((shape) => normalizeLabels(replicad, shape));

  const standardizedShapes = standardizer.standardizeShape(baseShape);
  const config = beforeRender
    ? beforeRender(standardizedShapes)
    : standardizedShapes;

  return render(replicad, config);
}
