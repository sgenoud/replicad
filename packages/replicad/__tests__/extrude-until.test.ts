import { afterEach, describe, expect, it } from "vitest";
import {
  type AnyShape,
  type SketchInterface,
  type Point,
  CompoundSketch,
  drawCircle,
  drawRectangle,
  Face,
  FaceFinder,
  extrudeFaceUntil,
  getOC,
  makeBaseBox,
  makeCylinder,
  makeSphere,
  localGC,
  measureShapeVolumeProperties,
  Sketch,
  Sketches,
  sketchRectangle,
  Solid,
} from "../src/index";

const shapes: AnyShape[] = [];
const sketches: Array<SketchInterface | Sketches> = [];
const own = <T extends AnyShape>(shape: T): T => {
  shapes.push(shape);
  return shape;
};
const ownSketch = <T extends SketchInterface | Sketches>(sketch: T): T => {
  sketches.push(sketch);
  return sketch;
};
afterEach(() => {
  for (const sketch of sketches) {
    if (sketch instanceof Sketches) sketch.sketches.forEach((s) => s.delete());
    else if (sketch instanceof Sketch || sketch instanceof CompoundSketch)
      sketch.delete();
  }
  sketches.length = 0;
  shapes.reverse().forEach((shape) => shape.delete());
  shapes.length = 0;
});

const sketchAt = (z = 5) => ownSketch(sketchRectangle(4, 4, { origin: z }));
const targetBox = () => own(makeBaseBox(40, 40, 5).translateZ(20));
const limitAt = (z: number): Face => {
  const sketch = ownSketch(drawRectangle(40, 40).sketchOnPlane("XY", z));
  return own(sketch.face());
};
const sphericalLimit = (side: "upper" | "lower"): Face => {
  const sphere = own(makeSphere(10).translateZ(30));
  const hemisphere = own(
    sphere.cutPlane("XY", 30, side === "upper" ? "positive" : "negative")!
  );
  return own(
    new FaceFinder().ofSurfaceType("SPHERE").find(hemisphere, { unique: true })
  );
};

type QuadraticSurface = "bowl" | "dome" | "saddle";
const quadraticLimit = (kind: QuadraticSurface): Face => {
  const oc = getOC();
  const [r, gc] = localGC();
  try {
    // An independently defined B-spline height field:
    // z = 20 + (x² + y²)/20, 20 - (x² + y²)/20, or 20 + (x² - y²)/20.
    const heights = r(new oc.NCollection_Array2_double(1, 5, 1, 5));
    for (let i = 1; i <= 5; i++) {
      for (let j = 1; j <= 5; j++) {
        const x = (i - 3) * 5;
        const y = (j - 3) * 5;
        const offset =
          kind === "bowl"
            ? x * x + y * y
            : kind === "dome"
            ? -x * x - y * y
            : x * x - y * y;
        heights.SetValue(i, j, 20 + offset / 20);
      }
    }
    const interpolator = r(new oc.GeomAPI_PointsToBSplineSurface());
    interpolator.Interpolate(heights, -10, 5, -10, 5);
    const builder = r(
      new oc.BRepBuilderAPI_MakeFace(r(interpolator.Surface()), 1e-7)
    );
    return own(new Face(builder.Face()));
  } finally {
    gc();
  }
};
const volume = (shape: AnyShape): number => {
  const properties = measureShapeVolumeProperties(shape.asShape3D());
  const result = properties.volume;
  properties.delete();
  return result;
};
const bounds = (shape: AnyShape) => {
  const box = shape.boundingBox;
  const result = box.bounds;
  box.delete();
  return result;
};
const expectValidSolid = (shape: AnyShape) => {
  const checker = new (getOC().BRepCheck_Analyzer)(shape.wrapped, true);
  try {
    expect(checker.IsValid()).toBe(true);
  } finally {
    checker.delete();
  }
};

