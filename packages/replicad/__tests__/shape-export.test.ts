import { expect, test } from "vitest";
import { deserializeShape, makeBaseBox } from "../src/index";
import {
  exportShapeSTEP,
  exportShapeSTL,
  serializeShape,
} from "../src/shapeFunctions/index";

test("standalone shape serialization accepts wrapped and raw shapes", () => {
  const shape = makeBaseBox(10, 20, 30);

  const serialized = serializeShape(shape);
  expect(serialized).toBe(shape.serialize());
  expect(serializeShape(shape.wrapped)).toBe(serialized);

  const restored = deserializeShape(serialized);
  expect(restored.constructor).toBe(shape.constructor);

  restored.delete();
  shape.delete();
});

test("standalone STEP export accepts wrapped shapes", () => {
  const shape = makeBaseBox(10, 20, 30);
  const blob = exportShapeSTEP(shape);

  expect(blob.type).toBe("application/step");
  expect(blob.size).toBeGreaterThan(0);

  shape.delete();
});

test("standalone STL export preserves ASCII and binary options", async () => {
  const shape = makeBaseBox(10, 20, 30);
  const ascii = exportShapeSTL(shape.wrapped);
  const binary = exportShapeSTL(shape, { binary: true });

  expect(ascii.type).toBe("application/sla");
  expect((await ascii.text()).trimStart()).toMatch(/^solid/);
  expect(binary.type).toBe("application/sla");
  expect(binary.size).toBeGreaterThan(84);

  shape.delete();
});
