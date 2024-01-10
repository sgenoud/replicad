import { useState, useEffect } from "react";
import styled from "styled-components";
import { ellipsis } from "polished";

import { dumpCode } from "../utils/dumpCode";
import { Button } from "./Button.jsx";

const Input = styled.input`
  width: 100%;
  max-width: 800px;
`;

const Url = styled.a`
  ${ellipsis("400px")};
`;

const Divider = styled.hr`
  margin: 3em;
`;

const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
  row-gap: 0.5em;

  & label {
    margin-left: 0.3em;
  }
`;

const Subtitle = styled.h4`
  margin-bottom: 0.5em;
  margin-top: 2em;

  &:first-child {
    margin-top: 0;
  }
`;

const Inline = styled.div`
  display: flex;
  align-items: center;
  & > :not(:last-child) {
    margin-right: 1em;
  }
  max-width: 100%;
`;

export function LinkEditor({ fromCode }) {
  const [inputVal, setInputVal] = useState("");
  const [disableAutoPosition, setDisableAutoPosition] = useState(false);
  const [disableDamping, setDisableDamping] = useState(false);
  const [hideGrid, setHideGrid] = useState(false);
  const [expandParametersPanel, setExpandParametersPanel] = useState(false);

  const [compressedCode, setCompressedCode] = useState(null);

  useEffect(() => {
    if (!fromCode) return;
    dumpCode(fromCode).then((code) => {
      setCompressedCode(code);
    });
  }, [fromCode]);

  let link = null;
  let workbenchLink = null;

  if (inputVal || compressedCode) {
    const url = new URL(window.location.href);
    if (inputVal) {
      url.pathname = `/share/${encodeURIComponent(inputVal)}`;
    }
    if (compressedCode) {
      url.pathname = "/share/code/";
      const hashParams = new URLSearchParams();
      hashParams.set("code", compressedCode);
      url.hash = hashParams.toString();

      const workbenchURL = new URL(window.location);
      workbenchURL.pathname = "/workbench";
      workbenchURL.hash = url.hash;
      workbenchLink = workbenchURL.toString();
    }

    disableAutoPosition &&
      url.searchParams.set("disable-auto-position", "true");
    disableDamping && url.searchParams.set("disable-damping", "true");
    hideGrid && url.searchParams.set("hide-grid", "true");
    expandParametersPanel && url.searchParams.set("params", "true");
    link = url.toString();
  }

  console.log("link", link);
  console.log("workbenchLink", workbenchLink);

  return (
    <>
      {!fromCode && (
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
      )}

      {workbenchLink && (
        <>
          <Subtitle>Link to the workbench</Subtitle>
          <Inline>
            <Url href={link} target="_blank">
              {workbenchLink}
            </Url>
            <Button
              onClick={() => navigator.clipboard.writeText(workbenchLink)}
              solid
              small
            >
              Copy
            </Button>
          </Inline>
          <Divider />
        </>
      )}

      <Subtitle>Share widget options</Subtitle>
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
        <span>
          <input
            id="expand-params"
            type="checkbox"
            checked={expandParametersPanel}
            onChange={(e) => setExpandParametersPanel(e.target.checked)}
          />
          <label htmlFor="expand-params">Parameters panel open</label>
        </span>
      </Options>

      <Subtitle>Link to the share widget</Subtitle>
      {link && (
        <>
          <Inline>
            <Url href={link} target="_blank">
              {link}
            </Url>
            <Button
              small
              onClick={() => navigator.clipboard.writeText(link)}
              solid
            >
              Copy
            </Button>
          </Inline>
        </>
      )}
    </>
  );
}
