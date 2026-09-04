/**
 * Shape functions: the functional layer under replicad's shape classes.
 *
 * Every function here operates directly on OpenCascade topological shapes
 * (`TopoDS_*`), or on any object wrapping one (such as replicad's own `Shape`
 * classes). They hold no state and build no wrappers, which makes them usable
 * on their own, without pulling the class hierarchy in.
 *
 * They are available as a separate entry point:
 *
 * ```js
 * import { fuseShapes } from "replicad/shape-functions";
 * ```
 */

export * from "./shapeInput.js";
export * from "./topology.js";
export * from "./casting.js";
export * from "./geometry.js";
export * from "./faceGeometry.js";
export * from "./mesh.js";
export * from "./export.js";
export * from "./operations.js";
export * from "./edgeOperations.js";
