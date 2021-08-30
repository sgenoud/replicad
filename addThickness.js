import { getOC } from "./oclib";
import { Solid, cast, downcast } from "./shapes";
import { makeLine, makeHelix, assembleWire, makeVertex } from "./shapeHelpers";
import { localGC } from "./register";
import { Vector, makeAx1 } from "./geom";
import { DEG2RAD } from "./constants";

export const basicFaceExtrusion = (face, extrusionVec) => {
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
  face,
  center = [0, 0, 0],
  direction = [0, 0, 1],
  angle = 360
) => {
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
  return shape;
};

export const genericSweep = (
  wire,
  spine,
  { frenet = false, auxiliarySpine, law = null } = {}
) => {
  const oc = getOC();
  const sweepBuilder = new oc.BRepOffsetAPI_MakePipeShell(spine.wrapped);
  if (!law) sweepBuilder.Add_1(wire.wrapped, false, false);
  else sweepBuilder.SetLaw_1(wire.wrapped, law, false, false);

  if (frenet) {
    sweepBuilder.SetMode_1(frenet);
  }
  if (auxiliarySpine) {
    sweepBuilder.SetMode_5(
      auxiliarySpine.wrapped,
      false,
      oc.BRepFill_TypeOfContact.BRepFill_NoContact
    );
  }
  sweepBuilder.Build();
  sweepBuilder.MakeSolid();
  const shape = cast(sweepBuilder.Shape());
  sweepBuilder.delete();
  return shape;
};

const buildLawFromProfile = (extrusionLength, { profile, endFactor }) => {
  let law;
  const oc = getOC();

  if (profile === "s-curve") {
    law = new oc.Law_S();
    law.Set_1(0, 1, extrusionLength, endFactor);
  }
  if (profile === "linear") {
    law = new oc.Law_Linear();
    law.Set(0, 1, extrusionLength, endFactor);
  }

  // This is an API compatibility issue
  // We might want to fix this in a way or another
  return law.Trim(0, extrusionLength, 1e-6);
};

export const complexExtrude = (wire, center, normal, profileShape) => {
  const [r, gc] = localGC();

  const centerVec = r(new Vector(center));
  const normalVec = r(new Vector(normal));

  const mainSpineEdge = r(makeLine(centerVec, r(centerVec.add(normalVec))));
  const spine = r(assembleWire([mainSpineEdge]));

  let law = profileShape
    ? buildLawFromProfile(normalVec.Length, profileShape)
    : null;

  const shape = genericSweep(wire, spine, { law });
  gc();

  return shape;
};

export const twistExtrude = (
  wire,
  angleDegrees,
  center,
  normal,
  profileShape
) => {
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

  let law = profileShape
    ? buildLawFromProfile(normalVec.Length, profileShape)
    : null;

  const shape = genericSweep(wire, spine, { auxiliarySpine, law });
  gc();

  return shape;
};

export const loft = (wires, { ruled = true, startPoint, endPoint } = {}) => {
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
  return shape;
};
