import { Corner, CornerFinder } from "../finders/cornerFinder";
import { chamferCurves, Curve2D, filletCurves, samePoint } from "../lib2d";
import Blueprint from "./Blueprint";
import Blueprints from "./Blueprints";
import { Shape2D } from "./boolean2D";
import CompoundBlueprint from "./CompoundBlueprint";

type CornerMaker = (c1: Curve2D, c2: Curve2D, radius: number) => Curve2D[];

function modifyCorners(
  makeCorner: CornerMaker,
  blueprint: Blueprint,
  radius: number,
  finder?: CornerFinder
) {
  let modifyCorner: (c: Corner) => boolean = () => true;
  if (finder) {
    modifyCorner = finder.shouldKeep.bind(finder);
  }

  const curves = [blueprint.curves[0]];

  const addModifiedCorner = (firstCurve: Curve2D, secondCurve: Curve2D) => {
    if (
      modifyCorner({ firstCurve, secondCurve, point: firstCurve.lastPoint })
    ) {
      curves.push(...makeCorner(firstCurve, secondCurve, radius));
    } else {
      curves.push(firstCurve, secondCurve);
    }
  };

  blueprint.curves.slice(1).forEach((secondCurve) => {
    const firstCurve = curves.pop();
    if (!firstCurve) throw new Error("Bug in the blueprint filletting algo");
    addModifiedCorner(firstCurve, secondCurve);
  });

  const lastCurve = curves.at(-1);
  if (!lastCurve) throw new Error("Bug in the blueprint corner algo");
  if (
    samePoint(curves[0].firstPoint, lastCurve.lastPoint) &&
    curves.length > 1
  ) {
    const firstCurve = curves.pop();
    const secondCurve = curves.shift();
    if (!firstCurve || !secondCurve)
      throw new Error("Bug in the blueprint filletting algo");
    addModifiedCorner(firstCurve, secondCurve);
  }

  return new Blueprint(curves);
}

function modifyCorner2D(
  makeCorner: CornerMaker,
  shape: Shape2D,
  radius: number,
  finder?: CornerFinder
): Shape2D {
  if (shape instanceof Blueprint) {
    return modifyCorners(makeCorner, shape, radius, finder);
  }

  if (shape instanceof CompoundBlueprint) {
    // This might break the compound by clipping the outer limit. We ignore
    // that case for now
    return new CompoundBlueprint(
      shape.blueprints.map((b) => modifyCorners(makeCorner, b, radius, finder))
    );
  }

  if (shape instanceof Blueprints) {
    const bps = shape.blueprints
      .map((b) => modifyCorner2D(makeCorner, b, radius, finder))
      .filter((b) => b !== null) as (Blueprint | CompoundBlueprint)[];
    return new Blueprints(bps);
  }

  return null;
}

export function fillet2D(
  shape: Shape2D,
  radius: number,
  finder?: CornerFinder
) {
  return modifyCorner2D(filletCurves, shape, radius, finder);
}

export function chamfer2D(
  shape: Shape2D,
  radius: number,
  finder?: CornerFinder
) {
  return modifyCorner2D(chamferCurves, shape, radius, finder);
}
