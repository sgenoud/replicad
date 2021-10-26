import { WrappingObj, RegisteredObj, localGC } from "./register.js";
import { DEG2RAD, RAD2DEG } from "./constants.js";
import { getOC } from "./oclib.js";

import {
  gp_Ax1,
  gp_Ax2,
  gp_Ax3,
  gp_Vec,
  gp_XYZ,
  gp_Dir,
  gp_Pnt,
  gp_GTrsf,
  gp_Trsf,
  OpenCascadeInstance,
} from "../wasm/cadeau_single";

const round3 = (v: number) => Math.round(v * 1000) / 1000;

export type Point =
  | [number, number, number]
  | Vector
  | [number, number]
  | { XYZ: () => gp_XYZ };

export const makeAx3 = (center: Point, dir: Point, xDir?: Point): gp_Ax3 => {
  const oc = getOC();
  const origin = asPnt(center);
  const direction = asDir(dir);

  let axis: gp_Ax3;
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

export const makeAx2 = (center: Point, dir: Point, xDir?: Point): gp_Ax2 => {
  const oc = getOC();
  const origin = asPnt(center);
  const direction = asDir(dir);

  let axis: gp_Ax2;
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

export const makeAx1 = (center: Point, dir: Point): gp_Ax1 => {
  const oc = getOC();
  const origin = asPnt(center);
  const direction = asDir(dir);
  const axis = new oc.gp_Ax1_2(origin, direction);
  origin.delete();
  direction.delete();
  return axis;
};

const makeVec = (vector: Point = [0, 0, 0]): gp_Vec => {
  const oc = getOC();

  if (Array.isArray(vector)) {
    if (vector.length === 3) return new oc.gp_Vec_4(...vector);
    else if (vector.length === 2) return new oc.gp_Vec_4(...vector, 0);
  } else if (vector instanceof Vector) {
    return new oc.gp_Vec_3(vector.wrapped.XYZ());
  } else if (vector.XYZ) return new oc.gp_Vec_3(vector.XYZ());
  return new oc.gp_Vec_4(0, 0, 0);
};

export class Vector extends WrappingObj<gp_Vec> {
  constructor(vector: Point = [0, 0, 0]) {
    super(makeVec(vector));
  }

  get repr(): string {
    return `x: ${round3(this.x)}, y: ${round3(this.y)}, z: ${round3(this.z)}`;
  }

  get x(): number {
    return this.wrapped.X();
  }

  get y(): number {
    return this.wrapped.Y();
  }

  get z(): number {
    return this.wrapped.Z();
  }

  get Length(): number {
    return this.wrapped.Magnitude();
  }

  toTuple(): [number, number, number] {
    return [this.x, this.y, this.z];
  }

  cross(v: Vector): Vector {
    return new Vector(this.wrapped.Crossed(v.wrapped));
  }

  dot(v: Vector): number {
    return this.wrapped.Dot(v.wrapped);
  }

  sub(v: Vector): Vector {
    return new Vector(this.wrapped.Subtracted(v.wrapped));
  }

  add(v: Vector): Vector {
    return new Vector(this.wrapped.Added(v.wrapped));
  }

  multiply(scale: number): Vector {
    return new Vector(this.wrapped.Multiplied(scale));
  }

  normalized(): Vector {
    return new Vector(this.wrapped.Normalized());
  }

  normalize(): Vector {
    this.wrapped.Normalize();
    return this;
  }

  getCenter(): Vector {
    return this;
  }

  getAngle(v: Vector): number {
    return this.wrapped.Angle(v.wrapped) * RAD2DEG;
  }

  projectToPlane(plane: Plane): Vector {
    const base = plane.origin;
    const normal = plane.zDir;

    const v1 = this.sub(base);

    const v2 = normal.multiply(v1.dot(normal) / normal.Length ** 2);
    const projection = this.sub(v2);

    v1.delete();
    v2.delete();

    return projection;
  }
  equals(other: Vector): boolean {
    return this.wrapped.IsEqual(other.wrapped, 0.00001, 0.00001);
  }

  toPnt(): gp_Pnt {
    return new this.oc.gp_Pnt_2(this.wrapped.XYZ());
  }

  toDir(): gp_Dir {
    return new this.oc.gp_Dir_3(this.wrapped.XYZ());
  }

  rotate(
    angle: number,
    center: Point = [0, 0, 0],
    direction: Point = [0, 0, 1]
  ): Vector {
    const ax = makeAx1(center, direction);
    this.wrapped.Rotate(ax, angle * DEG2RAD);
    ax.delete();
    return this;
  }

  transform(T: Matrix): Vector {
    const pnt = this.toPnt();
    const trsf = pnt.Transformed(T.wrapped.Trsf());
    return new Vector(trsf);
  }
}

export function asPnt(coords: Point): gp_Pnt {
  const v = new Vector(coords);
  const pnt = v.toPnt();
  v.delete();
  return pnt;
}

export function asDir(coords: Point): gp_Dir {
  const v = new Vector(coords);
  const dir = v.toDir();
  v.delete();
  return dir;
}

export class Matrix extends WrappingObj<gp_GTrsf> {}

export class Transformation extends WrappingObj<gp_Trsf> {
  constructor(transform?: gp_Trsf) {
    const oc = getOC();
    super(transform || new oc.gp_Trsf_1());
  }

  translate(vector: Point): Transformation {
    const localVect = new Vector(vector);
    this.wrapped.SetTranslation_1(localVect.wrapped);
    localVect.delete();

    return this;
  }

  rotate(
    angle: number,
    position: Point = [0, 0, 0],
    direction: Point = [0, 0, 1]
  ): Transformation {
    const dir = asDir(direction);
    const origin = asPnt(position);
    const axis = new this.oc.gp_Ax1_2(origin, dir);

    this.wrapped.SetRotation_1(axis, angle * DEG2RAD);
    axis.delete();
    dir.delete();
    origin.delete();

    return this;
  }

  mirror(inputPlane: Plane | PlaneName, origin: Point): this {
    const [r, gc] = localGC();
    let plane: Plane;
    if (typeof inputPlane === "string") {
      plane = r(createNamedPlane(inputPlane, origin));
    } else {
      plane = inputPlane;
    }
    const mirrorAxis = r(makeAx2(plane.origin, plane.zDir));
    this.wrapped.SetMirror_3(mirrorAxis);
    gc();

    return this;
  }
}

export class Plane extends RegisteredObj {
  oc: OpenCascadeInstance;

  xDir: Vector;
  yDir: Vector;
  zDir: Vector;

  // @ts-expect-error initialised indirectly
  private _origin: Vector;
  // @ts-expect-error initialised indirectly
  private lcs: gp_Ax3;
  // @ts-expect-error initialised indirectly
  private localToGlobal: Matrix;
  // @ts-expect-error initialised indirectly
  private globalToLocal: Matrix;

  constructor(
    origin: Point,
    xDirection: Point | null = null,
    normal: Point = [0, 0, 1]
  ) {
    super();
    this.oc = getOC();

    const zDir = new Vector(normal);
    if (zDir.Length === 0) {
      throw new Error("normal should be non null");
    }
    this.zDir = zDir.normalize();

    let xDir: Vector;
    if (!xDirection) {
      const ax3 = makeAx3(origin, zDir);
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

  delete(): void {
    this.lcs.delete();
    this.localToGlobal.delete();
    this.xDir.delete();
    this.yDir.delete();
    this.zDir.delete();
    this._origin.delete();
    super.delete();
  }

  clone(): Plane {
    return new Plane(this.origin, this.xDir, this.zDir);
  }

  get origin(): Vector {
    return this._origin;
  }

  set origin(newOrigin: Vector) {
    this._origin = newOrigin;
    this._calcTransforms();
  }

  _calcTransforms(): void {
    const globalCoordSystem = new this.oc.gp_Ax3_1();
    const localCoordSystem = makeAx3(this.origin, this.zDir, this.xDir);

    const forwardT = new this.oc.gp_Trsf_1();
    forwardT.SetTransformation_1(globalCoordSystem, localCoordSystem);
    this.globalToLocal = new Matrix(new this.oc.gp_GTrsf_2(forwardT));

    const inverseT = new this.oc.gp_Trsf_1();
    inverseT.SetTransformation_1(localCoordSystem, globalCoordSystem);
    this.localToGlobal = new Matrix(new this.oc.gp_GTrsf_2(inverseT));

    this.lcs = localCoordSystem;

    globalCoordSystem.delete();
  }

  setOrigin2d(x: number, y: number): void {
    this.origin = this.toWorldCoords([x, y]);
  }

  toLocalCoords(obj: Vector | { transformShape: (T: Matrix) => any }): Point {
    if (obj instanceof Vector) {
      return obj.transform(this.globalToLocal);
    } else if (obj.transformShape)
      return obj.transformShape(this.globalToLocal);
    throw new Error("Needs to convert a vector or a shape");
  }

  toWorldCoords(v: Point): Vector {
    if (v instanceof Vector) {
      return v.transform(this.localToGlobal);
    } else {
      return new Vector(v).transform(this.localToGlobal);
    }
  }
}

export type PlaneName =
  | "XY"
  | "YZ"
  | "ZX"
  | "XZ"
  | "YX"
  | "ZY"
  | "front"
  | "back"
  | "left"
  | "right"
  | "top"
  | "bottom";

const PLANES_CONFIG: Record<
  PlaneName,
  {
    xDir: [number, number, number];
    normal: [number, number, number];
  }
> = {
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

export const createNamedPlane = (
  plane: PlaneName,
  sourceOrigin: Point | number = [0, 0, 0]
): Plane => {
  const config = PLANES_CONFIG[plane];
  if (!config) throw new Error(`Could not find plane ${plane}`);

  let origin: Point;
  if (typeof sourceOrigin === "number") {
    origin = config.normal.map((v: number) => v * sourceOrigin) as Point;
  } else {
    origin = sourceOrigin;
  }
  return new Plane(origin, config.xDir, config.normal);
};
