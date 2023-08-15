import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react";
import debounce from "debounce";

import Canvas from "./Canvas.jsx";
import Material from "./Material.jsx";

import Controls from "../Controls.jsx";
import ShapeGeometry from "../ShapeGeometry.jsx";
import DefaultGeometry from "../DefaultGeometry.jsx";
import InfiniteGrid from "../InfiniteGrid.jsx";

import SVGViewer from "./SVGViewer.jsx";

const useSelection = () => {
  const [selected, setSelected] = useState(null);
  const toggleSelected = debounce((index) => {
    if ((selected || selected === 0) && selected === index) {
      setSelected(null);
    } else {
      setSelected(index);
    }
  }, 50);

  return [selected, toggleSelected];
};

const useClickHighlight = (selectMode, onSelected) => {
  const selectedFcn = useRef(onSelected);
  useEffect(() => {
    selectedFcn.current = onSelected;
  }, [onSelected]);

  const [faceSelected, toggleFaceSelection] = useSelection();
  const [edgeSelected, toggleEdgeSelection] = useSelection();

  const updateFaceSelected = ["all", "faces"].includes(selectMode)
    ? (e, index) => {
        e.stopPropagation();
        toggleFaceSelection(index);
        (edgeSelected || edgeSelected === 0) &&
          toggleEdgeSelection(edgeSelected);
      }
    : null;

  const updateEdgeSelected = ["all", "edges"].includes(selectMode)
    ? (e, index) => {
        e.stopPropagation();
        toggleEdgeSelection(index);
        (faceSelected || faceSelected === 0) &&
          toggleFaceSelection(faceSelected);
      }
    : null;

  useEffect(() => {
    selectedFcn.current && selectedFcn.current(faceSelected, edgeSelected);
  }, [faceSelected, edgeSelected]);

  return {
    updateFaceSelected,
    updateEdgeSelected,
    faceSelected,
    edgeSelected,
  };
};

export default observer(function EditorViewer({
  shape,
  hasError,
  selectMode = "all",
  onSelected,
  clipDirection,
  clipConstant,
}) {
  const { updateEdgeSelected, updateFaceSelected, faceSelected, edgeSelected } =
    useClickHighlight(selectMode, onSelected);

  if (
    shape &&
    (shape.format === "svg" || (shape.length && shape[0].format === "svg"))
  ) {
    return <SVGViewer shape={shape} />;
  }

  return (
    <Canvas
      orthographic
      onCreated={(state) => (state.gl.localClippingEnabled = true)}
    >
      <InfiniteGrid />
      <Controls enableDamping={false}>
        {hasError ? (
          <DefaultGeometry />
        ) : shape.length ? (
          shape.map((s) => (
            <ShapeGeometry
              key={s.name}
              shape={s}
              FaceMaterial={Material}
              clipDirection={clipDirection}
              clipConstant={clipConstant}
            />
          ))
        ) : (
          <ShapeGeometry
            facesHighlight={faceSelected}
            edgesHighlight={edgeSelected}
            shape={shape}
            FaceMaterial={Material}
            onEdgeClick={updateEdgeSelected}
            onFaceClick={updateFaceSelected}
            clipDirection={clipDirection}
            clipConstant={clipConstant}
          />
        )}
      </Controls>
    </Canvas>
  );
});
