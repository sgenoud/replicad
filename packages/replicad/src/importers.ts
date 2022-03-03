import { cast } from "./shapes";
import { getOC } from "./oclib";
import { localGC } from "./register";

const uniqueId = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

/**
 * Creates a new shapes from a STEP file (as a Blob or a File).
 */
export async function importSTEP(STLBlob: Blob) {
  const oc = getOC();
  const [r, gc] = localGC();

  const fileName = uniqueId();
  const bufferView = new Uint8Array(await STLBlob.arrayBuffer());
  oc.FS.writeFile(`/${fileName}`, bufferView);

  const reader = r(new oc.STEPControl_Reader_1());
  if (reader.ReadFile(fileName)) {
    oc.FS.unlink("/" + fileName);
    reader.TransferRoots(r(new oc.Message_ProgressRange_1()));
    const stepShape = r(reader.OneShape());

    const shape = cast(stepShape);
    gc();
    return shape;
  } else {
    oc.FS.unlink("/" + fileName);
    gc();
    throw new Error("Failed to load STEP file");
  }
}

/** Creates a new shapes from a STL file (as a Blob or a File).
 *
 * This process can be relatively long depending on how much tesselation has
 * been done to your STL.
 *
 * This function tries to clean a bit the triangulation of faces, but can fail
 * in bad ways.
 */
export async function importSTL(STLBlob: Blob) {
  const oc = getOC();
  const [r, gc] = localGC();

  const fileName = uniqueId();
  const bufferView = new Uint8Array(await STLBlob.arrayBuffer());
  oc.FS.writeFile(`/${fileName}`, bufferView);

  const reader = r(new oc.StlAPI_Reader());
  const readShape = r(new oc.TopoDS_Shell());

  if (reader.Read(readShape, fileName)) {
    oc.FS.unlink("/" + fileName);

    const shapeUpgrader = r(
      new oc.ShapeUpgrade_UnifySameDomain_2(readShape, true, true, false)
    );
    shapeUpgrader.Build();
    const upgradedShape = r(shapeUpgrader.Shape());

    const solidSTL = r(new oc.BRepBuilderAPI_MakeSolid_1());
    solidSTL.Add(oc.TopoDS.Shell_1(upgradedShape));
    const asSolid = r(solidSTL.Solid());

    const shape = cast(asSolid);
    gc();
    return shape;
  } else {
    oc.FS.unlink("/" + fileName);
    gc();
    throw new Error("Failed to load STL file");
  }
}
