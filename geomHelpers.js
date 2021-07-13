import { Matrix, Plane, Vector } from "./geom.js";
import { getOC } from "./oclib.js";

export const makeMirrorMatrix = ({ position, normal }) => {
  const oc = getOC();
  const mirrorAxis = new oc.gp_Ax2_3(position.toPnt(), normal.toDir());
  const aTrsf = new oc.gp_Trsf_1();
  aTrsf.SetMirror_3(mirrorAxis);
  mirrorAxis.delete();

  return new Matrix(new oc.gp_GTrsf_2(aTrsf));
};

export const makePlaneFromFace = (face, originOnSurface = [0, 0]) => {
  const originPoint = face.pointOnSurface(...originOnSurface);
  const normal = face.normalAt(originPoint);
  const v = new Vector(0, 0, 1);
  let xd = v.cross(normal);
  if (xd.Length < 1e-8) {
    xd.delete();
    xd = new Vector(1, 0, 0);
  }

  v.delete();
  return new Plane(originPoint, xd, normal);
};
