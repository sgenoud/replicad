import type {
  Quantity_ColorRGBA,
  TCollection_ExtendedString,
  TDocStd_Document,
} from "replicad-opencascadejs";
import { uuidv } from "../utils/uuid";
import { getOC } from "../oclib";
import { AnyShape } from "../shapes";
import { GCWithScope, WrappingObj } from "../register";

const wrapString = (str: string): TCollection_ExtendedString => {
  const oc = getOC();
  return new oc.TCollection_ExtendedString_2(str, true);
};

function parseSlice(hex: string, index: number): number {
  return parseInt(hex.slice(index * 2, (index + 1) * 2), 16);
}
function colorFromHex(hex: string): [number, number, number] {
  let color = hex;
  if (color.indexOf("#") === 0) color = color.slice(1);

  if (color.length === 3) {
    color = color.replace(/([0-9a-f])/gi, "$1$1");
  }

  return [parseSlice(color, 0), parseSlice(color, 1), parseSlice(color, 2)];
}

const wrapColor = (hex: string, alpha = 1): Quantity_ColorRGBA => {
  const oc = getOC();
  const [r, g, b] = colorFromHex(hex);

  return new oc.Quantity_ColorRGBA_5(r / 255, g / 255, b / 255, alpha);
};

export class AssemblyExporter extends WrappingObj<TDocStd_Document> {}

type ShapeConfig = {
  shape: AnyShape;
  color?: string;
  alpha?: number;
  name?: string;
};

export function createAssembly(shapes: ShapeConfig[] = []): AssemblyExporter {
  const oc = getOC();

  const doc = new oc.TDocStd_Document(wrapString("XmlOcaf"));

  oc.XCAFDoc_ShapeTool.SetAutoNaming(false);

  const mainLabel = doc.Main();

  const tool = oc.XCAFDoc_DocumentTool.ShapeTool(mainLabel).get();
  const ctool = oc.XCAFDoc_DocumentTool.ColorTool(mainLabel).get();

  for (const { shape, name, color, alpha } of shapes) {
    const shapeNode = tool.NewShape();

    tool.SetShape(shapeNode, shape.wrapped);

    oc.TDataStd_Name.Set_1(shapeNode, wrapString(name || uuidv()));

    ctool.SetColor_3(
      shapeNode,
      wrapColor(color || "#f00", alpha ?? 1),
      // @ts-expect-error the type system does not work for these
      oc.XCAFDoc_ColorType.XCAFDoc_ColorSurf
    );
  }

  tool.UpdateAssemblies();

  return new AssemblyExporter(doc);
}

export type SupportedUnit =
  | "M"
  | "CM"
  | "MM"
  | "INCH"
  | "FT"
  | "m"
  | "mm"
  | "cm"
  | "inch"
  | "ft";

export function exportSTEP(
  shapes: ShapeConfig[] = [],
  { unit, modelUnit }: { unit?: SupportedUnit; modelUnit?: SupportedUnit } = {}
): Blob {
  const oc = getOC();
  const r = GCWithScope();

  const doc = createAssembly(shapes);

  if (unit || modelUnit) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dummy = r(new oc.STEPCAFControl_Writer_1());

    oc.Interface_Static.SetCVal(
      "xstep.cascade.unit",
      (modelUnit || unit || "MM").toUpperCase()
    );
    oc.Interface_Static.SetCVal(
      "write.step.unit",
      (unit || modelUnit || "MM").toUpperCase()
    );
  }

  const session = r(new oc.XSControl_WorkSession());
  const writer = r(
    new oc.STEPCAFControl_Writer_2(
      r(new oc.Handle_XSControl_WorkSession_2(session)),
      false
    )
  );
  writer.SetColorMode(true);
  writer.SetLayerMode(true);
  writer.SetNameMode(true);
  oc.Interface_Static.SetIVal("write.surfacecurve.mode", true);
  oc.Interface_Static.SetIVal("write.precision.mode", 0);
  oc.Interface_Static.SetIVal("write.step.assembly", 2);
  oc.Interface_Static.SetIVal("write.step.schema", 5);

  const progress = r(new oc.Message_ProgressRange_1());
  writer.Transfer_1(
    new oc.Handle_TDocStd_Document_2(doc.wrapped),
    // @ts-expect-error the type system does not work for these
    oc.STEPControl_StepModelType.STEPControl_AsIs,
    null,
    progress
  );

  const filename = "export.step";
  const done = writer.Write(filename);

  if (done === oc.IFSelect_ReturnStatus.IFSelect_RetDone) {
    // Read the STEP File from the filesystem and clean up
    const file = oc.FS.readFile("/" + filename);
    oc.FS.unlink("/" + filename);

    // Return the contents of the STEP File
    const blob = new Blob([file], { type: "application/STEP" });
    return blob;
  } else {
    throw new Error("WRITE STEP FILE FAILED.");
  }
}
