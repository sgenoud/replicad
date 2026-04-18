import type {
  Quantity_ColorRGBA,
  TCollection_ExtendedString,
  TCollection_HAsciiString,
  TDocStd_Document,
} from 'replicad-opencascadejs';
// NOTE: XCAFDoc_VisMaterial* (PBR visual materials) are deliberately omitted from
// the replicad-opencascadejs WASM build — they depend on Graphic3d/TKService which
// requires TKOpenGl (unavailable in WASM).
import { uuidv } from '../utils/uuid';
import { getOC } from '../oclib';
import { AnyShape } from '../shapes';
import { GCWithScope, WrappingObj } from '../register';

const wrapString = (str: string): TCollection_ExtendedString => {
  const oc = getOC();
  return new oc.TCollection_ExtendedString(str, true);
};

function parseSlice(hex: string, index: number): number {
  return parseInt(hex.slice(index * 2, (index + 1) * 2), 16);
}
function colorFromHex(hex: string): [number, number, number] {
  let color = hex;
  if (color.indexOf('#') === 0) color = color.slice(1);

  if (color.length === 3) {
    color = color.replace(/([0-9a-f])/gi, '$1$1');
  }

  return [parseSlice(color, 0), parseSlice(color, 1), parseSlice(color, 2)];
}

const wrapColor = (hex: string, alpha = 1): Quantity_ColorRGBA => {
  const oc = getOC();
  const [r, g, b] = colorFromHex(hex);

  return new oc.Quantity_ColorRGBA(r / 255, g / 255, b / 255, alpha);
};

export class AssemblyExporter extends WrappingObj<TDocStd_Document> {}

export type ShapeConfig = {
  shape: AnyShape;
  color?: string;
  alpha?: number;
  name?: string;
  /** PBR metallic factor — threaded to GLTF only (not STEP; see note above). */
  metallic?: number;
  /** PBR roughness factor — threaded to GLTF only (not STEP; see note above). */
  roughness?: number;
  density?: number;
};

export function createAssembly(shapes: ShapeConfig[] = []): AssemblyExporter {
  const oc = getOC();

  const doc = new oc.TDocStd_Document(wrapString('XmlOcaf'));

  oc.XCAFDoc_ShapeTool.SetAutoNaming(false);

  const mainLabel = doc.Main();

  const tool = oc.XCAFDoc_DocumentTool.ShapeTool(mainLabel);
  const ctool = oc.XCAFDoc_DocumentTool.ColorTool(mainLabel);
  const matTool = oc.XCAFDoc_DocumentTool.MaterialTool(mainLabel);

  for (const { shape, name, color, alpha, density } of shapes) {
    const shapeNode = tool.NewShape();

    tool.SetShape(shapeNode, shape.wrapped);

    oc.TDataStd_Name.Set(shapeNode, wrapString(name || uuidv()));

    ctool.SetColor(shapeNode, wrapColor(color || '#f00', alpha ?? 1), oc.XCAFDoc_ColorType.XCAFDoc_ColorSurf);

    if (density !== undefined) {
      const wrapAscii = (string_: string): TCollection_HAsciiString => new oc.TCollection_HAsciiString(string_);
      matTool.SetMaterial(
        shapeNode,
        wrapAscii(name || 'material'),
        wrapAscii(''),
        density,
        wrapAscii('g/cm3'),
        wrapAscii('POSITIVE_RATIO_MEASURE'),
      );
    }
  }

  tool.UpdateAssemblies();

  return new AssemblyExporter(doc);
}

export type SupportedUnit = 'M' | 'CM' | 'MM' | 'INCH' | 'FT' | 'm' | 'mm' | 'cm' | 'inch' | 'ft';

export function exportSTEP(
  shapes: ShapeConfig[] = [],
  { unit, modelUnit }: { unit?: SupportedUnit; modelUnit?: SupportedUnit } = {},
): Blob {
  const oc = getOC();
  const r = GCWithScope();

  const doc = createAssembly(shapes);

  if (unit || modelUnit) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dummy = r(new oc.STEPCAFControl_Writer());

    oc.Interface_Static.SetCVal('xstep.cascade.unit', (modelUnit || unit || 'MM').toUpperCase());
    oc.Interface_Static.SetCVal('write.step.unit', (unit || modelUnit || 'MM').toUpperCase());
  }

  const session = r(new oc.XSControl_WorkSession());
  const writer = r(new oc.STEPCAFControl_Writer(session, false));
  writer.SetColorMode(true);
  writer.SetLayerMode(true);
  writer.SetNameMode(true);
  writer.SetMaterialMode(true);
  oc.Interface_Static.SetIVal('write.surfacecurve.mode', 1);
  oc.Interface_Static.SetIVal('write.precision.mode', 0);
  oc.Interface_Static.SetIVal('write.step.assembly', 2);
  oc.Interface_Static.SetIVal('write.step.schema', 5);

  const filename = 'export.step';
  const progress = r(new oc.Message_ProgressRange());
  const success = writer.Perform(doc.wrapped, filename, progress);

  if (success) {
    const file = oc.FS.readFile('/' + filename);
    oc.FS.unlink('/' + filename);
    const blob = new Blob([file as BlobPart], { type: 'application/STEP' });
    return blob;
  } else {
    throw new Error('WRITE STEP FILE FAILED.');
  }
}