describe("extrudeFaceUntil explicit geometry API", () => {
  it("uses the explicit profile, target face, and direction without consuming inputs", () => {
    const profile = own(sketchAt().face());
    const target = own(targetBox().translateZ(10));
    const limit = own(
      new FaceFinder().inPlane("XY", 30).find(target, { unique: true })
    );
    const result = own(extrudeFaceUntil(profile, limit, [0.25, 0, 1]));

    expect(volume(result)).toBeCloseTo(16 * 25);
    expect(bounds(result)[1][2]).toBeCloseTo(30);
    expect(bounds(result)[1][0]).toBeCloseTo(8.25);
    expectValidSolid(result);
    expect(profile.geomType).toBe("PLANE");
    expect(limit.geomType).toBe("PLANE");
    expect(volume(target)).toBeCloseTo(8000);

    const repeated = own(extrudeFaceUntil(profile, limit, [0.25, 0, 1]));
    expect(volume(repeated)).toBeCloseTo(volume(result));
  });

  it("accepts a standalone face as its target", () => {
    const profile = own(sketchAt().face());
    const limit = limitAt(20);
    const result = own(extrudeFaceUntil(profile, limit, [0, 0, 1]));
    expect(volume(result)).toBeCloseTo(240);
    expectValidSolid(result);
  });

  it("rejects an invalid explicit direction without consuming the geometry", () => {
    const profile = own(sketchAt().face());
    const limit = limitAt(20);
    expect(() => extrudeFaceUntil(profile, limit, [0, 0, 0])).toThrow(
      "The extrusion direction must be a non-zero finite vector"
    );
    expect(
      volume(own(extrudeFaceUntil(profile, limit, [0, 0, 1])))
    ).toBeCloseTo(240);
  });

  it("retains the geometry when native construction fails", () => {
    const profile = own(sketchAt().face());
    const limit = limitAt(20);
    expect(() => extrudeFaceUntil(profile, limit, [1, 0, 0])).toThrow();
    const recovered = own(extrudeFaceUntil(profile, limit, [0, 0, 1]));
    expect(volume(recovered)).toBeCloseTo(240);
    expectValidSolid(recovered);
  });
});

