import type { TopoDS_Shape } from "replicad-opencascadejs";

import {
  downcast,
  shapeType,
  topologyKind,
  type TopologyKind,
} from "./topology.js";

export type ShapeConstructors<T> = {
  [K in TopologyKind]: new (shape: any) => T;
};

/**
 * Builds a cast function from the concrete wrappers to instantiate.
 *
 * This keeps the casting module independent from the wrapper classes, while
 * letting the caller keep the mapping fully typed.
 */
export function makeCaster<T>(
  constructors: ShapeConstructors<T>
): (shape: TopoDS_Shape) => T {
  return (shape: TopoDS_Shape) => {
    const kind = topologyKind(shape);
    if (!kind)
      throw new Error(`Unsupported topology type: ${shapeType(shape)}`);

    return new constructors[kind](downcast(shape));
  };
}
