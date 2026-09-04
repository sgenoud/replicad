import {
  OpenCascadeInstance,
  TopAbs_ShapeEnum,
  TopoDS_Compound,
  TopoDS_CompSolid,
  TopoDS_Edge,
  TopoDS_Face,
  TopoDS_Shape,
  TopoDS_Shell,
  TopoDS_Solid,
  TopoDS_Vertex,
  TopoDS_Wire,
} from "replicad-opencascadejs";

import { getOC } from "../oclib.js";

const TOPOLOGY_KINDS = [
  "vertex",
  "edge",
  "wire",
  "face",
  "shell",
  "solid",
  "solidCompound",
  "compound",
] as const;

export type TopologyKind = (typeof TOPOLOGY_KINDS)[number];
export type TopoEntity = TopologyKind | "shape";

export interface TopologyMap {
  vertex: TopoDS_Vertex;
  edge: TopoDS_Edge;
  wire: TopoDS_Wire;
  face: TopoDS_Face;
  shell: TopoDS_Shell;
  solid: TopoDS_Solid;
  solidCompound: TopoDS_CompSolid;
  compound: TopoDS_Compound;
  shape: TopoDS_Shape;
}

export type GenericTopo = TopologyMap[TopoEntity];

type DowncastMap = {
  [Entity in TopoEntity]: (shape: TopoDS_Shape) => TopologyMap[Entity];
};

interface TopologyDefinitions {
  shapeEnum: Record<TopoEntity, TopAbs_ShapeEnum>;
  kindOf: Map<TopAbs_ShapeEnum, TopologyKind>;
  downcast: DowncastMap;
}

const buildDefinitions = (oc: OpenCascadeInstance): TopologyDefinitions => {
  const ta = oc.TopAbs_ShapeEnum;

  const shapeEnum: Record<TopoEntity, TopAbs_ShapeEnum> = {
    vertex: ta.TopAbs_VERTEX,
    edge: ta.TopAbs_EDGE,
    wire: ta.TopAbs_WIRE,
    face: ta.TopAbs_FACE,
    shell: ta.TopAbs_SHELL,
    solid: ta.TopAbs_SOLID,
    solidCompound: ta.TopAbs_COMPSOLID,
    compound: ta.TopAbs_COMPOUND,
    shape: ta.TopAbs_SHAPE,
  };

  return {
    shapeEnum,
    kindOf: new Map(TOPOLOGY_KINDS.map((kind) => [shapeEnum[kind], kind])),
    downcast: {
      shape: (shape) => shape,
      vertex: (shape) => oc.TopoDS.Vertex(shape),
      edge: (shape) => oc.TopoDS.Edge(shape),
      wire: (shape) => oc.TopoDS.Wire(shape),
      face: (shape) => oc.TopoDS.Face(shape),
      shell: (shape) => oc.TopoDS.Shell(shape),
      solid: (shape) => oc.TopoDS.Solid(shape),
      solidCompound: (shape) => oc.ReplicadShapeCaster.CompSolid(shape),
      compound: (shape) => oc.TopoDS.Compound(shape),
    },
  };
};

let cache: {
  oc: OpenCascadeInstance;
  definitions: TopologyDefinitions;
} | null = null;

/* The tables are derived from the loaded opencascade instance, so they are
 * rebuilt whenever that instance changes - but not on every call, as downcast
 * runs once per sub shape on big shapes. */
const definitions = (): TopologyDefinitions => {
  const oc = getOC();
  if (cache?.oc !== oc) cache = { oc, definitions: buildDefinitions(oc) };
  return cache.definitions;
};

const asTopo = (entity: TopoEntity): TopAbs_ShapeEnum =>
  definitions().shapeEnum[entity];

const downcastTo = <Entity extends TopoEntity>(
  shape: TopoDS_Shape,
  entity: Entity
): TopologyMap[Entity] => definitions().downcast[entity](shape);

export function* iterTopo<Entity extends TopoEntity>(
  shape: TopoDS_Shape,
  topo: Entity
): IterableIterator<TopologyMap[Entity]> {
  const oc = getOC();
  const explorer = new oc.TopExp_Explorer(shape, asTopo(topo), asTopo("shape"));
  try {
    const seen: TopoDS_Shape[] = [];
    while (explorer.More()) {
      const item = explorer.Current();
      const isDuplicate = seen.some((s) => s.IsSame(item));
      if (!isDuplicate) {
        seen.push(item);
        yield downcastTo(item, topo);
      }
      explorer.Next();
    }
  } finally {
    explorer.delete();
  }
}

export const shapeType = (shape: TopoDS_Shape): TopAbs_ShapeEnum => {
  if (shape.IsNull()) throw new Error("This shape has not type, it is null");
  return shape.ShapeType();
};

export function topologyKind(shape: TopoDS_Shape): TopologyKind | undefined {
  return definitions().kindOf.get(shapeType(shape));
}

export function downcast(shape: TopoDS_Shape): GenericTopo {
  const kind = topologyKind(shape);
  if (!kind) throw new Error(`Unsupported topology type: ${shapeType(shape)}`);

  return definitions().downcast[kind](shape);
}
