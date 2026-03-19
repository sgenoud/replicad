import React, { useState } from "react";
import { renderToString } from "react-dom/server";

import styled from "styled-components";
import { fileSave } from "browser-fs-access";

import { Button, ButtonBar } from "../../components/Button";
import {
  Dialog,
  DialogTitle,
  DialogBody,
  DialogButtons,
} from "../../components/Dialog.jsx";

import saveShape from "../../utils/saveShape";
import useEditorStore from "./useEditorStore";
import SVGViewer from "../../viewers/SVGViewer";

const Warning = styled.p`
  color: #b45309;
  font-size: 0.9em;
  margin-top: 0.5em;
`;

const Choices = styled.div`
  display: flex;

  flex-direction: row;
  gap: 2em;
  row-gap: 1em;

  flex-wrap: wrap;

  & > label {
    display: flex;
    & > :not(:last-child) {
      margin-right: 0.5em;
    }
  }
`;

export default function DownloadDialog({ onClose }) {
  const store = useEditorStore();

  const isSVG = store.currentMesh[0]?.format === "svg";
  const hasMeshShapes = store.currentMesh.some(
    (s) => s.solidType === "mesh"
  );
  const hasNonMeshShapes = store.currentMesh.some(
    (s) => s.mesh && s.solidType !== "mesh"
  );

  const [saveMode, setSaveMode] = useState(
    isSVG ? "svg" : hasMeshShapes ? "stl" : "step"
  );

  const isStepMode =
    saveMode === "step" || saveMode === "step-assembly";

  const onDownload = async () => {
    if (saveMode === "svg") {
      await fileSave(
        new Blob(
          [
            renderToString(
              <SVGViewer
                shape={store.currentMesh}
                withGrid={false}
                rawWindow
                defaultColor="black"
              />
            ),
          ],
          {
            type: "image/svg+xml",
          }
        ),
        {
          id: "exports",
          fileName: `${
            store.currentMesh.length === 1
              ? store.currentMesh[0]?.name
              : "replicad-image"
          }.svg`,
          description: "SVG file of the current geometry",
          extensions: [".svg"],
        }
      );
    } else if (saveMode === "json") {
      await fileSave(
        new Blob([JSON.stringify(store.currentMesh)], {
          type: "application/json",
        }),
        {
          id: "exports",
          fileName: "defaultGeometry.json",
          description: "JSON file containing the geometry",
          extensions: [".json"],
        }
      );
    } else {
      try {
        await saveShape("defaultShape", saveMode, store.code.current);
      } catch (e) {
        console.error(e);
      } finally {
        console.log("ending");
      }
    }

    onClose();
  };

  return (
    <Dialog onClose={onClose}>
      <DialogTitle onClose={onClose}>Download this model</DialogTitle>
      <DialogBody>
        <p>Select the format:</p>

        <Choices>
          {isSVG ? (
            <label>
              <input
                checked={saveMode === "svg"}
                type="radio"
                onClick={() => setSaveMode("svg")}
              />
              <span>SVG</span>
            </label>
          ) : (
            <>
              <label>
                <input
                  checked={saveMode === "step"}
                  type="radio"
                  onClick={() => setSaveMode("step")}
                />
                <span>STEP</span>
              </label>
              <label>
                <input
                  checked={saveMode === "step-assembly"}
                  type="radio"
                  onClick={() => setSaveMode("step-assembly")}
                />
                <span>STEP assembly</span>
              </label>
              <label>
                <input
                  checked={saveMode === "stl"}
                  type="radio"
                  onClick={() => setSaveMode("stl")}
                />
                <span>STL</span>
              </label>
              <label>
                <input
                  checked={saveMode === "stl-binary"}
                  type="radio"
                  onClick={() => setSaveMode("stl-binary")}
                />
                <span>STL (binary)</span>
              </label>
            </>
          )}
          <label>
            <input
              checked={saveMode === "json"}
              type="radio"
              onClick={() => setSaveMode("json")}
            />
            <span>JSON</span>
          </label>
        </Choices>
        {hasMeshShapes && isStepMode && (
          <Warning>
            {hasNonMeshShapes
              ? "Mesh shapes will be excluded from the STEP export."
              : "STEP export is not available for mesh shapes. Use STL instead."}
          </Warning>
        )}
      </DialogBody>
      <DialogButtons>
        <ButtonBar>
          <Button onClick={onClose}>Close</Button>
          <Button solid onClick={onDownload}>
            Download
          </Button>
        </ButtonBar>
      </DialogButtons>
    </Dialog>
  );
}
