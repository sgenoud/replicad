import { WrappingObj, RegisteredObj } from "./register.js";
import { DEG2RAD, RAD2DEG } from "./constants.js";
import { getOC } from "./oclib.js";

const round3 = (v) => Math.round(v * 1000) / 1000;

export const makeAx3 = (center, dir, xDir) => {
  const oc = getOC();
  const origin = asPnt(center);
  const direction = asDir(dir);

  let axis;
  if (xDir) {
    const xDirection = asDir(xDir);
    axis = new oc.gp_Ax3_3(origin, direction, xDirection);
    xDirection.delete();
  } else {
    axis = new oc.gp_Ax3_4(origin, direction);
  }
  origin.delete();
  direction.delete();
  return axis;
};

export const makeAx2 = (center, dir, xDir) => {
  const oc = getOC();
  const origin = asPnt(center);
  const direction = asDir(dir);

  let axis;
  if (xDir) {
    const xDirection = asDir(xDir);
    axis = new oc.gp_Ax2_2(origin, direction, xDirection);
    xDirection.delete();
  } else {
    axis = new oc.gp_Ax2_3(origin, direction);
  }
  origin.delete();
  direction.delete();
  return axis;
};

export const makeAx1 = (center, dir) => {
  const oc = getOC();
  const origin = asPnt(center);
  const direction = asDir(dir);
  const axis = new oc.gp_Ax1_2(origin, direction);
  origin.delete();
  direction.delete();
  return axis;
};

export class Vector extends WrappingObj {
  constructor(...args) {
    const oc = getOC();
    let wrapped;
    if (args.length === 3) wrapped = new oc.gp_Vec_4(...args);
    else if (args.length === 2) wrapped = new oc.gp_Vec_4(...args, 0);
    else if (args.length === 0) wrapped = new oc.gp_Vec_4(0, 0, 0);
    else if (args.length === 1) {
      const arg = args[0];

      if (Array.isArray(arg)) {
        if (arg.length === 3) wrapped = new oc.gp_Vec_4(...arg);
        else if (arg.length === 2) wrapped = new oc.gp_Vec_4(...arg, 0);
        else if (arg.length === 0) wrapped = new oc.gp_Vec_4(0, 0, 0);
      } else if (arg instanceof Vector) {
        wrapped = new oc.gp_Vec_3(args[0].wrapped.XYZ());
      } else if (!arg) {
        wrapped = new oc.gp_Vec_4(0, 0, 0);
      } else if (arg.XYZ) wrapped = new oc.gp_Vec_3(args[0].XYZ());
    }
    super(wrapped);
  }

  get repr() {
    return `x: ${round3(this.x)}, y: ${round3(this.y)}, z: ${round3(this.z)}`;
  }

  get x() {
    return this.wrapped.X();
  }

  get y() {
    return this.wrapped.Y();
  }

  get z() {
    return this.wrapped.Z();
  }

  get Length() {
    return this.wrapped.Magnitude();
  }

  toTuple() {
    return [this.x, this.y, this.z];
  }

  cross(v) {
    return new Vector(this.wrapped.Crossed(v.wrapped));
  }

  dot(v) {
    return this.wrapped.Dot(v.wrapped);
  }

  sub(v) {
    return new Vector(this.wrapped.Subtracted(v.wrapped));
  }

  add(v) {
    return new Vector(this.wrapped.Added(v.wrapped));
  }

  multiply(scale) {
    return new Vector(this.wrapped.Multiplied(scale));
  }

  normalized() {
    return new Vector(this.wrapped.Normalized());
  }

  normalize() {
    this.wrapped.Normalize();
    return this;
  }

  getCenter() {
    return this;
  }

  getAngle(v) {
    return this.wrapped.Angle(v.wrapped) * RAD2DEG;
  }

