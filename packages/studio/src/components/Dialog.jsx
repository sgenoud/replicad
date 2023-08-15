import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { Portal } from "react-portal";
import { ellipsis } from "polished";

const useOnKeypress = (fcn, keypress = "Escape") => {
  const actionFcn = useRef(fcn);
  useEffect(() => {
    actionFcn.current = fcn;
  }, [fcn]);

  const escFunction = useCallback(
    (event) => {
      if (event.key === keypress) {
        actionFcn.current && actionFcn.current();
      }
    },
    [keypress]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);
};

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 10;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const DialogBox = styled.div`
  --vertical-spacing: 1.5em;
  --horizontal-spacing: 2em;
  --radius: 10px;

  border-radius: var(--radius);
  z-index: 11;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;

  background: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  outline: none;

  @media (max-width: 450px) {
    top: auto;
    bottom: 0;
    left: 10px;
    right: 10px;
    transform: inherit;

    border-radius: var(--radius) var(--radius) 0 0;
  }
`;

const DialogLayout = styled.div`
  max-height: calc(100vh - 100px);

  min-width: 250px;
  width: auto;
  max-width: calc(100vw - 10px);

  display: grid;
  grid-gap: var(--vertical-spacing);
  grid-template-rows: auto 1fr;
  grid-auto-rows: auto;
  grid-template-columns: 1fr;

  & > :last-child {
    margin-bottom: var(--vertical-spacing);
  }
`;

export const Dialog = React.memo(function Dialog({
  children,
  onClose,
  ...props
}) {
  useOnKeypress(onClose, "Escape");

  return (
    <Portal>
      <DialogBox {...props}>
        <DialogLayout>{children}</DialogLayout>
      </DialogBox>
      <Overlay onClick={onClose} />
    </Portal>
  );
});

// For some reason the min-height is necessary here
const ViewBox = styled.div`
  min-height: 0;
`;
const Content = styled.div`
  overflow: auto;
  overscroll-behavior: contain;

  height: 100%;
  -webkit-overflow-scrolling: touch;
  width: 100%;

  padding: 1px var(--horizontal-spacing);
`;

export const DialogBody = React.memo(function DialogBody(props) {
  return (
    <ViewBox>
      <Content {...props} />
    </ViewBox>
  );
});

const TitleBar = styled.div`
  position: relative;
  padding: var(--vertical-spacing) var(--horizontal-spacing) 0
    var(--vertical-spacing);
  line-height: 1.2em;

  text-align: center;
  font-weight: bold;

  ${ellipsis("100%")}
`;

const CloseX = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  outline: inherit;
  cursor: pointer;

  font-weight: normal;
  position: absolute;
  right: calc(var(--vertical-spacing) / 2);
  top: calc(var(--vertical-spacing) / 2);
`;

export const DialogTitle = React.memo(function DialogTitle({
  children,
  onClose,
  ...props
}) {
  return (
    <TitleBar {...props}>
      {children}
      {onClose && <CloseX onClick={onClose}>&#x2715;</CloseX>}
    </TitleBar>
  );
});

export const DialogButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  padding: 0 var(--horizontal-spacing);
`;
