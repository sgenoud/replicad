---
sidebar_position: 2
title: Drawing
---

:::tip

<div style={{display: "flex", flexDirection: "row", justifyContent:
"space-between"}}>

<div style={{maxWidth: "calc(100% - 120px)"}}>

You can click on the `Open in workbench` button in most code samples to see (and
edit them) within the workbench.

</div>

<div style={{width: "100px"}}>
<img src="/img/tutorial/workbench.png" alt="The workbench button" />
</div>
</div>

:::

Let's start in two dimensions only, we will add the third one soon enough.
replicad provides some classes and functions to draw in the plane.

Let's start with the powerful `draw` API.

## The `draw` function and the Drawing API

With the drawing API you can draw straight lines and several types of curves. It currently supports:

- straight lines
- arcs of circles
- arcs of ellipses
- bezier curves

And for each of these categories it provides a set of functions that should
help you draw stuff quickly - or give you as much power as you need. Have
a [look at the detailed API
documentation](/docs/api/classes/DrawingPen) to see what it can do

### A simple drawing

Let's draw something simple:

```js withWorkbench
const { draw } = replicad;
const main = () => {
  return draw().hLine(25).halfEllipse(0, 40, 5).hLine(-25).close();
};
```

![A simple drawing](/img/tutorial/drawing-1.png)

What have we done?

- We start drawing (at the origin, for instance `draw([10, 10])` would start at
  another point.
- We then draw an horizontal line of 25 milimeters of length.
- Then, we draw an half ellipse, from the last point of the line, moving,
  by `0` horizontally and by `40` vertically - but drawing an arc of an ellipse with
  an axis length of `5`.
- We then go back of 25 horizonally
- We finally close the drawing, going from the current last point to the first
  point with a straight line.

### Let's play with the drawing

To understand what the different parameters do, let's play with them:

- close with a mirror instead of a straight line with `.closeWithMirror`
  instead of `close`
- replace the second horizontal line by a sagitta line (an arc or circle)
  `.hSagittaArc(-25, 10)`
- change the origin to another point (with `draw([10, 10])` for instance).

## Drawing functions

In addition to the `draw` API, replicad provides some drawing functions
to draw common and useful shapes. You can for instance:

- draw a rectangle [`drawRoundedRectangle`](/docs/api#drawroundedrectangle)
- draw a polygon [`drawPolysides`](/docs/api#drawpolysides)
- circle [`drawCircle`](/docs/api#drawcircle) or ellipse [`drawEllipse`](/docs/api#drawellipse)
- draw some text in a ttf font [`drawText`](/docs/api#drawtext)
- draw based on a parametric function
  [`drawParametricFunction`](/docs/api#drawparametricfunction), with an [example
  here](/docs/examples/cadquery-gear)

They are [documented in the API](/docs/api#drawing-functions-1)

## Practicing with the watering can tutorial

You can have a look at a practical example of using the drawing API with the
[watering can
tutorial](/docs/tutorial-making-a-watering-can/drawing-the-body)
