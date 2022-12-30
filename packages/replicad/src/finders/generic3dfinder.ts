import { Direction, DIRECTIONS, FaceOrEdge, Finder } from "./definitions";

import { Vector, asPnt, Point } from "../geom";
import { DEG2RAD } from "../constants";
import { AnyShape } from "../shapes";
import { getOC } from "../oclib";
import { GCWithObject, GCWithScope } from "../register";

export abstract class Finder3d<Type extends FaceOrEdge> extends Finder<
  Type,
  AnyShape
> {
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
    const pnt = asPnt(point);

    const oc = getOC();
    const vertexMaker = new oc.BRepBuilderAPI_MakeVertex(pnt);
    const vertex = vertexMaker.Vertex();
    vertexMaker.delete();

    const distanceBuilder = new oc.BRepExtrema_DistShapeShape_1();
    distanceBuilder.LoadS1(vertex);

    const checkPoint = ({ element }: { element: Type }) => {
      const r = GCWithScope();
      distanceBuilder.LoadS2(element.wrapped);
      const progress = r(new oc.Message_ProgressRange_1());
      distanceBuilder.Perform(progress);

      return Math.abs(distanceBuilder.Value() - distance) < 1e-6;
    };

    this.filters.push(checkPoint);
    GCWithObject(checkPoint)(distanceBuilder);

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
   * Filter to find elements that are within a box
   *
   * The elements that are not fully contained in the box are also found.
   *
   * @category Filter
   */
  inBox(corner1: Point, corner2: Point) {
    const oc = getOC();
    const boxMaker = new oc.BRepPrimAPI_MakeBox_4(
      asPnt(corner1),
      asPnt(corner2)
    );
    const box = boxMaker.Solid();
    boxMaker.delete();

    const distanceBuilder = new oc.BRepExtrema_DistShapeShape_1();
    distanceBuilder.LoadS1(box);

    const checkPoint = ({ element }: { element: Type }) => {
      const r = GCWithScope();
      distanceBuilder.LoadS2(element.wrapped);
      const progress = r(new oc.Message_ProgressRange_1());
      distanceBuilder.Perform(progress);

      return distanceBuilder.Value() < 1e-6;
    };

    // We cleanup the box and the distance builder when the function disappears
    const gc = GCWithObject(checkPoint);
    gc(box);
    gc(distanceBuilder);

    this.filters.push(checkPoint);

    return this;
  }
}
