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

const useCode = (readyToBuild, setError) => {
  let { shapeURL } = useParams();
  const [code, setCode] = useState(null);

  const [rawCode, setRawCode] = useState(null);

  if (!shapeURL) {
    const hash = window.location.hash.substring(1);
    const hashParams = new URLSearchParams(hash);
    if (hashParams.has("url")) {
      shapeURL = hashParams.get("url");
    }
  }

  const codeUrl = decodeURIComponent(
    shapeURL === "test-shape" ? TEST_URL : shapeURL
  );

  useEffect(() => {
    if (shapeURL) {
      loadCodeFromUrl();
    } else {
      loadCodeFromParam();
    }

    async function loadCodeFromUrl() {
      try {
        const response = await axios.get(codeUrl);
        setCode(response.data);
        readyToBuild.current = true;
      } catch (e) {
        console.error(e);
        setError({ type: "url", codeUrl: codeUrl });
      }
    }

    async function loadCodeFromParam() {
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
    }
  }, [shapeURL]);

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

  let downloadURL = shapeURL && codeUrl;
  if (!downloadURL) {
    downloadURL = URL.createObjectURL(
      new Blob([code], {
        type: "application/javascript",
      })
    );
  }

  const updateCode = (newCode) => {
    if (newCode === code) return;
    setCode(newCode);
    setError(null);
  };

  return { code, workbenchUrl, downloadURL, setCode: updateCode };
};

export default function LinkWidget() {
  const [computedShapes, updateComputedShapes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [labels, setLabels] = useState([]);

  const [geometryHasBeenComputed, setGeometryHasBeenComputed] = useState(false);
  const [defaultParams, setDefaultParams] = useState(null);
  const paramsToCompute = useRef(null);
  const readyToBuild = useRef(false);
  const lastParams = useRef({});

  const { code, workbenchUrl, downloadURL, setCode } = useCode(
    readyToBuild,
    setError
  );

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
        })
        .then(() => {
          return builderAPI.computeLabels(code, buildParams);
        })
        .then((labels) => {
          setLabels(labels);
          lastParams.current = buildParams;
        });
    },
    [code]
  );

  const updateParams = useCallback(
    (newParams) => {
      if (readyToBuild.current && code) build(newParams);
      else {
        paramsToCompute.current = newParams;
      }
    },
    [build, code]
  );

  useEffect(() => {
    build();
  }, [build]);

  const loadFont = useCallback(
    async (fontData, fontName, forceUpdate) => {
      await builderAPI.ready();
      await builderAPI.loadFont(fontData, fontName, forceUpdate);
    },
    [builderAPI]
  );

  const searchParams = new URLSearchParams(window.location.search);
  const checkParam = (paramName) => {
    return searchParams.get(paramName)?.toLowerCase() === "true";
  };

  useEffect(() => {
    if (!checkParam("enable-post-message-mode")) return;
    if (defaultParams) updateParams(defaultParams);

    const update = (event) => {
      if (
        !event?.data ||
        !event.data.type ||
        event.data.type !== "replicad-command"
      ) {
        return;
      }

      if (event.data.command === "update") {
        const newParams = { ...(defaultParams || {}), ...event.data.params };
        updateParams(newParams);
        return;
      }

      if (event.data.command === "download") {
        saveShape("defaultShape", event.data.params.format || "stl", code);
      }

      if (event.data.command === "load-font") {
        const { font, fontName, forceUpdate } = event.data.params;
        loadFont(font, fontName, forceUpdate);
        return;
      }

      if (event.data.command === "load-code") {
        const newCode = event.data.params.code;
        setCode(newCode);
      }
    };
    console.warn("Unknown command received:", event?.data?.command);

    window.addEventListener("message", update);
    window.parent.postMessage("replicad-ready", "*");
    return () => {
      window.removeEventListener("message", update);
    };
  }, [updateParams, defaultParams]);

  if (error)
    return (
      <CenterInfo>
        <h4>Error</h4>
        {error.type === "url" && (
          <>
            <p>
              We could not find a shape to render <a href={downloadURL}>here</a>
              .
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

  return (
    <>
      <StandardUI
        isLoading={isLoading}
        computedShapes={computedShapes}
        computedLabels={labels}
        defaultParams={defaultParams}
        updateParams={updateParams}
        disableAutoPosition={checkParam("disable-auto-position")}
        hideGrid={checkParam("hide-grid")}
        orthographicCamera={checkParam("ortho-camera")}
        disableDamping={checkParam("disable-damping")}
        showParams={checkParam("params")}
        disableMenus={checkParam("enable-post-message-mode")}
        onSave={(format) => saveShape("defaultShape", format, code)}
        canSave={geometryHasBeenComputed}
      />
      <AdditionalInfo>
        <a href="https://replicad.xyz" target="_blank">
          {" replicad "}
        </a>
        |
        <a href={workbenchUrl} target="_blank">
          {" edit "}
        </a>
        |
        <a href={downloadURL} target="_blank">
          {" source "}
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
