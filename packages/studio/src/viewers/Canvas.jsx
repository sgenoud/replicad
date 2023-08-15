import React, { Suspense } from "react";
import { Canvas as ThreeCanvas } from "@react-three/fiber";
import styled from "styled-components";
import LoadingScreen from "../components/LoadingScreen.jsx";

const StyledCanvas = styled(ThreeCanvas)`
  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
`;

export default function Canvas({ children, ...props }) {
  const dpr = Math.min(window.devicePixelRatio, 2);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <StyledCanvas dpr={dpr} frameloop="demand" {...props}>
        {children}
      </StyledCanvas>
    </Suspense>
  );
}
