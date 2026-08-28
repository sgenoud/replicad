import type { TopoDS_Shape } from "replicad-opencascadejs";

export interface WrappedTopoShape<Type extends TopoDS_Shape = TopoDS_Shape> {
  readonly wrapped: Type;
}

export type ShapeInput<Type extends TopoDS_Shape = TopoDS_Shape> =
  | Type
  | WrappedTopoShape<Type>;

export const unwrapShape = <Type extends TopoDS_Shape>(
  shape: ShapeInput<Type>
): Type => {
  return "wrapped" in shape ? shape.wrapped : shape;
};
