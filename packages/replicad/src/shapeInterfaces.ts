import type { BoundingBox, Plane, PlaneName, Point } from "./geom.js";

export interface Shape3DLike<
  ShapeT,
  MeshT,
  OtherT = ShapeT,
  MeshOptionsT = any
> {
  fuse(other: ShapeT, options?: any): ShapeT;
  cut(other: ShapeT, options?: any): ShapeT;
  intersect(other: OtherT): ShapeT;
  translate(xDist: number, yDist: number, zDist: number): ShapeT;
  translate(vector: Point): ShapeT;
  translateX(distance: number): ShapeT;
  translateY(distance: number): ShapeT;
  translateZ(distance: number): ShapeT;
  rotate(
    angle: number,
    position?: Point,
    direction?: Point
  ): ShapeT;
  scale(scale: number, center?: Point): ShapeT;
  mirror(inputPlane?: Plane | PlaneName | Point, origin?: Point): ShapeT;
  mesh(options?: MeshOptionsT): MeshT;
  readonly boundingBox: BoundingBox;
}
