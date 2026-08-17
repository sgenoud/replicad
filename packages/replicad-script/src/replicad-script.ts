import * as _replicad from "replicad";

export type ShapeConfig = {
  shape: _replicad.AnyShape;
  name?: string;
  color?: string;
  opacity?: number;
};

export type ShapesConfig =
  | _replicad.AnyShape
  | ShapeConfig
  | (_replicad.AnyShape | ShapeConfig)[];
  
declare global {
  export const replicad: typeof _replicad;
};
