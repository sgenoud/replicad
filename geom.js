import { WrappingObj, registerObj, unregisterObj } from "./register.js";

const round3 = (v) => Math.round(v * 1000) / 1000;

export class Vector extends WrappingObj {
  constructor(oc, ...args) {
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
    super(oc, wrapped);
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
    return new Vector(this.oc, this.wrapped.Crossed(v.wrapped));
  }

  dot(v) {
    return this.wrapped.Dot(v.wrapped);
  }

  sub(v) {
    return new Vector(this.oc, this.wrapped.Subtracted(v.wrapped));
  }

  add(v) {
    return new Vector(this.oc, this.wrapped.Added(v.wrapped));
  }

  multiply(scale) {
    return new Vector(this.oc, this.wrapped.Multiplied(scale));
  }

  normalized() {
    return new Vector(this.oc, this.wrapped.Normalized());
  }

  normalize() {
    this.wrapped.Normalize();
    return this;
  }

  getCenter() {
    return this;
  }

  getAngle(v) {
    return this.wrapped.Angle(v.wrapped);
  }

  projectToPlane(plane) {
    const base = plane.origin;
    const normal = plane.zDir;

    const v1 = this.sub(normal);
    const v2 = this.sub(base);

    const projection = v1.multiply(v2.dot(normal) - normal.Length ** 2);
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

  transform(T) {
    const pnt = this.toPnt();
    const trsf = pnt.Transformed(T.wrapped.Trsf());
    return new Vector(this.oc, trsf);
  }
}

export function asPnt(oc, coords) {
  const v = new Vector(oc, coords);
  const pnt = v.toPnt();
  v.delete();
  return pnt;
}

export function asDir(oc, coords) {
  const v = new Vector(oc, coords);
  const dir = v.toDir();
  v.delete();
  return dir;
}

export class Matrix extends WrappingObj {}

export class Plane {
  constructor(oc, origin, xDirection = null, normal = [0, 0, 1]) {
    this.oc = oc;

    const zDir = new Vector(this.oc, normal);
    if (zDir.Length === 0) {
      throw new Error("normal should be non null");
    }
    this.zDir = zDir.normalize();

    let xDir;
    if (!xDirection) {
      const ax3 = new this.oc.gp_Ax3_4(
        asPnt(this.oc, origin),
        asDir(this.oc, zDir)
      );
      xDir = new Vector(this.oc, ax3.XDirection());
      ax3.delete();
    } else {
      xDir = new Vector(this.oc, xDirection);
    }

    if (xDir.Length === 0) {
      throw new Error("xDir should be non null");
    }

    this.xDir = xDir.normalize();
    this.yDir = this.zDir.cross(this.xDir).normalize();

    this.origin = new Vector(oc, origin);
    registerObj(this);
  }

  delete() {
    this.lcs.delete();
    unregisterObj();
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
      asPnt(this.oc, this.origin),
      asDir(this.oc, this.zDir),
      asDir(this.oc, this.xDir)
    );

    const forwardT = new this.oc.gp_Trsf_1();
    forwardT.SetTransformation_1(globalCoordSystem, localCoordSystem);
    this.globalToLocal = new Matrix(this.oc, new this.oc.gp_GTrsf_2(forwardT));

    const inverseT = new this.oc.gp_Trsf_1();
    inverseT.SetTransformation_1(localCoordSystem, globalCoordSystem);
    this.localToGlobal = new Matrix(this.oc, new this.oc.gp_GTrsf_2(inverseT));

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
      return new Vector(this.oc, v).transform(this.localToGlobal);
    }
  }

  get Location() {
    return new Location(this.oc, this);
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

export const createNamedPlane = (oc, plane, origin = [0, 0, 0]) => {
  return new Plane(
    oc,
    origin,
    PLANES_CONFIG[plane].xDir,
    PLANES_CONFIG[plane].normal
  );
};

export class Location extends WrappingObj {
  constructor(oc, ...args) {
    super(oc, null);
    let T = new oc.gp_Trsf_1();

    if (args.length == 1) {
      const t = args[0];

      if (t instanceof Vector) {
        T.SetTranslationPart(t.wrapped);
      } else if (t instanceof Plane) {
        const cs = new oc.gp_Ax3_3(
          t.origin.toPnt(),
          t.zDir.toDir(),
          t.xDir.toDir()
        );
        T.SetTransformation(cs);
        T.Invert();
      } else if (t instanceof oc.TopLoc_Location) {
        this.wrapped = t;
        return;
      } else if (t instanceof oc.gp_Trsf) {
        T = t;
      }
    } else if (args.length == 2) {
      const [t, v] = args;

      const cs = new oc.gp_Ax3_3(v.toPnt(), t.zDir.toDir(), t.xDir.toDir());
      T.SetTransformation(cs);
      T.Invert();
    } else if (args.length == 3) {
      const [t, ax, angle] = args;
      T.SetRotation(
        new oc.gp_Ax1_2(Vector().toPnt(), ax.toDir()),
        (angle * Math.PI) / 180.0
      );
      T.SetTranslationPart(t.wrapped);
    }

    this.wrapped = new oc.TopLoc_Location(T);
  }
}
