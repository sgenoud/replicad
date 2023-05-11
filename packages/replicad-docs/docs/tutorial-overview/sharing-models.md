---
sidebar_position: 8
title: Sharing models
---

Once you have created your models you might want to share them without having
to build a full web app yourself.

You can use the [replicad share application](https://studio.replicad.xyz/share)
for this.

First, you need to make your code available online easily. For instance, [create
a gist](https://gist.github.com/) with your code, and the the url for the
**raw** file (click on the `raw` button).

Paste this link in the [share application](https://studio.replicad.xyz/share)
input form. The link generated can then be shared with anyone.

You can also include it in your blog with an iframe

```html
<iframe
  allow="fullscreen"
  src="https://studio.replicad.xyz/share/https%3A%2F%2Fraw.githubusercontent.com%2Fsgenoud%2Freplicad%2Fmain%2Fpackages%2Freplicad-docs%2Fexamples%2FsimpleVase.js"
></iframe>
```

## Parametric models

You can easily define some parameters to configure your model. In your program,
in addition to the `main` function, add a `defaultParams` object. These
parameters will be passed to the main function as the second argument:

```js
const defaultParams = {
  height: 85.0,
  width: 120.0,
  thickness: 2.0,
  holeDia: 50.0,
  hookHeight: 10.0,
};

function main(
  { Sketcher, FaceFinder, EdgeFinder, sketchCircle },
  { width, height, thickness, holeDia, hookHeight }
) {
  //...
}
```

When sharing with the share application, a simple form will be offered to the
user to change the parameters and customise the shape.

If you play with it, share it with me
([@stevegenoud@toot.cafe](https://toot.cafe/@stevegenoud) or
[@stevegenoud](https://twitter.com/stevegenoud))!
