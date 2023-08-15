import React from "react";

export default function Focus({ size = "1em" }) {
  return (
    <svg height={size} width={size} viewBox="-3 -3 38 38" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 0a3 3 0 0 0-3 3v8a1 1 0 1 0 2 0V3a1 1 0 0 1 1-1h8a1 1 0 1 0 0-2H3Zm18 0a1 1 0 1 0 0 2h8a1 1 0 0 1 1 1v8a1 1 0 1 0 2 0V3a3 3 0 0 0-3-3h-8ZM2 21a1 1 0 1 0-2 0v8a3 3 0 0 0 3 3h8a1 1 0 1 0 0-2H3a1 1 0 0 1-1-1v-8Zm30 0a1 1 0 1 0-2 0v8a1 1 0 0 1-1 1h-8a1 1 0 1 0 0 2h8a3 3 0 0 0 3-3v-8Zm-16 0a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
        fill="currentColor"
      />
    </svg>
  );
}