// These are integration tests against the actual prism and splitter WASM bindings.
describe("sketch.extrudeUntil", () => {
  it("starts from a standalone sketch and returns only its extrusion", () => {
    const sketch = sketchAt();
    const result = own(sketch.extrudeUntil(limitAt(20)));

    expect(volume(result)).toBeCloseTo(16 * 15);
    expect(bounds(result)[0][2]).toBeCloseTo(5);
    expect(bounds(result)[1][2]).toBeCloseTo(20);
    expectValidSolid(result);
    expect(result instanceof Solid).toBe(true);
    expect(() => sketch.face()).toThrow("This object has been deleted");
  });

  it("accepts a face extracted from a solid without including or consuming the solid", () => {
    const target = targetBox();
    const face = own(
      new FaceFinder().inPlane("XY", 20).find(target, { unique: true })
    );
    const result = own(sketchAt().extrudeUntil(face));

    expect(volume(result)).toBeCloseTo(240);
    expect(volume(target)).toBeCloseTo(8000);
    expect(bounds(result)[1][2]).toBeCloseTo(20);
    expect(face.geomType).toBe("PLANE");
    expectValidSolid(result);
  });

  it("keeps the target face reusable after native cleanup", () => {
    const limit = limitAt(20);
    const first = own(sketchAt().extrudeUntil(limit));
    const second = own(sketchAt().extrudeUntil(limit));
    expect(volume(first)).toBeCloseTo(volume(second));
    expect(limit.geomType).toBe("PLANE");
  });

  it("follows a tilted limiting face", () => {
    const limit = own(limitAt(20).rotate(30, [0, 0, 20], [1, 0, 0]));
    const result = own(sketchAt().extrudeUntil(limit));
    expect(volume(result)).toBeCloseTo(240);
    expect(bounds(result)[1][2]).toBeCloseTo(20 + 2 * Math.tan(Math.PI / 6));
    expectValidSolid(result);
  });

  it("extrudes to a tilted object's selected face without including that object", () => {
    const target = own(targetBox().rotate(30, [0, 0, 20], [1, 0, 0]));
    const limit = own(
      new FaceFinder().containsPoint([0, 0, 20]).find(target, { unique: true })
    );
    const result = own(sketchAt().extrudeUntil(limit));
    expect(volume(result)).toBeCloseTo(240);
    expect(volume(target)).toBeCloseTo(8000);
    expect(bounds(result)[1][2]).toBeCloseTo(20 + 2 * Math.tan(Math.PI / 6));
    expectValidSolid(result);
  });

  it("follows a trimmed curved limiting face", () => {
    const fullCylinder = own(makeCylinder(10, 40, [-20, 0, 30], "X"));
    const target = own(fullCylinder.cutPlane("XY", 30, "negative")!);
    const limit = own(
      new FaceFinder().ofSurfaceType("CYLINDRE").find(target, { unique: true })
    );
    const result = own(sketchAt().extrudeUntil(limit));
    const expected = 4 * (100 - (2 * Math.sqrt(96) + 100 * Math.asin(0.2)));
    expect(volume(result)).toBeCloseTo(expected, 2);
    expect(bounds(result)[1][2]).toBeCloseTo(30 - Math.sqrt(96));
    expectValidSolid(result);
  });

  it("uses the sketch's default direction on a non-XY plane", () => {
    const sketch = ownSketch(drawRectangle(4, 4).sketchOnPlane("YZ", 5));
    const limitSketch = ownSketch(
      drawRectangle(40, 40).sketchOnPlane("YZ", 20)
    );
    const result = own(sketch.extrudeUntil(own(limitSketch.face())));
    expect(volume(result)).toBeCloseTo(240);
    expect(bounds(result)[0][0]).toBeCloseTo(5);
    expect(bounds(result)[1][0]).toBeCloseTo(20);
    expectValidSolid(result);
  });

  it("supports an oblique direction override", () => {
    const result = own(
      sketchAt().extrudeUntil(limitAt(20), {
        extrusionDirection: [0.25, 0, 1],
      })
    );
    expect(volume(result)).toBeCloseTo(240);
    expect(bounds(result)[1][0]).toBeCloseTo(2 + 15 * 0.25);
    expectValidSolid(result);
  });

  it("normalizes the supplied direction", () => {
    const result = own(
      sketchAt().extrudeUntil(limitAt(20), {
        extrusionDirection: [0, 0, 10],
      })
    );
    expect(volume(result)).toBeCloseTo(240);
    expect(bounds(result)[1][2]).toBeCloseTo(20);
  });

  it.each([-2, 2])(
    "handles an oblique direction with x=%s and overlapping projected bounds",
    (lean) => {
      const limit = own(
        ownSketch(drawRectangle(200, 200).sketchOnPlane("XY", 20)).face()
      );
      const result = own(
        sketchAt().extrudeUntil(limit, { extrusionDirection: [lean, 0, 1] })
      );
      expect(volume(result)).toBeCloseTo(240);
      expect(bounds(result)[0][0]).toBeCloseTo(Math.min(-2, -2 + lean * 15));
      expect(bounds(result)[1][0]).toBeCloseTo(Math.max(2, 2 + lean * 15));
      expectValidSolid(result);
    }
  );

  it.each([1e-3, 1, 1e3])(
    "derives the prism length from geometry at scale %s",
    (scale) => {
      const sketch = ownSketch(
        sketchRectangle(4 * scale, 4 * scale, { origin: 5 * scale })
      );
      const limitSketch = ownSketch(
        drawRectangle(40 * scale, 40 * scale).sketchOnPlane("XY", 20 * scale)
      );
      const result = own(sketch.extrudeUntil(own(limitSketch.face())));
      expect(volume(result) / (240 * scale ** 3)).toBeCloseTo(1, 5);
      expectValidSolid(result);
    }
  );

  it("uses the origin already established by the sketch", () => {
    const sketch = ownSketch(sketchRectangle(4, 4, { origin: [5, 0, 5] }));
    const result = own(sketch.extrudeUntil(limitAt(20)));
    expect(volume(result)).toBeCloseTo(240);
    expect(bounds(result)[0][0]).toBeCloseTo(3);
    expect(bounds(result)[1][0]).toBeCloseTo(7);
    expectValidSolid(result);
  });

  it("preserves holes and consumes the component sketches", () => {
    const sketch = ownSketch(
      drawRectangle(6, 6).cut(drawRectangle(2, 2)).sketchOnPlane("XY", 5)
    );
    const compound = sketch instanceof Sketches ? sketch.sketches[0] : sketch;
    expect(compound instanceof CompoundSketch).toBe(true);
    const result = own(sketch.extrudeUntil(limitAt(20)));
    expect(volume(result)).toBeCloseTo((36 - 4) * 15);
    expectValidSolid(result);
    expect(() => compound.face()).toThrow("This object has been deleted");
  });

  it("preserves multiple holes", () => {
    const sketch = ownSketch(
      drawRectangle(8, 8)
        .cut(drawRectangle(2, 2).translate(-2, 0))
        .cut(drawRectangle(2, 2).translate(2, 0))
        .sketchOnPlane("XY", 5)
    );
    const result = own(sketch.extrudeUntil(limitAt(20)));
    expect(volume(result)).toBeCloseTo((64 - 8) * 15);
    expectValidSolid(result);
  });

  it("supports circular profiles", () => {
    const sketch = ownSketch(drawCircle(2).sketchOnPlane("XY", 5));
    const result = own(sketch.extrudeUntil(limitAt(20)));
    expect(volume(result)).toBeCloseTo(Math.PI * 4 * 15);
    expectValidSolid(result);
  });

  it.each([undefined, [0, 0, 2] as Point])(
    "extrudes disconnected sketches with direction %s",
    (extrusionDirection) => {
      const sketch = ownSketch(
        drawRectangle(2, 2)
          .translate(-5, 0)
          .fuse(drawRectangle(2, 2).translate(5, 0))
          .sketchOnPlane("XY", 5)
      );
      expect(sketch instanceof Sketches).toBe(true);
      const limit = limitAt(20);
      const result = own(sketch.extrudeUntil(limit, { extrusionDirection }));
      expect(volume(result)).toBeCloseTo(8 * 15);
      expect(limit.geomType).toBe("PLANE");
      const solids = result.solids;
      expect(solids).toHaveLength(2);
      solids.forEach((solid) => {
        expectValidSolid(solid);
        solid.delete();
      });
      if (sketch instanceof Sketches) {
        sketch.sketches.forEach((component) => {
          expect(() => component.face()).toThrow(
            "This object has been deleted"
          );
        });
      }
    }
  );

  it.each([
    { direction: [0, 0, 0] as Point },
    { direction: [NaN, 0, 1] as Point },
    { direction: [0, 0, Infinity] as Point },
  ])("rejects an invalid direction $direction", ({ direction }) => {
    const sketch = sketchAt();
    const limit = limitAt(20);
    expect(() =>
      sketch.extrudeUntil(limit, { extrusionDirection: direction })
    ).toThrow("The extrusion direction must be a non-zero finite vector");
    expect(volume(own(sketch.extrudeUntil(limit)))).toBeCloseTo(240);
  });

  it("retains the sketch and target if native construction fails", () => {
    const sketch = sketchAt();
    const limit = limitAt(20);
    expect(() =>
      sketch.extrudeUntil(limit, { extrusionDirection: [1, 0, 0] })
    ).toThrow();
    const recovered = own(sketch.extrudeUntil(limit));
    expect(volume(recovered)).toBeCloseTo(240);
    expect(limit.geomType).toBe("PLANE");
    expectValidSolid(recovered);
  });

  it("reverses direction when the limit is behind the sketch", () => {
    const result = own(sketchAt().extrudeUntil(limitAt(-10)));
    expect(volume(result)).toBeCloseTo(240);
    expect(bounds(result)[0][2]).toBeCloseTo(-10);
    expect(bounds(result)[1][2]).toBeCloseTo(5);
    expectValidSolid(result);
  });
});

