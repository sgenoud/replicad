import type { TopoDS_Shape } from "replicad-opencascadejs";
import { Point, Vector } from "../geom";
import { getOC } from "../oclib";
import { localGC } from "../register";
import { cast, Face, Shape3D, Solid } from "../shapes";

/**
 * Splits a finite prism and keeps the solid containing its entire starting cap.
 * A valid limit must separate the prism into exactly two solids, with the
 * starting and temporary far caps in different pieces. In particular, a face
 * that misses part of the profile must not return an untrimmed prism.
 */
function splitPrismUntil(
  profile: Face,
  target: Face,
  extrusionVector: Vector
): Solid | null {
  const oc = getOC();
  const [r, gc] = localGC();
  try {
    const prism = r(
      new oc.BRepPrimAPI_MakePrism(
        profile.wrapped,
        extrusionVector.wrapped,
        false,
        true
      )
    );
    if (!prism.IsDone()) return null;
    const argumentsList = r(new oc.NCollection_List_TopoDS_Shape());
    argumentsList.Append(r(prism.Shape()));
    const toolsList = r(new oc.NCollection_List_TopoDS_Shape());
    toolsList.Append(target.wrapped);

    const splitter = r(new oc.BRepAlgoAPI_Splitter());
    splitter.SetNonDestructive(true);
    splitter.SetArguments(argumentsList);
    splitter.SetTools(toolsList);
    splitter.Build();
    if (splitter.HasErrors() || !splitter.IsDone()) return null;
    const raw = r(splitter.Shape());
    if (raw.IsNull()) return null;
    const result = r(cast(raw));
    const solids = result.solids.map(r);
    if (solids.length !== 2) return null;

    // Non-destructive splitting may copy a cap without changing its geometry.
    // Follow that history, but reject a cap divided into multiple faces (the
    // limiting face crossed the start or the temporary far end).
    const capAfterSplit = (cap: TopoDS_Shape): TopoDS_Shape | null => {
      const modified = r(splitter.Modified(cap));
      if (modified.Size() === 1) return r(modified.First());
      if (!modified.IsEmpty() || splitter.IsDeleted(cap)) return null;
      return cap;
    };
    const start = capAfterSplit(r(prism.FirstShape()));
    const end = capAfterSplit(r(prism.LastShape()));
    if (!start || !end) return null;

    const pieces = solids.map((solid) => {
      const faces = solid.faces.map(r);
      return {
        solid,
        atStart: faces.some((face) => face.wrapped.IsSame(start)),
        atEnd: faces.some((face) => face.wrapped.IsSame(end)),
      };
    });
    const kept = pieces.filter((piece) => piece.atStart && !piece.atEnd);
    const discarded = pieces.filter((piece) => piece.atEnd && !piece.atStart);
    if (kept.length !== 1 || discarded.length !== 1) return null;

    const solid = kept[0].solid;
    const checker = r(new oc.BRepCheck_Analyzer(solid.wrapped, true));
    if (!checker.IsValid()) return null;
    return solid.clone();
  } finally {
    gc();
  }
}

/**
 * Builds only the extrusion from explicit geometry and direction. No face
 * selection or sketch ownership rules are applied here. None of the inputs
 * are consumed. The finite, trimmed limiting face must fully cap the sweep once
 * and must not cross the profile. The supplied direction is preferred; its
 * reverse is tried when it cannot reach a complete cap.
 */
export function extrudeFaceUntil(
  profile: Face,
  target: Face,
  extrusionDirection: Point
): Shape3D {
  const oc = getOC();
  const [r, gc] = localGC();
  const failure = "Could not extrude the sketch to the limiting face";

  try {
    const direction = r(new Vector(extrusionDirection));
    if (!Number.isFinite(direction.Length) || direction.Length === 0) {
      throw new Error(
        "The extrusion direction must be a non-zero finite vector"
      );
    }
    direction.normalize();

    const finiteBounds = (face: Face) => {
      const box = r(face.boundingBox);
      const bounds =
        box.wrapped.IsVoid() || box.wrapped.IsOpen() ? null : box.bounds;
      // OCCT can encode infinity as a large finite number, even in a box
      // whose open flags are unset (for example, an unbounded plane).
      if (
        !bounds ||
        bounds.some((corner) =>
          corner.some(
            (value) => !Number.isFinite(value) || oc.Precision.IsInfinite(value)
          )
        )
      ) {
        throw new Error(
          `${failure}: the profile and limit must have finite bounds`
        );
      }
      return bounds;
    };
    const profileBounds = finiteBounds(profile);
    const targetBounds = finiteBounds(target);

    // Bound every possible displacement from the profile to the target along
    // the sweep axis. This is conservative for oblique directions too, unlike
    // using just the distance between face centres.
    let min = 0;
    let max = 0;
    direction.toTuple().forEach((component, axis) => {
      const low = targetBounds[0][axis] - profileBounds[1][axis];
      const high = targetBounds[1][axis] - profileBounds[0][axis];
      min += component * (component >= 0 ? low : high);
      max += component * (component >= 0 ? high : low);
    });
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
      throw new Error(`${failure}: the sweep extent must be finite`);
    }
    const tolerance = oc.Precision.Confusion();
    const margin = Math.max(100 * tolerance, (max - min) * 1e-3);
    for (const [sign, extent] of [
      [1, max],
      [-1, -min],
    ]) {
      if (extent <= tolerance) continue;
      const vector = r(direction.multiply(sign * (extent + margin)));
      const solid = splitPrismUntil(profile, target, vector);
      if (solid) return solid;
    }
    throw new Error(
      `${failure}: the face must fully cap the extrusion once without crossing the profile`
    );
  } finally {
    gc();
  }
}
