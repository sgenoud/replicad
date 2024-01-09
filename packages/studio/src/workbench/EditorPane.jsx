import React, { useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import Editor from "@monaco-editor/react";
import { fileSave } from "browser-fs-access";

import replicadTypes from "../../node_modules/replicad/dist/replicad.d.ts?raw";

import Splitter, { GutterTheme, SplitDirection } from "@devbookhq/splitter";

import useEditorStore from "../visualiser/editor/useEditorStore";
import { HeaderButton } from "./panes";
import Download from "../icons/Download";
import Share from "../icons/Share";
import LoadingScreen from "../components/LoadingScreen";

import { ellipsis } from "polished";
import { Button, ButtonBar } from "../components/Button";
import {
  Dialog,
  DialogTitle,
  DialogBody,
  DialogButtons,
} from "../components/Dialog.jsx";
import { useAutoload } from "./Autoload";
import Reload from "../icons/Reload";

export const ErrorOverlay = styled.div`
  padding: 2em;
  border-color: red;
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

export default observer(function EditorPane() {

  let debounceReference = null;
  const store = useEditorStore();

  const handleEditorDidMount = (editor, monaco) => {
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    monaco.languages.typescript.javascriptDefaults.setExtraLibs([
      {
        content: `declare module 'replicad' { ${replicadTypes} }`,
      },
      {
        content: `
  import * as replicadAll from 'replicad';
  declare global {
  declare var replicad = replicadAll;
  }
`,
      },
    ]);
  };

  if (!store.code.initialized) return <LoadingScreen />;

  return (
    <Splitter
      direction={SplitDirection.Vertical}
      gutterTheme={GutterTheme.Dark}
      gutterClassName="custom-gutter-theme"
      initialSizes={store.error ? [75, 25] : [100]}
    >
      <Editor
        defaultLanguage="javascript"
        defaultValue={store.code.current}
        theme="vs-dark"
        height="100%"
        onChange={(e) => {
          if (debounceReference) clearTimeout(debounceReference);
          debounceReference = setTimeout( () => {
            store.code.update(e, true);
          }, 400 )
        }}
        onMount={handleEditorDidMount}
        options={{
          automaticLayout: true,
          minimap: { enabled: false },
        }}
      />
      {store.error && (
        <ErrorOverlay>
          <div>Error</div>
          <div>{store.error?.message}</div>
          {store.error.stack && <pre>{store.error.stack}</pre>}
        </ErrorOverlay>
      )}
    </Splitter>
  );
});

const Url = styled.a`
  ${ellipsis("300px")};
`;

const ShareDialog = observer(({ onClose }) => {
  const store = useEditorStore();
  const [link, setLink] = React.useState("");
  useEffect(() => {
    store.code.export().then((link) => setLink(link));
  }, [store]);

  return (
    <Dialog onClose={onClose}>
      <DialogTitle onClose={onClose}>Your shareable link</DialogTitle>
      <DialogBody>
        <Url href={link} rel="noopener noreferrer" target="_blank">
          {link}
        </Url>
      </DialogBody>
      <DialogButtons>
        <ButtonBar>
          <Button onClick={onClose}>Close</Button>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(link);
              onClose();
            }}
            solid
          >
            Copy
          </Button>
        </ButtonBar>
      </DialogButtons>
    </Dialog>
  );
});

const Spacer = styled.div`
  flex: 1;
`;

export const EditorButtons = observer(() => {
  const store = useEditorStore();
  const [share, setShare] = React.useState(false);

  const toggleAutoload = useAutoload();

  const download = () => {
    return fileSave(
      new Blob([store.code.current], {
        type: "application/javascript",
      }),
      {
        id: "save-js",
        fileName: `${
          store.currentMesh.length === 1
            ? store.currentMesh[0]?.name
            : "replicad-script"
        }.js`,
        description: "JS replicad script of the current geometry",
        extensions: [".js"],
      }
    );
  };

  const filePickerSupported = window.showOpenFilePicker !== undefined;

  return (
    <>
      {filePickerSupported && (
        <>
          <HeaderButton onClick={toggleAutoload} title="Toggle autoreload">
            <Reload />
          </HeaderButton>
          <Spacer />
        </>
      )}

      <HeaderButton onClick={() => setShare(true)} title="Share">
        <Share />
      </HeaderButton>
      <HeaderButton onClick={download} title="Download">
        <Download />
      </HeaderButton>
      {share && <ShareDialog onClose={() => setShare(false)} />}
    </>
  );
});
