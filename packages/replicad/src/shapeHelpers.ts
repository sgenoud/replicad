import {
  AnyShape,
  Edge,
  Face,
  Wire,
  Solid,
  Vertex,
  cast,
  downcast,
  Shape3D,
  isShape3D,
  Shell,
} from "./shapes";
import { asPnt, makeAx3, makeAx2, Point, asVec } from "./geom";
import { getOC } from "./oclib.js";
import { localGC } from "./register.js";
import { GeomAPI_PointsToBSpline } from "replicad-opencascadejs";

export const makeLine = (v1: Point, v2: Point): Edge => {
  const oc = getOC();
  return new Edge(
    new oc.BRepBuilderAPI_MakeEdge_3(asPnt(v1), asPnt(v2)).Edge()
  );
};

export const makeCircle = (
  radius: number,
  center: Point = [0, 0, 0],
  normal: Point = [0, 0, 1]
): Edge => {
  const oc = getOC();
  const [r, gc] = localGC();

  const ax = r(makeAx2(center, normal));

  const circleGp = r(new oc.gp_Circ_2(ax, radius));
  const edgeMaker = r(new oc.BRepBuilderAPI_MakeEdge_8(circleGp));
  const shape = new Edge(edgeMaker.Edge());
  gc();

  return shape;
};

export const makeEllipse = (
  majorRadius: number,
  minorRadius: number,
  center: Point = [0, 0, 0],
  normal: Point = [0, 0, 1],
  xDir?: Point
): Edge => {
  const oc = getOC();
  const [r, gc] = localGC();

  const ax = r(makeAx2(center, normal, xDir));

  if (minorRadius > majorRadius) {
    throw new Error("The minor radius must be smaller than the major one");
  }
  const ellipseGp = r(new oc.gp_Elips_2(ax, majorRadius, minorRadius));
  const edgeMaker = r(new oc.BRepBuilderAPI_MakeEdge_12(ellipseGp));
  const shape = new Edge(edgeMaker.Edge());
  gc();

  return shape;
};

