import type { ReplicadLike } from "./types";
import type { CleanConfig } from "./render";

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

  apply(config: CleanConfig[]): CleanConfig[] {
    const nextConfig = config.concat(
      this.shapes.map((shape, index) => ({
        shape: adaptSketchDebugShape(this.replicad, shape),
        name: `Debug ${index}`,
        labels: [],
      }))
    );

    // renderOutput runs normalizeHighlight before beforeRender (and so before
    // this), which resolves highlightEdge/highlightFace into `highlight` and
    // drops them. So the globally registered finders have to be resolved the
    // same way here, rather than set as the raw keys nothing reads anymore.
    nextConfig.forEach((shapeConfig) => {
      if (shapeConfig.highlight) return;

      if (this.edgeFinder && this.replicad.EdgeFinder) {
        shapeConfig.highlight = this.edgeFinder(new this.replicad.EdgeFinder());
        return;
      }
      if (this.faceFinder && this.replicad.FaceFinder) {
        shapeConfig.highlight = this.faceFinder(new this.replicad.FaceFinder());
      }
    });

    return nextConfig;
  }
}
