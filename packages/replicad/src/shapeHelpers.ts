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
import { asPnt, makeAx3, makeAx2, Point, Vector, makeAx1 } from "./geom";
import { getOC } from "./oclib.js";
import { GCWithScope, localGC, WrappingObj } from "./register.js";
import zip from "./utils/zip";
import {
  GeomAPI_PointsToBSpline,
  gp_GTrsf,
  gp_Pnt,
  TColgp_Array2OfPnt,
} from "replicad-opencascadejs";

export const makeLine = (v1: Point, v2: Point): Edge => {
  const oc = getOC();
  return new Edge(
    new oc.BRepBuilderAPI_MakeEdge(asPnt(v1), asPnt(v2)).Edge()
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

  const circleGp = r(new oc.gp_Circ(ax, radius));
  const edgeMaker = r(new oc.BRepBuilderAPI_MakeEdge(circleGp));
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
  const ellipseGp = r(new oc.gp_Elips(ax, majorRadius, minorRadius));
  const edgeMaker = r(new oc.BRepBuilderAPI_MakeEdge(ellipseGp));
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
): Wire => {
  const oc = getOC();
  const [r, gc] = localGC();
  let myDir = 2 * Math.PI;
  if (lefthand) {
    myDir = -2 * Math.PI;
  }

  const geomLine = r(
    new oc.Geom2d_Line(
      r(new oc.gp_Pnt2d(0.0, 0.0)),
      r(new oc.gp_Dir2d(myDir, pitch))
    )
  );

  // 3. put it together into a wire
  const nTurns = height / pitch;
  const uStart = geomLine.Value(0.0);
  const uStop = geomLine.Value(
    nTurns * Math.sqrt((2 * Math.PI) ** 2 + pitch ** 2)
  );
  const geomSeg = r(new oc.GCE2d_MakeSegment(uStart, uStop));

  // We do not GC this surface (or it can break for some reason)
  const geomSurf = new oc.Geom_CylindricalSurface(
    r(makeAx3(center, dir)),
    radius
  );

  const e = r(
    new oc.BRepBuilderAPI_MakeEdge(
      r(geomSeg.Value()),
      r(geomSurf)
    )
  ).Edge();

  // 4. Convert to wire and fix building 3d geom from 2d geom
  const w = r(new oc.BRepBuilderAPI_MakeWire(e)).Wire();
  oc.BRepLib.BuildCurves3d(w);

  gc();

  return new Wire(w);
};

export const makeThreePointArc = (v1: Point, v2: Point, v3: Point): Edge => {
  const oc = getOC();
  const circleGeom = new oc.GC_MakeArcOfCircle(
    asPnt(v1),
    asPnt(v2),
    asPnt(v3)
  ).Value();

  const curve = circleGeom;
  return new Edge(new oc.BRepBuilderAPI_MakeEdge(curve).Edge());
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

  const ellipseGp = r(new oc.gp_Elips(ax, majorRadius, minorRadius));
  const edgeMaker = r(
    new oc.BRepBuilderAPI_MakeEdge(ellipseGp, startAngle, endAngle)
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

  const pnts = r(new oc.TColgp_Array1OfPnt(1, points.length));

  points.forEach((point, index) => {
    pnts.SetValue(index + 1, r(asPnt(point)));
  });

  let splineBuilder: GeomAPI_PointsToBSpline;

  if (smoothing) {
    splineBuilder = r(
      new oc.GeomAPI_PointsToBSpline(
        pnts,
        smoothing[0],
        smoothing[1],
        smoothing[2],
        degMax,
        oc.GeomAbs_Shape.GeomAbs_C2,
        tolerance
      )
    );
  } else {
    splineBuilder = r(
      new oc.GeomAPI_PointsToBSpline(
        pnts,
        degMin,
        degMax,
        oc.GeomAbs_Shape.GeomAbs_C2,
        tolerance
      )
    );
  }

  if (!splineBuilder.IsDone()) {
    gc();
    throw new Error("B-spline approximation failed");
  }

  const splineGeom = r(splineBuilder.Curve());

  const curve = r(splineGeom);
  const edge = new Edge(new oc.BRepBuilderAPI_MakeEdge(curve).Edge());
  gc();
  return edge;
};

export const makeBezierCurve = (points: Point[]): Edge => {
  const oc = getOC();
  const arrayOfPoints = new oc.TColgp_Array1OfPnt(1, points.length);
  points.forEach((p, i) => {
    arrayOfPoints.SetValue(i + 1, asPnt(p));
  });
  const bezCurve = new oc.Geom_BezierCurve(arrayOfPoints);

  const curve = bezCurve;
  return new Edge(new oc.BRepBuilderAPI_MakeEdge(curve).Edge());
};

export const makeTangentArc = (
  startPoint: Point,
  startTgt: Point,
  endPoint: Point
): Edge => {
  const oc = getOC();
  const [r, gc] = localGC();
  const circleGeom = r(
    new oc.GC_MakeArcOfCircle(
      r(asPnt(startPoint)),
      new Vector(startTgt).wrapped,
      r(asPnt(endPoint))
    ).Value()
  );

  const curve = r(circleGeom);
  const edge = new Edge(r(new oc.BRepBuilderAPI_MakeEdge(curve)).Edge());
  gc();
  return edge;
};

/*
const assembleEdgesAsWire = (listOfEdges: (Edge)[]): Wire => {
    const edges


}
*/

export const assembleWire = (listOfEdges: (Edge | Wire)[]): Wire => {
  const oc = getOC();
  const wireBuilder = new oc.BRepBuilderAPI_MakeWire();
  listOfEdges.forEach((e) => {
    if (e instanceof Edge) {
      wireBuilder.Add(e.wrapped);
    }
    if (e instanceof Wire) {
      wireBuilder.Add(e.wrapped);
    }
  });

  const progress = new oc.Message_ProgressRange();
  wireBuilder.Build(progress);
  const res = wireBuilder.Error();
  if (res !== oc.BRepBuilderAPI_WireError.BRepBuilderAPI_WireDone) {
    const errorNames = new Map([
      [oc.BRepBuilderAPI_WireError.BRepBuilderAPI_EmptyWire, "empty wire"],
      [
        oc.BRepBuilderAPI_WireError.BRepBuilderAPI_NonManifoldWire,
        "non manifold wire",
      ],
      [
        oc.BRepBuilderAPI_WireError.BRepBuilderAPI_DisconnectedWire,
        "disconnected wire",
      ],
    ]);
    throw new Error(
      `Failed to build the wire, ${errorNames.get(res) || "unknown error"}`
    );
  }

  const wire = new Wire(wireBuilder.Wire());
  wireBuilder.delete();
  progress.delete();
  return wire;
};

export const makeFace = (wire: Wire, holes?: Wire[]): Face => {
  const oc = getOC();
  const faceBuilder = new oc.BRepBuilderAPI_MakeFace(wire.wrapped, false);
  holes?.forEach((hole) => {
    faceBuilder.Add(hole.wrapped);
  });
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
  const surface = r(oc.BRep_Tool.Surface(originFace.wrapped));
  const faceBuilder = r(
    new oc.BRepBuilderAPI_MakeFace(surface, wire.wrapped, true)
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
    faceBuilder.Add(
      r(edge).wrapped,
      oc.GeomAbs_Shape.GeomAbs_C0,
      true
    );
  });

  const progress = r(new oc.Message_ProgressRange());
  faceBuilder.Build(progress);
  const newFace = cast(faceBuilder.Shape());

  gc();

  if (!(newFace instanceof Face)) {
    throw new Error("Failed to create a face");
  }
  return newFace;
};

/**
 * Creates a cylinder with the given radius and height.
 *
 * @category Solids
 */
export const makeCylinder = (
  radius: number,
  height: number,
  location: Point = [0, 0, 0],
  direction: Point = [0, 0, 1]
): Solid => {
  const oc = getOC();
  const axis = makeAx2(location, direction);

  const cylinder = new oc.BRepPrimAPI_MakeCylinder(axis, radius, height);
  const solid = new Solid(cylinder.Shape());
  axis.delete();
  cylinder.delete();
  return solid;
};

/**
 * Creates a sphere with the given radius.
 *
 * @category Solids
 */
export const makeSphere = (radius: number): Solid => {
  const oc = getOC();

  const sphereMaker = new oc.BRepPrimAPI_MakeSphere(radius);
  const sphere = new Solid(sphereMaker.Shape());
  sphereMaker.delete();
  return sphere;
};

class EllpsoidTransform extends WrappingObj<gp_GTrsf> {
  constructor(x: number, y: number, z: number) {
    const oc = getOC();
    const r = GCWithScope();

    const xyRatio = Math.sqrt((x * y) / z);
    const xzRatio = x / xyRatio;
    const yzRatio = y / xyRatio;

    const transform = new oc.gp_GTrsf();
    transform.SetAffinity(makeAx1([0, 0, 0], [0, 1, 0]), xzRatio);
    const xy = r(new oc.gp_GTrsf());
    xy.SetAffinity(makeAx1([0, 0, 0], [0, 0, 1]), xyRatio);
    const yz = r(new oc.gp_GTrsf());
    yz.SetAffinity(makeAx1([0, 0, 0], [1, 0, 0]), yzRatio);

    transform.Multiply(xy);
    transform.Multiply(yz);

    super(transform);
  }

  applyToPoint(p: gp_Pnt): gp_Pnt {
    const oc = getOC();
    const r = GCWithScope();

    const coords = r(p.XYZ());
    this.wrapped.Transforms(coords);
    return new oc.gp_Pnt(coords);
  }
}

function convertToJSArray(arrayOfPoints: TColgp_Array2OfPnt): gp_Pnt[][] {
  const newArray = [];

  for (let r = arrayOfPoints.LowerRow(); r <= arrayOfPoints.UpperRow(); r++) {
    const row: gp_Pnt[] = [];
    newArray.push(row);
    for (let c = arrayOfPoints.LowerCol(); c <= arrayOfPoints.UpperCol(); c++) {
      // @ts-expect-error Value binding missing from TColgp_Array2OfPnt d.ts
      const pnt: gp_Pnt = arrayOfPoints.Value(r, c);
      row.push(pnt);
    }
  }

  return newArray;
}

/**
 * Creates an ellipsoid with the given lengths of the axes.
 *
 * @category Solids
 */
export const makeEllipsoid = (
  aLength: number,
  bLength: number,
  cLength: number
): Solid => {
  const oc = getOC();
  const r = GCWithScope();

  const sphere = r(new oc.gp_Sphere());
  sphere.SetRadius(1);

  const sphericalSurface = r(new oc.Geom_SphericalSurface(sphere));

  const baseSurface = oc.GeomConvert.SurfaceToBSplineSurface(
    sphericalSurface.UReversed()
  );

  const poles = convertToJSArray(baseSurface.Poles());
  const transform = new EllpsoidTransform(aLength, bLength, cLength);

  poles.forEach((columns, r) => {
    columns.forEach((value, c) => {
      const newPoint = transform.applyToPoint(value);
      baseSurface.SetPole(r + 1, c + 1, newPoint);
    });
  });
  const shell = cast(
    r(new oc.BRepBuilderAPI_MakeShell(baseSurface.UReversed(), false)).Shell()
  ) as Shell;

  return makeSolid([shell]);
};

/**
 * Creates a box with the given corner points.
 *
 * @category Solids
 */
export const makeBox = (corner1: Point, corner2: Point): Solid => {
  const oc = getOC();
  const boxMaker = new oc.BRepPrimAPI_MakeBox(asPnt(corner1), asPnt(corner2));
  const box = new Solid(boxMaker.Solid());
  boxMaker.delete();
  return box;
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
  const progress = new oc.Message_ProgressRange();
  const offsetBuilder = new oc.BRepOffsetAPI_MakeOffsetShape();
  offsetBuilder.PerformByJoin(
    face.wrapped,
    offset,
    tolerance,
    oc.BRepOffset_Mode.BRepOffset_Skin,
    false,
    false,
    oc.GeomAbs_JoinType.GeomAbs_Arc,
    false,
    progress
  );

  const newShape = cast(downcast(offsetBuilder.Shape()));
  offsetBuilder.delete();
  progress.delete();

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

export const makeCompound = compoundShapes;

function _weld(facesOrShells: Array<Face | Shell>): AnyShape {
  const oc = getOC();
  const r = GCWithScope();

  const shellBuilder = r(
    new oc.BRepBuilderAPI_Sewing(1e-6, true, true, true, false)
  );

  facesOrShells.forEach(({ wrapped }) => {
    shellBuilder.Add(wrapped);
  });

  shellBuilder.Perform(r(new oc.Message_ProgressRange()));

  return cast(downcast(shellBuilder.SewedShape()));
}

/** Welds faces and shells into a single shell.
 *
 * @param facesOrShells - An array of faces and shells to be welded.
 * @param ignoreType - If true, the function will not check if the result is
 * a shell.
 * @returns A shell that contains all the faces and shells.
 * */
export function weldShellsAndFaces(
  facesOrShells: Array<Face | Shell>,
  ignoreType = false
): Shell {
  const shell = _weld(facesOrShells);

  if (!ignoreType && !(shell instanceof Shell))
    throw new Error("Could not make a solid of faces and shells");

  return shell as Shell;
}

/** Welds faces and shells into a single shell and then makes a solid.
 *
 * @param facesOrShells - An array of faces and shells to be welded.
 * @returns A solid that contains all the faces and shells.
 *
 * @category Solids
 **/
export function makeSolid(facesOrShells: Array<Face | Shell>): Solid {
  const r = GCWithScope();
  const oc = getOC();
  const shell = _weld(facesOrShells);
  const solid = cast(
    r(new oc.ShapeFix_Solid()).SolidFromShell(shell.wrapped)
  );

  if (!(solid instanceof Solid))
    throw new Error("Could not make a solid of faces and shells");

  return solid;
}

export const addHolesInFace = (face: Face, holes: Wire[]): Face => {
  const oc = getOC();
  const [r, gc] = localGC();

  const faceMaker = r(new oc.BRepBuilderAPI_MakeFace(face.wrapped));
  holes.forEach((wire) => {
    faceMaker.Add(wire.wrapped);
  });

  const builtFace = r(faceMaker.Face());

  const fixer = r(new oc.ShapeFix_Face(builtFace));
  fixer.FixOrientation();
  const newFace = fixer.Face();

  gc();
  return new Face(newFace);
};

export const makePolygon = (points: Point[]): Face => {
  if (points.length < 3)
    throw new Error("You need at least 3 points to make a polygon");
  const edges = zip([points, [...points.slice(1), points[0]]]).map(
    ([p1, p2]: any) => makeLine(p1, p2)
  );
  return makeFace(assembleWire(edges));
};
