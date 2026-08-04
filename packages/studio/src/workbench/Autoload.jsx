import React, { useCallback } from "react";
import styled from "styled-components";

import { Button } from "../components/Button";
import { clearFileSave, loadFile, requestFile } from "../utils/diskFileAccess";
import Reload from "../icons/Reload";
import useEditorStore from "../visualiser/editor/useEditorStore";
import { observer } from "mobx-react";
import { InfoBottomLeft } from "../components/FloatingInfo";

export const useAutoload = () => {
  const store = useEditorStore();

  const toggleAutoload = useCallback(async () => {
    if (store.code.listeningFileOnDisk) {
      store.code.stopListening();
      clearFileSave();
    }

    let file = await loadFile();
    if (!file) {
      file = await requestFile();
    }
    if (file) {
      store.code.startListening(file);
    } else {
      alert("Your browser does not support this feature.");
    }
  }, [store]);

  return toggleAutoload;
};

const Float = styled.div`
  position: absolute;
  top: 2.5em;
  left: 1em;
  z-index: 1000;
`;

const ErrorOverlay = styled(InfoBottomLeft)`
  border-color: red;
  background-color: white;
  border-width: 2px;
  max-height: initial;
  max-width: 50vw;
  max-height: 90vw;

  z-index: 1000;

  & > :first-child {
    color: red;
  }

  & > :nth-child(2) {
    font-size: 1.2em;
  }

  & > pre {
    font-size: 0.6em;
    overflow-x: auto;
    padding: 1em;
    background-color: #f2e0de;
  }
`;

export default observer(function AutoloadButton() {
  const store = useEditorStore();
  const toggleAutoload = useAutoload();

  return (
    <>
      <Float>
        <Button solid={store.code.listeningFileOnDisk} onClick={toggleAutoload}>
          <Reload />
        </Button>
      </Float>
      {store.error && (
        <ErrorOverlay>
          <div>Error</div>
          <div>{store.error?.message}</div>
          {store.error.stack && <pre>{store.error.stack}</pre>}
        </ErrorOverlay>
      )}
    </>
  );
});
