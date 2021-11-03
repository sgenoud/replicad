---
sidebar_position: 2
title: Sketching
---

Let's start in two dimensions only, we will add the third one soon enough.
replicad provides some classes and functions to sketch on a two dimentional
plane (or a face, but we will see that later).

Let's start with the powerful `Sketcher`.

## The `Sketcher` class

A sketcher is a class that allows you to draw a set of segment of curve. It
currently supports:

- lines
- arcs of circles
- arcs of ellipses
- bezier curves

And for each of these categories it provides a set of functions that should
help you draw stuff quickly - or give you as much power as you need. Have
a [look at the detailed API
documentation](/docs/api/interfaces/GenericSketcher) to see what it can do

### A simple sketch

![A simple sketch](/img/tutorial/sketching-1.png)

Let's draw something simple:

```js
const main = ({ Sketcher }) => {
  return new Sketcher("XZ").hLine(25).halfEllipse(0, 40, 5).hLine(-25).close();
};
```

What have we done?

- First, we are drawing on the `XZ` plane. We then draw an horizontal line of
  25 milimeters of length.
- Then, we then draw an half ellipse, from the last point of the line, moving,
  by `0` horizontally and by `40` vertically - but drawing an arc of ellipse of
  `5` of axis length.
- We go back of 25 horizonally
- We finally close the sketch, going from the current last point to the first
  point with a straight line.

### Let's play with the sketch

To understand what the different parameters do, let's play with them:

- change the plane to `ZX` to see that the horizonal and vertical axes are
  relative to the definition of the plane
- move the plane in the normal direction with this definition `Sketcher("XZ", -5)`
- close with a mirror instead of a straight line with `.closeWithMirror`
  instead of `close`
- replace the second horizontal line by a sagitta line (an arc or circle) as
  `.hSagittaArc(-25, 10)`

## Sketch functions

In addition to the `Sketcher` class, replicad provides some sketching functions
to draw common and useful shapes. You can for instance:

- sketch a rectangle, polygon, circle or ellipse
- draw based on a parametric function
- draw an offset of a face

They are [documented in the API](/docs/api#sketching-functions-1)
