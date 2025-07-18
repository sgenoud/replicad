# `replicad`

The library to build browser based 3D models with code.

## How to play with it

I am still working on making an accessible toolchain for replicad, so for now
you can play with my [online
"visualiser"](https://studio.replicad.xyz/visualiser).

Write in a local file, select it in the tool and it should build your model.
There is still a lot of work to make this intuitive, but you can play with the
examples below. Note that if you use Chrome the model is recomputed as you
change your local file.

You need to write a "main" function that receives the complete `replicad`
library.

## Examples

Here are some basic examples of things you can do with replicad.

#### A simple example

```js
const main = ({ Sketcher }) => {
  const base = new Sketcher("XZ")
    .hLine(-25)
    .halfEllipse(0, 40, 5, true)
    .hLine(25)
    .close()
    .revolve([0, 0, 1]);

  const hole = new Sketcher()
    .quadraticBezierCurveTo([0, 20], [20, 30])
    .closeWithMirror()
    .extrude(40)
    .translateY(-12);

  return base.cut(hole);
};
```

#### The open cascade bottle

```js
const defaultParams = {
  width: 50,
  height: 70,
  thickness: 30,
};

const main = (
  { Sketcher, FaceSketcher, localGC, makeCylinder, makeOffset, FaceFinder },
  { width: myWidth, height: myHeight, thickness: myThickness }
) => {
  let shape = new Sketcher()
    .movePointerTo([-myWidth / 2, 0])
    .vLine(-myThickness / 4)
    .threePointsArc(myWidth, 0, myWidth / 2, -myThickness / 4)
    .vLine(myThickness / 4)
    .closeWithMirror()
    .extrude(myHeight)
    .fillet(myThickness / 12);

  const myNeckRadius = myThickness / 4;
  const myNeckHeight = myHeight / 10;
  const neck = makeCylinder(
    myNeckRadius,
    myNeckHeight,
    [0, 0, myHeight],
    [0, 0, 1]
  );

  shape = shape.fuse(neck);

  shape = shape.shell({
    filter: new FaceFinder().inPlane("XY", [0, 0, myHeight + myNeckHeight]),
    thickness: myThickness / 50,
  });

  const [r, gc] = localGC();

  const neckFace = r(
    new FaceFinder()
      .containsPoint([0, myNeckRadius, myHeight])
      .ofSurfaceType("CYLINDRE")
      .find(shape.clone(), { unique: true })
  );

  const bottomThreadFace = r(
    r(makeOffset(neckFace, -0.01 * myNeckRadius)).faces[0]
  );
  const baseThreadSketch = new FaceSketcher(bottomThreadFace)
    .movePointerTo([0, 0.25])
    .halfEllipse(2, 0.5, 0.1)
    .close();

  const topThreadFace = r(
    r(makeOffset(neckFace, 0.05 * myNeckRadius)).faces[0]
  );
  const topThreadSketch = new FaceSketcher(topThreadFace)
    .movePointerTo([0, 0.25])
    .halfEllipse(2, 0.5, 0.05)
    .close();

  const thread = baseThreadSketch.loftWith(topThreadSketch);
  gc();

  return shape.fuse(thread);
};
```

## Making in work in an application

You will need to load opencascadejs separately (you can use
`replicad-opencascadejs` to only have the method necessary for replicad). You
then need to inject it in `replicad` with the function:

`setOC(oc)`

Once this is done you can use `replicad` to draw your shapes.

To export your shape, you can either use the `STL` or `STEP` save functions, or
get the mesh and use it with three (or another 3d viewer library).

Ideally the computation should be done in a worker.

This all needs a bunch of helper, this should come soon(-ish)

## License

Copyright (C) 2021 QuaroTech Sàrl

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
