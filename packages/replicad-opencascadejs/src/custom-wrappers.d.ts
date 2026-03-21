/**
 * Custom wrapper classes from additionalCppCode.
 * These are compiled into the WASM but not auto-generated in the d.ts.
 * Appended post-build to both replicad_single.d.ts and replicad_with_exceptions.d.ts.
 */

export declare class OCJS_ShapeHasher {
  static HashCode(shape: TopoDS_Shape, upperBound: number): number;
  delete(): void;
}

export declare class BRepToolsWrapper {
  static Write(shape: TopoDS_Shape): string;
  static Read(data: string): TopoDS_Shape;
  delete(): void;
}

export declare class GeomToolsWrapper {
  static Write(geometry: Geom2d_Curve): string;
  static Read(data: string): Geom2d_Curve;
  delete(): void;
}
