# replicad-cli

Node-based CLI for evaluating `replicad` models and exporting them to STL, STEP,
JSON, or an SVG projection.

## Install

Global install:

```sh
npm install -g replicad-cli
replicad --help
```

Run without installing globally:

```sh
npx replicad-cli --help
```

If you use pnpm:

```sh
pnpm dlx replicad-cli --help
```

## Usage

```sh
replicad [options] <input> [output]
```

### Options

- `-f, --filetype <stl|step|stl-binary|step-assembly|json>`
- `-p, --projection`
- `--projection-mode <visible|hidden>`
- `-h, --help`
- `-v, --version`

`--projection` writes a pretty SVG projection of the first built shape.
`--projection` uses the default `visible` mode, and `--projection-mode hidden`
includes dashed hidden lines.

Manifold-backed mesh outputs are supported by the CLI runtime. If your script
returns only `MeshShape` results, use STL or JSON output instead of
`--projection`, since projection export requires a non-mesh 3D shape.

## Examples

```sh
replicad examples/box.js
replicad -f step examples/box.js exports/box
replicad -p examples/box.js
replicad --projection-mode hidden examples/box.js
```
