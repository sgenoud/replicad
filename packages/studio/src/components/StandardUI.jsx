import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";

import { useControls, levaStore, Leva } from "leva";

import Download from "../icons/Download.jsx";
import Configure from "../icons/Configure.jsx";
import Focus from "../icons/Focus.jsx";
import NewWindow from "../icons/NewWindow.jsx";
import Loading from "../icons/Loading.jsx";

import { InfoMenu, ContextButton } from "./ButtonMenu.jsx";
import LoadingScreen from "./LoadingScreen.jsx";
import { InfoBottomLeft } from "./FloatingInfo.jsx";

import PresentationViewer from "../viewers/PresentationViewer.jsx";
import NicePresentationViewer from "../viewers/NicePresentationViewer.jsx";

const LoadingInfo = styled(InfoBottomLeft)`
  color: var(--color-primary-light);
`;

const AutoConfig = ({ updateParams, defaultParams, hidden, collapsed }) => {
  const [params] = useControls(() => defaultParams);
  const paramsUpdater = useRef(updateParams);

  useEffect(() => {
    paramsUpdater.current = updateParams;
  }, [updateParams]);

  useEffect(() => {
    paramsUpdater.current(params);
  }, [params]);

  useEffect(
    () => () => {
      levaStore.dispose();
    },
    []
  );

  return (
    <Leva
      hideCopyButton
      collapsed={collapsed}
      hidden={hidden}
      theme={{
        colors: {
          elevation1: "var(--bg-color-secondary)",
          elevation2: "var(--bg-color)",
          elevation3: "var(--bg-color-secondary)", // bg color of the root panel (main title bar)

          highlight1: "var(--color-primary)",
          highlight2: "var(--color-primary)",
          highlight3: "var(--color-primary-dark)",

          accent1: "var(--color-primary)",
          accent2: "var(--color-primary-light)",
          accent3: "var(--color-primary-dark)",

          vivid1: "red",
        },
        sizes: {
          rootWidth: null,
          controlWidth: "150px",
        },
      }}
    />
  );
};

const useDisplayMode = () => {
  const { search } = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(search);

  const niceViewer = searchParams.has("display");
  const toggleView = () => {
    if (niceViewer) searchParams.delete("display");
    else searchParams.set("display", "true");

    history.replace({ search: searchParams.toString() });
  };
  return [niceViewer, toggleView];
};

export default function StandardUI({
  computedShapes,
  computedLabels,
  defaultParams,
  updateParams,
  disableAutoPosition,
  disableDamping,
  showParams,
  orthographicCamera,
  hideGrid,
  onSave,
  canSave,
  isLoading,
}) {
  const isInIframe = window.location !== window.parent.location;
  const [niceViewer, toggleNiceViewer] = useDisplayMode();
  const Viewer = niceViewer ? NicePresentationViewer : PresentationViewer;

  return (
    <>
      {computedShapes?.length ? (
        <Viewer
          shapes={computedShapes}
          labels={computedLabels}
          orthographicCamera={orthographicCamera}
          hideGrid={hideGrid}
          disableDamping={disableDamping}
          disableAutoPosition={disableAutoPosition}
        />
      ) : (
        <LoadingScreen />
      )}

      {defaultParams && (
        <AutoConfig
          hidden={niceViewer}
          collapsed={!showParams}
          defaultParams={defaultParams}
          updateParams={updateParams}
        />
      )}
      <InfoMenu noBg hide={niceViewer}>
        <ContextButton icon onClick={toggleNiceViewer}>
          {niceViewer ? <Configure /> : <Focus />}
        </ContextButton>
        {!niceViewer && (
          <>
            <ContextButton
              icon
              disabled={!canSave}
              onClick={() => onSave("stl")}
            >
              <Download text="STL" />
            </ContextButton>
            <ContextButton
              icon
              disabled={!canSave}
              onClick={() => onSave("step")}
            >
              <Download text="STEP" />
            </ContextButton>
          </>
        )}
        {isInIframe && (
          <ContextButton
            icon
            onClick={() => window.open(window.location, "_blank")}
          >
            <NewWindow />
          </ContextButton>
        )}
      </InfoMenu>
      {isLoading && !!computedShapes?.length && (
        <LoadingInfo noBg hide={niceViewer}>
          <Loading size="3em" />
        </LoadingInfo>
      )}
    </>
  );
}
