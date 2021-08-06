import { WrappingObj } from "./register.js";
import { Vector, createNamedPlane, asDir, asPnt } from "./geom.js";
import { makeMirrorMatrix } from "./geomHelpers.js";
import { HASH_CODE_MAX, DEG2RAD } from "./constants.js";
import { getOC } from "./oclib.js";
import { Cleaner } from "./register.js";

const asTopo = (entity) => {
  const oc = getOC();
  return {
    vertex: oc.TopAbs_ShapeEnum.TopAbs_VERTEX,
    edge: oc.TopAbs_ShapeEnum.TopAbs_EDGE,
    wire: oc.TopAbs_ShapeEnum.TopAbs_WIRE,
    face: oc.TopAbs_ShapeEnum.TopAbs_FACE,
    shell: oc.TopAbs_ShapeEnum.TopAbs_SHELL,
    solid: oc.TopAbs_ShapeEnum.TopAbs_SOLID,
    solidCompound: oc.TopAbs_ShapeEnum.TopAbs_COMPSOLID,
    compound: oc.TopAbs_ShapeEnum.TopAbs_COMPOUND,
    shape: oc.TopAbs_ShapeEnum.TopAbs_SHAPE,
  }[entity];
};

export const iterTopo = function* iterTopo(shape, topo) {
  const oc = getOC();
  const explorer = new oc.TopExp_Explorer_2(
    shape,
    asTopo(topo),
    asTopo("shape")
  );
  const hashes = new Map();
  while (explorer.More()) {
    const item = explorer.Current();
    const hash = item.HashCode(HASH_CODE_MAX);
    if (!hashes.get(hash)) {
      hashes.set(hash, true);
      yield item;
    }
    explorer.Next();
  }
  explorer.Destroy();
};

export const shapeType = (shape) => {
  if (shape.IsNull()) throw new Error("This shape has not type, it is null");
  return shape.ShapeType();
};

export class Shape extends WrappingObj {
  constructor(ocShape) {
    super(ocShape);
  }

  clone() {
    return new this.constructor(downcast(this.wrapped));
  }

  get hashCode() {
    return this.wrapped.HashCode(HASH_CODE_MAX);
  }

  get isNull() {
    return this.wrapped.IsNull();
  }

  get isValid() {
    return this.oc.BRepCheck_Analyzer(this.wrapped).IsValid();
  }

  isSame(other) {
    return this.wrapped.IsSame(other.wrapped);
  }

  isEqual(other) {
    return this.wrapped.IsEqual(other.wrapped);
  }

  translate(vector) {
    const localVect = new Vector(vector);
    const T = new this.oc.gp_Trsf_1();
    T.SetTranslation_1(localVect.wrapped);
    const transformer = new this.oc.BRepBuilderAPI_Transform_2(
      this.wrapped,
      T,
      true
    );

    const newShape = cast(downcast(transformer.ModifiedShape(this.wrapped)));
    transformer.delete();
    T.delete();
    localVect.delete();
    this.delete();

    return newShape;
  }

  rotate(angle, position = [0, 0, 0], direction = [0, 0, 1]) {
    const dir = asDir(direction);
    const origin = asPnt(position);
    const axis = new this.oc.gp_Ax1_2(origin, dir);

    const T = new this.oc.gp_Trsf_1();
    T.SetRotation_1(axis, angle * DEG2RAD);
    const transformer = new this.oc.BRepBuilderAPI_Transform_2(
      this.wrapped,
      T,
      true
    );

    const newShape = cast(downcast(transformer.ModifiedShape(this.wrapped)));
    transformer.delete();
    T.delete();
    axis.delete();
    dir.delete();
    origin.delete();
    this.delete();

    return newShape;
  }

  mirror(inputPlane, origin) {
    const shouldClean = [];
    let plane = inputPlane;
    if (typeof plane === "string") {
      plane = createNamedPlane(inputPlane, origin);
      shouldClean.push(plane);
    }

    const mirror = makeMirrorMatrix({
      position: plane.origin,
      normal: plane.zDir,
    });
    shouldClean.push(mirror);

    const newShape = this.transformShape(mirror);

    shouldClean.forEach((s) => s.delete());
    this.delete();

    return newShape;
  }

