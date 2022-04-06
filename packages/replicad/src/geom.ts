import { WrappingObj, GCWithScope } from "./register.js";
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
  OpenCascadeInstance,
  gp_Trsf,
  TopoDS_Shape,
} from "replicad-opencascadejs";

const round3 = (v: number) => Math.round(v * 1000) / 1000;

export type Point =
  | [number, number, number]
  | Vector
  | [number, number]
  | { XYZ: () => gp_XYZ; delete: () => void };

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

type CoordSystem = "reference" | { origin: Point; zDir: Point; xDir: Point };

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

  mirror(
    inputPlane: Plane | PlaneName | Point = "YZ",
    inputOrigin?: Point
  ): this {
    const r = GCWithScope();

    let origin: Point;
    let direction: Point;

    if (typeof inputPlane === "string") {
      const plane = r(createNamedPlane(inputPlane, inputOrigin));
      origin = plane.origin;
      direction = plane.zDir;
    } else if (inputPlane instanceof Plane) {
      origin = inputOrigin || inputPlane.origin;
      direction = inputPlane.zDir;
    } else {
      origin = inputOrigin || [0, 0, 0];
      direction = inputPlane;
    }

    const mirrorAxis = r(makeAx2(origin, direction));
    this.wrapped.SetMirror_3(mirrorAxis);

    return this;
  }

  scale(center: Point, scale: number): this {
    const pnt = asPnt(center);
    this.wrapped.SetScale(pnt, scale);
    pnt.delete();
    return this;
  }

  coordSystemChange(fromSystem: CoordSystem, toSystem: CoordSystem): this {
    const r = GCWithScope();
    const fromAx = r(
      fromSystem === "reference"
        ? new this.oc.gp_Ax3_1()
        : makeAx3(fromSystem.origin, fromSystem.zDir, fromSystem.xDir)
    );

    const toAx = r(
      toSystem === "reference"
        ? new this.oc.gp_Ax3_1()
        : makeAx3(toSystem.origin, toSystem.zDir, toSystem.xDir)
    );
    this.wrapped.SetTransformation_1(fromAx, toAx);
    return this;
  }

  transformPoint(point: Point): gp_Pnt {
    const pnt = asPnt(point);
    const newPoint = pnt.Transformed(this.wrapped);
    pnt.delete();
    return newPoint;
  }

  transform(shape: TopoDS_Shape): TopoDS_Shape {
    const transformer = new this.oc.BRepBuilderAPI_Transform_2(
      shape,
      this.wrapped,
      true
    );
    return transformer.ModifiedShape(shape);
  }
}

export class Plane {
  oc: OpenCascadeInstance;

  xDir: Vector;
  yDir: Vector;
  zDir: Vector;

  // @ts-expect-error initialised indirectly
  private _origin: Vector;
  // @ts-expect-error initialised indirectly
  private localToGlobal: Transformation;
  // @ts-expect-error initialised indirectly
  private globalToLocal: Transformation;

  constructor(
    origin: Point,
    xDirection: Point | null = null,
    normal: Point = [0, 0, 1]
  ) {
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
    this.localToGlobal.delete();
    this.xDir.delete();
    this.yDir.delete();
    this.zDir.delete();
    this._origin.delete();
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
    this.globalToLocal = new Transformation();
    this.globalToLocal.coordSystemChange("reference", {
      origin: this.origin,
      zDir: this.zDir,
      xDir: this.xDir,
    });

    this.localToGlobal = new Transformation();
    this.localToGlobal.coordSystemChange(
      {
        origin: this.origin,
        zDir: this.zDir,
        xDir: this.xDir,
      },
      "reference"
    );
  }

  setOrigin2d(x: number, y: number): void {
    this.origin = this.toWorldCoords([x, y]);
  }

  toLocalCoords(vec: Vector): Vector {
    const pnt = this.globalToLocal.transformPoint(vec);
    const newVec = new Vector(pnt);
    pnt.delete();
    return newVec;
  }

  toWorldCoords(v: Point): Vector {
    const pnt = this.localToGlobal.transformPoint(v);
    const newVec = new Vector(pnt);
    pnt.delete();
    return newVec;
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
