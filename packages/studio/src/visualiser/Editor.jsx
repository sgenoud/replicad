import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";

import { Button, ButtonBar } from "../components/Button.jsx";
import {
  InfoBottomLeft,
  InfoTopRight as InfoTopRightRaw,
} from "../components/FloatingInfo.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";

import Download from "../icons/Download.jsx";
import Configure from "../icons/Configure.jsx";
import Reload from "../icons/Reload.jsx";
import Clipping from "../icons/Clipping.jsx";

import EditorViewer from "../viewers/EditorViewer.jsx";

import Toolbar from "../components/Toolbar.jsx";

import ParamsEditor from "./editor/ParamsEditor.jsx";
import ClippingParams from "./editor/ClippingParams.jsx";
import DownloadDialog from "./editor/DownloadDialog.jsx";
import useEditorStore, { EditorContextProvider } from "./editor/useEditorStore";

import {
  loadFile,
  requestFile,
  getSavedHandleName,
} from "../utils/diskFileAccess.js";

const InfoTopRight = styled(InfoTopRightRaw)`
  min-width: 180px;
  & > :not(:last-child) {
    margin-bottom: 1em;
  }
`;

const Select = styled.select`
  font-size: 0.8em;
  margin-right: 1.5em;
`;

const ErrorOverlay = styled(InfoBottomLeft)`
  border-color: red;
  background-color: white;
  border-width: 2px;
  max-height: initial;
  max-width: 50vw;
  max-height: 90vw;

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

const CenterInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
`;

const WelcomeScreen = observer(() => {
  const store = useEditorStore();

  const [savedHandleName, setSavedHandleName] = useState(null);
  useEffect(() => {
    getSavedHandleName().then(setSavedHandleName);
  }, []);

  const askForAccess = () => {
    requestFile().then((file) => {
      if (file) {
        store.code.startListening(file);
      }
    });
  };

  const initFromSaved = () => {
    loadFile().then((file) => {
      store.code.startListening(file);
    });
  };

  return (
    <CenterInfo>
      <h4>Select a file to build and visualise!</h4>
      <Button solid onClick={askForAccess}>
        Choose a file
      </Button>
      {savedHandleName && (
        <p>
          Open previous file:
          <a
            onClick={(e) => {
              e.preventDefault();
              initFromSaved();
            }}
          >
            {savedHandleName}
          </a>
        </p>
      )}
      <p>
        If you need help for building your models, you can have a look at{" "}
        <a
          href="https://replicad.xyz"
          rel="noopener noreferrer"
          target="_blank"
        >
          our documentation
        </a>
        .
      </p>
    </CenterInfo>
  );
});

const EditorView = observer(function Editor() {
  const store = useEditorStore();

  const shape = store.ui.shapeSelected;

  if (!store.code.listeningFileOnDisk && !store.currentMesh?.length) {
    return <WelcomeScreen />;
  }

  return (
    <>
      {store.shapeLoaded ? (
        <EditorViewer
          shape={shape}
          hasError={store.hasError}
          clipDirection={store.ui.clip.planeVector}
          clipConstant={store.ui.clip.position}
        />
      ) : (
        <LoadingScreen />
      )}
      <Toolbar>
        <ButtonBar>
          {store.currentMesh.length > 1 && !store.error ? (
            <Select
              value={store.ui.shapeIndex}
              onChange={(e) => store.ui.selectShape(parseInt(e.target.value))}
            >
              <option value={-1}>All Shapes</option>
              {store.currentMesh.map((s, i) => (
                <option value={i} key={s.name}>
                  {s.name}
                </option>
              ))}
            </Select>
          ) : null}

          <Button
            small
            solid={store.code.listeningFileOnDisk}
            onClick={() => {
              if (store.code.listeningFileOnDisk) {
                store.code.stopListening();
              }
              requestFile().then((file) => {
                store.code.startListening(file);
              });
            }}
          >
            <Reload />
          </Button>

          <Button small onClick={() => store.ui.changeDownload(true)}>
            <Download />
          </Button>
          {!store.ui.currentIsSVG && (
            <Button
              solid={!store.ui.clip.disabled}
              small
              onClick={() => store.ui.clip.toggle()}
            >
              <Clipping />
            </Button>
          )}
          {store.defaultParams && (
            <Button
              solid={store.ui.enableParams}
              small
              onClick={() =>
                store.ui.changeEnableParams(!store.ui.enableParams)
              }
            >
              <Configure />
            </Button>
          )}
        </ButtonBar>
      </Toolbar>
      {(!store.ui.clip.disabled ||
        (store.ui.enableParams && store.defaultParams)) && (
        <InfoTopRight>
          {!store.ui.clip.disabled && <ClippingParams />}
          {store.ui.enableParams && store.defaultParams && (
            <ParamsEditor
              defaultParams={store.defaultParams}
              onRun={store.process}
            />
          )}
        </InfoTopRight>
      )}
      {store.ui.showDownload && (
        <DownloadDialog onClose={() => store.ui.changeDownload(false)} />
      )}
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

export default (props) => {
  return (
    <EditorContextProvider>
      <EditorView {...props} />
    </EditorContextProvider>
  );
};