  transformShape(matrix) {
    const transformer = new this.oc.BRepBuilderAPI_Transform_2(
      this.wrapped,
      matrix.wrapped.Trsf(),
      true
    );
    const newShape = cast(downcast(transformer.ModifiedShape(this.wrapped)));
    transformer.delete();
    return newShape;
  }

  _iterTopo(topo) {
    return iterTopo(this.wrapped, topo);
  }

  _listTopo(topo) {
    return Array.from(this._iterTopo(topo)).map((e) => {
      return downcast(e);
    });
  }

  get edges() {
    return this._listTopo("edge").map((e) => new Edge(e));
  }

  get faces() {
    return this._listTopo("face").map((e) => new Face(e));
  }

  get wires() {
    return this._listTopo("wire").map((e) => new Wire(e));
  }

  triangulation(index0 = 0) {
    const aLocation = new this.oc.TopLoc_Location_1();
    const triangulation = this.oc.BRep_Tool.Triangulation(
      this.wrapped,
      aLocation
    );

    if (triangulation.IsNull()) {
      aLocation.delete();
      triangulation.delete();

      return null;
    }

    const triangulatedFace = {
      vertices: [],
      trianglesIndexes: [],
      verticesNormals: [],
      number_of_triangles: 0,
    };

    const nodes = triangulation.get().Nodes();

    // write vertex buffer
    triangulatedFace.vertices = new Array(nodes.Length() * 3);
    for (let i = nodes.Lower(); i <= nodes.Upper(); i++) {
      const p = nodes.Value(i).Transformed(aLocation.Transformation());
      triangulatedFace.vertices[(i - 1) * 3 + 0] = p.X();
      triangulatedFace.vertices[(i - 1) * 3 + 1] = p.Y();
      triangulatedFace.vertices[(i - 1) * 3 + 2] = p.Z();
    }

    const normalsArray = new this.oc.TColgp_Array1OfDir_2(
      nodes.Lower(),
      nodes.Upper()
    );
    const pc = new this.oc.Poly_Connect_2(triangulation);
    this.oc.StdPrs_ToolTriangulatedShape.Normal(this.wrapped, pc, normalsArray);
    triangulatedFace.verticesNormals = new Array(normalsArray.Length() * 3);
    for (let i = normalsArray.Lower(); i <= normalsArray.Upper(); i++) {
      const d = normalsArray.Value(i).Transformed(aLocation.Transformation());
      triangulatedFace.verticesNormals[(i - 1) * 3 + 0] = d.X();
      triangulatedFace.verticesNormals[(i - 1) * 3 + 1] = d.Y();
      triangulatedFace.verticesNormals[(i - 1) * 3 + 2] = d.Z();
    }
    nodes.delete();
    pc.delete();

    // set uvcoords buffers to NULL
    // necessary for JoinPrimitive to be performed
    // triangulatedFace.tex_coord = null;

    // write triangle buffer
    const orient = this.wrapped.Orientation_1();
    const triangles = triangulation.get().Triangles();
    triangulatedFace.trianglesIndexes = new Array(triangles.Length() * 3);
    let validFaceTriCount = 0;
    for (let nt = 1; nt <= triangulation.get().NbTriangles(); nt++) {
      const t = triangles.Value(nt);
      let n1 = t.Value(1);
      let n2 = t.Value(2);
      let n3 = t.Value(3);
      if (orient !== this.oc.TopAbs_Orientation.TopAbs_FORWARD) {
        let tmp = n1;
        n1 = n2;
        n2 = tmp;
      }
      // if(TriangleIsValid(nodes.Value(1), nodes.Value(n2), nodes.Value(n3))) {
      triangulatedFace.trianglesIndexes[validFaceTriCount * 3 + 0] =
        n1 - 1 + index0;
      triangulatedFace.trianglesIndexes[validFaceTriCount * 3 + 1] =
        n2 - 1 + index0;
      triangulatedFace.trianglesIndexes[validFaceTriCount * 3 + 2] =
        n3 - 1 + index0;
      validFaceTriCount++;
      // }
    }
    triangulatedFace.number_of_triangles = validFaceTriCount;

    aLocation.delete();
    triangulation.delete();

    return triangulatedFace;
  }

