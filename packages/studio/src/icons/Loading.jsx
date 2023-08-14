import React from "react";
export default function LoadingAnimation({ size = "1em" }) {
  return (
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
          id="lstrokeBox"
          attributeType="XML"
          begin="lrectBox.end"
        />
      </rect>
      <rect x="27" y="27" fill="currentColor" width="46" height="50">
        <animate
          attributeName="height"
          dur="1.3s"
          attributeType="XML"
          from="50"
          to="0"
          id="lrectBox"
          fill="freeze"
          begin="0s;lstrokeBox.end"
        />
      </rect>
    </svg>
  );
}
