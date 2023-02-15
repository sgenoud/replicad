---
sidebar_position: 4
title: Creating the 3D shapes
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

We now have the basic drawing to create our 3D shapes:

- the can body for which we have a profile drawing
- the filler for which we have three well positioned circles
- the spout which is a simple cylinder

## The spout cylinder

### Creation of a cylinder

We have two different approach we could take to create a cylinder:

- draw a circle and extrude it
- creating the cylinder with a direct function

#### Extrusion

To create a cylinder we can draw a circle, sketch in 3D space and then
a extrude it.

```js withWorkbench
const { drawCircle } = replicad;
const main = () => {
  return drawCircle(5).sketchOnPlane().extrude(70);
};
```

We have seen the first step in the previous page. We draw a circle and sketch
it in the 3D space on a plane (here the default `XY` plane).

We extrude it, making a copy of itself in a certain direction and filling the
sides.

#### using a direct creation method

```js withWorkbench
const { makeCylinder } = replicad;
const main = () => {
  return makeCylinder(5, 70);
};
```

### Positioning the shape

In the case of a circle that we extrude we could place the plane to sketch on
and then position it.

We have seen how to position a plane in 3D space. But we might want to position
a 3D shape.

The operations are similar for a shape than for a plane. First, translations
are identical.

```js withWorkbench
const { makeCylinder } = replicad;
const main = () => {
  return makeCylinder(5, 70).translateZ(100);
};
```

Rotations are similar to pivots for planes - but as shapes do not have an
origin point by default we need to specify it.

```js withWorkbench
const { makeCylinder } = replicad;
const main = () => {
  return makeCylinder(5, 70).translateZ(100).rotate(45, [0, 0, 100], [0, 1, 0]);
};
```

In order to make things more readable we might want to rotate before we
translate (with a different origin).

## The can body

To create the can body we will use the profile we drew, sketch it on the `XZ`
plane and rotate it around the `Z` axis:

```js withWorkbench
const { draw } = replicad;

const main = () => {
  const profile = draw()
    .hLine(20)
    .line(10, 5)
    .vLine(3)
    .lineTo([8, 100])
    .hLine(-8)
    .close();

  return profile.sketchOnPlane("XZ").revolve([0, 0, 1]);
};
```

## The filler

After extrusion and revolution, the filler uses a third method of 3D shape
creation: lofting. We can create shapes by defining sections through which an
object will pass trough.

We have defined our three circles and create a shape that pass through them
all.

```js withWorkbench
const { makePlane, drawCircle } = replicad;

const main = () => {
  const topPlane = makePlane().pivot(-20, "Y").translate([-35, 0, 135]);
  const topCircle = drawCircle(12).sketchOnPlane(topPlane);

  const middleCircle = drawCircle(8).sketchOnPlane("XY", 100);

  const bottomPlane = makePlane().pivot(20, "Y").translateZ(80);
  const bottomCircle = drawCircle(9).sketchOnPlane(bottomPlane);

  return topCircle.loftWith([middleCircle, bottomCircle], { ruled: false });
};
```

## Putting it all together

Let's show all the pieces we have built so far together

```js withWorkbench
const { makePlane, makeCylinder, draw, drawCircle } = replicad;

const main = () => {
  // Building the body
  const profile = draw()
    .hLine(20)
    .line(10, 5)
    .vLine(3)
    .lineTo([8, 100])
    .hLine(-8)
    .close();

  const body = profile.sketchOnPlane("XZ").revolve([0, 0, 1]);

  // Building the spout
  const topPlane = makePlane().pivot(-20, "Y").translate([-35, 0, 135]);
  const topCircle = drawCircle(12).sketchOnPlane(topPlane);

  const middleCircle = drawCircle(8).sketchOnPlane("XY", 100);

  const bottomPlane = makePlane().pivot(20, "Y").translateZ(80);
  const bottomCircle = drawCircle(9).sketchOnPlane(bottomPlane);

  const filler = topCircle.loftWith([middleCircle, bottomCircle], {
    ruled: false,
  });

  const spout = makeCylinder(5, 70)
    .translateZ(100)
    .rotate(45, [0, 0, 100], [0, 1, 0]);

  return [
    { shape: body, color: "blue", opacity: 0.5 },
    { shape: filler, color: "red", opacity: 0.5 },
    { shape: spout, color: "green" },
  ];
};
```
