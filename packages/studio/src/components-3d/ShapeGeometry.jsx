import React, { useState, useMemo } from "react";
import { lighten, darken, complement } from "polished";
import { Plane } from "three";

import { Positionner, Box } from "./Positionner.jsx";
import { Label3D } from "./FloatingLabel.jsx";
import ClipPlane from "./ClipPlane.jsx";
import {
  useWrappedFaceEvent,
  useWrappedEdgeEvent,
  ReplicadFacesMesh,
  ReplicadEdgesMesh,
} from "./replicadMesh.jsx";

const colorVariants = (baseColor = "#5a8296") => {
  return {
    base: baseColor,
    line: darken(0.2, baseColor),
    selected: lighten(0.15, baseColor),
    lineselected: lighten(0.25, baseColor),
    sideColor: complement(baseColor),
  };
};

const ShapeGeometry = ({
  shape,
  onFaceClick,
  onEdgeClick,
  facesHighlight,
  edgesHighlight,
  LineMaterial = "lineBasicMaterial",
  FaceMaterial = "meshBasicMaterial",
  MeshFaceMaterial = FaceMaterial,
  clipDirection = null,
  clipConstant = 0,
}) => {
  const fOnClick = useWrappedFaceEvent(onFaceClick);
  const eOnClick = useWrappedEdgeEvent(onEdgeClick);

  const colors = colorVariants(shape.color);
  const transparent = shape.opacity && shape.opacity !== 1;
  const FaceMaterialToUse =
    shape.solidType === "mesh" ? MeshFaceMaterial : FaceMaterial;

  const clippingPlane = useMemo(() => {
    if (!clipDirection) return null;
    const plane = new Plane();
    plane.normal.set(...clipDirection);
    plane.constant = clipConstant;
    return plane;
  }, [clipDirection, clipConstant]);

  return (
    <>
      {(shape.labels ?? []).map(
        ({ from, to, offset, color, label, fontSize, mode, position }) => (
          <Label3D
            key={label}
            start={from}
            end={to}
            offset={offset}
            lineColor={color}
            text={label}
            lineMode={mode}
            fontSize={fontSize}
            position={position}
          />
        )
      )}
      <ClipPlane sideColor={colors.sideColor} clippingPlane={clippingPlane}>
        {FaceMaterialToUse && (
          <ReplicadFacesMesh
            faces={shape.mesh}
            defaultHighlight={shape.highlight}
            highlight={facesHighlight}
            onClick={fOnClick}
          >
            <FaceMaterialToUse
              attach="material-0"
              transparent={transparent}
              opacity={shape.opacity}
              color={colors.base}
              polygonOffset
              polygonOffsetFactor={2.0}
              polygonOffsetUnits={1.0}
            />
            <FaceMaterialToUse
              attach="material-1"
              transparent={transparent}
              opacity={shape.opacity}
              color={colors.selected}
              polygonOffset
              polygonOffsetFactor={2.0}
              polygonOffsetUnits={1.0}
            />
          </ReplicadFacesMesh>
        )}
        {shape.edges && LineMaterial && (
          <ReplicadEdgesMesh
            edges={shape.edges}
            defaultHighlight={shape.highlight}
            highlight={edgesHighlight}
            onClick={eOnClick}
          >
            <LineMaterial
              attach="material-0"
              transparent={transparent}
              opacity={shape.opacity}
              color={colors.line}
            />
            <LineMaterial
              attach="material-1"
              transparent={transparent}
              opacity={shape.opacity}
              color={colors.lineselected}
            />
          </ReplicadEdgesMesh>
        )}
      </ClipPlane>
    </>
  );
};

export default ShapeGeometry;

const useSelection = (selectMode, validSelectModes) => {
  const [selection, setSelection] = useState(null);

  if (!validSelectModes.includes(selectMode)) return [selection, () => null];

  const select = (shapeId) => (e, index) => {
    if (
      selection &&
      selection.shapeId === shapeId &&
      selection.index === index
    ) {
      setSelection(null);
    } else {
      setSelection({ shapeId, index });
    }
  };

  return [selection, select];
};

const highlight = (selection, shapeId) => {
  return selection && shapeId === selection.shapeId ? selection : null;
};

export function ShapeGeometries({
  shapes,
  selectMode = "none",
  disableAutoPosition = false,
  LineMaterial = "lineBasicMaterial",
  FaceMaterial = "meshBasicMaterial",
  MeshFaceMaterial = FaceMaterial,
}) {
  const [selectedFace, selectFace] = useSelection(selectMode, ["all", "faces"]);
  const [selectedEdge, selectEdge] = useSelection(selectMode, ["all", "edges"]);

  const P = disableAutoPosition ? React.Fragment : Positionner;

  return (
    <P>
      {shapes.map((shape) => {
        const faceHighlight = highlight(selectedFace, shape.name);
        const edgeHighlight = highlight(selectedEdge, shape.name);

        return (
          <Box key={shape.name}>
            <ShapeGeometry
              shape={shape}
              baseColor={shape.color}
              edgesHighlight={edgeHighlight}
              facesHighlight={faceHighlight}
              LineMaterial={LineMaterial}
              FaceMaterial={FaceMaterial}
              MeshFaceMaterial={MeshFaceMaterial}
              onFaceClick={selectFace(shape.name)}
              onEdgeClick={selectEdge(shape.name)}
            />
          </Box>
        );
      })}
    </P>
  );
}
