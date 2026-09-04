---
sidebar_position: 3
title: Shape functions
---

Most of replicad is built around shape classes — `Solid`, `Face`, `Edge` and
friends. These wrap an OpenCascade topological shape and give you a chaining
API on top of it:

```js
const box = makeBaseBox(10, 10, 10)
  .fillet(1)
  .shell(1, (f) => f.inPlane("XZ"));
```

Underneath, each of these methods calls a plain function that takes a shape and
returns a new one. These functions are available on their own, from a separate
entry point:

```js
import { fuseShapes, filletShape, shellShape } from "replicad/shape-functions";
```

## What they are

A shape function is stateless. It takes an OpenCascade topological shape (a
`TopoDS_Shape`), or anything wrapping one — a replicad `Shape` works fine — and
returns a raw `TopoDS_Shape`:

```js
import { makeBaseBox, cast } from "replicad";
import { cutShape } from "replicad/shape-functions";

const base = makeBaseBox(10, 10, 10);
const tool = makeBaseBox(4, 4, 20);

// cutShape returns a TopoDS_Shape, not a replicad Solid
const cut = cutShape(base, tool);
```

Because they return raw shapes, you use `cast` from the main entry point to
bring the result back into the class hierarchy:

```js
const solid = cast(cut);
solid.blobSTL();
```

The entry point covers the boolean operations (`fuseShapes`, `cutShape`,
`intersectShapes`), the modifications (`filletShape`, `chamferShape`,
`shellShape`, `draftShape`), meshing (`mesh`, `meshEdges`, `triangulateFace`),
export (`exportShapeSTEP`, `exportShapeSTL`, `serializeShape`), the geometry
helpers (`faceNormalAt`, `faceCenter`, `curveTangentAt`, …) and the topology
helpers (`iterTopo`, `downcast`, `shapeType`, `makeCaster`).

The full list is in the [shape functions API
reference](../api-shape-functions/index.md).

## When to use them

For most models you do not need them — the class API is more pleasant to read
and it manages memory for you.

They become useful when you are:

- **walking a shape's topology yourself**, for instance to find or classify
  subshapes without going through a finder:

  ```js
  import { iterTopo } from "replicad/shape-functions";

  const edgeCount = [...iterTopo(shape.wrapped, "edge")].length;
  ```

- **integrating with other OpenCascade code**, where you already hold
  `TopoDS_Shape` values and wrapping each one only to unwrap it again is noise.

- **building your own abstraction** on top of replicad. `makeCaster` lets you
  map the eight topology kinds onto your own classes, the same way replicad
  builds its own `cast`.

Note that the class methods do more than call these functions: they also delete
the shapes they consume. When you call the functions directly, you are
responsible for the lifetime of the shapes you create.

## In the studio and the CLI

Both the [studio](https://studio.replicad.xyz) and the CLI expose the shape
functions, so you do not need to install anything to use them.

In a module-style model you can import them as you would in a normal project —
the import is resolved by the runtime:

```js
import { makeBaseBox, cast } from "replicad";
import { cutShape } from "replicad/shape-functions";

export function main() {
  return cast(cutShape(makeBaseBox(10, 10, 10), makeBaseBox(4, 4, 20)));
}
```

In a function-style model, where you do not have imports, they are available on
the `replicadShapeFns` global, next to the `replicad` and `oc` globals:

```js
const main = ({ makeBaseBox, cast }) => {
  const box = makeBaseBox(10, 10, 10);
  const edges = [...replicadShapeFns.iterTopo(box.wrapped, "edge")];

  return box;
};
```

## In your own application

If you embed the replicad evaluator, pass the shape functions alongside
replicad when you create it:

```js
import * as replicad from "replicad";
import * as replicadShapeFns from "replicad/shape-functions";
import { createEvaluator } from "replicad-evaluator";

const evaluator = createEvaluator({
  replicad,
  shapeFns: replicadShapeFns,
  oc,
});
```

Without `shapeFns`, models importing `replicad/shape-functions` will fail at
evaluation — everything else keeps working.

Both entry points share the same OpenCascade instance, so a single `setOC` call
is enough for both.
