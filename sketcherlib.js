import { Plane, createNamedPlane  } from "./geom.js";
import {  RegisteredObj } from "./register.js";
import Sketch from "./Sketch.js";
import { getOC } from "./oclib.js";

export const makePlane = (plane = "XY", origin = [0, 0, 0]) => {
  if (plane instanceof Plane) {
    return plane.clone();
  } else {
    return createNamedPlane(plane, origin);
  }
};

export class BaseSketcher extends RegisteredObj {
  constructor(plane = "XY", origin = [0, 0, 0]) {
    super();
    this.oc = getOC();

    this.plane = makePlane(plane, origin);
  }

  delete() {
    this.plane.delete();
    super.delete();
  }

  buildWire() {
    throw new Error("build wire needs to be implemented by children classes");
  }

  _closeSketch() {
    // This needs to be implemented to ensure a sketch is closed
  }

  done() {
    const sketch = new Sketch(this.buildWire(), {
      defaultOrigin: this.plane.origin,
      defaultDirection: this.plane.zDir,
    });
    this.delete();
    return sketch;
  }

  close(shaperConfig) {
    this._closeSketch();
    if (!shaperConfig) return this.done();
    return this.done().fromConfig(shaperConfig);
  }
}
