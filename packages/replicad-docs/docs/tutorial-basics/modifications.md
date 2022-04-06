---
sidebar_position: 7
title: Modifications
---

In addition to the shape transformations and shape combinations, it is also
possible to apply some advances modifications to shapes. These modifications
use finders to filter out which face or edges they need.

## Fillet and chamfer

Adding fillet (rounded edges) and chamfers (beveled edges) is a very common
operation when modelling in 3D. These operations are mainly configured by their
radius.

```js
const main = ({ sketchRectangle }) => {
  return sketchRectangle(30, 50).extrude(20).fillet(2);
};
```

When configuring a fillet with a number, all the edges of the shape will be
filletted.

If you want to target specific edges you will need to configure a finder within
a filter configuration. For instance to fillet only the top edges:

```js
const main = ({ sketchRectangle }) => {
  return sketchRectangle(30, 50)
    .extrude(20)
    .fillet(2, (e) => e.inPlane("XY", 20));
};
```

### Multiple radii

What if you want to apply different radii for different edges? You can use
a function that will combine filter configurations.

In this case we want to have a bigger fillet on the sides of the box and
a small one at the top. You might have been able to do this with two different
fillet operations, but in some cases the kernel has more diffulties finding
a good solution with multiple operations.

```js
const main = ({ sketchRectangle, EdgeFinder, combineFinderFilters }) => {
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

  return sketchRectangle(30, 50).extrude(20).fillet(filters);
};
```

## Shell

With a shell you can hollow out a full shape (keeping a wall of a certain
thickness). You need to specify a face that will be hollow, and you configure
a finder for this.

```js
const main = ({ sketchRectangle }) => {
  return sketchRectangle(30, 50)
    .extrude(20)
    .shell(5, (f) => f.inPlane("XY", 20)));
};
```
