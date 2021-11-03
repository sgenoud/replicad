---
sidebar_position: 3
title: Adding depth
---

Once you have a sketch, you want to add some depth to it. replicad offers all
the standard methods to do this.

You can find the detailed API documentation
[here](/docs/api/classes/Sketch#methods)

## Extrusion

![The sketch extruded](/img/tutorial/adding-depth-1.png)

The simplest way to "add depth" is to take the face that we have and add
thickness, to extrude it in other ways.

```js
const main = ({ Sketcher }) => {
  return new Sketcher("XZ")
    .hLine(25)
    .halfEllipse(0, 40, 5)
    .hLine(-25)
    .close()
    .extrude(10);
};
```

This is exactly what we have done, but added a depth of 10mm.

### Variations on the extrusion

We can play a bit with the extrusion as well, in addition to the extruction
length we can change:

- the direction of the extrusion (by default normal to the sketching plane),
  `.extrude(10, { extrusionDirection: [0, 1, 0.5] })`
- add a twisting motion to the shape (angle in degrees)
  `.extrude(10, { twistAngle: 10 })`

## Revolution

![The sketch revolved](/img/tutorial/adding-depth-2.png)

Let's make this shape rotate on an axis, which is, by default the `Z` axis

```js
const main = ({ Sketcher }) => {
  return new Sketcher("XZ")
    .hLine(25)
    .halfEllipse(0, 40, 5)
    .hLine(-25)
    .close()
    .revolve();
};
```

## Loft

![A loft between two sketches](/img/tutorial/adding-depth-3.png)

With a loft we make a smooth transition between two sketches (simple ones,
different from the one we had before.

```js
const main = ({ Sketcher }) => {
  return sketchRectangle(5, 10).loftWith(sketchCircle(3, { origin: 10 }));
};
```

### Variations on the loft

You can also play a bit with the loft.

- By adding a point at the end (or the start) of the loft:

```js
const main = ({ sketchCircle, sketchRectangle }) => {
  return sketchRectangle(5, 10).loftWith(sketchCircle(3, { origin: 10 }), {
    endPoint: [2, 2, 15],
  });
};
```

- By having multiple lofted sketches

```js
const main = ({ sketchCircle, sketchRectangle }) => {
  return sketchRectangle(5, 10).loftWith([
    sketchCircle(8, { origin: 10 }),
    sketchRectangle(5, 10, { origin: 20 }),
  ]);
};
```
