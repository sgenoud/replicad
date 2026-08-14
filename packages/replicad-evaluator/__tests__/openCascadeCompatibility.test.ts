import { describe, expect, test } from "vitest";
import { createOpenCascadeCompatibilitySession } from "../src/openCascadeCompatibility";

describe("OpenCascade compatibility", () => {
  test("finds numbered APIs in WebKit evaluated-expression errors", async () => {
    const roots = {
      oc: {
        Message_ProgressRange: class MessageProgressRange {},
        BinTools: { Write() {} },
      },
    };
    const compatibility = createOpenCascadeCompatibilitySession(roots);

    const result = await compatibility.run(() => {
      if (!("Message_ProgressRange_1" in roots.oc)) {
        throw new TypeError(
          "undefined is not a constructor (evaluating 'new oc.Message_ProgressRange_1()')"
        );
      }
      if (!("Write_3" in roots.oc.BinTools)) {
        throw new TypeError(
          "undefined is not a function (evaluating 'oc.BinTools.Write_3()')"
        );
      }
      return "ok";
    });

    expect(result).toBe("ok");
    expect(compatibility.replacements).toEqual([
      {
        legacy: "oc.Message_ProgressRange_1",
        replacement: "oc.Message_ProgressRange",
      },
      {
        legacy: "oc.BinTools.Write_3",
        replacement: "oc.BinTools.Write",
      },
    ]);

    compatibility.restore();
    expect("Message_ProgressRange_1" in roots.oc).toBe(false);
    expect("Write_3" in roots.oc.BinTools).toBe(false);
  });
});
