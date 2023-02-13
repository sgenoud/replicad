---
sidebar_position: 3
title: Using planes for the filler
---

In order to build the filler we will need to place three circles (that will be
lofted later on).

We will approach this by drawing on three different planes. The first one is
simple, it corresponds to the plane parallel to the "XY" plane, but at
a certain distance from the origin.

```js withWorkbench
const { drawCircle, makePlane } = replicad;
const main = () => {
  const middlePlane = makePlane("XY", 100);
  return drawCircle(8).sketchOnPlane(middlePlane);
};
```

Note that sketching on a plane parallel to a standard one (`"XY"`, `"XZ"` or
`"YZ"` is a common operation and you can use the shortcut

```js withWorkbench
const { drawCircle } = replicad;
const main = () => {
  return drawCircle(8).sketchOnPlane("XY", 100);
};
```

## Plane translations

What we have done here could also be done with a plane translation.

```js withWorkbench
const { drawCircle, makePlane } = replicad;
const main = () => {
  const middlePlane = makePlane("XY").translateZ(100);
  return drawCircle(8).sketchOnPlane(middlePlane);
};
```

A translation changes the origin point of a plane (not its orientation).

## Plane pivots

What if you want a plane that is not parallel to one of the standard ones? You
can pivot it on it origin following a direction.

```js withWorkbench
const { drawCircle, makePlane } = replicad;
const main = () => {
  const topPlane = makePlane().pivot(-20, "Y");
  return drawCircle(12).sketchOnPlane(topPlane);
};
```

The circle is not drawn with an angle of 20 degrees along the Y axis.

## Putting it all together to build the filler

With the filler we want 3 circles some of the pivoted, we put it all together
like this:

```js withWorkbench
const { drawCircle, makePlane } = replicad;

const main = () => {
  const topPlane = makePlane().pivot(-20, "Y").translate([-35, 0, 135]);
  const topCircle = drawCircle(12).sketchOnPlane(topPlane);

  const middleCircle = drawCircle(8).sketchOnPlane("XY", 100);

  const bottomPlane = makePlane().pivot(20, "Y").translateZ(80);
  const bottomCircle = drawCircle(9).sketchOnPlane(bottomPlane);

  return [
    { shape: topCircle, name: "Top Circle" },
    { shape: middleCircle, name: "Middle Circle" },
    { shape: bottomCircle, name: "Bottom Circle" },
  ];
};
```

We will want to rely all this circles with a "loft" operation later on.
