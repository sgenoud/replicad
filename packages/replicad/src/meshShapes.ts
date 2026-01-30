import {
  BoundingBox,
  Plane,
  PlaneName,
  Point,
  Transformation,
  Vector,
} from "./geom.js";
import { WrappingObj } from "./register.js";
import type { Shape3DLike } from "./shapeInterfaces.js";
import { getManifold, ManifoldInstance, ManifoldVec3 } from "./manifoldlib.js";

const asVec3 = (v: Point): ManifoldVec3 => {
  const vec = new Vector(v);
  const res: ManifoldVec3 = [vec.x, vec.y, vec.z];
  return res;
};

const manifoldTransformFromTransformation = (
  transform: Transformation
): number[] => {
  const origin = transform.transformPoint([0, 0, 0]);
  const xPoint = transform.transformPoint([1, 0, 0]);
  const yPoint = transform.transformPoint([0, 1, 0]);
  const zPoint = transform.transformPoint([0, 0, 1]);

  const o = [origin.X(), origin.Y(), origin.Z()];
  const x = [xPoint.X() - o[0], xPoint.Y() - o[1], xPoint.Z() - o[2]];
  const y = [yPoint.X() - o[0], yPoint.Y() - o[1], yPoint.Z() - o[2]];
  const z = [zPoint.X() - o[0], zPoint.Y() - o[1], zPoint.Z() - o[2]];

  origin.delete();
  xPoint.delete();
  yPoint.delete();
  zPoint.delete();

  return [
    x[0],
    y[0],
    z[0],
    o[0],
    x[1],
    y[1],
    z[1],
    o[1],
    x[2],
    y[2],
    z[2],
    o[2],
  ];
};

const applyTransformation = (
  shape: ManifoldInstance,
  transform: Transformation
): ManifoldInstance => {
  const manifoldTransform = manifoldTransformFromTransformation(transform);
  return (shape as any).transform(manifoldTransform);
};

export interface MeshShapeMesh {
  vertices: number[];
  triangles: number[];
  normals: number[];
  vertProperties: number[];
  numProp: number;
}

export class MeshShape
  extends WrappingObj<ManifoldInstance>
  implements Shape3DLike<MeshShape, MeshShapeMesh, MeshShape, number>
{
  constructor(manifoldShape: ManifoldInstance) {
    super(manifoldShape);
  }

  clone(): MeshShape {
    const mesh = this.wrapped.getMesh();
    const manifold = getManifold();
    const copy = new manifold.Manifold(mesh);
    return new MeshShape(copy);
  }

  fuse(other: MeshShape, _options?: any): MeshShape {
    const newShape = this.wrapped.add(other.wrapped);
    return new MeshShape(newShape);
  }

  cut(other: MeshShape, _options?: any): MeshShape {
    const newShape = this.wrapped.subtract(other.wrapped);
    return new MeshShape(newShape);
  }

  intersect(other: MeshShape): MeshShape {
    const newShape = this.wrapped.intersect(other.wrapped);
    return new MeshShape(newShape);
  }

  translate(xDist: number, yDist: number, zDist: number): MeshShape;
  translate(vector: Point): MeshShape;
  translate(vectorOrxDist: Point | number, yDist = 0, zDist = 0): MeshShape {
    const translation: ManifoldVec3 =
      typeof vectorOrxDist === "number"
        ? [vectorOrxDist, yDist, zDist]
        : asVec3(vectorOrxDist);
    const newShape = this.wrapped.translate(translation);
    return new MeshShape(newShape);
  }

  translateX(distance: number): MeshShape {
    return this.translate([distance, 0, 0]);
  }

  translateY(distance: number): MeshShape {
    return this.translate([0, distance, 0]);
  }

  translateZ(distance: number): MeshShape {
    return this.translate([0, 0, distance]);
  }

  rotate(angle: number, position?: Point, direction?: Point): MeshShape;
  rotate(vector: Point): MeshShape;
  rotate(
    angleOrVector: Point | number,
    position: Point = [0, 0, 0],
    direction: Point = [0, 0, 1]
  ): MeshShape {
    if (typeof angleOrVector !== "number") {
      const newShape = this.wrapped.rotate(asVec3(angleOrVector));
      return new MeshShape(newShape);
    }

    const transform = new Transformation();
    transform.rotate(angleOrVector, position, direction);
    const newShape = applyTransformation(this.wrapped, transform);
    return new MeshShape(newShape);
  }

  scale(scale: number, center?: Point): MeshShape {
    const transform = new Transformation();
    transform.scale(center ?? [0, 0, 0], scale);
    const newShape = applyTransformation(this.wrapped, transform);
    return new MeshShape(newShape);
  }

  mirror(inputPlane?: Plane | PlaneName | Point, origin?: Point): MeshShape {
    const transform = new Transformation();
    transform.mirror(inputPlane, origin);
    const newShape = applyTransformation(this.wrapped, transform);
    return new MeshShape(newShape);
  }

  simplify(tolerance?: number): MeshShape {
    const newShape = this.wrapped.simplify(tolerance);
    return new MeshShape(newShape);
  }

  refine(n: number): MeshShape {
    return new MeshShape(this.wrapped.refine(n));
  }

  refineToLength(length: number): MeshShape {
    return new MeshShape(this.wrapped.refineToLength(length));
  }

  refineToTolerance(tolerance: number): MeshShape {
    return new MeshShape(this.wrapped.refineToTolerance(tolerance));
  }

  hull(): MeshShape {
    return new MeshShape(this.wrapped.hull());
  }

  asOriginal(): MeshShape {
    return new MeshShape(this.wrapped.asOriginal());
  }

  mesh(normalIdx?: number): MeshShapeMesh {
    const mesh = this.wrapped.getMesh(normalIdx);
    const numProp = mesh.numProp ?? 3;
    const vertProperties = Array.from(mesh.vertProperties);
    const triangles = Array.from(mesh.triVerts);
    const vertices: number[] = [];
    const numVert = mesh.numVert ?? Math.floor(vertProperties.length / numProp);
    const normalOffset =
      normalIdx !== undefined ? normalIdx : numProp >= 6 ? 3 : -1;

    const normals: number[] = [];
    for (let i = 0; i < numVert; i++) {
      const base = i * numProp;
      vertices.push(
        vertProperties[base],
        vertProperties[base + 1],
        vertProperties[base + 2]
      );
      if (normalOffset >= 0 && normalOffset + 2 < numProp) {
        normals.push(
          vertProperties[base + normalOffset],
          vertProperties[base + normalOffset + 1],
          vertProperties[base + normalOffset + 2]
        );
      }
    }
    return {
      vertices,
      triangles,
      normals,
      vertProperties,
      numProp,
    };
  }

  get boundingBox(): BoundingBox {
    const bbox = this.wrapped.boundingBox();
    return BoundingBox.fromBounds(
      [bbox.min[0], bbox.min[1], bbox.min[2]],
      [bbox.max[0], bbox.max[1], bbox.max[2]]
    );
  }

  volume(): number {
    return this.wrapped.volume();
  }

  surfaceArea(): number {
    return this.wrapped.surfaceArea();
  }

  numTri(): number {
    return this.wrapped.numTri();
  }

  numVert(): number {
    return this.wrapped.numVert();
  }

  numEdge(): number {
    return this.wrapped.numEdge();
  }

  get isEmpty(): boolean {
    return this.wrapped.isEmpty();
  }
}
