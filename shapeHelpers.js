import { Edge, Face, Wire, Solid } from "./shapes";
import { asPnt, asDir } from "./geom";
import { getOC } from "./oclib.js";

export const makeLine = (v1, v2) => {
  const oc = getOC();
  return new Edge(
    new oc.BRepBuilderAPI_MakeEdge_3(v1.toPnt(), v2.toPnt()).Edge()
  );
};

export const makeThreePointArc = (v1, v2, v3) => {
  const oc = getOC();
  const circleGeom = new oc.GC_MakeArcOfCircle_4(
    v1.toPnt(),
    v2.toPnt(),
    v3.toPnt()
  ).Value();

  const curve = new oc.Handle_Geom_Curve_2(circleGeom.get());
  return new Edge(new oc.BRepBuilderAPI_MakeEdge_24(curve).Edge());
};

export const makeTangentArc = (startPoint, startTgt, endPoint) => {
  const oc = getOC();
  const circleGeom = new oc.GC_MakeArcOfCircle_5(
    startPoint.toPnt(),
    startTgt.wrapped,
    endPoint.toPnt()
  ).Value();

  const curve = new oc.Handle_Geom_Curve_2(circleGeom.get());
  return new Edge(new oc.BRepBuilderAPI_MakeEdge_24(curve).Edge());
};

export const assembleWire = (listOfEdges) => {
  const oc = getOC();
  const wireBuilder = new oc.BRepBuilderAPI_MakeWire_1();
  listOfEdges.forEach((e) => {
    if (e instanceof Edge) {
      wireBuilder.Add_1(e.wrapped);
    }
    if (e instanceof Wire) {
      wireBuilder.Add_2(e.wrapped);
    }
  });

  wireBuilder.Build();

  const wire = new Wire(wireBuilder.Wire());
  wireBuilder.delete();
  return wire;
};

export const makeFace = (wire) => {
  const oc = getOC();
  const faceBuilder = new oc.BRepBuilderAPI_MakeFace_15(wire.wrapped, false);
  const face = faceBuilder.Face();
  faceBuilder.delete();

  return new Face(face);
};

export const makeCylinder = (radius, height, location, direction) => {
  const oc = getOC();
  const axis = new oc.gp_Ax2_3(asPnt(location), asDir(direction));

  const cylinder = new oc.BRepPrimAPI_MakeCylinder_3(axis, radius, height);
  const solid = new Solid(cylinder.Shape());
  axis.delete();
  cylinder.delete();
  return solid;
};

export const getBounds = (shape) => {
  const oc = getOC();
  const bbox = new oc.Bnd_Box_1();
  oc.BRepBndLib.Add(shape.wrapped, bbox, true);

  return {
    cornerMin: new Vector(bbox.CornerMin()),
    cornerMax: new Vector(bbox.CornerMax()),
  };
};