  _mesh({ tolerance = 1e-3, angularTolerance = 0.1 } = {}) {
    new this.oc.BRepMesh_IncrementalMesh_2(
      this.wrapped,
      tolerance,
      false,
      angularTolerance,
      false
    );
  }

  mesh({ tolerance = 1e-3, angularTolerance = 0.1 } = {}) {
    this._mesh({ tolerance, angularTolerance });
    let triangles = [];
    let vertices = [];
    let normals = [];
    let faceGroups = [];

    for (let face of this.faces) {
      const tri = face.triangulation(vertices.length / 3);

      if (!tri) continue;
      const { trianglesIndexes, vertices: faceVertices, verticesNormals } = tri;

      faceGroups.push({
        start: triangles.length,
        count: trianglesIndexes.length,
        faceId: face.hashCode,
      });
      triangles = triangles.concat(trianglesIndexes);
      vertices = vertices.concat(faceVertices);
      normals = normals.concat(verticesNormals);
    }

    return {
      triangles,
      vertices,
      normals,
      faceGroups,
    };
  }

  meshEdges() {
    let recordedEdges = new Set();
    let lines = [];
    let edgeGroups = [];
    const aLocation = new this.oc.TopLoc_Location_1();

    for (let face of this.faces) {
      const faceCleaner = new Cleaner();
      const triangulation = this.oc.BRep_Tool.Triangulation(
        face.wrapped,
        aLocation
      );
      faceCleaner.add(triangulation);

      if (triangulation.IsNull()) {
        faceCleaner.clean();
        continue;
      }
      const faceNodes = triangulation.get().Nodes();
      faceCleaner.add(faceNodes);

      for (let edge of face.edges) {
        faceCleaner.add(edge);
        if (recordedEdges.has(edge.hashCode)) continue;
        const edgeCleaner = new Cleaner();

        const edgeLoc = new this.oc.TopLoc_Location_1();
        edgeCleaner.add(edgeLoc);

        const polygon = this.oc.BRep_Tool.PolygonOnTriangulation_1(
          edge.wrapped,
          triangulation,
          edgeLoc
        );
        edgeCleaner.add(polygon);
        const edgeNodes = polygon?.get()?.Nodes();
        if (!edgeNodes) {
          edgeCleaner.clean();
          continue;
        }
        edgeCleaner.add(edgeNodes);

        const start = lines.length;

        let previousPoint = null;
        for (let i = edgeNodes.Lower(); i <= edgeNodes.Upper(); i++) {
          const p = faceNodes
            .Value(edgeNodes.Value(i))
            .Transformed(edgeLoc.Transformation());
          if (previousPoint) {
            lines.push(...previousPoint);
            previousPoint = [p.X(), p.Y(), p.Z()];
            lines.push(...previousPoint);
          } else {
            // The first element should start after the previous point has been
            // initialized
            previousPoint = [p.X(), p.Y(), p.Z()];
          }
          p.delete();
        }

        edgeGroups.push({
          start: start / 3,
          count: (lines.length - start) / 3,
          edgeId: edge.hashCode,
        });

        recordedEdges.add(edge.hashCode);
        edgeCleaner.clean();
      }
    }

    return { lines, edgeGroups };
  }

