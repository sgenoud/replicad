import React, { useRef, useState, useEffect, useCallback } from "react";

import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

import builderAPI from "./utils/builderAPI";
import loadCode from "./utils/loadCode";
import saveShape from "./utils/saveShape";

import StandardUI from "./components/StandardUI.jsx";
import { LinkEditor } from "./components/LinkEditor.jsx";

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
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [code, setCode] = useState(null);
  const [rawCode, setRawCode] = useState(null);

  const [geometryHasBeenComputed, setGeometryHasBeenComputed] = useState(false);
  const [defaultParams, setDefaultParams] = useState(null);
  const paramsToCompute = useRef(null);
  const readyToBuild = useRef(false);

  const codeUrl = decodeURIComponent(
    shapeURL === "test-shape" ? TEST_URL : shapeURL
  );

  useEffect(() => {
    if (!shapeURL) return;

    axios
      .get(codeUrl)
      .then((response) => {
        setCode(response.data);
        readyToBuild.current = true;
      })
      .catch((e) => {
        console.error(e);
        setError({ type: "url" });
      });
  }, [shapeURL]);

  useEffect(() => {
    const loadCodeFromParam = async () => {
      const hash = window.location.hash.substring(1);
      const hashParams = new URLSearchParams(hash);
      if (!hashParams.has("code")) {
        setError({ type: "code" });
        return;
      }
      try {
        const rawCode = hashParams.get("code");
        setCode(await loadCode(rawCode));
        setRawCode(rawCode);
        readyToBuild.current = true;
      } catch (e) {
        setError({ type: "code" });
      }
    };

    if (shapeURL) return;
    loadCodeFromParam();
  }, [shapeURL]);

  useEffect(() => {
    if (!code) return;

    builderAPI
      .extractDefaultParamsFromCode(code)
      .then((defaultParams) => {
        setDefaultParams(defaultParams || {});
      })
      .catch(() => setError({ type: "url" }));

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
        {error.type === "url" && (
          <>
            <p>
              We could not find a shape to render{" "}
              <a href={decodeURIComponent(shapeURL)}>here</a>.
            </p>
            <p>
              Are you sure that the link is pointing to a raw javascript file?
            </p>
          </>
        )}
        {error.type === "code" && (
          <>
            <p>
              <code>#code</code> parameter is missing or could not be rendered.
            </p>
          </>
        )}
      </CenterInfo>
    );

  const url = new URL(window.location.href);
  url.pathname = "/workbench";
  url.hash = "";
  url.search = "";
  if (shapeURL) {
    url.searchParams.set("from-url", shapeURL);
  } else {
    const hashParams = new URLSearchParams();
    hashParams.set("code", rawCode);
    url.hash = hashParams.toString();
  }
  const workbenchUrl = url.toString();

  const searchParams = new URLSearchParams(window.location.search);

  let downloadURL = shapeURL;
  if (!downloadURL) {
    downloadURL = URL.createObjectURL(
      new Blob([code], {
        type: "application/javascript",
      })
    );
  }

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
        <a href="https://replicad.xyz" target="_blank">
          {" "}
          replicad
        </a>{" "}
        |
        <a href={workbenchUrl} target="_blank">
          {" "}
          edit{" "}
        </a>
        |
        <a href={downloadURL} target="_blank">
          {" "}
          source{" "}
        </a>
      </AdditionalInfo>
    </>
  );
}

const Content = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
`;

export function MakeLink() {
  return (
    <CenterInfo>
      <Content>
        <h4>Create a link to a replicad file</h4>
        <LinkEditor />
      </Content>
    </CenterInfo>
  );
}