// Native success alone is not sufficient: verify analytic volumes, bounds,
// and BRep validity for curved limits approached from either side.
describe("extrudeUntil split with a curved face", () => {
  it("preserves holes and keeps a B-spline limiting face reusable", () => {
    const limit = quadraticLimit("saddle");
    const extrude = () => {
      const sketches = ownSketch(
        drawRectangle(6, 6).cut(drawRectangle(2, 2)).sketchOnPlane("XY", 5)
      );
      return own(sketches.extrudeUntil(limit));
    };
    const first = extrude();
    const repeated = extrude();
    // The x²-y² contributions cancel on these concentric square profiles.
    expect(volume(first)).toBeCloseTo((36 - 4) * 15, 3);
    expect(volume(repeated)).toBeCloseTo(volume(first), 3);
    expectValidSolid(first);
    expectValidSolid(repeated);
  });

  describe.each([false, true])("flipped face orientation: %s", (flipped) => {
    it.each([
      { side: "upper" as const, startZ: 5 },
      { side: "upper" as const, startZ: 50 },
      { side: "lower" as const, startZ: 5 },
      { side: "lower" as const, startZ: 50 },
    ])(
      "caps a circular profile with the $side hemisphere from z=$startZ",
      ({ side, startZ }) => {
        let limit = sphericalLimit(side);
        if (flipped) limit = own(limit.flipOrientation());
        const sketch = ownSketch(drawCircle(2).sketchOnPlane("XY", startZ));
        const result = own(sketch.extrudeUntil(limit));

        // Integral of sqrt(10² - x² - y²) over a radius-2 disk.
        const sphericalIntegral =
          ((2 * Math.PI) / 3) * (1000 - Math.pow(96, 1.5));
        const heightIntegral =
          Math.PI * 4 * 30 + (side === "upper" ? 1 : -1) * sphericalIntegral;
        expect(volume(result)).toBeCloseTo(
          Math.abs(heightIntegral - Math.PI * 4 * startZ),
          2
        );
        const minHeight = side === "upper" ? 30 + Math.sqrt(96) : 20;
        const maxHeight = side === "upper" ? 40 : 30 - Math.sqrt(96);
        expect(bounds(result)[0][2]).toBeCloseTo(Math.min(startZ, minHeight));
        expect(bounds(result)[1][2]).toBeCloseTo(Math.max(startZ, maxHeight));
        expectValidSolid(result);
        expect(limit.geomType).toBe("SPHERE");
      }
    );

    const surfaces = [
      {
        kind: "dome" as const,
        meanHeight: 20 - (9 + 8 / 3) / 20,
        minHeight: 18.55,
        maxHeight: 19.95,
      },
      {
        kind: "bowl" as const,
        meanHeight: 20 + (9 + 8 / 3) / 20,
        minHeight: 20.05,
        maxHeight: 21.45,
      },
      {
        kind: "saddle" as const,
        meanHeight: 20 + 9 / 20,
        minHeight: 19.85,
        maxHeight: 21.25,
      },
    ];
    it.each(
      surfaces.flatMap((surface) =>
        [5, 50].map((startZ) => ({ ...surface, startZ }))
      )
    )(
      "caps an offset rectangle with a B-spline $kind from z=$startZ",
      ({ kind, startZ, meanHeight, minHeight, maxHeight }) => {
        let limit = quadraticLimit(kind);
        if (flipped) limit = own(limit.flipOrientation());
        const sketch = ownSketch(
          drawRectangle(4, 4).translate(3, 0).sketchOnPlane("XY", startZ)
        );
        const result = own(sketch.extrudeUntil(limit));

        // On [1, 5] × [-2, 2], mean(x²) = 9 + 4/3 and mean(y²) = 4/3.
        expect(volume(result)).toBeCloseTo(
          16 * Math.abs(meanHeight - startZ),
          3
        );
        expect(bounds(result)[0][0]).toBeCloseTo(1);
        expect(bounds(result)[1][0]).toBeCloseTo(5);
        expect(bounds(result)[0][2]).toBeCloseTo(Math.min(startZ, minHeight));
        expect(bounds(result)[1][2]).toBeCloseTo(Math.max(startZ, maxHeight));
        expectValidSolid(result);
        expect(limit.geomType).toBe("BSPLINE_SURFACE");
        const faces = result.faces.map(own);
        expect(faces.some((face) => face.geomType === "BSPLINE_SURFACE")).toBe(
          true
        );
      }
    );
  });
});

