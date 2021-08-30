import { localGC } from "./register.js";
import { loft, genericSweep } from "./addThickness.js";

export const loftSketches = (sketches, loftConfig) => {
  const [r, gc] = localGC();
  const wires = sketches.map((s) => r(s.close({ returnType: "wire" })));

  const shape = loft(wires, loftConfig);
  gc();
  return shape;
};

export const sweepSketch = (profileSketch, spineSketch, sweepConfig) => {
  const [r, gc] = localGC();

  const profile = r(profileSketch.close({ returnType: "wire" }));
  const spine = r(spineSketch.buildWire());
  const shape = genericSweep(profile, spine, sweepConfig);
  gc();
  return shape;
};
