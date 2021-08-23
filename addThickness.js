import { getOC } from "./oclib";
import { Solid, cast, downcast } from "./shapes";
import { makeLine, makeHelix, assembleWire } from "./shapeHelpers";
import { localGC } from "./register";
import { Vector } from "./geom";

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

export const shapedExtrude = (wire, spine, { auxiliarySpine, law = null }) => {
  const oc = getOC();
  const extrudeBuilder = new oc.BRepOffsetAPI_MakePipeShell(spine.wrapped);
  if (!law) extrudeBuilder.Add_1(wire.wrapped, false, false);
  else extrudeBuilder.SetLaw_1(wire.wrapped, law, false, false);
  if (auxiliarySpine) {
    extrudeBuilder.SetMode_5(
      auxiliarySpine.wrapped,
      false,
      oc.BRepFill_TypeOfContact.BRepFill_NoContact
    );
  }
  extrudeBuilder.Build();
  extrudeBuilder.MakeSolid();
  const shape = cast(extrudeBuilder.Shape());
  extrudeBuilder.delete();
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

  const shape = shapedExtrude(wire, spine, { law });
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

  const shape = shapedExtrude(wire, spine, { auxiliarySpine, law });
  gc();

  return shape;
};
