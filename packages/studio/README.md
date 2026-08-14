## replicad studio

This repo contains the code of the replicad studio
website https://studio.replicad.xyz/

You can run it locally by cloning the repo and running:

```bash
npm install
npm run start --workspace=studio
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