  blobSTEP() {
    const filename = "blob.step";
    let writer = new this.oc.STEPControl_Writer_1();
    const progress = new this.oc.Message_ProgressRange_1();

    writer.Transfer(
      this.wrapped,
      this.oc.STEPControl_StepModelType.STEPControl_AsIs,
      true,
      progress
    );

    // Convert to a .STEP File
    const done = writer.Write(filename);
    progress.delete();
    writer.delete();

    if (done === this.oc.IFSelect_ReturnStatus.IFSelect_RetDone) {
      // Read the STEP File from the filesystem and clean up
      let file = this.oc.FS.readFile("/" + filename);
      this.oc.FS.unlink("/" + filename);

      // Return the contents of the STEP File
      const blob = new Blob([file], { type: "application/STEP" });
      return blob;
    } else {
      throw new Error("WRITE STEP FILE FAILED.");
    }
  }

  blobSTL({ tolerance = 1e-3, angularTolerance = 0.1 } = {}) {
    this._mesh({ tolerance, angularTolerance });
    const filename = "blob.stl";
    let writer = new this.oc.StlAPI_Writer();
    // Convert to a .STEP File
    const progress = new this.oc.Message_ProgressRange_1();
    const done = writer.Write(this.wrapped, filename, progress);
    progress.delete();
    writer.delete();

    if (done) {
      // Read the STEP File from the filesystem and clean up
      let file = this.oc.FS.readFile("/" + filename);
      this.oc.FS.unlink("/" + filename);

      // Return the contents of the STEP File
      const blob = new Blob([file], { type: "application/sla" });
      return blob;
    } else {
      throw new Error("WRITE STL FILE FAILED.");
    }
  }
}

export class Vertex extends Shape {}
export class _1DShape extends Shape {
  get repr() {
    const { startPoint, endPoint } = this;
    const retVal = `start: (${this.startPoint.repr}) end:(${this.endPoint.repr}}`;
    startPoint.delete();
    endPoint.delete();
    return retVal;
  }

  get startPoint() {
    const curve = this._geomAdaptor();
    const umin = curve.Value(curve.FirstParameter());
    curve.delete();

    return new Vector(umin);
  }

  get endPoint() {
    const curve = this._geomAdaptor();
    const umax = curve.Value(curve.LastParameter());
    curve.delete();

    return new Vector(umax);
  }

  tangentAt(position) {
    const curve = this._geomAdaptor();

    let pos = position;
    if (!position) {
      pos = (curve.LastParameter() - curve.FirstParameter()) / 2;
    }

    const tmp = new this.oc.gp_Pnt_1();
    const res = new this.oc.gp_Vec_1();

    curve.D1(pos, tmp, res);
    const tangent = new Vector(res);

    curve.delete();
    tmp.delete();
    res.delete();

    return tangent;
  }
}

export class Edge extends _1DShape {
  _geomAdaptor() {
    return new this.oc.BRepAdaptor_Curve_2(this.wrapped);
  }

  get geomType() {
    const ga = this.oc.GeomAbs_CurveType;

    const CAST_MAP = new Map([
      [ga.GeomAbs_Line, "LINE"],
      [ga.GeomAbs_Circle, "CIRCLE"],
      [ga.GeomAbs_Ellipse, "ELLIPSE"],
      [ga.GeomAbs_Hyperbola, "HYPERBOLA"],
      [ga.GeomAbs_Parabola, "PARABOLA"],
      [ga.GeomAbs_BezierCurve, "BEZIER"],
      [ga.GeomAbs_BSplineCurve, "BSPLINE"],
      [ga.GeomAbs_OffsetCurve, "OFFSET"],
      [ga.GeomAbs_OtherCurve, "OTHER"],
    ]);

    const geom = this._geomAdaptor();
    const shapeType = CAST_MAP.get(geom.GetType());
    geom.delete();
    return shapeType;
  }
}

export class Wire extends _1DShape {
  _geomAdaptor() {
    return new this.oc.BRepAdaptor_CompCurve_2(this.wrapped, false);
  }

  offset2D(offset, kind = "arc") {
    const kinds = {
      arc: this.oc.GeomAbs_JoinType.GeomAbs_Arc,
      intersection: this.oc.GeomAbs_JoinType.GeomAbs_Intersection,
      tangent: this.oc.GeomAbs_JoinType.GeomAbs_Tangent,
    };

    const offsetter = new this.oc.BRepOffsetAPI_MakeOffset_3(
      this.wrapped,
      kinds[kind],
      false
    );
    offsetter.Perform(offset, 0);

    const newShape = cast(downcast(offsetter.Shape()));
    offsetter.delete();
    this.delete();
    return newShape;
  }
}

