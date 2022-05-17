import { Point2D, BoundingBox2d } from "../lib2d";
import { Face } from "../shapes";

import { Plane, PlaneName, Point } from "../geom";

import { ScaleMode } from "../curves";
import Blueprint from "./Blueprint";
import Blueprints from "./Blueprints";
import CompoundBlueprint from "./CompoundBlueprint";
import { SketchInterface } from "../sketches/lib";
import Sketches from "../sketches/Sketches";

const groupByBoundingBoxOverlap = (blueprints: Blueprint[]): Blueprint[][] => {
  const overlaps = blueprints.map((blueprint, i) => {
    return blueprints
      .slice(i + 1)
      .map((v, j): [number, Blueprint] => [j + i + 1, v])
      .filter(([, other]) => !blueprint.boundingBox.isOut(other.boundingBox))
      .map(([index]) => index);
  });
  const groups: Blueprint[][] = [];
  const groupsInOverlaps = Array(overlaps.length);

  overlaps.forEach((indices, i) => {
    let myGroup = groupsInOverlaps[i];
    if (!myGroup) {
      myGroup = [];
      groups.push(myGroup);
    }

    myGroup.push(blueprints[i]);

    if (indices.length) {
      indices.forEach((index) => {
        groupsInOverlaps[index] = myGroup;
      });
    }
  });

  return groups;
};

interface ContainedBlueprint {
  blueprint: Blueprint;
  isIn: Blueprint[];
}

const addContainmentInfo = (
  groupedBlueprints: Blueprint[]
): ContainedBlueprint[] => {
  return groupedBlueprints.map((blueprint, index) => {
    const firstCurve = blueprint.curves[0];
    const point = firstCurve.value(
      (firstCurve.lastParameter + firstCurve.firstParameter) / 2
    );

    const isIn = groupedBlueprints.filter((potentialOuterBlueprint, j) => {
      if (index === j) return false;
      return potentialOuterBlueprint.isInside(point);
    });

    return {
      blueprint,
      isIn,
    };
  });
};

const splitMultipleOuterBlueprints = (
  outerBlueprints: ContainedBlueprint[],
  allBlueprints: ContainedBlueprint[]
): ContainedBlueprint[][] => {
  return outerBlueprints.flatMap(({ blueprint: outerBlueprint }) => {
    return cleanEdgeCases(
      allBlueprints.filter(
        ({ blueprint, isIn }) =>
          blueprint === outerBlueprint || isIn.indexOf(outerBlueprint) !== -1
      )
    );
  });
};

const handleNestedBlueprints = (
  nestedBlueprints: ContainedBlueprint[],
  allBlueprints: ContainedBlueprint[]
): ContainedBlueprint[][] => {
  const firstLevelOuterBlueprints = allBlueprints.filter(
    ({ isIn }) => isIn.length <= 1
  );

  const innerLevelsBlueprints = cleanEdgeCases(
    addContainmentInfo(nestedBlueprints.map(({ blueprint }) => blueprint))
  );
  return [firstLevelOuterBlueprints, ...innerLevelsBlueprints];
};

const cleanEdgeCases = (
  groupedBlueprints: ContainedBlueprint[]
): ContainedBlueprint[][] => {
  const outerBlueprints = groupedBlueprints.filter(({ isIn }) => !isIn.length);
  const nestedBlueprints = groupedBlueprints.filter(
    ({ isIn }) => isIn.length > 1
  );

  if (outerBlueprints.length === 1 && nestedBlueprints.length === 0) {
    return [groupedBlueprints];
  } else if (outerBlueprints.length > 1) {
    return splitMultipleOuterBlueprints(outerBlueprints, groupedBlueprints);
  } else {
    return handleNestedBlueprints(nestedBlueprints, groupedBlueprints);
  }
};

/**
 * Groups an array of blueprints such that blueprints that correspond to holes
 * in other blueprints are set in a `CompoundBlueprint`.
 *
 * The current algorithm does not handle cases where blueprints cross each
 * other
 */
export const organiseBlueprints = (blueprints: Blueprint[]): Blueprints => {
  const basicGrouping =
    groupByBoundingBoxOverlap(blueprints).map(addContainmentInfo);
  return new Blueprints(
    basicGrouping.flatMap(cleanEdgeCases).map((compounds) => {
      if (compounds.length === 1) return compounds[0].blueprint;

      compounds.sort((a, b) => a.isIn.length - b.isIn.length);
      return new CompoundBlueprint(compounds.map(({ blueprint }) => blueprint));
    })
  );
};

export interface DrawingInterface {
  boundingBox: BoundingBox2d;
  stretch(ratio: number, direction: Point2D, origin: Point2D): DrawingInterface;

  rotate(angle: number, center: Point2D): DrawingInterface;
  translate(xDist: number, yDist: number): DrawingInterface;

  /**
   * Returns the mirror image of this drawing made with a single point (in
   * center mode, the default, or a plane, (plane mode, with both direction and
   * origin of the plane).
   */
  mirror(
    centerOrDirection: Point2D,
    origin?: Point2D,
    mode?: "center" | "plane"
  ): DrawingInterface;

  /**
   * Returns the sketched version of the drawing, on a plane
   */
  sketchOnPlane(inputPlane: Plane): SketchInterface | Sketches;
  sketchOnPlane(
    inputPlane?: PlaneName,
    origin?: Point | number
  ): SketchInterface | Sketches;
  sketchOnPlane(
    inputPlane?: PlaneName | Plane,
    origin?: Point | number
  ): SketchInterface | Sketches;

  /**
   * Returns the sketched version of the drawing, on a face.
   *
   * The scale mode corresponds to the way the coordinates of the drawing are
   * interpreted match with the face:
   *
   * - `original` uses global coordinates (1mm in the drawing is 1mm on the
   *   face). This is the default, but currently supported only for planar
   *   and circular faces
   * - `bounds` normalises the UV parameters on the face to [0,1] intervals.
   * - `native` uses the default UV parameters of opencascade
   */
  sketchOnFace(face: Face, scaleMode: ScaleMode): SketchInterface | Sketches;

  /**
   * Formats the drawing as an SVG image
   */
  toSVG(margin: number): string;

  /**
   * Returns the SVG viewbox that corresponds to this drawing
   */
  toSVGViewBox(margin?: number): string;

  /**
   * Formats the drawing as a list of SVG paths
   */
  toSVGPaths(): string[] | string[][];
}
