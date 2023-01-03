import { gp_Ax2d, gp_Dir2d, gp_Pnt2d, gp_Vec2d } from "replicad-opencascadejs";
import { getOC } from "../oclib";
import { localGC } from "../register";
import { Point2D } from "./definitions";

export const pnt = ([x, y]: Point2D): gp_Pnt2d => {
  const oc = getOC();
  return new oc.gp_Pnt2d_3(x, y);
};

export const direction2d = ([x, y]: Point2D): gp_Dir2d => {
  const oc = getOC();
  return new oc.gp_Dir2d_4(x, y);
};

export const vec = ([x, y]: Point2D): gp_Vec2d => {
  const oc = getOC();
  return new oc.gp_Vec2d_4(x, y);
};

export const axis2d = (point: Point2D, direction: Point2D): gp_Ax2d => {
  const oc = getOC();
  const [r, gc] = localGC();
  const axis = new oc.gp_Ax2d_2(r(pnt(point)), r(direction2d(direction)));
  gc();
  return axis;
};
