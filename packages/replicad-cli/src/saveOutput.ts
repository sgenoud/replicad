import { writeFile } from "node:fs/promises";
import { join, parse } from "node:path";
import JSZip from "jszip";
import type { EvaluatorService } from "replicad-evaluator";
import { prettyProjectionSvg } from "./projectSvg";
import type { ProjectMode } from "./projectSvg";

const EXTS = new Map([
  ["stl-binary", "stl"],
  ["step-assembly", "step"],
]);

function mapExt(fileType: string) {
  return EXTS.get(fileType) || fileType;
}

async function writeBlob(outputPath: string, blob: Blob) {
  const buffer = Buffer.from(await blob.arrayBuffer());
  await writeFile(outputPath, buffer);
}

export async function saveBuildOutput(
  evaluator: EvaluatorService,
  buildResult: any,
  output: string,
  options: {
    fileType?: string;
    projectMode?: ProjectMode;
  } = {}
) {
  const { fileType = "stl", projectMode = false } = options;
  const outputPath = parse(output);
  const outputName = outputPath.name || "shapes";
  const outputDir = outputPath.dir || ".";

  if (fileType === "json") {
    await writeFile(
      join(outputDir, `${outputName}.json`),
      `${JSON.stringify(buildResult, null, 2)}\n`,
      "utf8"
    );
    return;
  }

  if (projectMode) {
    const projectedShapeIndex = Array.isArray(buildResult)
      ? buildResult.findIndex((shapeConfig) => {
          return shapeConfig?.solidType !== "mesh" && shapeConfig?.format !== "svg";
        })
      : -1;

    if (projectedShapeIndex === -1) {
      throw new Error(
        "Projection export requires a non-mesh 3D shape. Mesh and 2D outputs should be exported as STL, JSON, or SVG directly."
      );
    }

    const shapes = evaluator.getShapeEntries();
    const projectedShape = shapes[projectedShapeIndex];

    if (!projectedShape?.shape) {
      throw new Error("No shape available for projection export");
    }

    await writeFile(
      join(outputDir, `${outputName}.svg`),
      prettyProjectionSvg(projectedShape.shape, projectMode),
      "utf8"
    );
    return;
  }

  const shapes = await evaluator.exportShape(fileType);
  if (shapes.length === 1) {
    const [{ blob }] = shapes;
    await writeBlob(join(outputDir, `${outputName}.${mapExt(fileType)}`), blob);
    return;
  }

  const zip = new JSZip();
  shapes.forEach((shape, index) => {
    const filename = `${shape.name || `shape-${index}`}.${mapExt(fileType)}`;
    zip.file(filename, shape.blob);
  });

  const archive = await zip.generateAsync({ type: "uint8array" });
  await writeFile(join(outputDir, `${outputName}.zip`), archive);
}
