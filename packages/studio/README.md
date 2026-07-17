## replicad studio

This repo contains the code of the replicad studio
website https://studio.replicad.xyz/

You can run it locally by cloning the repo and running (you can use another
package manager as well):

```bash
cp -r replicad/packages/studio my-studio
cd my-studio
```

The copied `package.json` contains `workspace:^` dependencies, which only work
inside the monorepo. Replace them automatically with the latest published npm
versions before installing:

```bash
npm pkg set \
  dependencies.replicad="^$(npm view replicad version)" \
  dependencies.replicad-evaluator="^$(npm view replicad-evaluator version)" \
  dependencies.replicad-opencascadejs="^$(npm view replicad-opencascadejs version)" \
  dependencies.replicad-threejs-helper="^$(npm view replicad-threejs-helper version)"

npm install
```

You can then run it locally (for development purposes) with:

```
# in the my-studio directory
npm run start
```

You can also build it:

```bash
# in the my-studio directory
npm run build
```

The assets will be in the `dist` directory. You can serve them locally with:

```bash
npm run serve
```

But I would advise you to use a proper web server if you want to expose it to
the web (this is a pure static website).