export class Face extends Shape {
  get _geomAdaptor() {
    return new this.oc.BRep_Tool.Surface_2(this.wrapped);
  }

  extrude(length, direction) {
    const baseDirection = direction ? direction.normalize() : this.normalAt();
    const extrusionVec = baseDirection.multiply(length);

    const solidBuilder = new this.oc.BRepPrimAPI_MakePrism_1(
      this.wrapped,
      extrusionVec.wrapped,
      false,
      true
    );

    const solid = cast(downcast(solidBuilder.Shape()));

    baseDirection.delete();
    extrusionVec.delete();
    solidBuilder.delete();
    this.delete();

    return solid;
  }

  pointOnSurface(u, v) {
    const { uMin, uMax, vMin, vMax } = this.oc.cadeau.UVBounds(this.wrapped);
    const surface = this._geomAdaptor;
    const p = new this.oc.gp_Pnt_1();

    const absoluteU = u * (uMax - uMin) + uMin;
    const absoluteV = v * (vMax - vMin) + vMin;

    surface.get().D0(absoluteU, absoluteV, p);
    const point = new Vector(p);
    surface.delete();
    p.delete();

    return point;
  }

  normalAt(locationVector) {
    let u = 0;
    let v = 0;

    if (!locationVector) {
      const { uMin, uMax, vMin, vMax } = this.oc.cadeau.UVBounds(this.wrapped);
      u = 0.5 * (uMin + uMax);
      v = 0.5 * (vMin + vMax);
    } else {
      const surface = this._geomAdaptor;
      ({ u, v } = this.oc.cadeau.projectPointOnSurface(
        locationVector.toPnt(),
        surface
      ));
      surface.delete();
    }

    const p = new this.oc.gp_Pnt_1();
    const vn = new this.oc.gp_Vec_1();

    const props = new this.oc.BRepGProp_Face_2(this.wrapped, false);
    props.Normal(u, v, p, vn);

    const normal = new Vector(vn);
    p.delete();
    props.delete();
    vn.delete();
    return normal;
  }

  get center() {
    const properties = new this.oc.GProp_GProps_1();
    this.oc.BRepGProp.SurfaceProperties_2(this.wrapped, properties, 1e-7, true);

    const center = new Vector(properties.CentreOfMass());
    properties.delete();
    return center;
  }

  outerWire() {
    const newVal = new Wire(this.oc.BRepTools.OuterWire(this.wrapped));
    this.delete();
    return newVal;
  }

  innerWires() {
    const outer = this.clone().outerWire();
    const innerWires = this.wires.filter((w) => !outer.isSame(w));
    outer.delete();
    this.delete();
    return innerWires;
  }
}

export class _3DShape extends Shape {
  fuse(other) {
    const newBody = new this.oc.BRepAlgoAPI_Fuse_3(this.wrapped, other.wrapped);
    newBody.SimplifyResult(true, true, 1e-3);
    const newShape = downcast(newBody.Shape());
    newBody.delete();
    return cast(downcast(newShape));
  }

  cut(tool) {
    const cutter = new this.oc.BRepAlgoAPI_Cut_3(this.wrapped, tool.wrapped);
    cutter.Build();
    cutter.SimplifyResult(true, true, 1e-3);

    const newShape = cast(downcast(cutter.Shape()));
    cutter.delete();
    this.delete();
    tool.delete();
    return newShape;
  }

