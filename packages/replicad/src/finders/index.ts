import { Finder, FilterFcn } from "./definitions";

export type { FilterFcn };

/**
 * Combine a set of finder filters (defined with radius) to pass as a filter
 * function.
 *
 * @param filters - An array of objects containing a filter and its radius.
 * @returns A tuple containing a filter function and a cleanup function.
 *
 * @category Finders
 */
export const combineFinderFilters = <Type, T, R = number>(
  filters: { filter: Finder<Type, T>; radius: R }[]
): [(v: Type) => R | null, () => void] => {
  const filter = (element: Type) => {
    for (const { filter, radius } of filters) {
      if (filter.shouldKeep(element)) return radius;
    }
    return null;
  };

  return [filter, () => filters.forEach((f) => f.filter.delete())];
};

export * from "./edgeFinder";
export * from "./faceFinder";
export * from "./cornerFinder";
