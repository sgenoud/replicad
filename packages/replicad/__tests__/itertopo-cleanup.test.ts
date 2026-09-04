import { expect, test } from "vitest";
import { makeBaseBox, getOC } from "../src/index";
import { iterTopo } from "../src/shapeFunctions/topology";

const countingExplorer = () => {
  const oc = getOC() as any;
  const Original = oc.TopExp_Explorer;
  const deletes: number[] = [];

  oc.TopExp_Explorer = function (...args: any[]) {
    const explorer = new Original(...args);
    const originalDelete = explorer.delete.bind(explorer);
    explorer.delete = () => {
      deletes.push(1);
      originalDelete();
    };
    return explorer;
  };

  return { deletes, restore: () => (oc.TopExp_Explorer = Original) };
};

test("iterTopo frees the explorer when the consumer breaks out early", () => {
  const shape = makeBaseBox(10, 10, 10);
  const { deletes, restore } = countingExplorer();
  const returnedShapes: { delete(): void }[] = [];

  try {
    let seen = 0;
    for (const edge of iterTopo(shape.wrapped, "edge")) {
      returnedShapes.push(edge);
      seen += 1;
      if (seen === 2) break;
    }

    expect(seen).toBe(2);
    expect(deletes).toHaveLength(1);

    // a full iteration still deletes exactly once
    const all = Array.from(iterTopo(shape.wrapped, "edge"));
    returnedShapes.push(...all);
    expect(all).toHaveLength(12);
    expect(deletes).toHaveLength(2);
  } finally {
    returnedShapes.forEach((returnedShape) => returnedShape.delete());
    restore();
    shape.delete();
  }
});
