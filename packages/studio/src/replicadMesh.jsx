import React, { useLayoutEffect, useMemo, useRef, useEffect } from "react";
import { BufferGeometry } from "three";
import { useThree } from "@react-three/fiber";
import {
  highlightInGeometry,
  syncLines,
  syncFaces,
  getFaceIndex,
  getEdgeIndex,
} from "replicad-threejs-helper";

export const useApplyHighlights = (geometry, highlight) => {
  const { invalidate } = useThree();

  useLayoutEffect(() => {
    let toHighlight = highlight;

    if (!highlight && highlight !== 0) toHighlight = [];
    else if (!Array.isArray(highlight)) toHighlight = [highlight];

    highlightInGeometry(toHighlight, geometry);
    invalidate();
  }, [geometry, highlight, invalidate]);
};

export const getEdgeIndexFromEvent = (event) => {
  return getEdgeIndex(event.index, event.object.geometry);
};

export const getFaceIndexFromEvent = (event) => {
  return getFaceIndex(event.faceIndex, event.object.geometry);
};

export const useWrappedEdgeEvent = (onEvent) => {
  return useMemo(() => {
    if (!onEvent) return null;
    return (e) => {
      onEvent(e, getEdgeIndexFromEvent(e));
    };
  }, [onEvent]);
};

export const useWrappedFaceEvent = (onEvent) => {
  return useMemo(() => {
    if (!onEvent) return null;
    return (e) => {
      onEvent(e, getFaceIndexFromEvent(e));
    };
  }, [onEvent]);
};

export const useFaceGeometry = (faces, highlight) => {
  const { invalidate } = useThree();

  const body = useRef(new BufferGeometry());

  useLayoutEffect(() => {
    if (!faces) return;
    syncFaces(body.current, faces, highlight);
    invalidate();
  }, [faces, highlight, invalidate]);

  useEffect(
    () => () => {
      body.current.dispose();
      invalidate();
    },
    [invalidate]
  );

  return body.current;
};

export const useLinesGeometry = (edges, highlight) => {
  const { invalidate } = useThree();

  const lines = useRef(new BufferGeometry());

  useLayoutEffect(() => {
    syncLines(lines.current, edges, highlight);
    invalidate();
  }, [edges, highlight, invalidate]);

  useEffect(
    () => () => {
      lines.current.dispose();
      invalidate();
    },
    [invalidate]
  );

  return lines.current;
};

export const ReplicadFacesMesh = ({
  faces,
  defaultHighlight,
  highlight,
  children,
  ...props
}) => {
  const faceGeometry = useFaceGeometry(faces, defaultHighlight);
  useApplyHighlights(faceGeometry, highlight);
  return (
    <mesh {...props}>
      <primitive object={faceGeometry} attach="geometry" />
      {children}
    </mesh>
  );
};

export const ReplicadEdgesMesh = ({
  edges,
  defaultHighlight,
  highlight,
  children,
  ...props
}) => {
  const linesGeometry = useLinesGeometry(edges, defaultHighlight);
  useApplyHighlights(linesGeometry, highlight);

  return (
    <lineSegments {...props}>
      <primitive object={linesGeometry} attach="geometry" />
      {children}
    </lineSegments>
  );
};
