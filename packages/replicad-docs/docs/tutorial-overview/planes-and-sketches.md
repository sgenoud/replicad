---
sidebar_position: 2.5
title: Planes and Sketches
---

We have so far drawn on the 2D plane. But we want to put these drawings in 3D
space. For this we will need to define a plane and sketch the drawing into it.

## Sketching

In order to show the planes we will need to sketch on them.

```js withWorkbench
const { drawRoundedRectangle } = replicad;

const main = () => {
  return drawRoundedRectangle(100, 50).sketchOnPlane();
};
```

By default this sketches on the `XY` plane.

## Planes

Now that we know what sketching is, we can see the way to create planes.

### Standard planes

There are a bunch of standard planes defined as a string

```js withWorkbench
const { drawRoundedRectangle, makePlane } = replicad;

const main = () => {
  const rect = drawRoundedRectangle(100, 50);
  return [
    { shape: rect.sketchOnPlane(makePlane("XY")), name: "XY", color: "blue" },
    { shape: rect.sketchOnPlane(makePlane("XZ")), name: "XZ", color: "green" },
    { shape: rect.sketchOnPlane(makePlane("YZ")), name: "YZ", color: "red" },
  ];
};
```

![The standard planes](/img/tutorial/planes-1.png)

#### Planes parallel to the standard one

There are a bunch of standard planes defined as a string

```js withWorkbench
const { drawRoundedRectangle, makePlane } = replicad;

const main = () => {
  const rect = drawRoundedRectangle(100, 50);
  return [
    { shape: rect.sketchOnPlane(makePlane("XY")), name: "At 0", color: "blue" },
    {
      shape: rect.sketchOnPlane(makePlane("XY", 20)),
      name: "At 20",
      color: "green",
    },
    {
      shape: rect.sketchOnPlane(makePlane("XY", -20)),
      name: "At -20",
      color: "red",
    },
  ];
};
```

#### Sketching shortcut

As these are common ways to sketch a drawing, we have implemented a shortcut
within the `sketchOnPlane` method.

```js withWorkbench
const { drawRoundedRectangle } = replicad;

const main = () => {
  return drawRoundedRectangle(100, 50).sketchOnPlane("XZ", 10);
};
```

#### Opposite standard planes

In addition to the standard planes there are their opposite (`YX` is the
opposite of `XY`). These are the same planes, but with their axis inverted
– which also means top and bottom are inverted.

An example will make it more concrete

```js withWorkbench
const { drawRoundedRectangle, makePlane } = replicad;

const main = () => {
  const rect = drawRoundedRectangle(100, 50);
  return [
    { shape: rect.sketchOnPlane("XY", 20), name: "XY at 20", color: "green" },
    { shape: rect.sketchOnPlane("YX", 20), name: "YX at 20", color: "red" },
  ];
};
```

![Opposite planes](/img/tutorial/planes-2.png)

We can see that the rectangle has been rotated to match the axis, but also that
the direction of the plane is reversed.

### Transforming planes

We might want to use planes more different than translations of the origin
along the normal of a plane. Note that the order in which you apply these
transformations might change the final result.

#### Translations

We might want to translate the origin of an arbitrary position. Note that the
general direction of the plane is the same. Only the origin point has been
changed.

```js withWorkbench
const { drawRoundedRectangle, makePlane } = replicad;

const main = () => {
  const plane = makePlane("XZ").translate(-50, 50, 20);
  return drawRoundedRectangle(100, 50).sketchOnPlane(plane);
};
```

#### Pivot

We might want to give an angle to our plane. In order to do this, we can pivot
the plane around its origin and an axis (which can be a standard direction `X`, `Y`, `Z`, or a generic direction (`[1, 1, 0]`)

```js withWorkbench
const { drawRoundedRectangle, makePlane } = replicad;

const main = () => {
  const plane = makePlane("XY").pivot(30, "Y");
  return drawRoundedRectangle(100, 50).sketchOnPlane(plane);
};
```

#### Axes rotation

There is a last operation that can be done on a plane - it is the rotation of its
axes around the origin.

```js withWorkbench
const { drawRoundedRectangle, makePlane } = replicad;

const main = () => {
  const plane = makePlane("XY").rotate2DAxes(30);
  return drawRoundedRectangle(100, 50).sketchOnPlane(plane);
};
```

#### Summary

You can look at the different operations with the same base plane and drawing.

```js withWorkbench
const { drawRoundedRectangle, makePlane } = replicad;

const main = () => {
  const rect = drawRoundedRectangle(100, 50);

  const plane = makePlane("XY", 10);
  return [
    { shape: rect.sketchOnPlane(plane), name: "Base", opacity: 0.5 },
    {
      shape: rect.sketchOnPlane(plane.translateY(-70)),
      name: "Translated",
      opacity: 0.5,
      color: "green",
    },
    {
      shape: rect.sketchOnPlane(plane.pivot(30)),
      name: "Pivoted",
      opacity: 0.5,
      color: "orange",
    },
    {
      shape: rect.sketchOnPlane(plane.rotate2DAxes(30)),
      name: "Rotated",
      opacity: 0.5,
      color: "purple",
    },
  ];
};
```

## Practicing with the watering can tutorial

You can have a look at a practical example of using the drawing API with the
[watering can
tutorial](/docs/tutorial-making-a-watering-can/using-planes-for-spiller)
