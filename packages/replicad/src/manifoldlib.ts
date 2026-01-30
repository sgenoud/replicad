import type { Box, Manifold, Mesh, Vec3 } from "manifold-3d";

export type ManifoldInstance = Manifold;
export type ManifoldMesh = Mesh;
export type ManifoldVec3 = Vec3;
export type ManifoldBox = Box;
export type ManifoldModule = {
  Manifold: typeof Manifold;
  Mesh?: typeof Mesh;
};

const MANIFOLD: { library: ManifoldModule | null } = {
  library: null,
};

export const setManifold = (manifold: ManifoldModule): void => {
  manifold?.setup?.();
  MANIFOLD.library = manifold;
};

export const getManifold = (): ManifoldModule => {
  if (!MANIFOLD.library) throw new Error("manifold has not been loaded");
  return MANIFOLD.library;
};
