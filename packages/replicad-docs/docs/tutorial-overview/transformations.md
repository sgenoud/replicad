---
sidebar_position: 4
title: Transformations
---

Now that we have a 3D shape it is time to move it around. Note that usually you
will transform a shape in order to align it with another shape, for instance, or
to have different versions of a same basic shape.

For this part of the tutorial we will create a weird, non symmetrical shape:

```js withWorkbench
const { draw } = replicad;
const main = () => {
  const shape = draw()
    .movePointerTo([50, 50])
    .hLine(-120)
    .vSagittaArc(-80, -20)
    .sagittaArc(100, 20, 60)
    .close()
    .sketchOnPlane()
    .extrude(100, { extrusionProfile: { profile: "linear", endFactor: 0.5 } });

  return shape;
};
```

![A weird shape to transform](/img/tutorial/transformations-1.png)

## Let's move stuff around

This is fairly straightforward. We have a shape, we translate it on the
axes (or on a vector)

```js
return shape.translateZ(20);
```

You can see the 2cm between the base of the shape and the grid

## Let's rotate this thing

```js
return shape.rotate(45, [0, 0, 0], [1, 0, 0]);
```

The shape is rotated 45 degrees around an axis going through the origin and in the
X direction. Try to move these points around to see what is going on.

## Finally mirroring

```js
return shape.mirror("XZ");
```

The mirror image of the shape!
