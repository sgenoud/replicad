---
sidebar_position: 10
title: Fuse All
---

You might find yourself in a situation where you have an array of shapes (2D or
3D) and you just want to fuse (or intersect) them all together. The following
snippet just does this

```js
const fuseAll = (shapes) => {
  let result = shapes[0];
  shapes.slice(1).forEach((shape) => {
    result = result.fuse(shape);
  });
  return result;
};
```

Let's show an example (also using polar copies).

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

const fuseAll = (shapes) => {
  let result = shapes[0];
  shapes.slice(1).forEach((shape) => {
    result = result.fuse(shape);
  });
  return result;
};

function main() {
  return fuseAll(polarCopies(drawCircle(5), 5, 7));
}
```
