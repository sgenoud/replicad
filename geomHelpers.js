import { Matrix } from "./geom.js";

export const makeMirrorMatrix = (oc, { position, normal }) => {
  const mirrorAxis = new oc.gp_Ax2_3(position.toPnt(), normal.toDir());
  const aTrsf = new oc.gp_Trsf_1();
  aTrsf.SetMirror_3(mirrorAxis);
  mirrorAxis.delete();

  return new Matrix(oc, new oc.gp_GTrsf_2(aTrsf));
};
