import { WrappingObj, GCWithScope } from "./register.js";
import { Vector, Point, Plane, PlaneName, asPnt, BoundingBox } from "./geom.js";
import { DEG2RAD, HASH_CODE_MAX } from "./constants.js";
import { getOC } from "./oclib.js";

import {
  TopoDS_Face,
  TopoDS_Shape,
  TopoDS_Edge,
  TopoDS_Wire,
  TopoDS_Shell,
  TopoDS_Vertex,
  TopoDS_Solid,
  TopoDS_Compound,
  TopoDS_CompSolid,
  TopAbs_ShapeEnum,
  STEPControl_StepModelType,
  gp_Vec,
  gp_Pnt,
  Adaptor3d_Surface,
  BRepAdaptor_Curve,
  BRepAdaptor_CompCurve,
  BRepAdaptor_Surface,
} from "replicad-opencascadejs";
import { EdgeFinder, FaceFinder } from "./finders/index.js";
import { rotate, translate, mirror, scale as scaleShape } from "./geomHelpers";
import { CurveType, findCurveType } from "./definitionMaps";

export type { CurveType };

export type AnyShape =
  | Vertex
  | Edge
  | Wire
  | Face
  | Shell
  | Solid
  | CompSolid
  | Compound;

type TopoEntity =
  | "vertex"
  | "edge"
  | "wire"
  | "face"
  | "shell"
  | "solid"
  | "solidCompound"
  | "compound"
  | "shape";

type GenericTopo =
  | TopoDS_Vertex
  | TopoDS_Face
  | TopoDS_Shape
  | TopoDS_Edge
  | TopoDS_Wire
  | TopoDS_Shell
  | TopoDS_Vertex
  | TopoDS_Solid
  | TopoDS_Compound
  | TopoDS_CompSolid;

export interface CurveLike {
  delete(): void;
  Value(v: number): gp_Pnt;
  IsPeriodic(): boolean;
  Period(): number;
  IsClosed(): boolean;
  FirstParameter(): number;
  LastParameter(): number;
  GetType?(): any;
  D1(v: number, p: gp_Pnt, vPrime: gp_Vec): void;
}

/**
 * We can defined a chamfer with only a number - in that case it will be
 * symmetric
 *
 * We can also define a chamfer with two distances, in that case the chamfer
 * will be asymmetric, and the first distance will be used for selected face.
 *
 * We can also define a chamfer with a distance and an angle, in that case
 * the chamfer will be asymmetric, and the distance will be used
 * for selected face.
 *
 * Note that the selected face is a function that takes a FaceFinder, and if
 * this fails, you might expect an error.
 *
 */
export type ChamferRadius =
  | number
  | {
      distances: [number, number];
      selectedFace: (f: FaceFinder) => FaceFinder;
    }
  | {
      distance: number;
      angle: number;
      selectedFace: (f: FaceFinder) => FaceFinder;
    };

export type FilletRadius = number | [number, number];

function isNumber(r: unknown): r is number {
  return typeof r === "number";
}

function isChamferRadius(r: unknown): r is ChamferRadius {
  if (typeof r === "number") return true;
  if (typeof r === "object" && r !== null) {
    const obj = r as Omit<ChamferRadius, number>;
    return (
      ("distances" in obj &&
        Array.isArray(obj.distances) &&
        "selectedFace" in obj) ||
      ("distance" in obj && "angle" in obj && "selectedFace" in obj)
    );
  }
  return false;
}

function isFilletRadius(r: unknown): r is FilletRadius {
  if (typeof r === "number") return true;
  if (Array.isArray(r) && r.length === 2) {
    return r.every(isNumber);
  }
  return false;
}

/**
 * A generic way to define radii for fillet or chamfer (the operation)
 *
 * If the radius is a filter finder object (with an EdgeFinder as filter, and
 * a radius to specify the fillet radius), the operation will only be applied
 * to the edges as selected by the finder. The finder will be deleted unless it
 * is explicitly specified to `keep` it.
 *
 * If the radius is a number all the edges will be targetted for the operation.
 *
 * If the radius is a function edges will be filletted or chamfered according
 * to the value returned by the function (0 or null will not add any fillet).
 */
export type RadiusConfig<R = number> =
  | ((e: Edge) => R | null)
  | R
  | { filter: EdgeFinder; radius: R; keep?: boolean };

const asTopo = (entity: TopoEntity): TopAbs_ShapeEnum => {
  const oc = getOC();

  return {
    vertex: oc.TopAbs_ShapeEnum.TopAbs_VERTEX,
    wire: oc.TopAbs_ShapeEnum.TopAbs_WIRE,
    face: oc.TopAbs_ShapeEnum.TopAbs_FACE,
    shell: oc.TopAbs_ShapeEnum.TopAbs_SHELL,
    solid: oc.TopAbs_ShapeEnum.TopAbs_SOLID,
    solidCompound: oc.TopAbs_ShapeEnum.TopAbs_COMPSOLID,
    compound: oc.TopAbs_ShapeEnum.TopAbs_COMPOUND,
    edge: oc.TopAbs_ShapeEnum.TopAbs_EDGE,
    shape: oc.TopAbs_ShapeEnum.TopAbs_SHAPE,
  }[entity] as TopAbs_ShapeEnum;
};

