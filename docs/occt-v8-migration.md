# OCCT V8 Migration — replicad Perspective

This document covers the replicad-specific changes for the OCCT V8 migration.

## Summary

The OCCT V8 migration consolidates replicad's three WASM builds (`single`, `with_exceptions`, `multi`) into a **single unified build** using native WASM exceptions (`-fwasm-exceptions`).

| Build variant | V7.6 / V8 (before) | V8 (after) |
|---|---|---|
| `replicad_single` | No exception support | Full exception support via `-fwasm-exceptions` |
| `replicad_with_exceptions` | Separate build with `-fexceptions` | **Removed** — merged into single build |
| `replicad_multi` | pthread-based multi-threading | **Removed** — deferred (see below) |

## Why a Single Build?

### Native WASM Exceptions (`-fwasm-exceptions`)

The WebAssembly Exception Handling proposal (Phase 4) is now supported by 94.5%+ of browsers (Chrome 95+, Firefox 100+, Safari 15.2+). It provides:

- **Zero-cost happy path**: No `invoke_SIG` wrapper overhead on every function call
- **Proper stack traces**: `WebAssembly.Exception` objects preserve the call stack
- **Smaller binary**: ~10-15% smaller than JavaScript-based exception handling (`-fexceptions`)
- **No performance penalty**: Unlike `-fexceptions`, which added ~75% binary size and measurable runtime overhead, `-fwasm-exceptions` has negligible impact on non-throwing code paths

This eliminates the need for a separate "with_exceptions" build. The single build has full exception decoding support with `OCJS.getStandard_FailureData()`.

### Multi-threading Deferred

Analysis revealed that OCCT's parallel algorithms were never actually activated in the replicad codebase:

- `BRepMesh_IncrementalMesh`: called with `isInParallel=false` (hardcoded in `shapes.ts`)
- `BOPAlgo_Options::SetRunParallel()`: defaults to `false`
- All benchmark operations showed **slower** performance with the multi-threaded build due to pthread infrastructure overhead (SharedArrayBuffer, mutex costs, pre-spawned workers)

Multi-threading will be revisited when explicit parallel algorithm activation is implemented upstream.

## replicad Source Changes

The following replicad source files were modified for OCCT V8 compatibility:

- **`packages/replicad/src/Sketcher.ts`**: Updated for V8 API changes
- **`packages/replicad/src/shapes.ts`**: Updated mesh and shape operations
- **`packages/replicad/src/geom.ts`**: Geometry utility updates

## Build Configuration

### Single V8 YAML (`custom_build_single_v8.yml`)

Key changes from the V7.6 configuration:

```yaml
emccFlags:
  - -flto                                    # Dead-code elimination at link
  - -fwasm-exceptions                        # Native WASM exceptions
  - -sEXPORT_EXCEPTION_HANDLING_HELPERS      # JS helpers for exception decoding
  - -sEXPORT_ES6=1
  - -sALLOW_MEMORY_GROWTH=1
  - -sINITIAL_MEMORY=100MB
  - -sMAXIMUM_MEMORY=4GB
  - --no-entry
  - --emit-symbol-map
  - -O3
```

Bindings include `OCJS` and `Standard_Failure` for exception decoding (previously only in the `with_exceptions` build).

## Performance

Benchmarks show V8 is significantly faster than V7.6, especially for boolean operations:

| Operation | V7.6.2 (ms) | V8 Single (ms) | Delta |
|---|---|---|---|
| fuse-two-boxes | 26.6 | 20.7 | -22% |
| n-body-fuse | 65.1 | 48.3 | -26% |
| deep-boolean-chain | 132.1 | 91.7 | -31% |
| bottle | 342.3 | 254.4 | -26% |
| birdhouse | 271.1 | 198.3 | -27% |
| vase | 226.4 | 162.8 | -28% |

## Package Structure

```
dist/
  replicad-opencascadejs-0.21.0-v8.XX.tgz   # WASM + JS glue
  replicad-0.21.0-v8.XX.tgz                 # replicad library
```

Consumers reference these tarballs via GitHub raw URLs:

```yaml
catalog:
  replicad: "https://github.com/taucad/replicad/raw/main/dist/replicad-0.21.0-v8.XX.tgz"
  replicad-opencascadejs: "https://github.com/taucad/replicad/raw/main/dist/replicad-opencascadejs-0.21.0-v8.XX.tgz"
```

## Removed Files

- `build-config/custom_build_with_exceptions_v8.yml` — merged into `custom_build_single_v8.yml`
- `build-config/custom_build_multi_v8.yml` — multi-threading deferred
- `src/replicad_with_exceptions.*` — no longer needed
- `src/replicad_multi.*` — no longer needed

See `repos/opencascade.js/docs/occt-v8-migration.md` for build-level details.
