import {
  Direction,
  DIRECTIONS,
  FaceOrEdge,
  FilterFcn,
  Finder,
} from "./definitions";

import { Vector, Point } from "../geom";
import { DEG2RAD } from "../constants";
import { AnyShape } from "../shapes";
import { makeBox, makeVertex } from "../shapeHelpers";
import { DistanceQuery } from "../measureShape";

export abstract class Finder3d<Type extends FaceOrEdge> extends Finder<
  Type,
  AnyShape
> {
  /**
   * Filter to find elements following a custom function.
   *
   * @category Filter
   */
  when(filter: (filter: FilterFcn<Type>) => boolean): this {
    this.filters.push(filter);
    return this;
  }

  /**
   * Filter to find elements that are in the list.
   *
   * This deletes the elements in the list as the filter deletion.
   *
   * @category Filter
   */
  inList(elementList: Type[]): this {
    const elementInList = ({ element }: { element: Type }) => {
      return !!elementList.find((e) => e.isSame(element));
    };
    this.filters.push(elementInList);
    return this;
  }

  /**
   * Filter to find elements that are at a specified angle (in degrees) with
   * a direction.
   *
   * The element direction corresponds to its normal in the case of a face.
   *
   * @category Filter
   */
  atAngleWith(direction: Direction | Point = "Z", angle = 0): this {
    let myDirection: Vector;
    if (typeof direction === "string") {
      myDirection = new Vector(DIRECTIONS[direction]);
    } else {
      myDirection = new Vector(direction);
    }

    const checkAngle = ({ normal }: { normal: Vector | null }) => {
      // We do not care about the orientation
      if (!normal) return false;
      const angleOfNormal = Math.acos(Math.abs(normal.dot(myDirection)));

      return Math.abs(angleOfNormal - DEG2RAD * angle) < 1e-6;
    };

    this.filters.push(checkAngle);

    return this;
  }

  /**
   * Filter to find elements that are at a specified distance from a point.
   *
   * @category Filter
   */
  atDistance(distance: number, point: Point = [0, 0, 0]): this {
    const vertex = makeVertex(point);
    const query = new DistanceQuery(vertex);

    const checkPoint = ({ element }: { element: Type }) => {
      return Math.abs(query.distanceTo(element) - distance) < 1e-6;
    };

    this.filters.push(checkPoint);
    return this;
  }

  /**
   * Filter to find elements that contain a certain point
   *
   * @category Filter
   */
  containsPoint(point: Point): this {
    return this.atDistance(0, point);
  }

  /**
   * Filter to find elements that are within a certain distance from a point.
   *
   * @category Filter
   */
  withinDistance(distance: number, point: Point = [0, 0, 0]): this {
    const vertex = makeVertex(point);
    const query = new DistanceQuery(vertex);

    const checkPoint = ({ element }: { element: Type }) => {
      return query.distanceTo(element) - distance < 1e-6;
    };

    this.filters.push(checkPoint);
    return this;
  }

  /**
   * Filter to find elements that are within a box
   *
   * The elements that are not fully contained in the box are also found.
   *
   * @category Filter
   */
  inBox(corner1: Point, corner2: Point) {
    const box = makeBox(corner1, corner2);
    return this.inShape(box);
  }

  /**
   * Filter to find elements that are within a generic shape
   *
   * The elements that are not fully contained in the shape are also found.
   *
   * @category Filter
   */
  inShape(shape: AnyShape) {
    const query = new DistanceQuery(shape);

    const checkPoint = ({ element }: { element: Type }) => {
      return query.distanceTo(element) < 1e-6;
    };

    this.filters.push(checkPoint);
    return this;
  }
}
