import React from "react";

export default function Download({ size = "1em", text }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      height={size}
      width={size}
      viewBox={`0 0 100 ${text ? "150": "100"}`}
    >
      <path d="M49.9 74.1c-.5 0-.9-.2-1.3-.5L30.3 55.2c-.7-.7-.7-1.8 0-2.6.7-.7 1.8-.7 2.6 0l15.3 15.3V2.8c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8v64.9l15.3-15c.7-.7 1.8-.7 2.5 0s.7 1.8 0 2.5L51.2 73.6c-.3.3-.8.5-1.3.5z" />
      <path d="M50 99C26.6 99 7.6 80 7.6 56.6c0-18.5 11.8-34.7 29.4-40.3.9-.3 2 .2 2.3 1.2.3.9-.2 2-1.2 2.3C22 25 11.2 39.8 11.2 56.7 11.3 78 28.6 95.4 50 95.4S88.7 78 88.7 56.7c0-16.9-10.8-31.7-26.9-36.9-.9-.3-1.5-1.3-1.2-2.3.3-.9 1.3-1.5 2.3-1.2 17.6 5.6 29.4 21.9 29.4 40.3C92.4 80 73.4 99 50 99z" />
      {text && <text x="0" y="150" fontSize="40" fontWeight="bold" textLength="100">
        {text}
      </text>}
    </svg>
  );
};
