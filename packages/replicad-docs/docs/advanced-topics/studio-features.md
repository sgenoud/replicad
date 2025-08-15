---
sidebar_position: 1
title: Studio features
---

Sometimes you want to share a model in a way that exposes parameters in a way
that users of the model can easily tweak.

## Dimension labels in the preview

Sometimes it is difficult to understand which dimension on a model a parameter
can change. The studio can help with that by showing the dimensions within the
preview of the model.

To enable this, you can add the `labels` option to the object you return from
the `main` function:

```js withWorkbench
const { makeBaseBox } = replicad;

export const defaultParams = {
  width: 20,
  height: 30,
  thickness: 15,
};

export default function main({ width, height, thickness }) {
  const shape = makeBaseBox(width, height, thickness);

  return [
    {
      shape,
      labels: [
        {
          label: "thickness",
          from: [width / 2, height / 2, 0],
          to: [width / 2, height / 2, thickness],
          color: "blue",
        },
      ],
    },
  ];
}
```

### Additional options

The labels show the `thickness` text with a line between `from` and `to`, with
the specified `color`.

You can also change the `offset` of the label, which is the distance from the
points you are labelling (i.e. the `from` and `to` points).

There is also a different `mode`, the `point` mode, which does not add offset
(and does not side lines).

You can also change the `fontSize` of the label to make them bigger or smaller
depending on your needs.

Finally, you can position the label relative to the line with the `position`
option (`auto`, `side`, `side-end`, `top`, `bottom`), with `auto` being the
default.

### Full example

As an example, here is a model with a label on the top of the box:

```js withWorkbench
const { makeBaseBox } = replicad;

export const defaultParams = {
  width: 20,
  height: 30,
  thickness: 15,
};

export default function main({ width, height, thickness }) {
  const shape = makeBaseBox(width, height, thickness);

  return [
    {
      shape,
      labels: [
        {
          label: "width",
          from: [-width / 2, -height / 2, thickness],
          to: [width / 2, -height / 2, thickness],
          offset: [0, -1, 0],
          color: "green",
        },
        {
          label: "top face",
          from: [0, 0, thickness],
          to: [width / 2, height / 2, 1.5 * thickness],
          mode: "point",
          color: "red",
          position: "top",
        },
        {
          label: "thickness",
          from: [width / 2, height / 2, 0],
          to: [width / 2, height / 2, thickness],
          offset: [0, 1, 0],
          color: "blue",
        },
      ],
    },
  ];
}
```

Note that you can pass a `Vertex` (from [makeVertex](/docs/api/functions/makeVertex)) as the `from` and `to` points, which allows
you to use the transformation [API](/docs/api/classes/Vertex#shape-transformations) to compute the points
you want to label.


