---
sidebar_position: 2
title: Polar array
---

Sometimes you want to copy a shape with a circular pattern. This is fairly easy
to do with a little bit of javascript.

```js
const polarCopies = (shape, count, radius) => {
  const base = shape.translate(0, radius);
  const angle = 360 / count;

  const copies = [];
  for (let i = 0; i < count; i++) {
    copies.push(base.clone().rotate(i * angle));
  }
  return copies;
};
```

For the optimal use, take into account that we assume

- that your original shape is centered at the origin
- that you want to rotate around the origin
- that you want to go all around the circle

Let's show an example

```js withWorkbench
const { drawCircle } = replicad;

const polarCopies = (shape, count, radius) => {
  const base = shape.translate(0, radius);
  const angle = 360 / count;

  const copies = [];
  for (let i = 0; i < count; i++) {
    copies.push(base.clone().rotate(i * angle));
  }
  return copies;
};

function main() {
  return polarCopies(drawCircle(5), 5, 12);
}
```

Note that this code works for both 2D and 3D cases. In the case of 3D, it will
do the copies in the `XY` plane.

```js withWorkbench
const { drawCircle } = replicad;

const polarCopies = (shape, count, radius) => {
  const base = shape.translate(0, radius);
  const angle = 360 / count;

  const copies = [];
  for (let i = 0; i < count; i++) {
    copies.push(base.clone().rotate(i * angle));
  }
  return copies;
};

function main() {
  return polarCopies(drawCircle(5).sketchOnPlane().extrude(2), 5, 12);
}
```