export const iterTopo = function* iterTopo(
  shape: TopoDS_Shape,
  topo: TopoEntity
): IterableIterator<TopoDS_Shape> {
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
  explorer.delete();
};

export interface FaceTriangulation {
  vertices: number[];
  trianglesIndexes: number[];
  verticesNormals: number[];
}

export interface ShapeMesh {
  triangles: number[];
  vertices: number[];
  normals: number[];
  faceGroups: { start: number; count: number; faceId: number }[];
}

export const shapeType = (shape: TopoDS_Shape): TopAbs_ShapeEnum => {
  if (shape.IsNull()) throw new Error("This shape has not type, it is null");
  return shape.ShapeType();
};

export function deserializeShape(data: string): Shape<TopoDS_Shape> {
  const oc = getOC();
  return new Shape(oc.BRepToolsWrapper.Read(data));
}

export class Shape<Type extends TopoDS_Shape> extends WrappingObj<Type> {
  constructor(ocShape: Type) {
    super(ocShape);
  }

  clone(): this {
    return new (<any>this.constructor)(downcast(this.wrapped));
  }

  serialize(): string {
    const oc = getOC();
    return oc.BRepToolsWrapper.Write(this.wrapped);
  }

  get hashCode(): number {
    return this.wrapped.HashCode(HASH_CODE_MAX);
  }

  get isNull(): boolean {
    return this.wrapped.IsNull();
  }

  isSame(other: AnyShape): boolean {
    return this.wrapped.IsSame(other.wrapped);
  }

  isEqual(other: AnyShape): boolean {
    return this.wrapped.IsEqual(other.wrapped);
  }

  /**
   * Simplifies the shape by removing unnecessary edges and faces
   */
  simplify(): this {
    const oc = getOC();
    const shapeUpgrader = new oc.ShapeUpgrade_UnifySameDomain_2(
      this.wrapped,
      true,
      true,
      false
    );
    shapeUpgrader.Build();
    const newShape = cast(shapeUpgrader.Shape());
    shapeUpgrader.delete();

    if (this.constructor !== newShape.constructor)
      throw new Error("unexpected types mismatch");

    // @ts-expect-error we actually check just before
    return newShape as typeof this;
  }

  /**
   * Translates the shape of an arbitrary vector
   *
   * @category Shape Transformations
   */
  translate(xDist: number, yDist: number, zDist: number): this;
  translate(vector: Point): this;
  translate(vectorOrxDist: Point | number, yDist = 0, zDist = 0): this {
    const translation: Point =
      typeof vectorOrxDist === "number"
        ? [vectorOrxDist, yDist, zDist]
        : vectorOrxDist;
    const newShape = cast(translate(this.wrapped, translation));
    this.delete();

    if (this.constructor !== newShape.constructor)
      throw new Error("unexpected types mismatch");

    // @ts-expect-error we actually check just before
    return newShape as typeof this;
  }

  /**
   * Translates the shape on the X axis
   *
   * @category Shape Transformations
   */
  translateX(distance: number): this {
    return this.translate([distance, 0, 0]);
  }

  /**
   * Translates the shape on the Y axis
   *
   * @category Shape Transformations
   */
  translateY(distance: number): this {
    return this.translate([0, distance, 0]);
  }

  /**
   * Translates the shape on the Z axis
   *
   * @category Shape Transformations
   */
  translateZ(distance: number): this {
    return this.translate([0, 0, distance]);
  }

  /**
   * Rotates the shape
   *
   * @category Shape Transformations
   */
  rotate(
    angle: number,
    position: Point = [0, 0, 0],
    direction: Point = [0, 0, 1]
  ): this {
    const newShape = cast(rotate(this.wrapped, angle, position, direction));
    this.delete();
    if (this.constructor !== newShape.constructor)
      throw new Error("unexpected types mismatch");

    // @ts-expect-error we actually check just before
    return newShape as typeof this;
  }

  /**
   * Mirrors the shape through a plane
   *
   * @category Shape Transformations
   */
  mirror(inputPlane?: Plane | PlaneName | Point, origin?: Point): this {
    const newShape = cast(mirror(this.wrapped, inputPlane, origin));
    this.delete();

    if (this.constructor !== newShape.constructor)
      throw new Error("unexpected types mismatch");

    // @ts-expect-error we actually check just before
    return newShape as typeof this;
  }

  /**
   * Returns a scaled version of the shape
   *
   * @category Shape Transformations
   */
  scale(scale: number, center: Point = [0, 0, 0]): this {
    const newShape = cast(scaleShape(this.wrapped, center, scale));
    this.delete();

    if (this.constructor !== newShape.constructor)
      throw new Error("unexpected types mismatch");

    // @ts-expect-error we actually check just before
    return newShape as typeof this;
  }

  protected _iterTopo(topo: TopoEntity): IterableIterator<TopoDS_Shape> {
    return iterTopo(this.wrapped, topo);
  }

  protected _listTopo(topo: TopoEntity): TopoDS_Shape[] {
    return Array.from(this._iterTopo(topo)).map((e) => {
      return downcast(e);
    });
  }

  get edges(): Edge[] {
    return this._listTopo("edge").map((e) => new Edge(e));
  }

