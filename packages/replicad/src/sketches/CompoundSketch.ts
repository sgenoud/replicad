import {
  compoundShapes,
  addHolesInFace,
  makeSolid,
  makeFace,
} from "../shapeHelpers";
import Sketch from "./Sketch";

import { Point, Vector } from "../geom.js";
import {
  basicFaceExtrusion,
  complexExtrude,
  twistExtrude,
  revolution,
  ExtrusionProfile,
  LoftConfig,
} from "../addThickness.js";
import { SketchInterface } from "./lib.js";
import { cast, Face, Shape3D, Shell, Wire } from "../shapes.js";
import { getOC } from "../oclib.js";

const guessFaceFromWires = (wires: Wire[]): Face => {
  const oc = getOC();

  const faceBuilder = new oc.BRepOffsetAPI_MakeFilling(
    3,
    15,
    2,
    false,
    1e-5,
    1e-4,
    1e-2,
    0.1,
    8,
    9
  );
  wires.forEach((wire, wireIndex) => {
    wire.edges.forEach((edge) => {
      faceBuilder.Add_1(
        edge.wrapped,
        oc.GeomAbs_Shape.GeomAbs_C0 as any,
        wireIndex === 0
      );
    });
  });

  faceBuilder.Build();
  const newFace = cast(faceBuilder.Shape());

  faceBuilder.delete();

  if (!(newFace instanceof Face)) {
    throw new Error("Failed to create a face");
  }
  return newFace;
};

const fixWire = (wire: Wire, baseFace: Face): Wire => {
  const oc = getOC();
  const wireFixer = new oc.ShapeFix_Wire_2(
    wire.wrapped,
    baseFace.wrapped,
    1e-9
  );
  wireFixer.FixEdgeCurves();
  wireFixer.delete();
  return wire;
};

const faceFromWires = (wires: Wire[]): Face => {
  let baseFace: Face;
  let holeWires: Wire[];

  try {
    baseFace = makeFace(wires[0]);
    holeWires = wires.slice(1);
  } catch (e) {
    baseFace = guessFaceFromWires(wires);
    holeWires = wires.slice(1).map((w) => fixWire(w, baseFace));
  }

  return addHolesInFace(baseFace, holeWires);
};

const solidFromShellGenerator = (
  sketches: Sketch[],
  shellGenerator: (sketch: Sketch) => [Shell, Wire, Wire]
): Shape3D => {
  const shells: Shell[] = [];
  const startWires: Wire[] = [];
  const endWires: Wire[] = [];

  sketches.forEach((sketch) => {
    const [shell, startWire, endWire] = shellGenerator(sketch);
    shells.push(shell);
    startWires.push(startWire);
    endWires.push(endWire);
  });

  const startFace = faceFromWires(startWires);
  const endFace = faceFromWires(endWires);
  const solid = makeSolid([startFace, ...shells, endFace]);

  return solid;
};

/**
 * A group of sketches that should correspond to a unique face (i.e. an outer
 * sketch, and multiple holes within this sketch.
 *
 * All the sketches should share the same base face (or surface)
 *
 * Ideally generated from a `CompoundBlueprint`
 */
export default class CompoundSketch implements SketchInterface {
  sketches: Sketch[];
  constructor(sketches: Sketch[]) {
    this.sketches = sketches;
  }

  delete() {
    this.sketches.forEach((sketch) => sketch.delete());
  }

  get outerSketch() {
    return this.sketches[0];
  }

  get innerSketches() {
    return this.sketches.slice(1);
  }

  get wires() {
    const wires = this.sketches.map((s) => s.wire);
    return compoundShapes(wires);
  }

  face() {
    const baseFace = this.outerSketch.face();
    const newFace = addHolesInFace(
      baseFace,
      this.innerSketches.map((s) => s.wire)
    );

    return newFace;
  }

  extrude(
    extrusionDistance: number,
    {
      extrusionDirection,
      extrusionProfile,
      twistAngle,
      origin,
    }: {
      extrusionDirection?: Point;
      extrusionProfile?: ExtrusionProfile;
      twistAngle?: number;
      origin?: Point;
    } = {}
  ): Shape3D {
    const extrusionVec = new Vector(
      extrusionDirection || this.outerSketch.defaultDirection
    )
      .normalized()
      .multiply(extrusionDistance);

    if (extrusionProfile && !twistAngle) {
      const solid = solidFromShellGenerator(this.sketches, (sketch: Sketch) =>
        complexExtrude(
          sketch.wire,
          origin || this.outerSketch.defaultOrigin,
          extrusionVec,
          extrusionProfile,
          true
        )
      );
      return solid;
    }

    if (twistAngle) {
      const solid = solidFromShellGenerator(this.sketches, (sketch: Sketch) =>
        twistExtrude(
          sketch.wire,
          twistAngle,
          origin || this.outerSketch.defaultOrigin,
          extrusionVec,
          extrusionProfile,
          true
        )
      );
      return solid;
    }

    const solid = basicFaceExtrusion(this.face(), extrusionVec);

    return solid;
  }

  /**
   * Revolves the drawing on an axis (defined by its direction and an origin
   * (defaults to the sketch origin)
   */
  revolve(
    revolutionAxis?: Point,
    { origin }: { origin?: Point } = {}
  ): Shape3D {
    const solid = revolution(
      this.face(),
      origin || this.outerSketch.defaultOrigin,
      revolutionAxis
    );
    return solid;
  }

  loftWith(otherCompound: this, loftConfig: LoftConfig): Shape3D {
    if (this.sketches.length !== otherCompound.sketches.length)
      throw new Error(
        "You need to loft with another compound with the same number of sketches"
      );

    const shells: Array<Shell | Face> = this.sketches.map((base, cIndex) => {
      const outer = otherCompound.sketches[cIndex];
      return base
        .clone()
        .loftWith(outer.clone(), { ruled: loftConfig.ruled }, true);
    });

    const baseFace = this.face().clone();
    shells.push(baseFace, otherCompound.face());

    return makeSolid(shells);
  }
}
