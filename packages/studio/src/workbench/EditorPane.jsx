import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import Editor from "@monaco-editor/react";

import replicadTypes from "../../node_modules/replicad/dist/replicad.d.ts?raw";

import Splitter, { GutterTheme, SplitDirection } from "@devbookhq/splitter";

import useEditorStore from "../visualiser/editor/useEditorStore";
import downloadCode from "../utils/downloadCode";
import { HeaderButton } from "./panes";
import Download from "../icons/Download";
import Share from "../icons/Share";
import LoadingScreen from "../components/LoadingScreen";
import { LinkEditor } from "../components/LinkEditor";

import { Dialog, DialogTitle, DialogBody } from "../components/Dialog.jsx";
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
  const store = useEditorStore();

  const handleEditorDidMount = (_, monaco) => {
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
          store.code.update(e, true);
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

const ShareDialog = observer(({ onClose }) => {
  const store = useEditorStore();

  return (
    <Dialog onClose={onClose}>
      <DialogTitle onClose={onClose}>Your shareable links</DialogTitle>
      <DialogBody>
        <div style={{ maxWidth: "60vw" }}>
          <LinkEditor fromCode={store.code.current} />
        </div>
      </DialogBody>
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
    const shapeName =
      store.currentMesh.length === 1 ? store.currentMesh[0]?.name : null;
    return downloadCode(store.code.current, shapeName);
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
