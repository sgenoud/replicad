---
sidebar_position: 6
---

# replicad as a library

At its core, replicad is just a library. You can then create your own viewer,
editor, configurator on top of it.

In order to show what can be done in the most simple way, you can find a sample
app here: <https://sample-app.replicad.xyz>.

## Display of the model

With replicad you can easily export a STL (or STEP) file to be opened in
another application. Nevertheless displaying a model in your page tends to be
nicer.

For this you will need to use a 3D library. For instance replicad has
[helpers](https://www.npmjs.com/package/replicad-threejs-helper) to integrate
with [threejs](https://threejs.org/).

## opencascade.js and webassembly

Most of the complexity in using replicad as a library is that it depends on
a webassembly module,
[opencascadejs](https://github.com/donalffons/opencascade.js), and the tooling
around WASM is not always easy to use.

Additionally, you should load the webassembly code from opencascadejs (or the
[replicad custom build](https://www.npmjs.com/package/replicad-opencascadejs))
in a webworker. The model computation can take some time and the parallelism of
a worker will allow you to offer a reactive interface during the computation.

### Injecting opencascadejs

The important bit you need to do to have replicad work is that you need to
inject an instance of opencascadejs at initialisation.

You can have a look at the initialisation in [the sample
app](https://github.com/sgenoud/replicad/blob/main/packages/replicad-app-example/src/worker.js#L11):

```js
let loaded = false;
const init = async () => {
  if (loaded) return Promise.resolve(true);

  const OC = await opencascade({
    locateFile: () => opencascadeWasm,
  });

  loaded = true;
  setOC(OC);

  return true;
};
const started = init();
```

In addition to the [opencascadejs
boilerplate](https://github.com/donalffons/opencascade.js), we use the `setOC`
function. This will inject the instance of the opencascade library into
replicad.

Once this is done, replicad will work.
