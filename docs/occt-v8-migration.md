# OCCT 8.0.1 migration

This document covers the Replicad-specific parts of the OCCT 8.0.1 migration.

## Runtime builds

Replicad now ships two builds with the same generated binding surface:

| Build             | Purpose                                             | Exception handling            |
| ----------------- | --------------------------------------------------- | ----------------------------- |
| `replicad_single` | Default browser and Node runtime                    | Native WebAssembly exceptions |
| `replicad_multi`  | Cross-origin-isolated runtimes with pthread support | Native WebAssembly exceptions |

The former `replicad_with_exceptions` build is removed. Both remaining builds use `-fwasm-exceptions`, so callers no longer need to choose between an exception-enabled and exception-disabled artifact.

The multi build remains available for consumers that provide the browser isolation and worker environment required by Emscripten pthreads. Replicad's normal API is identical between the single and multi entry points.

## OCCT 8 binding changes

OCCT 8 and the updated generated bindings consolidate numbered overload classes into their public class names. Replicad therefore calls overloads such as `gp_Pnt(...)` directly instead of selecting generated names such as `gp_Pnt_2`.

Reference-counted OCCT handles are also returned through their resolved wrapper type. Callers no longer invoke `.get()` merely to unwrap a generated handle. This changes the JavaScript binding surface, not OCCT's reference-counted ownership model.

The migration includes the corresponding changes across geometry construction, curves, projections, import/export, XCAF assembly export, sketches, measurements, and shape operations.

## Native rendering extractors

The face and edge rendering paths use Replicad-maintained C++ wrappers compiled into both WASM variants. The wrappers traverse OCCT topology and tessellation in native code, then return packed buffers for bulk JavaScript reads.

This replaces the historical edge path's per-face, per-edge, and per-point Embind calls with one extraction call. The final direct A/B benchmark against that historical JavaScript implementation measured a 71.92× median speedup on its 32-instance premeshed fixture while preserving line geometry, group ranges, and bounded edge hashes.

The native implementation also preserves Replicad's existing topology-label contract:

- public shape hashes and face/edge group hashes use the same bounded `[1, 2^31 - 1]` function;
- shared edges are deduplicated with exact OCCT shape identity rather than hash equality;
- face occurrences are not deduplicated;
- located face triangulations use their actual `TopLoc_Location`; and
- free edges use the requested angular and linear deflection tolerances in OCCT's expected order.

These wrappers are part of the required `replicad-opencascadejs` module contract. An OCCT 7 module is not compatible with the broader OCCT 8 Replicad API, so the removed JavaScript extractor is not retained as a compatibility fallback.

## Build inputs

The build source lives in `packages/replicad-opencascadejs/build-source`. Generate the concrete configuration and build both artifacts with:

```sh
pnpm --dir packages/replicad-opencascadejs run generateConfig
pnpm --dir packages/replicad-opencascadejs run buildSingle
pnpm --dir packages/replicad-opencascadejs run buildMulti
```

This migration is built from the immutable OCCT 8.0.1 canary inputs:

| Image                                                           | OCI index digest                                                          |
| --------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `ghcr.io/taucad/opencascade.js:canary-ebd263f1-single-threaded` | `sha256:215198af0e2ca4c5f308e5540869f2419784dc290062d3eb03d34e4f22e0188c` |
| `ghcr.io/taucad/opencascade.js:canary-ebd263f1-multi-threaded`  | `sha256:5cb67064edc903ae50c254e32417da9662fa88ec2e734386c28a3806949862ce` |

Adopting a later stable OpenCascade.js/libcascade 3.0.0 image is a separate follow-up. It is not part of this migration branch.

The generated package contains only the runtime artifacts listed in `package.json`: JavaScript glue, WebAssembly, declarations, and symbol maps for both variants. Build manifests and provenance JSON remain local ignored diagnostics and are not versioned or packed.

## Verification

The migration is covered at three levels:

- direct `replicad-opencascadejs` tests exercise the generated single and multi modules, native face/edge extraction, located and free edges, bounded hash parity, and pthread startup;
- Replicad tests cover the high-level mesh contract; and
- package and consumer builds verify the generated artifacts through the public APIs.

Run the package checks from the repository root after building the WASM artifacts:

```sh
pnpm --filter replicad-opencascadejs test
pnpm --filter replicad typecheck
pnpm --filter replicad test -- --run
pnpm --filter replicad build
```
