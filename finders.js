import { Vector } from "./geom.js";

export const edgeIsParallelTo = (oc, edge, parallelTo = [0, 0, 1]) => {
  const { startPoint, endPoint } = edge;
  const v = new Vector(oc, parallelTo);
  const direction = endPoint.sub(startPoint).normalize();
  const dotProduct = direction.dot(v);

  startPoint.delete();
  endPoint.delete();
  v.delete();
  direction.delete();

  return Math.abs(dotProduct - 1) < 1e-6;
};

export const findInList = (edgesList, value) => {
  return (edge) => {
    const found = edgesList.find((e) => e.isSame(edge));
    if (found) return value;
    return null;
  };
};

export const max = (array, maxFcn) => {
  return array
    .map((elem) => ({ value: maxFcn(elem), elem }))
    .reduce((a, b) => {
      if (!a) return b;
      if (!b) return a;

      if (a.value >= b.value) return a;
      return b;
    }, null).elem;
};

export const min = (array, minFcn) => {
  return array
    .map((elem) => ({ value: minFcn(elem), elem }))
    .reduce((a, b) => {
      if (!a) return b;
      if (!b) return a;

      if (a.value <= b.value) return a;
      return b;
    }, null).elem;
};
