---
sidebar_position: 2
title: Drawing the body profile
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

So let's start by the body of our can. We will take the general approach of
drawing a profile that will then be revolved.

Let's start with our basic shape:

```js withWorkbench
const { draw } = replicad;

const main = () => {
  return draw()
    .hLine(20)
    .line(10, 5)
    .vLine(3)
    .lineTo([8, 100])
    .hLine(-8)
    .close();
};
```

We drew a simple shape following the profile, by using only straight lines. We
generally went for **relative** positioning. For instance with `hLine(20)` which
draws an horizontal line of 20mm of length). An `line(10, 5)` which draws
a line by going `10` horizontally and `5` vertically. But we also used
`lineTo([8, 100])` which moves us to the point `[8, 100]` - this is using
**absolute** coordinates.

## Filletings angles

The bottom of the can is rounded. We could use different methods for that.
First, we will use round the corners of the previous shape (using filleting)

```js withWorkbench
const { draw } = replicad;

const main = () => {
  return draw()
    .hLine(20)
    .customCorner(2)
    .line(10, 5)
    .customCorner(3)
    .vLine(3)
    .customCorner(3)
    .lineTo([8, 100])
    .hLine(-8)
    .close();
};
```

## Arcs of circles

We can also draw arcs of circle directly.

```js withWorkbench
const { draw } = replicad;

const main = () => {
  return draw().hLine(20).tangentArc(10, 10).lineTo([8, 100]).hLine(-8).close();
};
```

This is not the best use of these here, but I wanted to show you for the
example.

## Bézier curves

Better would be to use Bézier curves with the `smoothSpline` method.

```js withWorkbench
const { draw } = replicad;

const main = () => {
  return draw([0, 100])
    .hLine(8)
    .lineTo([30, 8])
    .smoothSpline(-10, -8, { endTangent: [-1, 0], startFactor: 2 })
    .lineTo([0, 0])
    .close();
};
```

We reoriented the drawing to start from the top (and not have to compute the
direction of the end tangent ourselves). By varying the `startFactor` we can
reach a shape that we like.

## Comparing the different cases

Here a just a comparison of the different profiles we achieved.

```js withWorkbench
const { draw } = replicad;

const main = () => {
  // just lines
  const s1 = draw()
    .hLine(20)
    .line(10, 5)
    .vLine(3)
    .lineTo([8, 100])
    .hLine(-8)
    .close();

  // Using bezier curves
  const s2 = draw([0, 100])
    .hLine(8)
    .lineTo([30, 8])
    .smoothSpline(-10, -8, { endTangent: [-1, 0], startFactor: 2 })
    .lineTo([0, 0])
    .close();

  // Straight lines and fillets
  const s3 = draw()
    .hLine(20)
    .customCorner(10)
    .line(10, 5)
    .customCorner(3)
    .vLine(3)
    .customCorner(3)
    .lineTo([8, 100])
    .hLine(-8)
    .close();

  // Arcs
  const s4 = draw()
    .hLine(20)
    .tangentArc(10, 10)
    .lineTo([8, 100])
    .hLine(-8)
    .close();

  return [
    { shape: s1, color: "blue", name: "Straight lines" },
    { shape: s4, color: "orange", name: "Arcs" },
    { shape: s2, color: "green", name: "Bézier" },
    { shape: s3, color: "red", name: "Rounded corners" },
  ];
};
```
