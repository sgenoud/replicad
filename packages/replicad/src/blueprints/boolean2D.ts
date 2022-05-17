import Blueprint from "./Blueprint";
import Blueprints from "./Blueprints";
import CompoundBlueprint from "./CompoundBlueprint";
import { organiseBlueprints } from "./lib";
import {
  fuseBlueprints,
  cutBlueprints,
  intersectBlueprints,
} from "./booleanOperations";

export type Shape2D = Blueprint | Blueprints | CompoundBlueprint | null;

const allBlueprints = (shape: Shape2D): Blueprint[] => {
  if (shape instanceof Blueprint) return [shape];
  if (shape instanceof CompoundBlueprint) return shape.blueprints;
  if (shape instanceof Blueprints)
    return shape.blueprints.flatMap((b) => allBlueprints(b));
  return [];
};

const fuseBlueprintWithCompound = (
  blueprint: Blueprint,
  compound: CompoundBlueprint
) => {
  const outerFused = fuseBlueprints(blueprint, compound.blueprints[0]);
  const innerFused = compound.blueprints
    .slice(1)
    .map((c) => cutBlueprints(c, blueprint));

  return organiseBlueprints([
    ...allBlueprints(outerFused),
    ...innerFused.flatMap((fused) => allBlueprints(fused)),
  ]);
};

const fuseCompoundWithCompound = (
  first: CompoundBlueprint,
  second: CompoundBlueprint
) => {
  const outerFused = fuseBlueprints(first.blueprints[0], second.blueprints[0]);

  const inner1Fused = second.blueprints
    .slice(1)
    .map((c) => cutBlueprints(c, first.blueprints[0]));

  const inner2Fused = first.blueprints
    .slice(1)
    .map((c) => cutBlueprints(c, second.blueprints[0]));

  return organiseBlueprints([
    ...allBlueprints(outerFused),
    ...inner1Fused.flatMap((fused) => allBlueprints(fused)),
    ...inner2Fused.flatMap((fused) => allBlueprints(fused)),
  ]);
};

export const fuse2D = (
  first: Shape2D,
  second: Shape2D
): Blueprint | Blueprints | CompoundBlueprint | null => {
  if (first === null) {
    return second && second.clone();
  }
  if (second === null) {
    return first && first.clone();
  }

  if (first instanceof Blueprints) {
    let out = fuse2D(first.blueprints[0], second);

    first.blueprints.slice(1).forEach((bp) => {
      out = fuse2D(bp, out);
    });
    return organiseBlueprints(allBlueprints(out));
  }
  if (second instanceof Blueprints) {
    let out = fuse2D(second.blueprints[0], first);

    second.blueprints.slice(1).forEach((bp) => {
      out = fuse2D(bp, out);
    });
    return organiseBlueprints(allBlueprints(out));
  }

  if (first instanceof CompoundBlueprint) {
    if (second instanceof Blueprints) {
      return fuse2D(second, first);
    }
    if (second instanceof Blueprint) {
      return fuseBlueprintWithCompound(second, first);
    }
    if (second instanceof CompoundBlueprint) {
      return fuseCompoundWithCompound(first, second);
    }
  }

  if (second instanceof CompoundBlueprint) {
    if (first instanceof Blueprints) {
      return fuse2D(first, second);
    }
    if (first instanceof Blueprint) {
      return fuseBlueprintWithCompound(first, second);
    }
    if (first instanceof CompoundBlueprint) {
      return fuseCompoundWithCompound(first, second);
    }
  }

  if (first instanceof Blueprint && second instanceof Blueprint) {
    return fuseBlueprints(first, second);
  }
  return null;
};

export const cut2D = (
  first: Shape2D,
  second: Shape2D
): Blueprint | Blueprints | CompoundBlueprint | null => {
  if (first === null) {
    return null;
  }
  if (second === null) {
    return first.clone();
  }

  if (first instanceof Blueprints) {
    let out = cut2D(first.blueprints[0], second);
    first.blueprints.slice(1).forEach((bp) => {
      out = fuse2D(out, cut2D(bp, second));
    });
    return out;
  }

  if (first instanceof CompoundBlueprint) {
    const wrapper = first.blueprints[0];
    if (second instanceof Blueprint && !second.intersects(wrapper)) {
      if (!wrapper.isInside(second.firstPoint)) return null;
      const cuts = fuse2D(second, new Blueprints(first.blueprints.slice(1)));
      return cut2D(wrapper, cuts);
    } else {
      let out = cut2D(first.blueprints[0], second);
      first.blueprints.slice(1).forEach((bp) => {
        out = cut2D(out, bp);
      });
      return out;
    }
  }

  // From here the first is a simple blueprint

  if (second instanceof Blueprints) {
    let out = cut2D(first, second.blueprints[0]);
    second.blueprints.slice(1).forEach((bp) => {
      out = cut2D(out, bp);
    });
    return out;
  }

  if (second instanceof CompoundBlueprint) {
    let out: Shape2D = cutBlueprints(first, second.blueprints[0]);
    second.blueprints.slice(1).forEach((bp) => {
      out = fuse2D(out, intersectBlueprints(bp, first));
    });
    return out;
  }

  // Both are blueprints
  const singleCut = cutBlueprints(first, second);
  return singleCut;
};
