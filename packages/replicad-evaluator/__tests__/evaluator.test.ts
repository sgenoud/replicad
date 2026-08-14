import { describe, expect, test, vi } from "vitest";
import * as replicad from "../../replicad/src/index";
import { createEvaluator } from "../src/index";

const createTestEvaluator = () =>
  createEvaluator({
    replicad,
    oc: globalThis.replicadEvaluatorOC,
    tempDir: "/tmp",
  });

describe("replicad-evaluator", () => {
  test("builds and exports function-style JavaScript", async () => {
    const evaluator = createTestEvaluator();
    const code = `
const defaultParams = { radius: 7 };
const defaultName = "Function Cylinder";
const main = ({ makeCylinder }, params) => {
  return makeCylinder(params.radius, 12);
};
    `;

    const defaultParams = await evaluator.extractDefaultParamsFromCode(code);
    const defaultName = await evaluator.extractDefaultNameFromCode(code);
    const result = await evaluator.buildShapesFromCode(
      code,
      defaultParams || {}
    );
    const stl = await evaluator.exportShape("stl");

    expect(defaultParams).toEqual({ radius: 7 });
    expect(defaultName).toBe("Function Cylinder");
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].error).toBe(false);
    expect(result[0].mesh).toBeTruthy();
    expect(stl).toHaveLength(1);
    expect(stl[0].name).toBe("Function Cylinder");
  });

  test("builds module-style JavaScript", async () => {
    const evaluator = createTestEvaluator();
    const code = `
export const defaultParams = { radius: 5 };
export const defaultName = "Module Cylinder";
export function main({ makeCylinder }, params) {
  return makeCylinder(params.radius, 9);
}
    `;

    const result = await evaluator.buildShapesFromCode(code, { radius: 5 });
    const defaultParams = await evaluator.extractDefaultParamsFromCode(code);
    const defaultName = await evaluator.extractDefaultNameFromCode(code);

    expect(Array.isArray(result)).toBe(true);
    expect(result[0].error).toBe(false);
    expect(defaultParams).toEqual({ radius: 5 });
    expect(defaultName).toBe("Module Cylinder");
  });

  test("bundles TypeScript and remote URL imports", async () => {
    const evaluator = createTestEvaluator();
    const helperModule = `data:text/javascript,${encodeURIComponent(
      "export const HEIGHT = 14;"
    )}`;
    const code = `
import { makeCylinder } from "replicad";
import { HEIGHT } from ${JSON.stringify(helperModule)};

export interface Params {
  radius: number;
}

export const defaultParams: Params = { radius: 4 };
export const defaultName = "Bundled Cylinder";

export function main(_replicad: typeof import("replicad"), params: Params) {
  return makeCylinder(params.radius, HEIGHT);
}

export const labels = (params: Params) => [
  {
    label: String(params.radius),
    from: [0, 0, 0],
    to: [0, 0, HEIGHT],
  },
];
    `;

    const defaultParams = await evaluator.extractDefaultParamsFromCode(code);
    const defaultName = await evaluator.extractDefaultNameFromCode(code);
    const result = await evaluator.buildShapesFromCode(
      code,
      defaultParams || {}
    );
    const labels = await evaluator.computeLabels(code, defaultParams || {});
    const stl = await evaluator.exportShape("stl");

    expect(defaultParams).toEqual({ radius: 4 });
    expect(defaultName).toBe("Bundled Cylinder");
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].error).toBe(false);
    expect(labels).toHaveLength(1);
    expect(stl).toHaveLength(1);
  });

  test("exports STEP for solid shapes", async () => {
    const evaluator = createTestEvaluator();
    const code = `
const main = ({ makeCylinder }) => makeCylinder(3, 8);
    `;

    await evaluator.buildShapesFromCode(code, {});
    const step = await evaluator.exportShape("step");

    expect(step).toHaveLength(1);
  });

  test("decodes WebAssembly exceptions from failed OCCT operations", async () => {
    const evaluator = createTestEvaluator();
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    try {
      const result = await evaluator.buildShapesFromCode(
        `
const main = ({ makeBaseBox }) => makeBaseBox(10, 10, 10).fillet(100);
        `,
        {}
      );

      expect(result).toEqual(
        expect.objectContaining({
          error: true,
          message: expect.stringContaining("StdFail_NotDone"),
        })
      );
      expect(result.message).not.toBe("[object WebAssembly.Exception]");
      expect(consoleError).toHaveBeenCalledWith(
        expect.stringContaining("StdFail_NotDone"),
        expect.anything()
      );
    } finally {
      consoleError.mockRestore();
    }
  });

  test("temporarily restores and reports numbered OpenCascade APIs", async () => {
    const evaluator = createTestEvaluator();
    const result = await evaluator.buildShapesFromCode(
      `
const main = ({ makeCylinder }) => {
  const shape = makeCylinder(3, 8);
  const progress = new oc.Message_ProgressRange_1();
  oc.BinTools.Write_3(shape._wrapped, "compatibility-test.brep", progress);
  return shape;
};
      `,
      {}
    );

    expect(Array.isArray(result)).toBe(true);
    expect(evaluator.getCompatibilityReplacements()).toEqual([
      {
        legacy: "oc.Message_ProgressRange_1",
        replacement: "oc.Message_ProgressRange",
      },
      {
        legacy: "oc.BinTools.Write_3",
        replacement: "oc.BinTools.Write",
      },
    ]);
    expect(
      globalThis.replicadEvaluatorOC.Message_ProgressRange_1
    ).toBeUndefined();
    expect(globalThis.replicadEvaluatorOC.BinTools.Write_3).toBeUndefined();

    await evaluator.buildShapesFromCode(
      `const main = ({ makeCylinder }) => makeCylinder(2, 4);`,
      {}
    );
    expect(evaluator.getCompatibilityReplacements()).toEqual([]);
  });

  test("renders curved revolutions without remeshing edges more finely", async () => {
    const evaluator = createTestEvaluator();
    const result = await evaluator.buildShapesFromCode(
      `
const main = ({ draw }) => draw()
  .hLine(20)
  .smoothSplineTo([30, 20], { endTangent: [0, 1] })
  .lineTo([0, 100])
  .close()
  .sketchOnPlane("XZ")
  .revolve();
      `,
      {}
    );

    expect(Array.isArray(result)).toBe(true);
    expect(result[0].error).toBe(false);
    expect(result[0].edges.lines.length).toBeGreaterThan(0);
  });
});
