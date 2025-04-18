---
sidebar_position: 7
title: Modifications
---

In addition to the shape transformations and shape combinations, it is also
possible to apply some advanced modifications to shapes. These modifications
use finders to filter out which face or edges they need.

## Fillet and chamfer

Adding fillet (rounded edges) and chamfers (beveled edges) is a very common
operation when modelling in 3D. These operations are mainly configured by their
radius.

```js withWorkbench
const { drawRoundedRectangle } = replicad;
const main = () => {
  return drawRoundedRectangle(30, 50).sketchOnPlane().extrude(20).fillet(2);
};
```

When configuring a fillet with a number, all the edges of the shape will be
filleted.

If you want to target specific edges you will need to configure a finder within
a filter configuration. For instance to fillet only the top edges:

```js withWorkbench
const { drawRoundedRectangle } = replicad;
const main = () => {
  return drawRoundedRectangle(30, 50)
    .sketchOnPlane()
    .extrude(20)
    .fillet(2, (e) => e.inPlane("XY", 20));
};
```

### Multiple radii

What if you want to apply different radii for different edges? You can use
a function that will combine filter configurations.

In this case we want to have a bigger fillet on the sides of the box and
a small one at the top. You might have been able to do this with two different
fillet operations, but in some cases the kernel has more difficulties finding
a good solution with multiple operations.

```js withWorkbench
const { drawRoundedRectangle, EdgeFinder, combineFinderFilters } = replicad;
const main = () => {
  const [filters] = combineFinderFilters([
    {
      filter: new EdgeFinder().inPlane("XY", 20),
      radius: 2,
    },
    {
      filter: new EdgeFinder().inDirection("Z"),
      radius: 9,
    },
  ]);

  return drawRoundedRectangle(30, 50)
    .sketchOnPlane()
    .extrude(20)
    .fillet(filters);
};
```

### Asymmetric chamfer

By default chamfer operations will use a radius, the same distance on both
sides of a edge. If you want to use a different distance on each side and
create an asymmetric chamfer, you can use a custom radius:

```js withWorkbench
const { makeBaseBox, EdgeFinder } = replicad;

export default function main() {
  let base = makeBaseBox(30, 50, 10);
  return base.chamfer(
    {
      distances: [5, 2],
      selectedFace: (f) => f.inPlane("YZ", 15),
    },
    (e) => e.inPlane("XY", 10)
  );
}
```

The selected face corresponds to the face on which the first distance will be
applied.

### Fillet with radius evolution

You can also have a fillet vary along the edge. This is done by using an array
of two numbers. The first number is the radius at the start of the edge, and
the second number is the radius at the end of the edge.

```js withWorkbench
const { makeBaseBox } = replicad;

export default function main() {
  let base = makeBaseBox(30, 50, 10);
  return base.fillet([4, 1], (e) => e.inPlane("YZ", 15).inDirection("Y"));
}
```

###

## Shell

With a shell you can hollow out a full shape (keeping a wall of a certain
thickness). You need to specify a face that will be hollow, and you configure
a finder for this.

```js withWorkbench
const { drawRoundedRectangle } = replicad;
const main = () => {
  return drawRoundedRectangle(30, 50)
    .sketchOnPlane()
    .extrude(20)
    .shell(5, (f) => f.inPlane("XY", 20));
};
```
