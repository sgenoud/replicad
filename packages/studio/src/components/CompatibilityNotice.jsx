import React, { useState } from "react";
import styled from "styled-components";
import { InfoBottomLeft } from "./FloatingInfo.jsx";

const Notice = styled(InfoBottomLeft)`
  z-index: 20;
  max-height: none;
  overflow: visible;

  ${({ $inline }) =>
    $inline
      ? `
    position: relative;
    inset: auto;
    padding: 0;
  `
      : ""}
`;

const Icon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.65rem;
  height: 1.65rem;
  padding: 0;
  border: 1px solid #d28b00;
  border-radius: 50%;
  color: #8a5b00;
  background: rgba(255, 244, 214, 0.92);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  cursor: help;
  font-size: 0.95rem;
  font-weight: bold;
  line-height: 1;

  &:focus-visible {
    outline: 2px solid var(--color-primary-light);
    outline-offset: 2px;
  }
`;

const Details = styled.div`
  position: absolute;
  bottom: calc(100% + 0.4em);
  left: 8px;
  width: max-content;
  max-width: min(28rem, calc(100vw - 3em));
  padding: 0.65em 0.8em;
  border: 1px solid #d28b00;
  border-radius: 5px;
  color: var(--text-color, #333);
  background: var(--bg-color, white);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  font-size: 0.8rem;
  line-height: 1.35;
`;

export default function CompatibilityNotice({ message, inline = false }) {
  const [expanded, setExpanded] = useState(false);
  if (!message) return null;

  return (
    <Notice noBg $inline={inline}>
      <Icon
        type="button"
        title="This model uses an older OpenCascade API"
        aria-label="Show OpenCascade compatibility information"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        i
      </Icon>
      {expanded && <Details role="status">{message}</Details>}
    </Notice>
  );
}
