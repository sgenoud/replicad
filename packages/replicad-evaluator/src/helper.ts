import type { ReplicadLike } from "./types";

const adaptSketchDebugShape = (replicad: ReplicadLike, shape: any) => {
  if (!replicad.Sketch || !(shape instanceof replicad.Sketch)) return shape;
  if (shape.wire.isClosed) return shape.face();
  return shape.wire;
};

export class BuilderHelper {
  private readonly replicad: ReplicadLike;

  private shapes: any[];

  private faceFinder: any;

  private edgeFinder: any;

  constructor(replicad: ReplicadLike) {
    this.replicad = replicad;
    this.shapes = [];
    this.faceFinder = null;
    this.edgeFinder = null;
  }

  debug(shape: any) {
    this.shapes.push(shape);
    return shape;
  }

  d(shape: any) {
    return this.debug(shape);
  }

  highlightFace(faceFinder: any) {
    this.faceFinder = faceFinder;
    return faceFinder;
  }

  hf(faceFinder: any) {
    return this.highlightFace(faceFinder);
  }

  highlightEdge(edgeFinder: any) {
    this.edgeFinder = edgeFinder;
    return edgeFinder;
  }

  he(edgeFinder: any) {
    return this.highlightEdge(edgeFinder);
  }

  apply(config: Array<Record<string, any>>) {
    const nextConfig = config.concat(
      this.shapes.map((shape, index) => ({
        shape: adaptSketchDebugShape(this.replicad, shape),
        name: `Debug ${index}`,
      }))
    );

    nextConfig.forEach((shapeConfig) => {
      if (this.edgeFinder && !shapeConfig.highlightEdge) {
        shapeConfig.highlightEdge = this.edgeFinder;
      }
      if (this.faceFinder && !shapeConfig.highlightFace) {
        shapeConfig.highlightFace = this.faceFinder;
      }
    });

    return nextConfig;
  }
}
