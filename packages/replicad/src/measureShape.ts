import { getOC } from "./oclib";
import { AnyShape, Face, Shape3D } from "./shapes";

import type { GProp_GProps } from "replicad-opencascadejs";
import { GCWithScope, WrappingObj } from "./register";

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

export function measureVolume(shape: Shape3D) {
  return measureShapeVolumeProperties(shape).volume;
}

export function measureArea(shape: Face | Shape3D) {
  return measureShapeSurfaceProperties(shape).area;
}

export function measureLength(shape: AnyShape) {
  return measureShapeLinearProperties(shape).length;
}
