import { WrappingObj } from "./register.js";
import {
  Vector,
  Point,
  Direction,
  Plane,
  PlaneName,
  BoundingBox,
} from "./geom.js";
import type { Shape3DLike } from "./shapeInterfaces.js";
import { HASH_CODE_MAX } from "./constants.js";
import { getOC } from "./oclib.js";
import { getManifold } from "./manifoldlib.js";
import { MeshShape } from "./meshShapes.js";
import {
  mesh as extractShapeMesh,
  meshEdges as extractShapeEdgeMesh,
  triangulateFace,
  type FaceTriangulation,
  type MeshOptions,
  type ShapeEdgeMesh,
  type ShapeMesh,
} from "./shapeFunctions/mesh.js";
import {
  deserializeTopoShape,
  exportShapeSTEP,
  exportShapeSTL,
  serializeShape,
  type STLExportOptions,
} from "./shapeFunctions/export.js";
import {
  Curve,
  Surface,
  type CurveLike,
  type SurfaceType,
} from "./shapeFunctions/geometry.js";
import {
  faceCenter,
  faceNormalAt,
  faceUVBounds,
  faceUVCoordinates,
  pointOnFace,
  type FaceUVBounds,
} from "./shapeFunctions/faceGeometry.js";
import {
  cutShape,
  draftShape,
  fuseShapes,
  intersectShapes,
  shellShape,
  type BooleanOperationOptions,
} from "./shapeFunctions/operations.js";
import {
  chamferShape,
  filletShape,
  isFilletRadius,
  mapSelectedEdges,
  selectEdgeRadii,
  type ChamferEdgeConfig,
  type FilletRadius,
} from "./shapeFunctions/edgeOperations.js";
import { downcast, iterTopo, shapeType } from "./shapeFunctions/topology.js";
import { makeCaster } from "./shapeFunctions/casting.js";

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
  Adaptor3d_Surface,
  BRepAdaptor_Curve,
  BRepAdaptor_CompCurve,
} from "replicad-opencascadejs";
import {
  EdgeFinder,
  FaceFinder,
  type FinderFunction,
} from "./finders/index.js";
import { rotate, translate, mirror, scale as scaleShape } from "./geomHelpers";
import type { CurveType } from "./definitionMaps";

export { Curve, Surface };
export type { CurveLike, CurveType, SurfaceType };

export type AnyShape =
  | Vertex
  | Edge
  | Wire
  | Face
  | Shell
  | Solid
  | CompSolid
  | Compound;

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
      selectedFace: FinderFunction<FaceFinder, AnyShape>;
    }
  | {
      distance: number;
      angle: number;
      selectedFace: FinderFunction<FaceFinder, AnyShape>;
    };

export type { FilletRadius };

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

export { downcast, iterTopo, shapeType };
export type { TopoEntity, TopologyMap } from "./shapeFunctions/topology.js";

/**
 * The types naming this module's own API surface. The functions they belong to
 * live in the `replicad/shape-functions` entry point.
 */
export type {
  BooleanOperationOptions,
  FaceTriangulation,
  FaceUVBounds,
  MeshOptions,
  ShapeEdgeMesh,
  ShapeMesh,
  STLExportOptions,
};

export function deserializeShape(data: string): AnyShape {
  return cast(deserializeTopoShape(data));
}

export class Shape<Type extends TopoDS_Shape> extends WrappingObj<Type> {
  constructor(ocShape: Type) {
    super(ocShape);
  }

  clone(): this {
    return new (<any>this.constructor)(downcast(this.wrapped));
  }

  serialize(): string {
    return serializeShape(this.wrapped);
  }