describe("extrudeUntil requires a complete, unambiguous cap", () => {
  it("rejects an unbounded limit without consuming the sketch", () => {
    const oc = getOC();
    const [r, gc] = localGC();
    try {
      const plane = r(
        new oc.gp_Pln(r(new oc.gp_Pnt(0, 0, 20)), r(new oc.gp_Dir(0, 0, 1)))
      );
      const builder = r(new oc.BRepBuilderAPI_MakeFace(plane));
      const limit = own(new Face(builder.Face()));
      const sketch = sketchAt();
      expect(() => sketch.extrudeUntil(limit)).toThrow(
        "the profile and limit must have finite bounds"
      );
      expect(volume(own(sketch.extrudeUntil(limitAt(20))))).toBeCloseTo(240);
    } finally {
      gc();
    }
  });

  it.each([
    "too small",
    "missing",
    "hole",
    "crossing",
    "coincident",
    "multiple intersections",
  ])("rejects invalid limits (%s) without consuming the inputs", (kind) => {
    let limit: Face;
    if (kind === "multiple intersections") {
      const sphere = own(makeSphere(10).translateZ(30));
      limit = own(
        new FaceFinder().ofSurfaceType("SPHERE").find(sphere, { unique: true })
      );
    } else if (kind === "hole") {
      const sketch = ownSketch(
        drawRectangle(40, 40).cut(drawCircle(1)).sketchOnPlane("XY", 20)
      );
      const compound = sketch instanceof Sketches ? sketch.sketches[0] : sketch;
      limit = own(compound.face());
    } else if (kind === "too small") {
      limit = own(
        ownSketch(drawRectangle(2, 2).sketchOnPlane("XY", 20)).face()
      );
    } else if (kind === "missing") {
      limit = own(limitAt(20).translateX(100));
    } else if (kind === "crossing") {
      limit = own(limitAt(5).rotate(30, [0, 0, 5], "X"));
    } else {
      limit = limitAt(5);
    }
    const sketch = sketchAt();
    expect(() => sketch.extrudeUntil(limit)).toThrow(
      "Could not extrude the sketch to the limiting face"
    );
    const recovered = own(sketch.extrudeUntil(limitAt(20)));
    expect(volume(recovered)).toBeCloseTo(240);
    expectValidSolid(recovered);
    expect(limit.isNull).toBe(false);
  });
});
