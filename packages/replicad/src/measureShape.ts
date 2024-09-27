import { getOC } from "./oclib";
import { AnyShape, Face, Shape3D } from "./shapes";

import type {
  BRepExtrema_DistShapeShape,
  GProp_GProps,
} from "replicad-opencascadejs";
import { GCWithScope, WrappingObj } from "./register";
import { ProgressRange } from "./utils/ProgressRange";

class PhysicalProperties extends WrappingObj<GProp_GProps> {
  get centerOfMass(): [number, number, number] {
    const r = GCWithScope();
    const pnt = r(this.wrapped.CentreOfMass());
    return [pnt.X(), pnt.Y(), pnt.Z()];
  }
}

export class VolumePhysicalProperties extends PhysicalProperties {
  get volume(): number {
    return this.wrapped.Mass();
  }
}

export class SurfacePhysicalProperties extends PhysicalProperties {
  get area(): number {
    return this.wrapped.Mass();
  }
}

export class LinearPhysicalProperties extends PhysicalProperties {
  get length(): number {
    return this.wrapped.Mass();
  }
}

export function measureShapeSurfaceProperties(
  shape: Face | Shape3D
): SurfacePhysicalProperties {
  const oc = getOC();
  const properties = new oc.GProp_GProps_1();
  oc.BRepGProp.SurfaceProperties_1(shape.wrapped, properties, false, false);
  return new SurfacePhysicalProperties(properties);
}

export function measureShapeLinearProperties(
  shape: AnyShape
): LinearPhysicalProperties {
  const oc = getOC();
  const properties = new oc.GProp_GProps_1();
  oc.BRepGProp.LinearProperties(shape.wrapped, properties, false, false);
  return new LinearPhysicalProperties(properties);
}

export function measureShapeVolumeProperties(
  shape: Shape3D
): VolumePhysicalProperties {
  const oc = getOC();
  const properties = new oc.GProp_GProps_1();
  oc.BRepGProp.VolumeProperties_1(
    shape.wrapped,
    properties,
    false,
    false,
    false
  );
  return new VolumePhysicalProperties(properties);
}

/**
 * Measure the volume of a shape
 *
 * @category Measure
 */
export function measureVolume(shape: Shape3D) {
  return measureShapeVolumeProperties(shape).volume;
}

/**
 * Measure the area of a shape
 *
 * @category Measure
 */
export function measureArea(shape: Face | Shape3D) {
  return measureShapeSurfaceProperties(shape).area;
}

/**
 * Measure the length of a shape
 *
 * @category Measure
 */
export function measureLength(shape: AnyShape) {
  return measureShapeLinearProperties(shape).length;
}

export class DistanceTool extends WrappingObj<BRepExtrema_DistShapeShape> {
  constructor() {
    const oc = getOC();
    super(new oc.BRepExtrema_DistShapeShape_1());
  }

  distanceBetween(shape1: AnyShape, shape2: AnyShape): number {
    this.wrapped.LoadS1(shape1.wrapped);
    this.wrapped.LoadS2(shape2.wrapped);
    const progress = new ProgressRange();
    this.wrapped.Perform(progress.wrapped);
    return this.wrapped.Value();
  }
}

/**
 * Measure the distance between two shapes
 *
 * @category Measure
 */
export function measureDistanceBetween(
  shape1: AnyShape,
  shape2: AnyShape
): number {
  return new DistanceTool().distanceBetween(shape1, shape2);
}

export class DistanceQuery extends WrappingObj<BRepExtrema_DistShapeShape> {
  constructor(shape: AnyShape) {
    const oc = getOC();
    super(new oc.BRepExtrema_DistShapeShape_1());
    this.wrapped.LoadS1(shape.wrapped);
  }

  distanceTo(shape: AnyShape): number {
    this.wrapped.LoadS2(shape.wrapped);
    const progress = new ProgressRange();
    this.wrapped.Perform(progress.wrapped);
    return this.wrapped.Value();
  }
}