  get faces(): Face[] {
    return this._listTopo("face").map((e) => new Face(e));
  }

  get wires(): Wire[] {
    return this._listTopo("wire").map((e) => new Wire(e));
  }

  get boundingBox(): BoundingBox {
    const bbox = new BoundingBox();
    this.oc.BRepBndLib.Add(this.wrapped, bbox.wrapped, true);
    return bbox;
  }

  protected _mesh({ tolerance = 1e-3, angularTolerance = 0.1 } = {}): void {
    new this.oc.BRepMesh_IncrementalMesh_2(
      this.wrapped,
      tolerance,
      false,
      angularTolerance,
      false
    );
  }

  /**
   * Exports the current shape as a set of triangle. These can be used by threejs
   * for instance to represent the the shape
   *
   * @category Shape Export
   */
  mesh({ tolerance = 1e-3, angularTolerance = 0.1 } = {}): ShapeMesh {
    this._mesh({ tolerance, angularTolerance });
    let triangles: number[] = [];
    let vertices: number[] = [];
    let normals: number[] = [];
    const faceGroups: { start: number; count: number; faceId: number }[] = [];

    for (const face of this.faces) {
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

  /**
   * Exports the current shape as a set of lines. These can be used by threejs
   * for instance to represent the edges of the shape
   *
   * @category Shape Export
   */
  meshEdges({ tolerance = 1e-3, angularTolerance = 0.1 } = {}): {
    lines: number[];
    edgeGroups: { start: number; count: number; edgeId: number }[];
  } {
    const r = GCWithScope();
    const recordedEdges = new Set();
    const lines: number[] = [];
    const edgeGroups: { start: number; count: number; edgeId: number }[] = [];

    const addEdge = (): [(p: gp_Pnt) => void, (h: number) => void] => {
      const start = lines.length;
      let previousPoint: null | number[] = null;

      return [
        (p: gp_Pnt) => {
          if (previousPoint) {
            lines.push(...previousPoint);
            previousPoint = [p.X(), p.Y(), p.Z()];
            lines.push(...previousPoint);
          } else {
            // The first element should start after the previous point has been
            // initialized
            previousPoint = [p.X(), p.Y(), p.Z()];
          }
        },

        (edgeHash: number) => {
          edgeGroups.push({
            start: start / 3,
            count: (lines.length - start) / 3,
            edgeId: edgeHash,
          });

          recordedEdges.add(edgeHash);
        },
      ];
    };

    const aLocation = r(new this.oc.TopLoc_Location_1());

    for (const face of this.faces) {
      const triangulation = r(
        this.oc.BRep_Tool.Triangulation(face.wrapped, aLocation, 0)
      );

      if (triangulation.IsNull()) {
        continue;
      }
      const tri = triangulation.get();

      for (const edge of face.edges) {
        r(edge);
        if (recordedEdges.has(edge.hashCode)) continue;

        const edgeLoc = r(new this.oc.TopLoc_Location_1());

        const polygon = r(
          this.oc.BRep_Tool.PolygonOnTriangulation_1(
            edge.wrapped,
            triangulation,
            edgeLoc
          )
        );
        const edgeNodes = polygon?.get()?.Nodes();
        if (!edgeNodes) {
          continue;
        }
        r(edgeNodes);

        const [recordPoint, done] = addEdge();

        for (let i = edgeNodes.Lower(); i <= edgeNodes.Upper(); i++) {
          const p = r(
            r(tri.Node(edgeNodes.Value(i))).Transformed(
              edgeLoc.Transformation()
            )
          );
          recordPoint(p);
        }
        done(edge.hashCode);
      }
    }

    for (const edge of this.edges) {
      r(edge);
      const edgeHash = edge.hashCode;
      if (recordedEdges.has(edgeHash)) continue;

      const adaptorCurve = r(new this.oc.BRepAdaptor_Curve_2(edge.wrapped));
      const tangDef = r(
        new this.oc.GCPnts_TangentialDeflection_2(
          adaptorCurve,
          tolerance,
          angularTolerance,
          2,
          1e-9,
          1e-7
        )
      );
      const [recordPoint, done] = addEdge();
      for (let j = 0; j < tangDef.NbPoints(); j++) {
        const p = r(
          tangDef.Value(j + 1).Transformed(aLocation.Transformation())
        );
        recordPoint(p);
      }
      done(edgeHash);
    }

    return { lines, edgeGroups };
  }

  /**
   * Exports the current shape as a STEP file as a Blob
   *
   * @category Shape Export
   */
  blobSTEP(): Blob {
    const filename = "blob.step";
    const writer = new this.oc.STEPControl_Writer_1();

    this.oc.Interface_Static.SetIVal("write.step.schema", 5);
    writer.Model(true).delete();
    const progress = new this.oc.Message_ProgressRange_1();

    writer.Transfer(
      this.wrapped,
      this.oc.STEPControl_StepModelType
        .STEPControl_AsIs as STEPControl_StepModelType,
      true,
      progress
    );

    // Convert to a .STEP File
    const done = writer.Write(filename);
    writer.delete();
    progress.delete();

    if (done === this.oc.IFSelect_ReturnStatus.IFSelect_RetDone) {
      // Read the STEP File from the filesystem and clean up
      const file = this.oc.FS.readFile("/" + filename);
      this.oc.FS.unlink("/" + filename);

      // Return the contents of the STEP File
      const blob = new Blob([file], { type: "application/STEP" });
      return blob;
    } else {
      throw new Error("WRITE STEP FILE FAILED.");
    }
  }

  /**
   * Exports the current shape as a STL file as a Blob
   *
   * In order to create a STL file, the shape needs to be meshed. The
   * tolerances correspond to the values used to mesh the shape.
   *
   * @category Shape Export
   */
  blobSTL({
    tolerance = 1e-3,
    angularTolerance = 0.1,
    binary = false,
  } = {}): Blob {
    this._mesh({ tolerance, angularTolerance });
    const filename = "blob.stl";
    const done = this.oc.StlAPI.Write(this.wrapped, filename, !binary);

    if (done) {
      // Read the STEP File from the filesystem and clean up
      const file = this.oc.FS.readFile("/" + filename);
      this.oc.FS.unlink("/" + filename);

      // Return the contents of the STEP File
      const blob = new Blob([file], { type: "application/sla" });
      return blob;
    } else {
      throw new Error("WRITE STL FILE FAILED.");
    }
  }
}

export class Vertex extends Shape<TopoDS_Vertex> {
  asTuple(): [number, number, number] {
    const pnt = this.oc.BRep_Tool.Pnt(this.wrapped);
    const tuple: [number, number, number] = [pnt.X(), pnt.Y(), pnt.Z()];
    pnt.delete();
    return tuple;
  }
}

export abstract class _1DShape<Type extends TopoDS_Shape> extends Shape<Type> {
  protected abstract _geomAdaptor(): CurveLike;
  get repr(): string {
    const { startPoint, endPoint } = this;
    const retVal = `start: (${this.startPoint.repr}) end:(${this.endPoint.repr})`;
    startPoint.delete();
    endPoint.delete();
    return retVal;
  }

  get curve(): Curve {
    return new Curve(this._geomAdaptor());
  }

  get startPoint(): Vector {
    return this.curve.startPoint;
  }

  get endPoint(): Vector {
    return this.curve.endPoint;
  }

  tangentAt(position = 0): Vector {
    return this.curve.tangentAt(position);
  }

  pointAt(position = 0): Vector {
    return this.curve.pointAt(position);
  }

  get isClosed(): boolean {
    return this.curve.isClosed;
  }

  get isPeriodic(): boolean {
    return this.curve.isPeriodic;
  }

  get period(): number {
    return this.curve.period;
  }

  get geomType(): CurveType {
    return this.curve.curveType;
  }

  get length(): number {
    const properties = new this.oc.GProp_GProps_1();
    this.oc.BRepGProp.LinearProperties(this.wrapped, properties, true, false);

    const length = properties.Mass();
    properties.delete();
    return length;
  }

  get orientation(): "forward" | "backward" {
    const orient = this.wrapped.Orientation_1();
    if (orient === this.oc.TopAbs_Orientation.TopAbs_FORWARD) return "forward";
    return "backward";
  }
}

export class Curve extends WrappingObj<CurveLike> {
  get repr(): string {
    const { startPoint, endPoint } = this;
    const retVal = `start: (${this.startPoint.repr}) end:(${this.endPoint.repr}}`;
    startPoint.delete();
    endPoint.delete();
    return retVal;
  }

  get curveType(): CurveType {
    const technicalType = this.wrapped.GetType && this.wrapped.GetType();
    return findCurveType(technicalType);
  }

  get startPoint(): Vector {
    const umin = this.wrapped.Value(this.wrapped.FirstParameter());
    return new Vector(umin);
  }

  get endPoint(): Vector {
    const umax = this.wrapped.Value(this.wrapped.LastParameter());
    return new Vector(umax);
  }

  protected _mapParameter(position: number): number {
    const firstParam = this.wrapped.FirstParameter();
    const lastParam = this.wrapped.LastParameter();

    return firstParam + (lastParam - firstParam) * position;
  }

  pointAt(position = 0.5): Vector {
    return new Vector(this.wrapped.Value(this._mapParameter(position)));
  }

  tangentAt(position = 0.5): Vector {
    const pos = this._mapParameter(position);

    const tmp = new this.oc.gp_Pnt_1();
    const res = new this.oc.gp_Vec_1();

    this.wrapped.D1(pos, tmp, res);
    const tangent = new Vector(res);

    tmp.delete();
    res.delete();

    return tangent;
  }

  get isClosed(): boolean {
    const isClosed = this.wrapped.IsClosed();
    return isClosed;
  }

  get isPeriodic(): boolean {
    const isPeriodic = this.wrapped.IsPeriodic();
    return isPeriodic;
  }

  get period(): number {
    const period = this.wrapped.Period();
    return period;
  }
}

export class Edge extends _1DShape<TopoDS_Edge> {
  protected _geomAdaptor(): BRepAdaptor_Curve {
    return new this.oc.BRepAdaptor_Curve_2(this.wrapped);
  }
}

export class Wire extends _1DShape<TopoDS_Wire> {
  protected _geomAdaptor(): BRepAdaptor_CompCurve {
    return new this.oc.BRepAdaptor_CompCurve_2(this.wrapped, false);
  }

  offset2D(
    offset: number,
    kind: "arc" | "intersection" | "tangent" = "arc"
  ): Wire {
    const kinds = {
      arc: this.oc.GeomAbs_JoinType.GeomAbs_Arc,
      intersection: this.oc.GeomAbs_JoinType.GeomAbs_Intersection,
      tangent: this.oc.GeomAbs_JoinType.GeomAbs_Tangent,
    };

    const offsetter = new this.oc.BRepOffsetAPI_MakeOffset_3(
      this.wrapped,
      kinds[kind] as any,
      false
    );
    offsetter.Perform(offset, 0);

    const newShape = cast(offsetter.Shape());
    offsetter.delete();
    this.delete();
    if (!(newShape instanceof Wire))
      throw new Error("Could not offset with a wire");
    return newShape;
  }
}
export type SurfaceType =
  | "PLANE"
  | "CYLINDRE"
  | "CONE"
  | "SPHERE"
  | "TORUS"
  | "BEZIER_SURFACE"
  | "BSPLINE_SURFACE"
  | "REVOLUTION_SURFACE"
  | "EXTRUSION_SURFACE"
  | "OFFSET_SURFACE"
  | "OTHER_SURFACE";

export class Surface extends WrappingObj<Adaptor3d_Surface> {
  get surfaceType(): SurfaceType {
    const ga = this.oc.GeomAbs_SurfaceType;

    const CAST_MAP: Map<any, SurfaceType> = new Map([
      [ga.GeomAbs_Plane, "PLANE"],
      [ga.GeomAbs_Cylinder, "CYLINDRE"],
      [ga.GeomAbs_Cone, "CONE"],
      [ga.GeomAbs_Sphere, "SPHERE"],
      [ga.GeomAbs_Torus, "TORUS"],
      [ga.GeomAbs_BezierSurface, "BEZIER_SURFACE"],
      [ga.GeomAbs_BSplineSurface, "BSPLINE_SURFACE"],
      [ga.GeomAbs_SurfaceOfRevolution, "REVOLUTION_SURFACE"],
      [ga.GeomAbs_SurfaceOfExtrusion, "EXTRUSION_SURFACE"],
      [ga.GeomAbs_OffsetSurface, "OFFSET_SURFACE"],
      [ga.GeomAbs_OtherSurface, "OTHER_SURFACE"],
    ]);

    const shapeType = CAST_MAP.get(this.wrapped.GetType());
    if (!shapeType) throw new Error("surface type not found");
    return shapeType;
  }
}

export class Face extends Shape<TopoDS_Face> {
  protected _geomAdaptor(): BRepAdaptor_Surface {
    return new this.oc.BRepAdaptor_Surface_2(this.wrapped, false);
  }

  get surface(): Surface {
    return new Surface(this._geomAdaptor());
  }

  get orientation(): "forward" | "backward" {
    const orient = this.wrapped.Orientation_1();
    if (orient === this.oc.TopAbs_Orientation.TopAbs_FORWARD) return "forward";
    return "backward";
  }

  get geomType(): SurfaceType {
    const surface = this.surface;
    const geomType = surface.surfaceType;
    surface.delete();
    return geomType;
  }

  get UVBounds(): { uMin: number; uMax: number; vMin: number; vMax: number } {
    const uMin = { current: 0 };
    const uMax = { current: 0 };
    const vMin = { current: 0 };
    const vMax = { current: 0 };

    // @ts-expect-error missing type in oc
    this.oc.BRepTools.UVBounds_1(this.wrapped, uMin, uMax, vMin, vMax);

    return {
      uMin: uMin.current,
      uMax: uMax.current,
      vMin: vMin.current,
      vMax: vMax.current,
    };
  }

  pointOnSurface(u: number, v: number): Vector {
    const { uMin, uMax, vMin, vMax } = this.UVBounds;
    const surface = this._geomAdaptor();
    const p = new this.oc.gp_Pnt_1();

    const absoluteU = u * (uMax - uMin) + uMin;
    const absoluteV = v * (vMax - vMin) + vMin;

    surface.D0(absoluteU, absoluteV, p);
    const point = new Vector(p);
    surface.delete();
    p.delete();

    return point;
  }

  normalAt(locationVector?: Point): Vector {
    let u = 0;
    let v = 0;

    const r = GCWithScope();

    if (!locationVector) {
      const { uMin, uMax, vMin, vMax } = this.UVBounds;
      u = 0.5 * (uMin + uMax);
      v = 0.5 * (vMin + vMax);
    } else {
      const surface = r(this.oc.BRep_Tool.Surface_2(this.wrapped));

      const projectedPoint = r(
        new this.oc.GeomAPI_ProjectPointOnSurf_2(
          r(asPnt(locationVector)),
          surface,
          this.oc.Extrema_ExtAlgo.Extrema_ExtAlgo_Grad as any
        )
      );

      const uPtr = { current: 0 };
      const vPtr = { current: 0 };

      // @ts-expect-error missing type in oc
      projectedPoint.LowerDistanceParameters(uPtr, vPtr);
      u = uPtr.current;
      v = vPtr.current;
    }

    const p = r(new this.oc.gp_Pnt_1());
    const vn = r(new this.oc.gp_Vec_1());

    const props = r(new this.oc.BRepGProp_Face_2(this.wrapped, false));
    props.Normal(u, v, p, vn);

    const normal = new Vector(vn);
    return normal;
  }

  get center(): Vector {
    const properties = new this.oc.GProp_GProps_1();
    this.oc.BRepGProp.SurfaceProperties_2(this.wrapped, properties, 1e-7, true);

    const center = new Vector(properties.CentreOfMass());
    properties.delete();
    return center;
  }

  outerWire(): Wire {
    const newVal = new Wire(this.oc.BRepTools.OuterWire(this.wrapped));
    this.delete();
    return newVal;
  }

  innerWires(): Wire[] {
    const outer = this.clone().outerWire();
    const innerWires = this.wires.filter((w) => !outer.isSame(w));
    outer.delete();
    this.delete();
    return innerWires;
  }

  /*
   * @ignore
   */
  triangulation(index0 = 0): FaceTriangulation | null {
    const r = GCWithScope();

    const aLocation = r(new this.oc.TopLoc_Location_1());
    const triangulation = r(
      this.oc.BRep_Tool.Triangulation(this.wrapped, aLocation, 0)
    );

    if (triangulation.IsNull()) return null;

    const transformation = r(aLocation.Transformation());

    const triangulatedFace: FaceTriangulation = {
      vertices: [],
      trianglesIndexes: [],
      verticesNormals: [],
    };

    const tri = triangulation.get();
    const nbNodes = tri.NbNodes();

    // write vertex buffer
    triangulatedFace.vertices = new Array(nbNodes * 3);
    for (let i = 1; i <= nbNodes; i++) {
      const p = r(r(tri.Node(i)).Transformed(transformation));
      triangulatedFace.vertices[(i - 1) * 3 + 0] = p.X();
      triangulatedFace.vertices[(i - 1) * 3 + 1] = p.Y();
      triangulatedFace.vertices[(i - 1) * 3 + 2] = p.Z();
    }

    const normalsArray = r(new this.oc.TColgp_Array1OfDir_2(1, nbNodes));
    const pc = r(new this.oc.Poly_Connect_2(triangulation));
    this.oc.StdPrs_ToolTriangulatedShape.Normal(this.wrapped, pc, normalsArray);
    triangulatedFace.verticesNormals = new Array(normalsArray.Length() * 3);
    for (let i = normalsArray.Lower(); i <= normalsArray.Upper(); i++) {
      const d = r(r(normalsArray.Value(i)).Transformed(transformation));
      triangulatedFace.verticesNormals[(i - 1) * 3 + 0] = d.X();
      triangulatedFace.verticesNormals[(i - 1) * 3 + 1] = d.Y();
      triangulatedFace.verticesNormals[(i - 1) * 3 + 2] = d.Z();
    }

    // set uvcoords buffers to NULL
    // necessary for JoinPrimitive to be performed
    // triangulatedFace.tex_coord = null;

    // write triangle buffer
    const orient = this.orientation;
    const nbTriangles = tri.NbTriangles();
    triangulatedFace.trianglesIndexes = new Array(nbTriangles * 3);
    let validFaceTriCount = 0;
    for (let nt = 1; nt <= nbTriangles; nt++) {
      const t = r(tri.Triangle(nt));
      let n1 = t.Value(1);
      let n2 = t.Value(2);
      const n3 = t.Value(3);
      if (orient === "backward") {
        const tmp = n1;
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
    return triangulatedFace;
  }
}

export class _3DShape<Type extends TopoDS_Shape> extends Shape<Type> {
  /**
   * Builds a new shape out of the two, fused, shapes
   *
   * @category Shape Modifications
   */
  fuse(
    other: Shape3D,
    {
      optimisation = "none",
    }: { optimisation?: "none" | "commonFace" | "sameFace" } = {}
  ): Shape3D {
    const r = GCWithScope();
    const progress = r(new this.oc.Message_ProgressRange_1());
    const newBody = r(
      new this.oc.BRepAlgoAPI_Fuse_3(this.wrapped, other.wrapped, progress)
    );
    if (optimisation === "commonFace") {
      newBody.SetGlue(this.oc.BOPAlgo_GlueEnum.BOPAlgo_GlueShift as any);
    }
    if (optimisation === "sameFace") {
      newBody.SetGlue(this.oc.BOPAlgo_GlueEnum.BOPAlgo_GlueFull as any);
    }

    newBody.Build(progress);
    newBody.SimplifyResult(true, true, 1e-3);
    const newShape = cast(newBody.Shape());
    if (!isShape3D(newShape)) throw new Error("Could not fuse as a 3d shape");

    return newShape;
  }

  /**
   * Builds a new shape by removing the tool tape from this shape
   *
   * @category Shape Modifications
   */
  cut(
    tool: Shape3D,
    {
      optimisation = "none",
    }: { optimisation?: "none" | "commonFace" | "sameFace" } = {}
  ): Shape3D {
    const r = GCWithScope();
    const progress = r(new this.oc.Message_ProgressRange_1());
    const cutter = r(
      new this.oc.BRepAlgoAPI_Cut_3(this.wrapped, tool.wrapped, progress)
    );
    if (optimisation === "commonFace") {
      cutter.SetGlue(this.oc.BOPAlgo_GlueEnum.BOPAlgo_GlueShift as any);
    }
    if (optimisation === "sameFace") {
      cutter.SetGlue(this.oc.BOPAlgo_GlueEnum.BOPAlgo_GlueFull as any);
    }
    cutter.Build(progress);
    cutter.SimplifyResult(true, true, 1e-3);

    const newShape = cast(cutter.Shape());
    if (!isShape3D(newShape)) throw new Error("Could not cut as a 3d shape");
    return newShape;
  }

  /**
   * Builds a new shape by intersecting this shape and another
   *
   * @category Shape Modifications
   */
  intersect(tool: AnyShape): AnyShape {
    const r = GCWithScope();
    const progress = r(new this.oc.Message_ProgressRange_1());
    const intersector = r(
      new this.oc.BRepAlgoAPI_Common_3(this.wrapped, tool.wrapped, progress)
    );
    intersector.Build(progress);
    intersector.SimplifyResult(true, true, 1e-3);

    const newShape = cast(intersector.Shape());
    if (!isShape3D(newShape))
      throw new Error("Could not intersect as a 3d shape");
    return newShape;
  }

  /**
   * Hollows out the current shape, removing the faces found by the `filter` and
   * keeping a border of `thickness`
   *
   * @category Shape Modifications
   */
  shell(
    config: { filter: FaceFinder; thickness: number },
    tolerance?: number
  ): Shape3D;
  shell(
    thickness: number,
    finderFcn: (f: FaceFinder) => FaceFinder,
    tolerance?: number
  ): Shape3D;
  shell(
    thicknessOrConfig: { filter: FaceFinder; thickness: number } | number,
    toleranceOrFinderFcn:
      | null
      | number
      | ((f: FaceFinder) => FaceFinder) = null,
    tolerance = 1e-3
  ): Shape3D {
    const tol =
      typeof toleranceOrFinderFcn === "number"
        ? toleranceOrFinderFcn
        : tolerance;
    let filter;
    let thickness;

    if (typeof thicknessOrConfig === "number") {
      thickness = thicknessOrConfig;
      const ff = new FaceFinder();
      filter =
        typeof toleranceOrFinderFcn === "function"
          ? toleranceOrFinderFcn(ff)
          : ff;
    } else {
      thickness = thicknessOrConfig.thickness;
      filter = thicknessOrConfig.filter;
    }

    const r = GCWithScope();

    const filteredFaces = filter.find(this);
    const facesToRemove = r(new this.oc.TopTools_ListOfShape_1());

    filteredFaces.forEach((face: Face) => {
      facesToRemove.Append_1(face.wrapped);
    });

    const progress = r(new this.oc.Message_ProgressRange_1());
    const shellBuilder = r(new this.oc.BRepOffsetAPI_MakeThickSolid());

    shellBuilder.MakeThickSolidByJoin(
      this.wrapped,
      facesToRemove,
      -thickness,
      tol,
      this.oc.BRepOffset_Mode.BRepOffset_Skin as any,
      false,
      false,
      this.oc.GeomAbs_JoinType.GeomAbs_Arc as any,
      false,
      progress
    );
    const newShape = cast(shellBuilder.Shape());
    if (!isShape3D(newShape)) throw new Error("Could not shell as a 3d shape");

    return newShape;
  }

  protected _builderIter<R = number>(
    radiusConfigInput: RadiusConfig<R>,
    builderAdd: (r: R, edge: TopoDS_Edge) => void,
    isRadius: (r: unknown) => r is R
  ): number {
    if (isRadius(radiusConfigInput)) {
      let edgeCount = 0;
      for (const rawEdge of this._iterTopo("edge")) {
        builderAdd(radiusConfigInput, downcast(rawEdge));
        edgeCount += 1;
      }
      return edgeCount;
    }

    let radiusConfigFun: (e: Edge) => R | null;
    let finalize: null | (() => void) = null;

    if (typeof radiusConfigInput === "function") {
      radiusConfigFun = radiusConfigInput;
    } else {
      radiusConfigFun = (element: Edge) => {
        const shouldKeep = radiusConfigInput.filter.shouldKeep(element);
        return shouldKeep ? radiusConfigInput.radius || (1 as R) : null;
      };

      if (radiusConfigInput.filter && !radiusConfigInput.keep) {
        finalize = () => radiusConfigInput.filter.delete();
      }
    }

    let edgeAddedCount = 0;
    for (const e of this._iterTopo("edge")) {
      const rawEdge = downcast(e);
      const edge = new Edge(rawEdge);
      const radius = radiusConfigFun(edge);
      if (radius) {
        builderAdd(radius, rawEdge);
        edgeAddedCount += 1;
      }
      edge.delete();
    }
    finalize && finalize();
    return edgeAddedCount;
  }

  /**
   * Creates a new shapes with some edges filletted, as specified in the
   * radius config.
   *
   * If the radius is a filter finder object (with an EdgeFinder as filter,
   * and a radius to specifiy the fillet radius), the fillet will only be
   * applied to the edges as selected by the finder. The finder will be
   * deleted unless it is explicitly specified to `keep` it.
   *
   * If the radius is a number all the edges will be filletted.
   *
   * If the radius is a function edges will be filletted according to the
   * value returned by the function (0 or null will not add any fillet).
   *
   * @category Shape Modifications
   */
  fillet(
    radiusConfig: RadiusConfig<FilletRadius>,
    filter?: (e: EdgeFinder) => EdgeFinder
  ): Shape3D {
    const r = GCWithScope();

    const filletBuilder = r(
      new this.oc.BRepFilletAPI_MakeFillet(
        this.wrapped,
        this.oc.ChFi3d_FilletShape.ChFi3d_Rational as any
      )
    );

    let config = radiusConfig;
    if (isFilletRadius(radiusConfig) && filter) {
      config = {
        radius: radiusConfig,
        filter: filter(new EdgeFinder()),
      };
    }

    const edgesFound = this._builderIter(
      config,
      (r, e) => {
        if (isNumber(r)) return filletBuilder.Add_2(r, e);
        console.log(e);
        return filletBuilder.Add_3(r[0], r[1], e);
      },
      isFilletRadius
    );
    if (!edgesFound) throw new Error("Could not fillet, no edge was selected");

    const newShape = cast(filletBuilder.Shape());
    if (!isShape3D(newShape)) throw new Error("Could not fillet as a 3d shape");
    return newShape;
  }

  /**
   * Creates a new shapes with some edges chamfered, as specified in the
   * radius config.
   *
   * If the radius is a filter finder object (with an EdgeFinder as filter,
   * and a radius to specifiy the chamfer radius), the fillet will only be
   * applied to the edges as selected by the finder. The finder will be
   * deleted unless it is explicitly specified to `keep` it.
   *
   * If the radius is a number all the edges will be chamfered.
   *
   * If the radius is a function edges will be chamfered according to the
   * value returned by the function (0 or null will not add any chamfer).
   *
   * @category Shape Modifications
   */
  chamfer(
    radiusConfig: RadiusConfig<ChamferRadius>,
    filter?: (e: EdgeFinder) => EdgeFinder
  ): Shape3D {
    const r = GCWithScope();

    const chamferBuilder = r(
      new this.oc.BRepFilletAPI_MakeChamfer(this.wrapped)
    );

    let config = radiusConfig;

    if (isChamferRadius(radiusConfig) && filter) {
      config = {
        radius: radiusConfig,
        filter: filter(new EdgeFinder()),
      };
    }
    const edgesFound = this._builderIter(
      config,
      (r, e) => {
        if (isNumber(r)) return chamferBuilder.Add_2(r, e);

        const finder = new FaceFinder();
        const face = r.selectedFace(finder).find(this, { unique: true });
        if (!face) throw new Error("Could not find face for chamfer");

        if ("distances" in r) {
          return chamferBuilder.Add_3(
            r.distances[0] ?? 1,
            r.distances[1] ?? 1,
            e,
            face.wrapped
          );
        }

        if ("distance" in r) {
          return chamferBuilder.AddDA(
            r.distance,
            r.angle * DEG2RAD,
            e,
            face.wrapped
          );
        }
      },
      isChamferRadius
    );
    if (!edgesFound) throw new Error("Could not chamfer, no edge was selected");

    const newShape = cast(chamferBuilder.Shape());
    if (!isShape3D(newShape))
      throw new Error("Could not chamfer as a 3d shape");
    return newShape;
  }
}

export class Shell extends _3DShape<TopoDS_Shell> {}
export class Solid extends _3DShape<TopoDS_Solid> {}
export class CompSolid extends _3DShape<TopoDS_CompSolid> {}
export class Compound extends _3DShape<TopoDS_Compound> {}

export type Shape3D = Shell | Solid | CompSolid | Compound;
export function isShape3D(shape: AnyShape): shape is Shape3D {
  return (
    shape instanceof Shell ||
    shape instanceof Solid ||
    shape instanceof CompSolid ||
    shape instanceof Compound
  );
}

export function isWire(shape: AnyShape): shape is Wire {
  return shape instanceof Wire;
}

export function downcast(shape: TopoDS_Shape): GenericTopo {
  const oc = getOC();
  const ta = oc.TopAbs_ShapeEnum;

  const CAST_MAP = new Map([
    [ta.TopAbs_VERTEX, oc.TopoDS.Vertex_1],
    [ta.TopAbs_EDGE, oc.TopoDS.Edge_1],
    [ta.TopAbs_WIRE, oc.TopoDS.Wire_1],
    [ta.TopAbs_FACE, oc.TopoDS.Face_1],
    [ta.TopAbs_SHELL, oc.TopoDS.Shell_1],
    [ta.TopAbs_SOLID, oc.TopoDS.Solid_1],
    [ta.TopAbs_COMPSOLID, oc.TopoDS.CompSolid_1],
    [ta.TopAbs_COMPOUND, oc.TopoDS.Compound_1],
  ]);

  const myType = shapeType(shape);
  const caster = CAST_MAP.get(myType);
  if (!caster) throw new Error("Could not find a wrapper for this shape type");
  return caster(shape);
}

export function cast(shape: TopoDS_Shape): AnyShape {
  const oc = getOC();
  const ta = oc.TopAbs_ShapeEnum;

  // @ts-expect-error forcing TS to work with occt weird types
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

  const Klass = CAST_MAP.get(shapeType(shape));

  if (!Klass) throw new Error(`Could not find a wrapper for this shape type`);
  return new Klass(downcast(shape));
}