  shell(faceList, thickness, tolerance = 1e-3) {
    const facesToRemove = new this.oc.TopTools_ListOfShape_1();
    faceList.forEach((f) => facesToRemove.Append_1(f.wrapped));
    const shellBuilder = new this.oc.BRepOffsetAPI_MakeThickSolid_1();
    shellBuilder.MakeThickSolidByJoin(
      this.wrapped,
      facesToRemove,
      thickness,
      tolerance,
      this.oc.BRepOffset_Mode.BRepOffset_Skin,
      false,
      false,
      this.oc.GeomAbs_JoinType.GeomAbs_Arc,
      false
    );

    const newShape = cast(downcast(shellBuilder.Shape()));
    facesToRemove.delete();
    shellBuilder.delete();

    return newShape;
  }

  _builderIter(radiusConfigInput, builderAdd) {
    let radiusConfig = radiusConfigInput;

    if (radiusConfigInput.filter) {
      radiusConfig = radiusConfigInput.filter.asSizeFcn(
        radiusConfigInput.radius || 1
      );
    }

    for (let rawEdge of this._iterTopo("edge")) {
      const edge = downcast(rawEdge);

      if (typeof radiusConfig === "number") {
        builderAdd(radiusConfig, edge);
        edge.delete();
      } else {
        const wrappedEdge = new Edge(edge);

        const radius = radiusConfig(wrappedEdge);
        if (radius) builderAdd(radius, edge);
        wrappedEdge.delete();
      }
    }

    if (radiusConfigInput.filter && !radiusConfigInput.keep) {
      radiusConfigInput.filter.delete();
    }
  }

  fillet(radiusConfig) {
    const filletBuilder = new this.oc.BRepFilletAPI_MakeFillet(
      this.wrapped,
      this.oc.ChFi3d_FilletShape.ChFi3d_Rational
    );

    this._builderIter(radiusConfig, (r, e) => filletBuilder.Add_2(r, e));

    const newShape = cast(downcast(filletBuilder.Shape()));
    filletBuilder.delete();
    this.delete();
    return newShape;
  }

  chamfer(radiusConfig) {
    const chamferBuilder = new this.oc.BRepFilletAPI_MakeChamfer(this.wrapped);

    this._builderIter(radiusConfig, (r, e) => chamferBuilder.Add_2(r, e));

    const newShape = cast(downcast(chamferBuilder.Shape()));
    chamferBuilder.delete();
    this.delete();
    return newShape;
  }
}

export class Shell extends _3DShape {}
export class Solid extends _3DShape {}
export class CompSolid extends _3DShape {}
export class Compound extends _3DShape {}

export function downcast(shape) {
  const oc = getOC();
  const ta = oc.TopAbs_ShapeEnum;

  const CAST_MAP = new Map([
    [ta.TopAbs_EDGE, oc.TopoDS.Edge_1],
    [ta.TopAbs_WIRE, oc.TopoDS.Wire_1],
    [ta.TopAbs_FACE, oc.TopoDS.Face_1],
    [ta.TopAbs_SHELL, oc.TopoDS.Shell_1],
    [ta.TopAbs_SOLID, oc.TopoDS.Solid_1],
    [ta.TopAbs_COMPSOLID, oc.TopoDS.CompSolid_1],
    [ta.TopAbs_COMPOUND, oc.TopoDS.Compound_1],
  ]);

  if (!CAST_MAP.has(shapeType(shape)))
    throw new Error("Could not find a wrapper for this shape type");
  const caster = CAST_MAP.get(shapeType(shape));
  return caster(shape);
}

export function cast(shape) {
  const oc = getOC();
  const ta = oc.TopAbs_ShapeEnum;

  const CAST_MAP = new Map([
    [ta.TopAbs_VERTEX, Vertex],
    [ta.TopAbs_EDGE, Edge],
    [ta.TopAbs_WIRE, Wire],
    [ta.TopAbs_FACE, Face],
    [ta.TopAbs_SHELL, Shell],
    [ta.TopAbs_SOLID, Solid],
    [ta.TopAbs_COMPSOLID, CompSolid],
    [ta.TopAbs_COMPOUND, Compound],
  ]);

  if (!CAST_MAP.has(shapeType(shape)))
    throw new Error("Could not find a wrapper for this shape type");
  const Klass = CAST_MAP.get(shapeType(shape));
  return new Klass(downcast(shape));
}
