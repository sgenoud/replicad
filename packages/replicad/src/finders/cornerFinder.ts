import { Blueprint } from "../blueprints";
import { DEG2RAD } from "../constants";
import { angle2d, Curve2D, distance2d, Point2D, samePoint } from "../lib2d";
import { Finder } from "./definitions";

export type Corner = {
  firstCurve: Curve2D;
  secondCurve: Curve2D;
  point: Point2D;
};

const blueprintCorners = function (blueprint: Blueprint): Corner[] {
  return blueprint.curves.map((curve, index) => {
    return {
      firstCurve: curve,
      secondCurve: blueprint.curves[(index + 1) % blueprint.curves.length],
      point: curve.lastPoint,
    };
  });
};

const PI_2 = 2 * Math.PI;
const positiveHalfAngle = (angle: number) => {
  const limitedAngle = angle % PI_2;

  const coterminalAngle = limitedAngle < 0 ? limitedAngle + PI_2 : limitedAngle;
  if (coterminalAngle < Math.PI) return coterminalAngle;
  if (coterminalAngle === Math.PI) return 0;
  return Math.abs(coterminalAngle - PI_2);
};

export class CornerFinder extends Finder<Corner, Blueprint> {
  clone(): CornerFinder {
    const ef = new CornerFinder();
    ef.filters = [...this.filters];
    return ef;
  }

  /**
   * Filter to find corner that have their point are in the list.
   *
   * @category Filter
   */
  inList(elementList: Point2D[]): this {
    const elementInList = ({ element }: { element: Corner }) => {
      return !!elementList.find((e) => samePoint(e, element.point));
    };
    this.filters.push(elementInList);
    return this;
  }

  /**
   * Filter to find elements that are at a specified distance from a point.
   *
   * @category Filter
   */
  atDistance(distance: number, point: Point2D = [0, 0]): this {
    function elementAtDistance({ element }: { element: Corner }) {
      return Math.abs(distance2d(point, element.point) - distance) < 1e-9;
    }
    this.filters.push(elementAtDistance);
    return this;
  }

  /**
   * Filter to find elements that contain a certain point
   *
   * @category Filter
   */
  atPoint(point: Point2D): this {
    function elementAtPoint({ element }: { element: Corner }) {
      return samePoint(point, element.point);
    }
    this.filters.push(elementAtPoint);
    return this;
  }

  /**
   * Filter to find elements that are within a box
   *
   * @category Filter
   */
  inBox(corner1: Point2D, corner2: Point2D) {
    const [x1, y1] = corner1;
    const [x2, y2] = corner2;

    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);

    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);

    function elementInBox({ element }: { element: Corner }) {
      const [x, y] = element.point;
      return x >= minX && x <= maxX && y >= minY && y <= maxY;
    }
    this.filters.push(elementInBox);
    return this;
  }

  /**
   * Filter to find corner that a certain angle between them - only between
   * 0 and 180.
   *
   * @category Filter
   */
  ofAngle(angle: number) {
    function elementOfAngle({ element }: { element: Corner }) {
      const tgt1 = element.firstCurve.tangentAt(1);
      const tgt2 = element.secondCurve.tangentAt(0);

      return (
        positiveHalfAngle(angle2d(tgt1, tgt2)) -
          positiveHalfAngle(DEG2RAD * angle) <
        1e-9
      );
    }

    this.filters.push(elementOfAngle);
    return this;
  }

  shouldKeep(element: Corner): boolean {
    const shouldKeep = this.filters.every((filter) =>
      filter({ normal: null, element })
    );
    return shouldKeep;
  }

  protected applyFilter(blueprint: Blueprint): Corner[] {
    return blueprintCorners(blueprint).filter((corner: Corner) => {
      const shouldKeep = this.shouldKeep(corner);
      return shouldKeep;
    });
  }
}
