import React from "react";
import styled from "styled-components";

import Configure from "../icons/Configure";
import Clipping from "../icons/Clipping";
import Download from "../icons/Download";
import ClippingParams from "../visualiser/editor/ClippingParams";
import { FaceInfo, EdgeInfo } from "../visualiser/editor/HighlighedInfo.jsx";
import { InfoBottomLeft, InfoTopRight } from "../components/FloatingInfo";
import DownloadDialog from "../visualiser/editor/DownloadDialog";
import ParamsEditor from "../visualiser/editor/ParamsEditor";
import LoadingScreen from "../components/LoadingScreen";
import EditorViewer from "../viewers/EditorViewer";

import { observer } from "mobx-react";

import useEditorStore from "../visualiser/editor/useEditorStore";
import { HeaderButton, HeaderSelect } from "./panes";
import Loading from "../icons/Loading";

const Spacer = styled.div`
  flex: 1;
`;

export const VisualizerButtons = observer(() => {
  const store = useEditorStore();

  return (
    <>
      {store.currentMesh.length > 1 && !store.error ? (
        <>
          <HeaderSelect
            value={store.ui.shapeIndex}
            onChange={(e) => store.ui.selectShape(parseInt(e.target.value))}
          >
            <option value={-1}>All Shapes</option>
            {store.currentMesh.map((s, i) => (
              <option value={i} key={s.name}>
                {s.name}
              </option>
            ))}
          </HeaderSelect>
          <Spacer />
        </>
      ) : null}

      <HeaderButton
        onClick={() => store.ui.changeDownload(true)}
        title="Download"
      >
        <Download />
      </HeaderButton>
      {!store.ui.currentIsSVG && (
        <HeaderButton
          solid={!store.ui.clip.disabled}
          small
          onClick={() => store.ui.clip.toggle()}
          title="Clipping plane"
        >
          <Clipping />
        </HeaderButton>
      )}
      {store.defaultParams && (
        <HeaderButton
          solid={store.ui.enableParams}
          small
          onClick={() => store.ui.changeEnableParams(!store.ui.enableParams)}
          title="Parameters"
        >
          <Configure />
        </HeaderButton>
      )}
    </>
  );
});

const LoadingInfo = styled(InfoBottomLeft)`
  color: var(--color-primary-light);
`;

export default observer(function VisualizerPane() {
  const store = useEditorStore();

  const shape = store.ui.shapeSelected;

  return (
    <>
      {store.shapeLoaded ? (
        <EditorViewer
          shape={shape}
          labels={store.currentLabels}
          hasError={store.hasError}
          clipDirection={store.ui.clip.planeVector}
          clipConstant={store.ui.clip.position}
          onSelected={store.ui.changeHighlight}
        />
      ) : (
        <LoadingScreen />
      )}
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

      {(store.selectedInfo.faceInitialized ||
        store.selectedInfo.edgeInitialized) && (
        <InfoBottomLeft>
          <FaceInfo />
          <EdgeInfo />
        </InfoBottomLeft>
      )}

      {store.shapeLoaded && store.processing && (
        <LoadingInfo noBg>
          <Loading size="3em" />
        </LoadingInfo>
      )}
    </>
  );
});