  projectToPlane(plane) {
    const base = plane.origin;
    const normal = plane.zDir;

    const v1 = this.sub(base);

    const v2 = normal.multiply(v1.dot(normal) / normal.Length ** 2);
    const projection = this.sub(v2);

    v1.delete();
    v2.delete();

    return projection;
  }
  equals(other) {
    return this.wrapped.IsEqual(other.wrapped, 0.00001, 0.00001);
  }

  toPnt() {
    return new this.oc.gp_Pnt_2(this.wrapped.XYZ());
  }

  toDir() {
    return new this.oc.gp_Dir_3(this.wrapped.XYZ());
  }

  rotate(angle, center = [0, 0, 0], direction = [0, 0, 1]) {
    const ax = makeAx1(center, direction);
    this.wrapped.Rotate(ax, angle * DEG2RAD);
    ax.delete();
  }

  transform(T) {
    const pnt = this.toPnt();
    const trsf = pnt.Transformed(T.wrapped.Trsf());
    return new Vector(trsf);
  }
}

export function asPnt(coords) {
  const v = new Vector(coords);
  const pnt = v.toPnt();
  v.delete();
  return pnt;
}

export function asDir(coords) {
  const v = new Vector(coords);
  const dir = v.toDir();
  v.delete();
  return dir;
}

export class Matrix extends WrappingObj {}

export class Transformation extends WrappingObj {
  constructor(transform) {
    const oc = getOC();
    super(transform || new oc.gp_Trsf_1());
  }

  translate(vector) {
    const localVect = new Vector(vector);
    this.wrapped.SetTranslation_1(localVect.wrapped);
    localVect.delete();

    return this;
  }

  rotate(angle, position = [0, 0, 0], direction = [0, 0, 1]) {
    const dir = asDir(direction);
    const origin = asPnt(position);
    const axis = new this.oc.gp_Ax1_2(origin, dir);

    this.wrapped.SetRotation_1(axis, angle * DEG2RAD);
    axis.delete();
    dir.delete();
    origin.delete();

    return this;
  }

  mirror(inputPlane, origin) {
    const shouldClean = [];
    let plane = inputPlane;
    if (typeof plane === "string") {
      plane = createNamedPlane(inputPlane, origin);
      shouldClean.push(plane);
    }

    const mirrorAxis = new this.oc.gp_Ax2_3(
      plane.origin.toPnt(),
      plane.zDir.toDir()
    );
    shouldClean.push(mirrorAxis);

    this.wrapped.SetMirror_3(mirrorAxis);

    return this;
  }
}

export class Plane extends RegisteredObj {
  constructor(origin, xDirection = null, normal = [0, 0, 1]) {
    super();
    this.oc = getOC();

    const zDir = new Vector(normal);
    if (zDir.Length === 0) {
      throw new Error("normal should be non null");
    }
    this.zDir = zDir.normalize();

    let xDir;
    if (!xDirection) {
      const ax3 = new this.oc.gp_Ax3_4(asPnt(origin), asDir(zDir));
      xDir = new Vector(ax3.XDirection());
      ax3.delete();
    } else {
      xDir = new Vector(xDirection);
    }

    if (xDir.Length === 0) {
      throw new Error("xDir should be non null");
    }

    this.xDir = xDir.normalize();
    this.yDir = this.zDir.cross(this.xDir).normalize();

    this.origin = new Vector(origin);
  }

  delete() {
    this.lcs.delete();
    this.localToGlobal.delete();
    this.xDir.delete();
    this.yDir.delete();
    this.zDir.delete();
    this._origin.delete();
    super.delete();
  }

  clone() {
    return new Plane(this.origin, this.xDir, this.zDir);
  }

  get origin() {
    return this._origin;
  }

  set origin(newOrigin) {
    this._origin = newOrigin;
    this._calcTransforms();
  }

