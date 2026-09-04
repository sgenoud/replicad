import Sketcher from "./Sketcher";
import FaceSketcher, { BaseSketcher2d, BlueprintSketcher } from "./Sketcher2d";

import { Point2D, BoundingBox2d, Curve2D, axis2d } from "./lib2d";
import { GenericSketcher, SplineConfig } from "./sketcherlib";

export {
  axis2d,
  Sketcher,
  BaseSketcher2d,
  FaceSketcher,
  BlueprintSketcher,
  BoundingBox2d,
  Curve2D,
};

export type { GenericSketcher, SplineConfig, Point2D };

export * from "./constants";
export * from "./oclib";
export * from "./manifoldlib";
export * from "./register";
export * from "./geom";
export * from "./geomHelpers";
export * from "./shapes";
export * from "./shapeInterfaces";
export * from "./meshShapes";
export {
  chamferShape,
  curvePointAt,
  curveTangentAt,
  curveType,
  cutShape,
  draftShape,
  exportShapeSTEP,
  exportShapeSTL,
  faceCenter,
  faceNormalAt,
  faceUVBounds,
  faceUVCoordinates,
  filletShape,
  fuseShapes,
  intersectShapes,
  mesh,
  meshEdges,
  pointOnFace,
  serializeShape,
  shellShape,
  surfaceType,
  triangulateFace,
} from "./shapeFunctions";
export type {
  BooleanOperationOptions,
  ChamferEdgeConfig,
  CurveInput,
  DraftOptions,
  FaceUVBounds,
  FilletEdgeConfig,
  MeshOptions,
  ShapeEdgeMesh,
  ShapeInput,
  ShellOptions,
  STLExportOptions,
  SurfaceInput,
  WrappedTopoShape,
} from "./shapeFunctions";
export * from "./shapeHelpers";
export * from "./measureShape";
export * from "./finders";
export * from "./shortcuts.js";
export * from "./addThickness";
export * from "./blueprints";
export * from "./sketches";
export * from "./text";
export * from "./importers";
export * from "./draw";
export * from "./projection";
export * from "./export/assemblyExporter";
