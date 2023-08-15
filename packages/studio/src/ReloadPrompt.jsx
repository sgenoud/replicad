import React from "react";
import styled from "styled-components";

import { Button } from "./components/Button";

import { useRegisterSW } from "virtual:pwa-register/react";

const ButtonsList = styled.div`
  display: flex;
  justify-content: flex-end;

  & > :not(:last-child) {
    margin-right: 1em;
  }
`;

const Toast = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  margin-top: 4em;
  padding: 12px;
  border: 1px solid var(--color-primary);
  border-right-style: none;
  border-radius: 4px 0 0 4px;
  z-index: 1;
  text-align: left;
  box-shadow: 3px 4px 5px 0 #8885;
  background-color: white;

  & > :not(:last-child) {
    margin-bottom: 8px;
  }
`;

function ReloadPrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      r &&
        setInterval(() => {
          r.update();
        }, 24 * 3600000);
      //}, 20000 /* 0s for testing purposes */);
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });

  const close = () => {
    setNeedRefresh(false);
  };

  if (!needRefresh) return null;

  return (
    <Toast>
      <div>
        <span>The site has been updated, click reload to refresh.</span>
      </div>
      <ButtonsList>
        {needRefresh && (
          <Button
            solid
            onClick={() => {
              updateServiceWorker(true);
            }}
          >
            Reload
          </Button>
        )}
        <Button onClick={() => close()}>Close</Button>
      </ButtonsList>
    </Toast>
  );
}

export default ReloadPrompt;
