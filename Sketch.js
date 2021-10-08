import { Vector, Plane } from "./geom.js";
import { localGC, RegisteredObj } from "./register.js";
import { makeFace } from "./shapeHelpers.js";
import {
  basicFaceExtrusion,
  complexExtrude,
  twistExtrude,
  revolution,
  genericSweep,
  loft,
} from "./addThickness.js";

export default class Sketch extends RegisteredObj {
  constructor(
    wire,
    {
      defaultOrigin = [0, 0, 0],
      defaultDirection = [0, 0, 1],
      autoClean = true,
    } = {}
  ) {
    super();
    this.wire = wire;
    this.defaultOrigin = defaultOrigin;
    this.defaultDirection = defaultDirection;
    this.baseFace = null;
    this.autoClean = autoClean;
  }

  delete() {
    this.wire.delete();
    this._defaultOrigin.delete();
    this._defaultDirection.delete();
    this.baseFace && this.baseFace.delete();
    super.delete();
  }

  get defaultOrigin() {
    return this._defaultOrigin;
  }

  set defaultOrigin(newOrigin) {
    this._defaultOrigin = new Vector(newOrigin);
  }

  get defaultDirection() {
    return this._defaultDirection;
  }

  set defaultDirection(newDirection) {
    this._defaultDirection = new Vector(newDirection);
  }

  _shouldClean(keep) {
    return keep === false || (keep !== true && this.autoClean);
  }

  _clean(keep) {
    if (this._shouldClean(keep)) {
      this.delete();
    }
  }

  face({ keep } = {}) {
    const face = makeFace(this.wire);
    this._clean(keep);
    return face;
  }

  revolve(revolutionAxis, { origin, keep } = {}) {
    const face = this.face({ keep: true });
    const solid = revolution(
      face,
      origin || this.defaultOrigin,
      revolutionAxis
    );
    face.delete();
    this._clean(keep);
    return solid;
  }

  extrude(
    extrusionDistance,
    { extrusionDirection, extrusionProfile, twistAngle, keep, origin } = {}
  ) {
    const [r, gc] = localGC();

    const extrusionVec = r(
      new Vector(extrusionDirection || this.defaultDirection)
        .normalized()
        .multiply(extrusionDistance)
    );

    if (extrusionProfile && !twistAngle) {
      const solid = complexExtrude(
        this.wire,
        origin || this.defaultOrigin,
        extrusionVec,
        extrusionProfile
      );
      gc();
      this._clean(keep);
      return solid;
    }

    if (twistAngle) {
      const solid = twistExtrude(
        this.wire,
        twistAngle,
        origin,
        extrusionVec,
        extrusionProfile
      );
      gc();
      this._clean(keep);
      return solid;
    }

    const face = this.face(keep);
    const solid = basicFaceExtrusion(face, extrusionVec);

    gc();
    return solid;
  }

  sweepSketch(sketchOnPlane, sweepConfig = {}) {
    const [r, gc] = localGC();

    const startPoint = r(this.wire.startPoint);
    const normal = r(r(this.wire.tangentAt(1e-9)).multiply(-1)).normalize();
    const xDir = r(r(normal.cross(r(this.defaultDirection))).multiply(-1));

    const sketch = r(
      sketchOnPlane(r(new Plane(startPoint, xDir, normal)), startPoint)
    );

    const config = {
      forceProfileSpineOthogonality: true,
      ...sweepConfig,
    };
    if (this.baseFace) {
      config.support = this.baseFace.wrapped;
    }
    const shape = genericSweep(sketch.wire, this.wire, config);
    gc();

    return shape;
  }

  loftWith(otherSketches, { keep, ...loftConfig } = {}) {
    const sketchArray = Array.isArray(otherSketches)
      ? [this, ...otherSketches]
      : [this, otherSketches];
    const shape = loft(
      sketchArray.map((s) => s.wire),
      loftConfig
    );
    this._clean(keep);
    if (this._shouldClean) sketchArray.slice(1).forEach((s) => s.delete());
    return shape;
  }

  fromConfig({
    returnType,
    extrusionDistance,
    extrusionDirection,
    twistAngle,
    extrusionProfile,
    revolutionAxis = [0, 0, 1],
    origin,
  }) {
    if (returnType === "wire") return this.wire;
    if (returnType === "face") {
      return this.face();
    }

    if (returnType === "revolutionSolid")
      return this.revolve(revolutionAxis, { origin });
    return this.extrude(extrusionDistance, {
      extrusionDirection,
      twistAngle,
      extrusionProfile,
      origin,
    });
  }
}
