import { Plane, PlaneName, Point, Transformation, Vector } from "./geom";
import { Face } from "./shapes";
import { Point2D } from "./lib2d";
import { TopoDS_Shape } from "../wasm/cadeau_single";

export const makePlaneFromFace = (
  face: Face,
  originOnSurface: Point2D = [0, 0]
): Plane => {
  const originPoint = face.pointOnSurface(...originOnSurface);
  const normal = face.normalAt(originPoint);
  const v = new Vector([0, 0, 1]);
  let xd = v.cross(normal);
  if (xd.Length < 1e-8) {
    xd.delete();
    xd = new Vector([1, 0, 0]);
  }

  v.delete();
  return new Plane(originPoint, xd, normal);
};

export function rotate(
  shape: TopoDS_Shape,
  angle: number,
  position: Point = [0, 0, 0],
  direction: Point = [0, 0, 1]
): TopoDS_Shape {
  const transformation = new Transformation();
  transformation.rotate(angle, position, direction);
  const newShape = transformation.transform(shape);
  transformation.delete();
  return newShape;
}

export function translate(shape: TopoDS_Shape, vector: Point): TopoDS_Shape {
  const transformation = new Transformation();
  transformation.translate(vector);
  const newShape = transformation.transform(shape);
  transformation.delete();
  return newShape;
}

export function mirror(
  shape: TopoDS_Shape,
  inputPlane: Plane | PlaneName | Point,
  origin: Point
): TopoDS_Shape {
  const transformation = new Transformation();
  transformation.mirror(inputPlane, origin);
  const newShape = transformation.transform(shape);
  transformation.delete();
  return newShape;
}

export function scale(
  shape: TopoDS_Shape,
  center: Point,
  scale: number
): TopoDS_Shape {
  const transformation = new Transformation();
  transformation.scale(center, scale);
  const newShape = transformation.transform(shape);
  transformation.delete();
  return newShape;
}
