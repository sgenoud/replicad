import { getOC } from "./oclib";
import {
  Solid,
  cast,
  downcast,
  Face,
  Shape3D,
  isShape3D,
  isWire,
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
} from "replicad-opencascadejs";

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

function genericSweep(
  wire: Wire,
  spine: Wire,
  sweepConfig: GenericSweepConfig,
  shellMode: true
): [Shape3D, Wire, Wire];
function genericSweep(
  wire: Wire,
  spine: Wire,
  sweepConfig: GenericSweepConfig,
  shellMode?: false
): Shape3D;
function genericSweep(
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
  }: GenericSweepConfig = {},
  shellMode = false
): Shape3D | [Shape3D, Wire, Wire] {
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

  const progress = new oc.Message_ProgressRange_1();
  sweepBuilder.Build(progress);
  if (!shellMode) {
    sweepBuilder.MakeSolid();
  }
  const shape = cast(sweepBuilder.Shape());
  if (!isShape3D(shape)) throw new Error("Could not sweep to a 3d shape");

  if (shellMode) {
    const startWire = cast(sweepBuilder.FirstShape());
    const endWire = cast(sweepBuilder.LastShape());
    if (!isWire(startWire))
      throw new Error("Could not sweep with one start wire");
    if (!isWire(endWire)) throw new Error("Could not sweep with one end wire");
    sweepBuilder.delete();
    return [shape, startWire, endWire];
  }

  sweepBuilder.delete();
  progress.delete();
  return shape;
}

export { genericSweep };

export interface ExtrusionProfile {
  profile?: "s-curve" | "linear";
  endFactor?: number;
}

const buildLawFromProfile = (
  extrusionLength: number,
  { profile, endFactor = 1 }: ExtrusionProfile
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
  const centerVec = new Vector(center);
  const normalVec = new Vector(normal);

  const mainSpineEdge = makeLine(centerVec, centerVec.add(normalVec));
  const spine = assembleWire([mainSpineEdge]);

  return genericSweep(wire, spine, { support });
};

function complexExtrude(
  wire: Wire,
  center: Point,
  normal: Point,
  profileShape: ExtrusionProfile | undefined,
  shellMode: true
): [Shape3D, Wire, Wire];
function complexExtrude(
  wire: Wire,
  center: Point,
  normal: Point,
  profileShape?: ExtrusionProfile,
  shellMode?: false
): Shape3D;
function complexExtrude(
  wire: Wire,
  center: Point,
  normal: Point,
  profileShape?: ExtrusionProfile,
  shellMode = false
): Shape3D | [Shape3D, Wire, Wire] {
  const centerVec = new Vector(center);
  const normalVec = new Vector(normal);

  const mainSpineEdge = makeLine(centerVec, centerVec.add(normalVec));
  const spine = assembleWire([mainSpineEdge]);

  const law = profileShape
    ? buildLawFromProfile(normalVec.Length, profileShape)
    : null;

  // The ternary operator is here only to make typescript happy
  const shape = shellMode
    ? genericSweep(wire, spine, { law }, shellMode)
    : genericSweep(wire, spine, { law }, shellMode);

  return shape;
}

export { complexExtrude };

function twistExtrude(
  wire: Wire,
  angleDegrees: number,
  center: Point,
  normal: Point,
  profileShape?: ExtrusionProfile,
  shellMode?: false
): Shape3D;
function twistExtrude(
  wire: Wire,
  angleDegrees: number,
  center: Point,
  normal: Point,
  profileShape: ExtrusionProfile | undefined,
  shellMode: true
): [Shape3D, Wire, Wire];
function twistExtrude(
  wire: Wire,
  angleDegrees: number,
  center: Point,
  normal: Point,
  profileShape?: ExtrusionProfile,
  shellMode = false
): Shape3D | [Shape3D, Wire, Wire] {
  const centerVec = new Vector(center);
  const normalVec = new Vector(normal);

  const mainSpineEdge = makeLine(centerVec, centerVec.add(normalVec));
  const spine = assembleWire([mainSpineEdge]);

  const pitch = (360.0 / angleDegrees) * normalVec.Length;
  const radius = 1;

  const auxiliarySpine = makeHelix(
    pitch,
    normalVec.Length,
    radius,
    center,
    normal
  );

  const law = profileShape
    ? buildLawFromProfile(normalVec.Length, profileShape)
    : null;

  // The ternary operator is here only to make typescript happy
  const shape = shellMode
    ? genericSweep(wire, spine, { auxiliarySpine, law }, shellMode)
    : genericSweep(wire, spine, { auxiliarySpine, law }, shellMode);

  return shape;
}
export { twistExtrude };

export interface LoftConfig {
  ruled?: boolean;
  startPoint?: Point;
  endPoint?: Point;
}

export const loft = (
  wires: Wire[],
  { ruled = true, startPoint, endPoint }: LoftConfig = {},
  returnShell = false
): Shape3D => {
  const oc = getOC();
  const [r, gc] = localGC();

  const loftBuilder = r(
    new oc.BRepOffsetAPI_ThruSections(!returnShell, ruled, 1e-6)
  );

  if (startPoint) {
    loftBuilder.AddVertex(r(makeVertex(startPoint)).wrapped);
  }
  wires.forEach((w) => loftBuilder.AddWire(w.wrapped));
  if (endPoint) {
    loftBuilder.AddVertex(r(makeVertex(endPoint)).wrapped);
  }

  const progress = r(new oc.Message_ProgressRange_1());
  loftBuilder.Build(progress);
  const shape = cast(loftBuilder.Shape());
  gc();

  if (!isShape3D(shape)) throw new Error("Could not loft to a 3d shape");
  return shape;
};
