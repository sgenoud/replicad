import React, { useState } from "react";
import styled from "styled-components";
import ErrorBoundary from "../components/ErrorBoundary";
import Fullscreen from "../icons/Fullscreen";

const fullScreenStyle = ` 
top: 0;
bottom: 0;
left: 0;
right: 0;
`;

export const PaneWrapper = styled.div`
  position: ${({ fullscreen }) => (fullscreen ? "absolute" : "relative")};
  width: ${({ fullscreen }) => (fullscreen ? "100vw" : "100%")};
  height: ${({ fullscreen }) => (fullscreen ? "100vh" : "100%")};
  z-index: ${({ fullscreen, aboveOthers }) =>
    (fullscreen ? 10 : 0) + (aboveOthers ? 1 : 0)};

  flex: 1 1 auto;

  ${({ fullscreen }) => (fullscreen ? fullScreenStyle : "")};
  display: flex;
  flex-direction: column;

  --pane-header-height: 1.75em;
`;

export const HeaderButton = styled.button`
  background-color: transparent;
  color: #d4d4d4;
  border: 1px solid transparent;
  letter-spacing: 1px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  ${({ solid }) =>
    solid &&
    `
  background: var(--color-primary);

    `}
`;

export const HeaderSelect = styled.select`
  margin-right: 1.5em;

  color: #d4d4d4;

  border-color: transparent;
  background: var(--color-primary);
  border-radius: 2px;
`;

export const PaneHeader = styled.div`
  display: flex;
  width: 100%;
  flex: 0 0 var(--pane-header-height);
  justify-content: flex-end;
  height: var(--pane-header-height);
  background-color: var(--color-primary-dark);
  padding: 0.2em 2rem;
  box-shadow: rgb(0 0 0 / 35%) 0px -6px 12px 3px inset;

  & * {
    font-size: calc(var(--pane-header-height) * 0.6);
  }

  &:after {
    content: "";
    display: block;
    height: 90%;
    width: 1px;
  }
`;

export const PaneBody = styled.div`
  display: flex;
  width: 100%;
  flex: 1 1 auto;
  max-height: calc(100% - var(--pane-header-height));
  background-color: var(--bg-color);
  position: relative;
`;

export const Pane = ({ children, buttons, aboveOthers }) => {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <PaneWrapper fullscreen={fullscreen} aboveOthers={aboveOthers}>
      <PaneHeader>
        {buttons}
        <HeaderButton
          solid={fullscreen}
          onClick={() => setFullscreen(!fullscreen)}
          title="Fullscreen"
        >
          <Fullscreen />
        </HeaderButton>
      </PaneHeader>
      <PaneBody>
        <ErrorBoundary>{children}</ErrorBoundary>
      </PaneBody>
    </PaneWrapper>
  );
};
