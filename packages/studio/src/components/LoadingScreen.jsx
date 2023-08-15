import React from "react";
import styled from "styled-components";

const StyledCanvas = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f2f3f4;
  color: var(--color-primary-light);
`;

const LoadingAnimation = ({ size = "1em" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    enableBackground="new 0 0 100 100"
  >
    <rect
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      x="25"
      y="25"
      width="50"
      height="50"
    >
      <animateTransform
        attributeName="transform"
        dur="0.5s"
        from="0 50 50"
        to="180 50 50"
        type="rotate"
        id="strokeBox"
        attributeType="XML"
        begin="rectBox.end"
      />
      <animate
        attributeName="opacity"
        dur="1s"
        from="0"
        to="1"
        id="stokeBoxOpacity"
        fill="freeze"
        begin="0s;"
      />
    </rect>
    <rect x="27" y="27" fill="currentColor" width="46" height="50">
      <animate
        attributeName="opacity"
        dur="1s"
        from="0"
        to="1"
        id="rectBoxOpacity"
        fill="freeze"
        begin="0s;"
      />
      <animate
        attributeName="height"
        dur="1.3s"
        attributeType="XML"
        from="50"
        to="0"
        id="rectBox"
        fill="freeze"
        begin="rectBoxOpacity.end;strokeBox.end"
      />
    </rect>
  </svg>
);

export default function LoadingScreen() {
  return (
    <StyledCanvas>
      <LoadingAnimation size="20vh" />
    </StyledCanvas>
  );
}
