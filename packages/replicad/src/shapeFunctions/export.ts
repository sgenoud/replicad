import type { TopoDS_Shape } from "replicad-opencascadejs";

import { getOC } from "../oclib.js";
import { prepareShapeForMesh, type MeshOptions } from "./mesh.js";
import { unwrapShape, type ShapeInput } from "./shapeInput.js";

export interface STLExportOptions extends MeshOptions {
  binary?: boolean;
}

/**
 * Serializes a shape to OpenCascade's BRep text representation.
 *
 * @category Shape Export
 */
export function serializeShape(shapeInput: ShapeInput): string {
  const oc = getOC();
  return oc.BRepToolsWrapper.Write(unwrapShape(shapeInput));
}

export function deserializeTopoShape(data: string): TopoDS_Shape {
  return getOC().BRepToolsWrapper.Read(data);
}

/**
 * Exports a single shape as a STEP file.
 *
 * For named or colored assemblies, use `exportSTEP` instead.
 *
 * @category Shape Export
 */
export function exportShapeSTEP(shapeInput: ShapeInput): Blob {
  const oc = getOC();
  const shape = unwrapShape(shapeInput);
  const filename = "blob.step";
  const writer = new oc.STEPControl_Writer();

  oc.Interface_Static.SetIVal("write.step.schema", 5);
  const progress = new oc.Message_ProgressRange();

  writer.Transfer(
    shape,
    oc.STEPControl_StepModelType.STEPControl_AsIs,
    true,
    progress
  );

  const done = writer.Write(filename);
  writer.delete();
  progress.delete();

  if (done === oc.IFSelect_ReturnStatus.IFSelect_RetDone) {
    const file = oc.FS.readFile("/" + filename);
    oc.FS.unlink("/" + filename);
    return new Blob([file as BlobPart], { type: "application/STEP" });
  }

  throw new Error("WRITE STEP FILE FAILED.");
}

/**
 * Exports a shape as an STL file.
 *
 * @category Shape Export
 */
export function exportShapeSTL(
  shapeInput: ShapeInput,
  {
    tolerance = 1e-3,
    angularTolerance = 0.1,
    binary = false,
  }: STLExportOptions = {}
): Blob {
  const oc = getOC();
  const shape = unwrapShape(shapeInput);

  prepareShapeForMesh(shape, { tolerance, angularTolerance });
  const filename = "blob.stl";
  const done = oc.StlAPI.Write(shape, filename, !binary);

  if (done) {
    const file = oc.FS.readFile("/" + filename);
    oc.FS.unlink("/" + filename);
    return new Blob([file as BlobPart], { type: "application/sla" });
  }

  throw new Error("WRITE STL FILE FAILED.");
}
