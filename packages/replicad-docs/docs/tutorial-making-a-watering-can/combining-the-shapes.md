---
sidebar_position: 5
title: Combining the shapes
---

Now that we have our three bodies we want to put them together (and smooth the
corners it creates).

Fusing shapes together is easy:

```js withWorkbench {28}
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

  return body.fuse(filler);
};
```

The relevant line is just `body.fuse(filler)`.

## Selection and filleting

We want to smooth the transition between the two bodies we just merged, we will
use a fillet. But for this we need to select the edges that will need to be
smoothed.

```js {28-33} withWorkbench
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

  const fused = body.fuse(filler);

  return {
    shape: fused,
    highlightEdge: (e) => e.inPlane("XY", 100),
  };
};
```

Once we have found the edge we are concerned about using the finder API, we can
fillet them like this:

```js {28} withWorkbench
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

  const fused = body.fuse(filler).fillet(30, (e) => e.inPlane("XY", 100));

  return {
    shape: fused,
  };
};
```

And then repeat the operation for the spout:

```js withWorkbench {32-36}
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

  return body
    .fuse(filler)
    .fillet(30, (e) => e.inPlane("XY", 100))
    .fuse(spout)
    .fillet(10, (e) => e.inBox([20, 20, 100], [-20, -20, 120]));
};
```

## Creating an hollow shape {39-50}

For now, we still have a full shape. We need to make it hollow - to be able to
put water in it. Remember we are building a watering can.

This is similar to how we fillet, but instead of selecting edges we select the
faces that will be hollowed out, and give the thickness of the walls.

We need to do a little bit of maths to find the coordinates of the end of the
spout.

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

  // Building the filler
  const topPlane = makePlane().pivot(-20, "Y").translate([-35, 0, 135]);
  const topCircle = drawCircle(12).sketchOnPlane(topPlane);

  const middleCircle = drawCircle(8).sketchOnPlane("XY", 100);

  const bottomPlane = makePlane().pivot(20, "Y").translateZ(80);
  const bottomCircle = drawCircle(9).sketchOnPlane(bottomPlane);

  const filler = topCircle.loftWith([middleCircle, bottomCircle], {
    ruled: false,
  });

  // Building the spout
  const spout = makeCylinder(5, 70)
    .translateZ(100)
    .rotate(45, [0, 0, 100], [0, 1, 0]);

  let wateringCan = body
    .fuse(filler)
    .fillet(30, (e) => e.inPlane("XY", 100))
    .fuse(spout)
    .fillet(10, (e) => e.inBox([20, 20, 100], [-20, -20, 120]));

  const spoutOpening = [
    Math.cos((45 * Math.PI) / 180) * 70,
    0,
    100 + Math.sin((45 * Math.PI) / 180) * 70,
  ];

  wateringCan = wateringCan.shell(-1, (face) =>
    face.either([
      (f) => f.containsPoint(spoutOpening),
      (f) => f.inPlane(topPlane),
    ])
  );

  return {
    shape: wateringCan,
    name: "Watering Can",
  };
};
```

## We are done!

The previous shape was the final one we were looking for! You can play with it,
change some parameters and so on to create your own version!
