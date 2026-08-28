import type {
  TopoDS_Edge,
  TopoDS_Face,
  TopoDS_Shape,
} from "replicad-opencascadejs";

import { DEG2RAD } from "./constants.js";
import { getOC } from "./oclib.js";
import { GCWithScope, type Deletable } from "./register.js";
import { unwrapShape, type ShapeInput } from "./shapeInternals/shapeInput.js";
import { iterTopo } from "./shapeInternals/topology.js";

export type FilletRadius = number | [number, number];

export interface EdgeFilter<EdgeType> extends Deletable {
  shouldKeep(edge: EdgeType): boolean;
}

export type EdgeRadiusConfig<R, EdgeType> =
  | ((edge: EdgeType) => R | null)
  | R
  | { filter: EdgeFilter<EdgeType>; radius: R; keep?: boolean };

export interface SelectedEdge<R> {
  edge: TopoDS_Edge;
  radius: R;
}

export interface FilletEdgeConfig {
  edge: ShapeInput<TopoDS_Edge>;
  radius: FilletRadius;
}

export type ChamferEdgeConfig =
  | {
      edge: ShapeInput<TopoDS_Edge>;
      radius: number;
    }
  | {
      edge: ShapeInput<TopoDS_Edge>;
      distances: [number, number];
      face: ShapeInput<TopoDS_Face>;
    }
  | {
      edge: ShapeInput<TopoDS_Edge>;
      distance: number;
      angle: number;
      face: ShapeInput<TopoDS_Face>;
    };

export function isFilletRadius(radius: unknown): radius is FilletRadius {
  if (typeof radius === "number") return true;
  return (
    Array.isArray(radius) &&
    radius.length === 2 &&
    radius.every((value) => typeof value === "number")
  );
}

/**
 * Normalizes a radius callback, a filter configuration, or a radius applying
 * to every edge into a lazy sequence of explicit edge/radius pairs.
 *
 * Temporary edge wrappers remain alive while each yielded value is consumed
 * and are deleted before advancing to the next edge.
 */
export function* selectEdgeRadii<R, EdgeType extends Deletable>(
  shapeInput: ShapeInput,
  radiusConfig: EdgeRadiusConfig<R, EdgeType>,
  isRadius: (radius: unknown) => radius is R,
  wrapEdge: (edge: TopoDS_Edge) => EdgeType
): IterableIterator<SelectedEdge<R>> {
  const shape = unwrapShape(shapeInput);

  if (isRadius(radiusConfig)) {
    for (const edge of iterTopo(shape, "edge")) {
      yield { edge, radius: radiusConfig };
    }
    return;
  }

  let radiusForEdge: (edge: EdgeType) => R | null;
  let filterToDelete: EdgeFilter<EdgeType> | null = null;

  if (typeof radiusConfig === "function") {
    radiusForEdge = radiusConfig;
  } else {
    radiusForEdge = (edge) =>
      radiusConfig.filter.shouldKeep(edge)
        ? radiusConfig.radius || (1 as R)
        : null;

    if (!radiusConfig.keep) filterToDelete = radiusConfig.filter;
  }

  try {
    for (const edge of iterTopo(shape, "edge")) {
      const wrappedEdge = wrapEdge(edge);
      try {
        const radius = radiusForEdge(wrappedEdge);
        if (radius) yield { edge, radius };
      } finally {
        wrappedEdge.delete();
      }
    }
  } finally {
    filterToDelete?.delete();
  }
}

export function* mapSelectedEdges<R, Result>(
  edges: Iterable<SelectedEdge<R>>,
  map: (selected: SelectedEdge<R>) => Result
): IterableIterator<Result> {
  for (const selected of edges) yield map(selected);
}

export function filletShape(
  shapeInput: ShapeInput,
  edges: Iterable<FilletEdgeConfig>
): TopoDS_Shape {
  const oc = getOC();
  const r = GCWithScope();
  const builder = r(
    new oc.BRepFilletAPI_MakeFillet(
      unwrapShape(shapeInput),
      oc.ChFi3d_FilletShape.ChFi3d_Rational
    )
  );

  let edgeCount = 0;
  for (const { radius, edge: edgeInput } of edges) {
    const edge = unwrapShape(edgeInput);
    if (typeof radius === "number") {
      builder.Add(radius, edge);
    } else {
      builder.Add(radius[0], radius[1], edge);
    }
    edgeCount += 1;
  }

  if (!edgeCount) throw new Error("Could not fillet, no edge was selected");
  return builder.Shape();
}

export function chamferShape(
  shapeInput: ShapeInput,
  edges: Iterable<ChamferEdgeConfig>
): TopoDS_Shape {
  const oc = getOC();
  const r = GCWithScope();
  const builder = r(new oc.BRepFilletAPI_MakeChamfer(unwrapShape(shapeInput)));

  let edgeCount = 0;
  for (const config of edges) {
    const edge = unwrapShape(config.edge);
    if ("radius" in config) {
      builder.Add(config.radius, edge);
    } else if ("distances" in config) {
      builder.Add(
        config.distances[0] ?? 1,
        config.distances[1] ?? 1,
        edge,
        unwrapShape(config.face)
      );
    } else {
      builder.AddDA(
        config.distance,
        config.angle * DEG2RAD,
        edge,
        unwrapShape(config.face)
      );
    }
    edgeCount += 1;
  }

  if (!edgeCount) throw new Error("Could not chamfer, no edge was selected");
  return builder.Shape();
}
