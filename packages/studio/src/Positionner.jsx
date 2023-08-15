import React, {
  createContext,
  useContext,
  useRef,
  useMemo,
  useCallback,
  useLayoutEffect,
} from "react";

import { Box3, Vector3 } from "three";
import { useThree } from "@react-three/fiber";

const DEFAULT_PADDING = 5;

const positionContext = createContext({
  registerBox: () => null,
  unregisterBox: () => null,
  refreshPositions: () => null,
});

export function Positionner({ children }) {
  const boxesRef = useRef([]);
  const boundingBox = useMemo(() => new Box3(), []);
  const vec = useMemo(() => new Vector3(), []);
  const wrappingGroup = useRef(null);
  const { invalidate } = useThree();

  const registerBox = useCallback((group) => {
    boxesRef.current.push(group);
  }, []);

  const unregisterBox = useCallback((group) => {
    const i = boxesRef.current.findIndex((b) => b === group);
    if (i !== -1) {
      boxesRef.current.splice(i, 1);
    }
  }, []);

  const refreshPositions = useCallback(() => {
    let currentX = 0;
    boxesRef.current.forEach((group) => {
      boundingBox.setFromObject(group).getSize(vec);
      group.position.setX(group.position.x + currentX - boundingBox.min.x);
      currentX += DEFAULT_PADDING + vec.x;
    });

    boundingBox.setFromObject(wrappingGroup.current);
    wrappingGroup.current.position.setX(
      wrappingGroup.current.position.x - (currentX - DEFAULT_PADDING) / 2
    );
    invalidate();
  }, []);

  const contextVals = useMemo(
    () => ({
      registerBox,
      unregisterBox,
      refreshPositions,
    }),
    [registerBox, unregisterBox, refreshPositions]
  );

  useLayoutEffect(() => {
    refreshPositions();
  }, [children, refreshPositions]);

  return (
    <group ref={wrappingGroup}>
      <positionContext.Provider value={contextVals}>
        {children}
      </positionContext.Provider>
    </group>
  );
}

export function Box({ children }) {
  const group = useRef();
  const { registerBox, unregisterBox } = useContext(positionContext);

  useLayoutEffect(() => {
    if (!group.current) return;
    registerBox(group.current);
    return () => unregisterBox(group.current);
  }, []);

  return <group ref={group}>{children}</group>;
}

export function usePositionContext() {
  return useContext(positionContext);
}
