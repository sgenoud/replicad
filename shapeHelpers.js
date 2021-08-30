import { Edge, Face, Wire, Solid } from "./shapes";
import { asPnt, asDir, makeAx3, makeAx2 } from "./geom";
import { getOC } from "./oclib.js";
import { localGC } from "./register.js";

export const makeLine = (v1, v2) => {
  const oc = getOC();
  return new Edge(
    new oc.BRepBuilderAPI_MakeEdge_3(v1.toPnt(), v2.toPnt()).Edge()
  );
};

export const makeCircle = (radius, center = [0, 0, 0], normal = [0, 0, 1]) => {
  const oc = getOC();
  const [r, gc] = localGC();

  const ax = r(makeAx2(center, normal));

  const circleGp = r(new oc.gp_Circ_2(ax, radius));
  const edgeMaker = r(new oc.BRepBuilderAPI_MakeEdge_8(circleGp));
  const shape = new Edge(edgeMaker.Edge());
  gc();

  return shape;
};

export const makeHelix = (
  pitch,
  height,
  radius,
  center = [0, 0, 0],
  dir = [0, 0, 1],
  lefthand = false
) => {
  const oc = getOC();
  const [r, gc] = localGC();
  let myDir = 2 * Math.PI;
  if (lefthand) {
    myDir = -2 * Math.PI;
  }

  const geomLine = r(
    new oc.Geom2d_Line_3(
      r(new oc.gp_Pnt2d_3(0.0, 0.0)),
      r(new oc.gp_Dir2d_4(myDir, pitch))
    )
  );

  // 3. put it together into a wire
  const nTurns = height / pitch;
  const uStart = geomLine.Value(0.0);
  const uStop = geomLine.Value(
    nTurns * Math.sqrt((2 * Math.PI) ** 2 + pitch ** 2)
  );
  const geomSeg = r(new oc.GCE2d_MakeSegment_1(uStart, uStop));

  // We do not GC this surface (or it can break for some reason)
  const geomSurf = new oc.Geom_CylindricalSurface_1(
    r(makeAx3(center, dir)),
    radius
  );

  const e = r(
    new oc.BRepBuilderAPI_MakeEdge_30(
      r(new oc.Handle_Geom2d_Curve_2(geomSeg.Value().get())),
      r(new oc.Handle_Geom_Surface_2(geomSurf))
    )
  ).Edge();

  // 4. Convert to wire and fix building 3d geom from 2d geom
  const w = r(new oc.BRepBuilderAPI_MakeWire_2(e)).Wire();
  oc.BRepLib.BuildCurves3d_2(w);

  gc();

  return new Edge(w);
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

export const makeBezierCurve = (points) => {
  const oc = getOC();
  const arrayOfPoints = new oc.TColgp_Array1OfPnt_2(1, points.length);
  points.forEach((p, i) => {
    arrayOfPoints.SetValue(i + 1, p.toPnt());
  });
  const bezCurve = new oc.Geom_BezierCurve_1(arrayOfPoints);

  const curve = new oc.Handle_Geom_Curve_2(bezCurve);
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

export const makeVertex = (point) => {
  const oc = getOC();
  const pnt = asPnt(point);

  const vertexMaker = new oc.BRepBuilderAPI_MakeVertex(pnt);
  const vertex = vertexMaker.Vertex();
  vertexMaker.delete();

  return new Vertex(vertex);
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
