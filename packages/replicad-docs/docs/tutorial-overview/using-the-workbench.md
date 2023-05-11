---
sidebar_position: 1
title: The workbench
---

So let's use [the workbench](https://studio.replicad.xyz/workbench)!

## A first example

Let's draw using a basic replicad script. Do not worry about the details for
now.

Open [the workbench](https://studio.replicad.xyz/workbench) in a new tab
and copy this:

```js withWorkbench
const { drawEllipse } = replicad;
const main = () => {
  return drawEllipse(20, 30).sketchOnPlane().extrude(50).fillet(2);
};
```

You should see something like that:

![Your first 3D model](/img/tutorial/first-model.png)

Congratulations, you have built your first model with replicad!

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

## Direct links

You can even open a model directly in the workbench if you click on the `Open in workbench` button next to the copy button!

## Working with local files

If you prefer to use your editor of choice it is also possible.

Create a file (`model1.js` for instance) somewhere on your disk, and then you
can point the worbench to that file using the reload menu (left of the menu bar
of the editor).

Unfortunately, in order to have all the file reloading abilities you will need
to use Chrome (or Edge). The load from disk button does not appear in Firefox
and Safari.
