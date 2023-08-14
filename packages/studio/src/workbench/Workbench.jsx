import React, { useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import Splitter, { GutterTheme } from "@devbookhq/splitter";

import useEditorStore, {
  EditorContextProvider,
} from "../visualiser/editor/useEditorStore";

import { Pane } from "./panes";

import EditorPane, { EditorButtons } from "./EditorPane";
import VisualizerPane, { VisualizerButtons } from "./VisualizerPane";
import AutoloadButton from "./Autoload.jsx";

export const WorkbenchStructure = observer(function WorkbenchStructure() {
  const store = useEditorStore();
  useEffect(() => {
    store.initCode();
  }, [store]);

  return (
    <>
      {store.code.listeningFileOnDisk && <AutoloadButton />}
      <Splitter
        gutterTheme={GutterTheme.Dark}
        gutterClassName="custom-gutter-theme"
      >
        {!store.code.listeningFileOnDisk && (
          <Pane aboveOthers buttons={<EditorButtons />}>
            <EditorPane />
          </Pane>
        )}
        <Pane buttons={<VisualizerButtons />}>
          <VisualizerPane />
        </Pane>
      </Splitter>
    </>
  );
});

const WorkbenchWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  max-height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: hidden;

  & .custom-gutter-theme {
    background-color: var(--color-primary-light);
  }
`;

export default function Workbench() {
  return (
    <WorkbenchWrapper>
      <EditorContextProvider>
        <WorkbenchStructure />
      </EditorContextProvider>
    </WorkbenchWrapper>
  );
}
