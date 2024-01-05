import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ellipsis } from "polished";

import builderAPI from "./utils/builderAPI";
import saveShape from "./utils/saveShape";

import { Button } from "./components/Button.jsx";
import StandardUI from "./components/StandardUI.jsx";

const CenterInfo = styled.div`
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 1em;
`;

const AdditionalInfo = styled.div`
  position: absolute;
  font-size: 0.75em;
  bottom: 1.5em;
  left: 50%;
  transform: translateX(-50%);
  & > a {
    text-decoration: none;
  }
`;

const TEST_URL =
  "https%3A%2F%2Fraw.githubusercontent.com%2Fsgenoud%2Freplicad%2Fmain%2Fpackages%2Freplicad-docs%2Fexamples%2FsimpleVase.js";

export default function LinkWidget() {
  const { shapeURL } = useParams();
  const [computedShapes, updateComputedShapes] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [code, setCode] = useState(null);

  const [geometryHasBeenComputed, setGeometryHasBeenComputed] = useState(false);
  const [defaultParams, setDefaultParams] = useState(null);
  const paramsToCompute = useRef(null);
  const readyToBuild = useRef(false);

  const codeUrl = decodeURIComponent(
    shapeURL === "test-shape" ? TEST_URL : shapeURL
  );

  useEffect(() => {
    axios
      .get(codeUrl)
      .then((response) => {
        setCode(response.data);
        readyToBuild.current = true;
      })
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  }, [shapeURL]);

  useEffect(() => {
    if (!code) return;

    builderAPI
      .extractDefaultParamsFromCode(code)
      .then((defaultParams) => {
        setDefaultParams(defaultParams);
      })
      .catch(() => setError(true));

    return () => {
      paramsToCompute.current = null;
      updateComputedShapes(null);
      setDefaultParams(null);
    };
  }, [code]);

  const build = useCallback(
    (buildParams) => {
      setIsLoading(true);
      builderAPI
        .ready()
        .then(() => {
          readyToBuild.current = false;
          return builderAPI.buildShapesFromCode(code, buildParams);
        })
        .then((geometry) => {
          updateComputedShapes(geometry);
          setGeometryHasBeenComputed(true);
          readyToBuild.current = true;
          setIsLoading(false);
          if (paramsToCompute.current) {
            build({ ...paramsToCompute.current });
            paramsToCompute.current = null;
          }
        });
    },
    [code]
  );

  const updateParams = (newParams) => {
    if (readyToBuild.current && code) build(newParams);
    else {
      paramsToCompute.current = newParams;
    }
  };

  if (error)
    return (
      <CenterInfo>
        <h4>Error</h4>
        <p>
          We could not find a shape to render{" "}
          <a href={decodeURIComponent(shapeURL)}>here</a>.
        </p>
        <p>Are you sure that the link is pointing to a raw javascript file?</p>
      </CenterInfo>
    );

  const url = new URL(window.location.href);
  url.pathname = "/workbench";
  url.searchParams.set("from-url", shapeURL);

  const workbenchUrl = url.toString();

  const searchParams = new URLSearchParams(window.location.search);

  return (
    <>
      <StandardUI
        isLoading={isLoading}
        computedShapes={computedShapes}
        defaultParams={defaultParams}
        updateParams={updateParams}
        disableAutoPosition={
          searchParams.get("disable-auto-position")?.toLowerCase() === "true"
        }
        hideGrid={searchParams.get("hide-grid")?.toLowerCase() === "true"}
        disableDamping={
          searchParams.get("disable-damping")?.toLowerCase() === "true"
        }
        showParams={searchParams.get("params")?.toLowerCase() === "true"}
        onSave={(format) => saveShape("defaultShape", format)}
        canSave={geometryHasBeenComputed}
      />
      <AdditionalInfo>
        <a
          href="https://replicad.xyz"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          replicad
        </a>{" "}
        |
        <a href={workbenchUrl} target="_blank" rel="noopener noreferrer">
          {" "}
          edit{" "}
        </a>
        |
        <a href={codeUrl} target="_blank" rel="noopener noreferrer">
          {" "}
          source{" "}
        </a>
      </AdditionalInfo>
    </>
  );
}

const Subtitle = styled.h4`
  margin-bottom: 0.5em;
  margin-top: 2em;
`;

const Inline = styled.div`
  display: flex;
  align-items: center;
  & > :not(:last-child) {
    margin-right: 1em;
  }
  max-width: 100%;
`;

const Input = styled.input`
  width: 100%;
  max-width: 800px;
`;

const Url = styled.a`
  ${ellipsis("100%")};
`;

const Content = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
`;

const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2em;

  & label {
    margin-left: 0.3em;
  }
`;

export function MakeLink() {
  const [inputVal, setInputVal] = useState("");
  const [disableAutoPosition, setDisableAutoPosition] = useState(false);
  const [disableDamping, setDisableDamping] = useState(false);
  const [hideGrid, setHideGrid] = useState(false);

  let link = null;
  if (inputVal) {
    const url = new URL(window.location.href);
    url.pathname = `/share/${encodeURIComponent(inputVal)}`;
    disableAutoPosition &&
      url.searchParams.set("disable-auto-position", "true");
    disableDamping && url.searchParams.set("disable-damping", "true");
    hideGrid && url.searchParams.set("hide-grid", "true");
    link = url.toString();
  }

  return (
    <CenterInfo>
      <Content>
        <h4>Create a link to a replicad file</h4>
        <div>
          <label htmlFor="url-input">
            Enter the link to a <strong>raw</strong> javascript file.
          </label>
          <Input
            id="url-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
        </div>

        <Subtitle>Options</Subtitle>
        <Options>
          <span>
            <input
              id="disable-auto-position"
              type="checkbox"
              checked={!disableAutoPosition}
              onChange={(e) => setDisableAutoPosition(!e.target.checked)}
            />
            <label htmlFor="disable-auto-position">Auto position</label>
          </span>
          <span>
            <input
              id="disable-damping"
              type="checkbox"
              checked={!disableDamping}
              onChange={(e) => setDisableDamping(!e.target.checked)}
            />
            <label htmlFor="disable-damping">Damping</label>
          </span>
          <span>
            <input
              id="hide-grid"
              type="checkbox"
              checked={!hideGrid}
              onChange={(e) => setHideGrid(!e.target.checked)}
            />
            <label htmlFor="hide-grid">Grid</label>
          </span>
        </Options>

        {link && (
          <>
            <Subtitle>Your link</Subtitle>
            <Inline>
              <Url href={link} rel="noopener noreferrer" target="_blank">
                {link}
              </Url>
              <Button onClick={() => navigator.clipboard.writeText(link)} solid>
                Copy
              </Button>
            </Inline>
          </>
        )}
      </Content>
    </CenterInfo>
  );
}