export const makeHelix = (
  pitch: number,
  height: number,
  radius: number,
  center: Point = [0, 0, 0],
  dir: Point = [0, 0, 1],
  lefthand = false
): Edge => {
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

export const makeThreePointArc = (v1: Point, v2: Point, v3: Point): Edge => {
  const oc = getOC();
  const circleGeom = new oc.GC_MakeArcOfCircle_4(
    asPnt(v1),
    asPnt(v2),
    asPnt(v3)
  ).Value();

  const curve = new oc.Handle_Geom_Curve_2(circleGeom.get());
  return new Edge(new oc.BRepBuilderAPI_MakeEdge_24(curve).Edge());
};

export const makeEllipseArc = (
  majorRadius: number,
  minorRadius: number,
  startAngle: number,
  endAngle: number,
  center: Point = [0, 0, 0],
  normal: Point = [0, 0, 1],
  xDir?: Point
): Edge => {
  const oc = getOC();
  const [r, gc] = localGC();

  const ax = r(makeAx2(center, normal, xDir));
  if (minorRadius > majorRadius) {
    throw new Error("The minor radius must be smaller than the major one");
  }

  const ellipseGp = r(new oc.gp_Elips_2(ax, majorRadius, minorRadius));
  const edgeMaker = r(
    new oc.BRepBuilderAPI_MakeEdge_13(ellipseGp, startAngle, endAngle)
  );
  const shape = new Edge(edgeMaker.Edge());
  gc();

  return shape;
};

export interface BSplineApproximationConfig {
  tolerance?: number;
  degMax?: number;
  degMin?: number;
  smoothing?: null | [number, number, number];
}

export const makeBSplineApproximation = function makeBSplineApproximation(
  points: Point[],
  {
    tolerance = 1e-3,
    smoothing = null,
    degMax = 6,
    degMin = 1,
  }: BSplineApproximationConfig = {}
): Edge {
  const oc = getOC();
  const [r, gc] = localGC();

  const pnts = r(new oc.TColgp_Array1OfPnt_2(1, points.length));

  points.forEach((point, index) => {
    pnts.SetValue(index + 1, r(asPnt(point)));
  });

  let splineBuilder: GeomAPI_PointsToBSpline;

  if (smoothing) {
    splineBuilder = r(
      new oc.GeomAPI_PointsToBSpline_5(
        pnts,
        smoothing[0],
        smoothing[1],
        smoothing[2],
        degMax,
        oc.GeomAbs_Shape.GeomAbs_C2 as any,
        tolerance
      )
    );
  } else {
    splineBuilder = r(
      new oc.GeomAPI_PointsToBSpline_2(
        pnts,
        degMin,
        degMax,
        oc.GeomAbs_Shape.GeomAbs_C2 as any,
        tolerance
      )
    );
  }

  if (!splineBuilder.IsDone()) {
    gc();
    throw new Error("B-spline approximation failed");
  }

  const splineGeom = r(splineBuilder.Curve());

  const curve = r(new oc.Handle_Geom_Curve_2(splineGeom.get()));
  const edge = new Edge(new oc.BRepBuilderAPI_MakeEdge_24(curve).Edge());
  gc();
  return edge;
};

export const makeBezierCurve = (points: Point[]): Edge => {
  const oc = getOC();
  const arrayOfPoints = new oc.TColgp_Array1OfPnt_2(1, points.length);
  points.forEach((p, i) => {
    arrayOfPoints.SetValue(i + 1, asPnt(p));
  });
  const bezCurve = new oc.Geom_BezierCurve_1(arrayOfPoints);

  const curve = new oc.Handle_Geom_Curve_2(bezCurve);
  return new Edge(new oc.BRepBuilderAPI_MakeEdge_24(curve).Edge());
};

export const makeTangentArc = (
  startPoint: Point,
  startTgt: Point,
  endPoint: Point
): Edge => {
  const oc = getOC();
  const [r, gc] = localGC();
  const circleGeom = r(
    new oc.GC_MakeArcOfCircle_5(
      r(asPnt(startPoint)),
      r(asVec(startTgt)),
      r(asPnt(endPoint))
    ).Value()
  );

  const curve = r(new oc.Handle_Geom_Curve_2(circleGeom.get()));
  const edge = new Edge(r(new oc.BRepBuilderAPI_MakeEdge_24(curve)).Edge());
  gc();
  return edge;
};

export const assembleWire = (listOfEdges: (Edge | Wire)[]): Wire => {
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

export const makeFace = (wire: Wire): Face => {
  const oc = getOC();
  const faceBuilder = new oc.BRepBuilderAPI_MakeFace_15(wire.wrapped, false);
  if (!faceBuilder.IsDone()) {
    faceBuilder.delete();
    throw new Error("Failed to build the face. Your wire might be non planar.");
  }
  const face = faceBuilder.Face();
  faceBuilder.delete();

  return new Face(face);
};

export const makeNewFaceWithinFace = (originFace: Face, wire: Wire) => {
  const oc = getOC();
  const [r, gc] = localGC();
  const surface = r(oc.BRep_Tool.Surface_2(originFace.wrapped));
  const faceBuilder = r(
    new oc.BRepBuilderAPI_MakeFace_21(surface, wire.wrapped, true)
  );
  const face = faceBuilder.Face();
  gc();

  return new Face(face);
};

export const makeNonPlanarFace = (wire: Wire): Face => {
  const oc = getOC();
  const [r, gc] = localGC();

  const faceBuilder = r(
    new oc.BRepOffsetAPI_MakeFilling(
      3,
      15,
      2,
      false,
      1e-5,
      1e-4,
      1e-2,
      0.1,
      8,
      9
    )
  );
  wire.edges.forEach((edge) => {
    faceBuilder.Add_1(
      r(edge).wrapped,
      oc.GeomAbs_Shape.GeomAbs_C0 as any,
      true
    );
  });

  faceBuilder.Build();
  const newFace = cast(faceBuilder.Shape());

  gc();

  if (!(newFace instanceof Face)) {
    throw new Error("Failed to create a face");
  }
  return newFace;
};

export const makeCylinder = (
  radius: number,
  height: number,
  location: Point = [0, 0, 0],
  direction: Point = [0, 0, 1]
): Solid => {
  const oc = getOC();
  const axis = makeAx2(location, direction);

  const cylinder = new oc.BRepPrimAPI_MakeCylinder_3(axis, radius, height);
  const solid = new Solid(cylinder.Shape());
  axis.delete();
  cylinder.delete();
  return solid;
};

export const makeVertex = (point: Point): Vertex => {
  const oc = getOC();
  const pnt = asPnt(point);

  const vertexMaker = new oc.BRepBuilderAPI_MakeVertex(pnt);
  const vertex = vertexMaker.Vertex();
  vertexMaker.delete();

  return new Vertex(vertex);
};

export const makeOffset = (
  face: Face,
  offset: number,
  tolerance = 1e-6
): Shape3D => {
  const oc = getOC();
  const offsetBuilder = new oc.BRepOffsetAPI_MakeOffsetShape_2(
    face.wrapped,
    offset,
    tolerance,
    oc.BRepOffset_Mode.BRepOffset_Skin as any,
    false,
    false,
    oc.GeomAbs_JoinType.GeomAbs_Arc as any,
    false
  );

  const newShape = cast(downcast(offsetBuilder.Shape()));
  offsetBuilder.delete();

  if (!isShape3D(newShape)) throw new Error("Could not offset to a 3d shape");
  return newShape;
};

export const compoundShapes = (shapeArray: AnyShape[]): AnyShape => {
  const oc = getOC();
  const builder = new oc.TopoDS_Builder();
  const compound = new oc.TopoDS_Compound();
  builder.MakeCompound(compound);

  shapeArray.forEach((s) => {
    builder.Add(compound, s.wrapped);
    s.delete();
  });

  const newShape = cast(compound);
  return newShape;
};

export function makeSolid(facesOrShells: Array<Face | Shell>): Solid {
  const oc = getOC();
  const [r, gc] = localGC();
  const shellBuilder = r(
    new oc.BRepBuilderAPI_Sewing(1e-6, true, true, true, false)
  );

  facesOrShells.forEach(({ wrapped }) => {
    shellBuilder.Add(wrapped);
  });

  shellBuilder.Perform(r(new oc.Message_ProgressRange_1()));

  const shell = r(downcast(shellBuilder.SewedShape()));
  const solid = cast(r(new oc.ShapeFix_Solid_1()).SolidFromShell(shell));

  gc();
  if (!(solid instanceof Solid))
    throw new Error("Could not make a solid of faces and shells");

  return solid;
}
