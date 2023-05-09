---
sidebar_position: 6
title: Finders
---

When using a visual interface to draw in 3D, selecting a face or an edge is
trivial - the user just needs to click it.

In the case of code CAD, this is a more complicated operation - we need to find
theses feature. This is what finders are for.

For this tutorial we will use this relatively complex shape (a simple house):

```js withWorkbench
const { draw, drawCircle, drawRoundedRectangle } = replicad;
const main = () => {
  let house = draw()
    .hLine(50)
    .vLine(60)
    .line(-50, 20)
    .closeWithMirror()
    .sketchOnPlane("XZ")
    .extrude(30);

  const window = drawCircle(10)
    .sketchOnPlane("XZ")
    .extrude(30)
    .translate([10, 0, 50]);

  const door = drawRoundedRectangle(20, 30)
    .sketchOnPlane("XZ")
    .extrude(30)
    .translate([-20, -5, 15]);

  house = house.cut(window).fuse(door);
  return house;
};
```

We will use a feature of the viewer, where you can highlight programatically
some faces (or edges).

![the house](/img/tutorial/finders-1.png)

## Basic finders usage

### Finding faces

In order to find faces, we create a face finder object. Let's say we want to
find the face of the door

```js
const main = () => {
  let house = draw();
  //...

  return {
    shape: house,
    highlightFace: (f) => f.inPlane("XZ", 35),
  };
};
```

This was fairly easy, the door is the face parallel to the plane `XZ`, at
the coordinate `35`.

There are many different types of filters like `inPlane` that allow you to
specify precisely which face you are interested in. For instance you can look
for faces that:

- have a certain type of surface `f.ofSurfaceType("CYLINDRE")` will return the
  inside of the window.
- contain a certain point `f.containsPoint([0, -15, 80])` will return both
  sides of the roof

and other methods you can find in the [API
documentation](/docs/api/classes/FaceFinder#filter-methods)

### Finding edges

To find edges, it works in the same way, you just work with an `EdgeFinder`
instead of a face finder and use the methods that are [documented here](/docs/api/classes/EdgeFinder#filter-methods).

For instance, to find the top of the roof

```js
  let house = draw()
  //...

  const findRooftop = new EdgeFinder()

  return {
    shape: house,
    highlightEdge: e => e.containsPoint([0, -15, 80])
  };
};
```

## Combinating filters

By default you can chain different filter conditions. Only the shapes that
follow all the conditions will be found. For instance, to find the window of
the back of the house:

```js
  let house = draw()
  //...

  return {
    shape: house,
    highlightEdge: e => e.ofCurveType("CIRCLE").inPlane("XZ")
  };
};
```

If you only use one of the filters you will see more edges highlighted.

### Combinating with an `either` conditions

In some cases you might want to combine elements with an OR condition, to find
faces that fit either one condition or the other. For instance if we want to
find both side faces:

```js
(f) => f.either([(f) => f.inPlane("YZ", 50), (f) => f.inPlane("YZ", -50)]);
```

### Negating a condition

You might also want to specify the inverse of a condition, that is what not is
for. For instance, we can select the front window by just adding a `not` to the
finder we created earlier

```js
const frontWindow = (e) => e.ofCurveType("CIRCLE").not((f) => f.inPlane("XZ"));
```

Note that it works because there are only two edges that are circles in the
house.

## Finding faces and edges

We have created finders so far and used them to highlight faces and edges

- but what are they really useful for.

This will be mostly clear in the next chapter with modifications that can make
a lot of use of finders.

But you can also need to find a specific face. For instance, we might want to
have only the front face of the house. For this you will need to use the
`FaceFinder` and `EdgeFinder` objects directly (instead of within a function
that already declared it).

```js withWorkbench
const { draw, drawCircle, drawRoundedRectangle, FaceFinder } = replicad;
const main = () => {
  let house = draw()
    .hLine(50)
    .vLine(60)
    .line(-50, 20)
    .closeWithMirror()
    .sketchOnPlane("XZ")
    .extrude(30);

  const window = drawCircle(10)
    .sketchOnPlane("XZ")
    .extrude(30)
    .translate([10, 0, 50]);

  const door = drawRoundedRectangle(20, 30)
    .sketchOnPlane("XZ")
    .extrude(30)
    .translate([-20, -5, 15]);

  house = house.cut(window).fuse(door);

  return new FaceFinder().inPlane("XZ", 30).find(house);
};
```