  _calcTransforms() {
    const globalCoordSystem = new this.oc.gp_Ax3_1();
    const localCoordSystem = new this.oc.gp_Ax3_3(
      asPnt(this.origin),
      asDir(this.zDir),
      asDir(this.xDir)
    );

    const forwardT = new this.oc.gp_Trsf_1();
    forwardT.SetTransformation_1(globalCoordSystem, localCoordSystem);
    this.globalToLocal = new Matrix(new this.oc.gp_GTrsf_2(forwardT));

    const inverseT = new this.oc.gp_Trsf_1();
    inverseT.SetTransformation_1(localCoordSystem, globalCoordSystem);
    this.localToGlobal = new Matrix(new this.oc.gp_GTrsf_2(inverseT));

    this.lcs = localCoordSystem;

    globalCoordSystem.delete();
  }

  setOrigin2d(x, y) {
    this.origin = this.toWorldCoords([x, y]);
  }

  toLocalCoords(obj) {
    if (obj instanceof Vector) {
      return obj.transform(this.globalToLocal);
    } else if (obj.transformShape)
      return obj.transformShape(this.globalToLocal);
  }

  toWorldCoords(v) {
    if (v instanceof Vector) {
      return v.transform(this.localToGlobal);
    } else {
      return new Vector(v).transform(this.localToGlobal);
    }
  }

  get Location() {
    return new Location(this);
  }
}

const PLANES_CONFIG = {
  XY: {
    xDir: [1, 0, 0],
    normal: [0, 0, 1],
  },
  YZ: {
    xDir: [0, 1, 0],
    normal: [1, 0, 0],
  },
  ZX: {
    xDir: [0, 0, 1],
    normal: [0, 1, 0],
  },
  XZ: {
    xDir: [1, 0, 0],
    normal: [0, -1, 0],
  },
  YX: {
    xDir: [0, 1, 0],
    normal: [0, 0, -1],
  },
  ZY: {
    xDir: [0, 0, 1],
    normal: [-1, 0, 0],
  },
  front: {
    xDir: [1, 0, 0],
    normal: [0, 0, 1],
  },
  back: {
    xDir: [-1, 0, 0],
    normal: [0, 0, -1],
  },
  left: {
    xDir: [0, 0, 1],
    normal: [-1, 0, 0],
  },
  right: {
    xDir: [0, 0, -1],
    normal: [1, 0, 0],
  },
  top: {
    xDir: [1, 0, 0],
    normal: [0, 1, 0],
  },
  bottom: {
    xDir: [1, 0, 0],
    normal: [0, -1, 0],
  },
};

export const createNamedPlane = (plane, sourceOrigin = [0, 0, 0]) => {
  const config = PLANES_CONFIG[plane];
  if (!config) throw new Error(`Could not find plane ${plane}`);
  let origin = sourceOrigin;
  if (Number.isFinite(sourceOrigin)) {
    origin = config.normal.map((v) => v * sourceOrigin);
  }
  return new Plane(origin, config.xDir, config.normal);
};

export class Location extends WrappingObj {
  constructor(...args) {
    super(null);
    let T = new this.oc.gp_Trsf_1();

    if (args.length == 1) {
      const t = args[0];

      if (t instanceof Vector) {
        T.SetTranslationPart(t.wrapped);
      } else if (t instanceof Plane) {
        const cs = new this.oc.gp_Ax3_3(
          t.origin.toPnt(),
          t.zDir.toDir(),
          t.xDir.toDir()
        );
        T.SetTransformation(cs);
        T.Invert();
      } else if (t instanceof this.oc.TopLoc_Location) {
        this.wrapped = t;
        return;
      } else if (t instanceof this.oc.gp_Trsf) {
        T = t;
      }
    } else if (args.length == 2) {
      const [t, v] = args;

      const cs = new this.oc.gp_Ax3_3(
        v.toPnt(),
        t.zDir.toDir(),
        t.xDir.toDir()
      );
      T.SetTransformation(cs);
      T.Invert();
    } else if (args.length == 3) {
      const [t, ax, angle] = args;
      T.SetRotation(
        new this.oc.gp_Ax1_2(Vector().toPnt(), ax.toDir()),
        (angle * Math.PI) / 180.0
      );
      T.SetTranslationPart(t.wrapped);
    }

    this.wrapped = new this.oc.TopLoc_Location(T);
  }
}
