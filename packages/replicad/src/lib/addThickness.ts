import { getOC } from "./oclib";
import {
  Solid,
  cast,
  downcast,
  Face,
  Shape3D,
  isShape3D,
  Wire,
  Edge,
} from "./shapes";
import { makeLine, makeHelix, assembleWire, makeVertex } from "./shapeHelpers";
import { localGC } from "./register";
import { Vector, makeAx1, Point } from "./geom";
import { DEG2RAD } from "./constants";
import {
  Handle_Law_Function,
  Law_Linear,
  Law_S,
  TopoDS_Shape,
} from "../wasm/cadeau_single";

export const basicFaceExtrusion = (face: Face, extrusionVec: Vector): Solid => {
  const oc = getOC();
  const solidBuilder = new oc.BRepPrimAPI_MakePrism_1(
    face.wrapped,
    extrusionVec.wrapped,
    false,
    true
  );
  const solid = new Solid(downcast(solidBuilder.Shape()));
  solidBuilder.delete();
  return solid;
};

export const revolution = (
  face: Face,
  center: Point = [0, 0, 0],
  direction: Point = [0, 0, 1],
  angle = 360
): Shape3D => {
  const oc = getOC();
  const ax = makeAx1(center, direction);

  const revolBuilder = new oc.BRepPrimAPI_MakeRevol_1(
    face.wrapped,
    ax,
    angle * DEG2RAD,
    false
  );

  const shape = cast(revolBuilder.Shape());
  ax.delete();
  revolBuilder.delete();

  if (!isShape3D(shape)) throw new Error("Could not revolve to a 3d shape");
  return shape;
};

export interface GenericSweepConfig {
  frenet?: boolean;
  auxiliarySpine?: Wire | Edge;
  law?: null | Handle_Law_Function;
  transitionMode?: "right" | "transformed" | "round";
  withContact?: boolean;
  support?: TopoDS_Shape;
  forceProfileSpineOthogonality?: boolean;
}

export const genericSweep = (
  wire: Wire,
  spine: Wire,
  {
    frenet = false,
    auxiliarySpine,
    law = null,
    transitionMode = "right",
    withContact,
    support,
    forceProfileSpineOthogonality,
  }: GenericSweepConfig = {}
): Shape3D => {
  const oc = getOC();
  const withCorrection =
    transitionMode === "round" ? true : !!forceProfileSpineOthogonality;
  const sweepBuilder = new oc.BRepOffsetAPI_MakePipeShell(spine.wrapped);

  if (transitionMode) {
    const mode = {
      transformed: oc.BRepBuilderAPI_TransitionMode.BRepBuilderAPI_Transformed,
      round: oc.BRepBuilderAPI_TransitionMode.BRepBuilderAPI_RoundCorner,
      right: oc.BRepBuilderAPI_TransitionMode.BRepBuilderAPI_RightCorner,
    }[transitionMode] as any;
    if (mode) sweepBuilder.SetTransitionMode(mode);
  }

  if (support) {
    sweepBuilder.SetMode_4(support);
  } else if (frenet) {
    sweepBuilder.SetMode_1(frenet);
  }
  if (auxiliarySpine) {
    sweepBuilder.SetMode_5(
      auxiliarySpine.wrapped,
      false,
      oc.BRepFill_TypeOfContact.BRepFill_NoContact as any
    );
  }

  if (!law) sweepBuilder.Add_1(wire.wrapped, !!withContact, withCorrection);
  else sweepBuilder.SetLaw_1(wire.wrapped, law, !!withContact, withCorrection);

  sweepBuilder.Build();
  sweepBuilder.MakeSolid();
  const shape = cast(sweepBuilder.Shape());
  sweepBuilder.delete();
  if (!isShape3D(shape)) throw new Error("Could not sweep to a 3d shape");
  return shape;
};

export interface ExtrusionProfile {
  profile?: "s-curve" | "linear";
  endFactor?: number;
}

const buildLawFromProfile = (
  extrusionLength: number,
  { profile, endFactor }: ExtrusionProfile
): Handle_Law_Function => {
  let law: Law_S | Law_Linear;
  const oc = getOC();

  if (profile === "s-curve") {
    law = new oc.Law_S();
    law.Set_1(0, 1, extrusionLength, endFactor);
  } else if (profile === "linear") {
    law = new oc.Law_Linear();
    law.Set(0, 1, extrusionLength, endFactor);
  } else {
    throw new Error("Could not generate a law function");
  }

  // This is an API compatibility issue
  // We might want to fix this in a way or another
  return law.Trim(0, extrusionLength, 1e-6);
};

export const supportExtrude = (
  wire: Wire,
  center: Point,
  normal: Point,
  support: TopoDS_Shape
): Shape3D => {
  const [r, gc] = localGC();

  const centerVec = r(new Vector(center));
  const normalVec = r(new Vector(normal));

  const mainSpineEdge = r(makeLine(centerVec, r(centerVec.add(normalVec))));
  const spine = r(assembleWire([mainSpineEdge]));

  const shape = genericSweep(wire, spine, { support });
  gc();

  return shape;
};

export const complexExtrude = (
  wire: Wire,
  center: Point,
  normal: Point,
  profileShape?: ExtrusionProfile
): Shape3D => {
  const [r, gc] = localGC();

  const centerVec = r(new Vector(center));
  const normalVec = r(new Vector(normal));

  const mainSpineEdge = r(makeLine(centerVec, r(centerVec.add(normalVec))));
  const spine = r(assembleWire([mainSpineEdge]));

  const law = profileShape
    ? buildLawFromProfile(normalVec.Length, profileShape)
    : null;

  const shape = genericSweep(wire, spine, { law });
  gc();

  return shape;
};

export const twistExtrude = (
  wire: Wire,
  angleDegrees: number,
  center: Point,
  normal: Point,
  profileShape?: ExtrusionProfile
): Shape3D => {
  const [r, gc] = localGC();

  const centerVec = r(new Vector(center));
  const normalVec = r(new Vector(normal));

  const mainSpineEdge = r(makeLine(centerVec, r(centerVec.add(normalVec))));
  const spine = r(assembleWire([mainSpineEdge]));

  const pitch = (360.0 / angleDegrees) * normalVec.Length;
  const radius = 1;

  const auxiliarySpine = r(
    makeHelix(pitch, normalVec.Length, radius, center, normal)
  );

  const law = profileShape
    ? buildLawFromProfile(normalVec.Length, profileShape)
    : null;

  const shape = genericSweep(wire, spine, { auxiliarySpine, law });
  gc();

  return shape;
};
export interface LoftConfig {
  ruled?: boolean;
  startPoint?: Point;
  endPoint?: Point;
}

export const loft = (
  wires: Wire[],
  { ruled = true, startPoint, endPoint }: LoftConfig = {}
): Shape3D => {
  const oc = getOC();
  const [r, gc] = localGC();

  const loftBuilder = r(new oc.BRepOffsetAPI_ThruSections(true, ruled, 1e-6));

  if (startPoint) {
    loftBuilder.AddVertex(r(makeVertex(startPoint)).wrapped);
  }
  wires.forEach((w) => loftBuilder.AddWire(w.wrapped));
  if (endPoint) {
    loftBuilder.AddVertex(r(makeVertex(endPoint)).wrapped);
  }

  loftBuilder.Build();

  const shape = cast(loftBuilder.Shape());
  gc();

  if (!isShape3D(shape)) throw new Error("Could not loft to a 3d shape");
  return shape;
};
