# `replicad-threejs-helper`

A set of simple function to help integrate replicad in a threejs project

## Install

```js
yarn add replicad-threejs-helper
```

(npm works as well, and there are some different builds that you can link from
unpkg)

## API

This package offers a small set of functions to sync a set of `BufferGeometry`
with meshed shapes from replicad.

### Creating geometries from a replicad object

Typically you will create an array of replicad shapes that way (this is purely replicad code):

```js
const meshed = shapes.map((shape, i) => ({
  name: `shape ${i + 1}`,
  faces: shape.mesh({ tolerance: 0.05, angularTolerance: 30 }),
  edges: shape.meshEdges({ keepMesh: true }),
}));
```

You can then synchronise them with a set of buffer geometries (for the faces
and the edges):

```js
const geometries = syncGeometries(meshed, []);
```

The geometries will contain an array of objects with two `BufferGeometry`, one
for the `faces` (the body of the solid) and one for the `lines` (the edges).

You will then need to integrate these geometries in your threejs project.

#### Updating geometries

If you have changes to your geometries, instead of creating new ones you can
do:

```js
const updatedGeometries = syncGeometries(meshed, geometries);
```

This will reuse the geometries if the number of shape has not changed, and
dispose of the old ones (and recreate new ones) if the number of shapes has
changed.

#### More control

Instead of updating both the edges and the faces you can use the simpler
individual functions:

```js
const facesGeometry = new BufferGeometry();
const updatedFaces = syncFaces(facesGeometry, replicadMeshedFaces);
```

or for the edges

```js
const edgesGeometry = new BufferGeometry();
syncLines(edgesGeometry, replicadMeshedEdges);
```

### Highlighting

These helpers also allow you to implement highlighting of faces or edges, using
the groups functionality of three.

For this you will need to attach two materials for both your faces and your
lines.

You can toggle a single face or edge with this helper:

```js
toggleHighlight(facesGeometry, 2);
```

or

```js
toggleHighlight(edgesGeometry, 5);
```
