const shapeOrSketch = (shape) => {
  if (!(shape instanceof replicad.Sketch)) return shape;
  if (shape.wire.isClosed) return shape.face();
  return shape.wire;
};

export class StudioHelper {
  constructor() {
    this._shapes = [];
    this._faceFinder = null;
    this._edgeFinder = null;
  }

  debug(shape) {
    this._shapes.push(shape);
    return shape;
  }

  d(shape) {
    return this.debug(shape);
  }

  highlightFace(faceFinder) {
    this._faceFinder = faceFinder;
    return faceFinder;
  }

  hf(faceFinder) {
    return this.highlightFace(faceFinder);
  }

  highlightEdge(edgeFinder) {
    this._edgeFinder = edgeFinder;
    return edgeFinder;
  }

  he(edgeFinder) {
    return this.highlightEdge(edgeFinder);
  }

  apply(config) {
    const conf = config.concat(
      this._shapes.map((s, i) => ({
        shape: shapeOrSketch(s),
        name: `Debug ${i}`,
      }))
    );
    conf.forEach((shape) => {
      if (this._edgeFinder && !shape.highlightEdge) {
        shape.highlightEdge = this._edgeFinder;
      }
      if (this._faceFinder && !shape.highlightFace) {
        shape.highlightFace = this._faceFinder;
      }
    });
    return conf;
  }
}
