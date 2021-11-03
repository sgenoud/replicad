---
sidebar_position: 1
title: The Visualiser
---

For now we will use [the visualiser](https://studio.replicad.xyz/visualiser).
The aim of this page is to give a fast view of what the code you are writing
locally (on your machine) will render to.

Unfortunately, in order to have all the file reloading abilities you will need
to use Chrome (or Edge). Firefox and Safari will still render your models, but
will not be able to listen to changes on your local file.

## Creating a local file

Using your editor of choice, create a file (`model1.js` for instance) somewhere
on your disk and write in it:

```js
const main = ({ sketchEllipse }) => {
  return sketchEllipse(20, 30).extrude(50).fillet(2);
};
```

You will need to define a `main` function in your file. This function will
receive the library as a first parameter, and should return a shape.

## Visualise!

Select this file in [the visualiser](https://studio.replicad.xyz/visualiser) and you should see something like this:

![Your first 3D model](/img/tutorial/first-model.png)

Congratulation you have built your first model with replicad!
