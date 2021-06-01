import { Edge, Face, Wire, Solid } from "./shapes";
import { asPnt, asDir } from "./geom";

export const makeLine = (oc, v1, v2) => {
  return new Edge(
    oc,
    new oc.BRepBuilderAPI_MakeEdge_3(v1.toPnt(), v2.toPnt()).Edge()
  );
};

export const makeThreePointArc = (oc, v1, v2, v3) => {
  const circleGeom = new oc.GC_MakeArcOfCircle_4(
    v1.toPnt(),
    v2.toPnt(),
    v3.toPnt()
  ).Value();

  const curve = new oc.Handle_Geom_Curve_2(circleGeom.get());
  return new Edge(oc, new oc.BRepBuilderAPI_MakeEdge_24(curve).Edge());
};

export const makeTangentArc = (oc, startPoint, startTgt, endPoint) => {
  const circleGeom = new oc.GC_MakeArcOfCircle_5(
    startPoint.toPnt(),
    startTgt.wrapped,
    endPoint.toPnt()
  ).Value();

  const curve = new oc.Handle_Geom_Curve_2(circleGeom.get());
  return new Edge(oc, new oc.BRepBuilderAPI_MakeEdge_24(curve).Edge());
};

export const assembleWire = (oc, listOfEdges) => {
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

  const wire = new Wire(oc, wireBuilder.Wire());
  wireBuilder.delete();
  return wire;
};

export const makeFace = (oc, wire) => {
  const faceBuilder = new oc.BRepBuilderAPI_MakeFace_15(wire.wrapped, false);
  const face = faceBuilder.Face();
  faceBuilder.delete();

  return new Face(oc, face);
};

export const makeCylinder = (oc, radius, height, location, direction) => {
  const axis = new oc.gp_Ax2_3(asPnt(oc, location), asDir(oc, direction));

  const cylinder = new oc.BRepPrimAPI_MakeCylinder_3(axis, radius, height);
  const solid = new Solid(oc, cylinder.Shape());
  axis.delete();
  cylinder.delete();
  return solid;
};

export const getBounds = (oc, shape) => {
  const bbox = new oc.Bnd_Box_1();
  oc.BRepBndLib.Add(shape.wrapped, bbox, true);

  return {
    cornerMin: new Vector(oc, bbox.CornerMin()),
    cornerMax: new Vector(oc, bbox.CornerMax()),
  };
};
