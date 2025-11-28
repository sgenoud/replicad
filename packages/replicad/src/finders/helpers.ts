import { AnyShape, Face } from "../shapes";
import { FaceFinder } from "./faceFinder";

export type SingleFace = Face | FaceFinder | ((f: FaceFinder) => FaceFinder);

export function getSingleFace(f: SingleFace, shape: AnyShape): Face {
  if (f instanceof Face) return f;
  const finder = f instanceof FaceFinder ? f : f(new FaceFinder());
  return finder.find(shape, { unique: true });
}
