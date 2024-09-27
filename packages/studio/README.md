## replicad studio

This repo contains the code of the [replicad studio
website](studio.replicad.xyz).

You can run it locall by cloning the repo and running (you can use another
package manager as well):

```bash
cp -r replicad/packages/studio my-studio
cd my-studio
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