  get hashCode(): number {
    return this.oc.ReplicadShapeHasher.HashCode(this.wrapped, HASH_CODE_MAX);
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
   * Asserts that this shape is a 3D shape (Shell, Solid, CompSolid, or
   * Compound) and returns it typed as Shape3D. Throws if the shape is not 3D.
   *
   * Useful for chaining after operations that return a generic shape type.
   *
   */
  asShape3D(): Shape3D {
    if (isShape3D(this as unknown as AnyShape)) {
      return this as unknown as Shape3D;
    }
    throw new Error("Shape is not a 3D shape");
  }

  /**
   * Simplifies the shape by removing unnecessary edges and faces
   */
  simplify(): this {
    const oc = getOC();
    const shapeUpgrader = new oc.ShapeUpgrade_UnifySameDomain(
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
    direction: Direction = [0, 0, 1]
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

  get edges(): Edge[] {
    return Array.from(iterTopo(this.wrapped, "edge"), (edge) => new Edge(edge));
  }

  get faces(): Face[] {
    return Array.from(iterTopo(this.wrapped, "face"), (face) => new Face(face));
  }

  get wires(): Wire[] {
    return Array.from(iterTopo(this.wrapped, "wire"), (wire) => new Wire(wire));
  }

  get boundingBox(): BoundingBox {
    const bbox = new BoundingBox();
    this.oc.BRepBndLib.Add(this.wrapped, bbox.wrapped, true);
    return bbox;
  }

  /**
   * Exports the current shape as a set of triangle. These can be used by threejs
   * for instance to represent the the shape
   *
   * @category Shape Export
   */
  mesh(options: MeshOptions = {}): ShapeMesh {
    return extractShapeMesh(this.wrapped, options);
  }

  /**
   * Exports the current shape as a set of lines. These can be used by threejs
   * for instance to represent the edges of the shape
   *
   * @category Shape Export
   */
  meshEdges(options: MeshOptions = {}): ShapeEdgeMesh {
    return extractShapeEdgeMesh(this.wrapped, options);
  }

  /**
   * Exports the current shape as a STEP file as a Blob
   *
   * @category Shape Export
   */
  blobSTEP(): Blob {
    return exportShapeSTEP(this.wrapped);
  }

  /**
   * Exports the current shape as a STL file as a Blob
   *
   * In order to create a STL file, the shape needs to be meshed. The
   * tolerances correspond to the values used to mesh the shape.
   *
   * @category Shape Export
   */
  blobSTL(options: STLExportOptions = {}): Blob {
    return exportShapeSTL(this.wrapped, options);
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
    const properties = new this.oc.GProp_GProps();
    this.oc.BRepGProp.LinearProperties(this.wrapped, properties, true, false);

    const length = properties.Mass();
    properties.delete();
    return length;
  }

  get orientation(): "forward" | "backward" {
    const orient = this.wrapped.Orientation();
    if (orient === this.oc.TopAbs_Orientation.TopAbs_FORWARD) return "forward";
    return "backward";
  }

  flipOrientation(): Type {
    const flipped = this.wrapped.Reversed();
    return cast(flipped) as unknown as Type;
  }
}

export class Edge extends _1DShape<TopoDS_Edge> {
  protected _geomAdaptor(): BRepAdaptor_Curve {
    return new this.oc.BRepAdaptor_Curve(this.wrapped);
  }
}

export class Wire extends _1DShape<TopoDS_Wire> {
  protected _geomAdaptor(): BRepAdaptor_CompCurve {
    return new this.oc.BRepAdaptor_CompCurve(this.wrapped, false);
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

    const offsetter = new this.oc.BRepOffsetAPI_MakeOffset(
      this.wrapped,
      kinds[kind],
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
export class Face extends Shape<TopoDS_Face> {
  protected _geomAdaptor(): Adaptor3d_Surface {
    return new this.oc.BRepAdaptor_Surface(this.wrapped, false);
  }

  get surface(): Surface {
    return new Surface(this._geomAdaptor());
  }

  get orientation(): "forward" | "backward" {
    const orient = this.wrapped.Orientation();
    if (orient === this.oc.TopAbs_Orientation.TopAbs_FORWARD) return "forward";
    return "backward";
  }

  flipOrientation(): Face {
    const flipped = this.wrapped.Reversed();
    return cast(flipped) as Face;
  }

  get geomType(): SurfaceType {
    const surface = this.surface;
    const geomType = surface.surfaceType;
    surface.delete();
    return geomType;
  }

  get UVBounds(): FaceUVBounds {
    return faceUVBounds(this.wrapped);
  }

  pointOnSurface(u: number, v: number): Vector {
    return pointOnFace(this.wrapped, u, v);
  }

  uvCoordinates(point: Point): [number, number] {
    return faceUVCoordinates(this.wrapped, point);
  }

  normalAt(locationVector?: Point): Vector {
    return faceNormalAt(this.wrapped, locationVector);
  }

  get center(): Vector {
    return faceCenter(this.wrapped);
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
    return triangulateFace(this.wrapped, index0);
  }
}

export class _3DShape<Type extends TopoDS_Shape>
  extends Shape<Type>
  implements
    Shape3DLike<
      Shape3D,
      ShapeMesh,
      AnyShape,
      { tolerance?: number; angularTolerance?: number }
    >
{
  /**
   * Builds a new shape out of the two, fused, shapes
   *
   * @category Shape Modifications
   */
  fuse(other: Shape3D, options: BooleanOperationOptions = {}): Shape3D {
    const newShape = cast(fuseShapes(this.wrapped, other.wrapped, options));
    if (!isShape3D(newShape)) throw new Error("Could not fuse as a 3d shape");
    return newShape;
  }

  /**
   * Builds a new shape by removing the tool tape from this shape
   *
   * @category Shape Modifications
   */
  cut(tool: Shape3D, options: BooleanOperationOptions = {}): Shape3D {
    const newShape = cast(cutShape(this.wrapped, tool.wrapped, options));
    if (!isShape3D(newShape)) throw new Error("Could not cut as a 3d shape");
    return newShape;
  }

  /**
   * Builds a new shape by intersecting this shape and another
   *
   * @category Shape Modifications
   */
  intersect(tool: AnyShape): Shape3D {
    const newShape = cast(intersectShapes(this.wrapped, tool.wrapped));
    if (!isShape3D(newShape))
      throw new Error("Could not intersect as a 3d shape");
    return newShape;
  }

  meshShape(options?: {
    tolerance?: number;
    angularTolerance?: number;
  }): MeshShape {
    const { triangles, vertices } = this.mesh(options);
    const tol = options?.tolerance ?? 1e-6;
    const scale = tol === 0 ? 0 : 1 / tol;
    const keyFor = (x: number, y: number, z: number): string => {
      if (scale === 0) return `${x}|${y}|${z}`;
      return `${Math.round(x * scale)}|${Math.round(y * scale)}|${Math.round(
        z * scale
      )}`;
    };
    const mergeFrom: number[] = [];
    const mergeTo: number[] = [];
    const seen = new Map<string, number>();
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      const z = vertices[i + 2];
      const key = keyFor(x, y, z);
      const existing = seen.get(key);
      const idx = i / 3;
      if (existing !== undefined) {
        mergeFrom.push(idx);
        mergeTo.push(existing);
      } else {
        seen.set(key, idx);
      }
    }
    const numProp = 3;
    const vertProperties = new Float32Array(vertices);
    const meshData = {
      vertProperties,
      triVerts: new Uint32Array(triangles),
      numProp,
      mergeFromVert: mergeFrom.length ? new Uint32Array(mergeFrom) : undefined,
      mergeToVert: mergeTo.length ? new Uint32Array(mergeTo) : undefined,
    };

    const manifold = getManifold();
    const mesh = new manifold.Mesh(meshData);
    const manifoldShape = new manifold.Manifold(mesh);
    return new MeshShape(manifoldShape);
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
    finderFcn: FinderFunction<FaceFinder, AnyShape>,
    tolerance?: number
  ): Shape3D;
  shell(
    thicknessOrConfig: { filter: FaceFinder; thickness: number } | number,
    toleranceOrFinderFcn:
      | null
      | number
      | FinderFunction<FaceFinder, AnyShape> = null,
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
          ? toleranceOrFinderFcn(ff, this)
          : ff;
    } else {
      thickness = thicknessOrConfig.thickness;
      filter = thicknessOrConfig.filter;
    }

    const filteredFaces = filter.find(this);
    const newShape = cast(
      shellShape(this.wrapped, {
        faces: filteredFaces,
        thickness,
        tolerance: tol,
      })
    );
    if (!isShape3D(newShape)) throw new Error("Could not shell as a 3d shape");

    return newShape;
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
    filter?: FinderFunction<EdgeFinder, AnyShape>
  ): Shape3D {
    let config = radiusConfig;
    if (isFilletRadius(radiusConfig) && filter) {
      config = {
        radius: radiusConfig,
        filter: filter(new EdgeFinder(), this),
      };
    }

    const selectedEdges = selectEdgeRadii(
      this.wrapped,
      config,
      isFilletRadius,
      (edge) => new Edge(edge)
    );
    const newShape = cast(filletShape(this.wrapped, selectedEdges));
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
    filter?: FinderFunction<EdgeFinder, AnyShape>
  ): Shape3D {
    let config = radiusConfig;

    if (isChamferRadius(radiusConfig) && filter) {
      config = {
        radius: radiusConfig,
        filter: filter(new EdgeFinder(), this),
      };
    }

    const selectedEdges = selectEdgeRadii(
      this.wrapped,
      config,
      isChamferRadius,
      (edge) => new Edge(edge)
    );
    const chamfers = mapSelectedEdges(
      selectedEdges,
      ({ radius, edge }): ChamferEdgeConfig => {
        if (typeof radius === "number") return { radius, edge };

        const face = radius
          .selectedFace(new FaceFinder(), this)
          .find(this, { unique: true });
        if (!face) throw new Error("Could not find face for chamfer");

        return "distances" in radius
          ? { edge, face, distances: radius.distances }
          : {
              edge,
              face,
              distance: radius.distance,
              angle: radius.angle,
            };
      }
    );
    const newShape = cast(chamferShape(this.wrapped, chamfers));

    if (!isShape3D(newShape))
      throw new Error("Could not chamfer as a 3d shape");
    return newShape;
  }

  /**
   * Applies a draft angle to selected faces of the shape.
   *
   * A draft angle is a taper applied to faces, commonly used in moulding
   * and casting to allow parts to be released from a mould. The selected
   * faces are tilted by the given angle relative to the neutral plane.
   *
   * The face finder function receives a `FaceFinder` and should return it
   * with the desired filters applied to select which faces to draft.
   *
   * The neutral plane defines the reference from which the draft angle is
   * measured — faces are unchanged where they intersect this plane and
   * taper away from it.
   *
   * @category Shape Modifications
   */
  draft(
    angle: number,
    faceFinder: FinderFunction<FaceFinder, AnyShape>,
    neutralPlane: Plane | PlaneName = "XY"
  ): Shape3D {
    const faces = faceFinder(new FaceFinder(), this).find(this);
    const newShape = cast(
      draftShape(this.wrapped, { faces, angle, neutralPlane })
    );
    if (!isShape3D(newShape)) throw new Error("Could not draft as a 3d shape");
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

export const cast = makeCaster<AnyShape>({
  vertex: Vertex,
  edge: Edge,
  wire: Wire,
  face: Face,
  shell: Shell,
  solid: Solid,
  solidCompound: CompSolid,
  compound: Compound,
});
