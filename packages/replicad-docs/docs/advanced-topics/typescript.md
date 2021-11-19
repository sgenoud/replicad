---
sidebar_position: 1
title: Typescript autocompletion
---

replicad is build with Typescript. The main advantage to the user is that it
offers nice autocompletion and inline documentation.

How can one benefit from these while using the visulaliser?

Initialise a node package somewhere on your disk

```bash
mkdir my-replicad-model
cd my-replicad-model/
yarn init
yarn add typescript replicad
```

You can then open your favourite editor (or Visual Studio Code if you do not
have a favourite yet) in this folder.

Create a `myModel.js` file, and add the following boilerplate:

```js
const defaultParams = {};

/** @typedef { typeof import("replicad") } replicadLib */
/** @type {function(replicadLib, typeof defaultParams): any} */
function main({ Sketcher }, {}) {
  return new Sketcher(); // Build your model here
}
```

If your editor is configured correctly for typescript it should autocomplete
now.

![a working editor](/img/tutorial/typescript-1.png)
