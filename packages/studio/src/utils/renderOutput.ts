import {
  Sketch,
  EdgeFinder,
  FaceFinder,
  Blueprint,
  Blueprints,
  CompoundBlueprint,
  Drawing,
  Sketches,
  CompoundSketch,
} from "replicad";
import normalizeColor from "./normalizeColor";

interface Meshable {
  mesh: (config: { tolerance: number; angularTolerance: number }) => any;
  meshEdges: (config: { keepMesh: boolean }) => any;
}

interface SVGable {
  toSVGPaths: () => any;
  toSVGViewBox: () => any;
}

type InputShape = {
  shape: unknown;
  name?: string;
  color?: string;
  opacity?: number;
  highlight?: any;
  highlightEdge?: any;
  highlightFace?: any;
  strokeType?: string;
};

type CleanConfig = {
  name: string;
  shape: Meshable | SVGable;
  color?: string;
  opacity?: number;
  highlight?: any;
  strokeType?: string;
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
  highlight?: any;
};

const isSVGable = (shape: any): shape is SVGable => {
  return (
    shape instanceof Blueprint ||
    shape instanceof Blueprints ||
    shape instanceof CompoundBlueprint ||
    shape instanceof Drawing ||
    (shape.toSVGPaths && shape.toSVGViewBox)
  );
};

const isMeshable = (shape: any): shape is Meshable => {
  return !!(shape.mesh && shape.meshEdges);
};

function createBasicShapeConfig(
  inputShapes: unknown | unknown[] | InputShape[] | InputShape,
  baseName = "Shape"
): Array<InputShape & { name: string }> {
  let shapes: unknown[] = [];

  if (!inputShapes) return [];

  // We accept a single shape or an array of shapes
  if (Array.isArray(inputShapes)) shapes = inputShapes;
  else shapes = [inputShapes];

  return shapes
    .map((inputShape: any) => {
      // We accept shapes without additional configuration
      if (!inputShape.shape) {
        return {
          shape: inputShape,
        };
      }
      return inputShape;
    })
    .map((inputShape, i) => {
      // We accept unamed shapes
      const { name, ...rest } = inputShape;
      const index = shapes.length > 1 ? ` ${i}` : "";

      return {
        name: name || `${baseName}${index}`,
        ...rest,
      };
    });
}

function normalizeColorAndOpacity<T extends Record<string, any>>(
  shape: T
): T & { color: string | undefined; opacity: number | undefined } {
  const { color, opacity, ...rest } = shape;

  const normalizedColor: undefined | { color: string; alpha: number } =
    color && normalizeColor(color);
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

function normalizeHighlight<T extends Record<string, any>>(config: T) {
  const {
    highlight: inputHighlight,
    highlightEdge,
    highlightFace,
    ...rest
  } = config;

  const highlight: { find: (s: any) => any } =
    (inputHighlight && typeof inputHighlight.find == "function") ||
    (highlightEdge && highlightEdge(new EdgeFinder())) ||
    (highlightFace && highlightFace(new FaceFinder()));

  return {
    ...rest,
    highlight,
  };
}

function checkShapeConfigIsValid<
  T extends Record<string, any> & { shape: unknown }
>(shape: T): shape is T & { shape: Meshable | SVGable } {
  return isSVGable(shape.shape) || isMeshable(shape.shape);
}

const adaptSketch = (shape: any) => {
  if (!(shape instanceof Sketch)) return shape;
  if (shape.wire.isClosed) return shape.face();
  return shape.wire;
};

const adaptSketches = (shape: any) => {
  const isSketches =
    shape instanceof Sketches || shape instanceof CompoundSketch;
  if (!isSketches) return shape;

  return shape.wires;
};

export class ShapeStandardizer {
  private shapeAdapters: Record<string, (shape: any) => any>;

  constructor() {
    this.shapeAdapters = {
      sketch: adaptSketch,
      sketches: adaptSketches,
    };
  }

  registerAdapter(name: string, adapter: (shape: any) => any) {
    this.shapeAdapters[name] = adapter;
  }

  adaptShape(shape: any) {
    Object.values(this.shapeAdapters).forEach((adaptor) => {
      shape = adaptor(shape);
    });
    return shape;
  }

  standardizeShape<T extends { shape: unknown }>(
    shapes: T[]
  ): Array<T & { shape: Meshable | SVGable }> {
    // @ts-expect-error - We know that the shape is a Meshable or SVGable
    return shapes
      .map(({ shape, ...rest }) => ({
        shape: this.adaptShape(shape),
        ...rest,
      }))
      .filter(checkShapeConfigIsValid);
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

function renderMesh(shapeConfig: MeshableConfiguration) {
  const { name, shape, color, opacity, highlight } = shapeConfig;
  const shapeInfo = {
    name,
    color,
    opacity,
    mesh: null,
    edges: null,
    error: false,
    highlight: null,
  };

  try {
    shapeInfo.mesh = shape.mesh({
      tolerance: 0.1,
      angularTolerance: 30,
    });
    shapeInfo.edges = shape.meshEdges({ keepMesh: true });
  } catch (e) {
    console.error(e);
    shapeInfo.error = true;
    return shapeInfo;
  }

  if (highlight)
    try {
      shapeInfo.highlight = highlight.find(shape).map((s: any) => {
        return s.hashCode;
      });
    } catch (e) {
      console.error(e);
    }

  return shapeInfo;
}

export function render(shapes: Array<CleanConfig>) {
  return shapes.map((shapeConfig: CleanConfig) => {
    if (isSVGable(shapeConfig.shape))
      return renderSVG(shapeConfig as SVGShapeConfiguration);
    return renderMesh(shapeConfig as MeshableConfiguration);
  });
}

export function renderOutput(
  shapes: unknown,
  shapeStandardizer?: ShapeStandardizer,
  beforeRender?: (shapes: CleanConfig[]) => CleanConfig[],
  defaultName = "Shape"
) {
  const standardizer = shapeStandardizer || new ShapeStandardizer();

  const baseShape = createBasicShapeConfig(shapes, defaultName)
    .map(normalizeColorAndOpacity)
    .map(normalizeHighlight);
  const standardizedShapes = standardizer.standardizeShape(baseShape);

  const config = beforeRender
    ? beforeRender(standardizedShapes)
    : standardizedShapes;

  return render(config);
}
