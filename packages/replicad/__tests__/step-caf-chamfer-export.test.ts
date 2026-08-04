import { describe, expect, it } from 'vitest';
import type { OpenCascadeInstance, TopoDS_Shape } from 'replicad-opencascadejs';
import { exportSTEP, getOC, makeBaseBox, makeCylinder } from '../src/index';

type SurfaceCounts = {
  cone: number;
  cylinder: number;
};

const readStepSurfaceCounts = async (
  oc: OpenCascadeInstance,
  step: Blob,
): Promise<SurfaceCounts & { shapeLabels: number }> => {
  const stepPath = '/tmp/replicad-stepcaf-chamfer.step';
  oc.FS.writeFile(stepPath, await step.text());

  const documentName = new oc.TCollection_ExtendedString('XmlOcaf', true);
  const document = new oc.TDocStd_Document(documentName);
  const reader = new oc.STEPCAFControl_Reader();
  const progress = new oc.Message_ProgressRange();
  const mainLabel = document.Main();
  const shapeTool = oc.XCAFDoc_DocumentTool.ShapeTool(mainLabel);
  let compound: TopoDS_Shape | undefined;

  try {
    expect(reader.Perform(stepPath, document, progress)).toBe(true);
    const shapesLabel = oc.XCAFDoc_DocumentTool.ShapesLabel(mainLabel);
    const shapeLabels = shapesLabel.NbChildren();
    shapesLabel.delete();
    compound = shapeTool.GetOneShape();

    const counts: SurfaceCounts & { shapeLabels: number } = { cone: 0, cylinder: 0, shapeLabels };

    const explorer = new oc.TopExp_Explorer(compound, oc.TopAbs_ShapeEnum.TopAbs_FACE);
    try {
      while (explorer.More()) {
        const current = explorer.Current();
        const face = oc.TopoDS.Face(current);
        current.delete();
        const surface = new oc.BRepAdaptor_Surface(face, true);
        try {
          const type = surface.GetType();
          if (type === oc.GeomAbs_SurfaceType.GeomAbs_Cone) {
            counts.cone += 1;
          }
          if (type === oc.GeomAbs_SurfaceType.GeomAbs_Cylinder) {
            counts.cylinder += 1;
          }
        } finally {
          surface.delete();
          face.delete();
        }
        explorer.Next();
      }
    } finally {
      explorer.delete();
    }

    return counts;
  } finally {
    compound?.delete();
    shapeTool.delete();
    mainLabel.delete();
    progress.delete();
    reader.delete();
    document.delete();
    documentName.delete();
    try {
      oc.FS.unlink(stepPath);
    } catch {
      // Cleanup is best effort because a failed write/read may leave no file.
    }
  }
};

describe('STEPCAF chamfer export', () => {
  it('should preserve the conical cylinder chamfer face when the assembly STEP is read back through XCAF', async () => {
    const cube = makeBaseBox(50, 50, 50)
      .chamfer(5, edgeFinder => edgeFinder.inPlane('XY', 50))
      .translateX(-30);
    const cylinder = makeCylinder(25, 50)
      .chamfer(5, edgeFinder => edgeFinder.inPlane('XY', 50))
      .translateX(30);

    const step = exportSTEP([
      { shape: cube, name: 'Cube', color: '#888888' },
      { shape: cylinder, name: 'Cylinder', color: '#ff0000' },
    ]);

    const counts = await readStepSurfaceCounts(getOC(), step);

    expect(counts.shapeLabels).toBe(2);
    expect(counts.cone).toBe(1);
    expect(counts.cylinder).toBeGreaterThanOrEqual(1);
  });
});
