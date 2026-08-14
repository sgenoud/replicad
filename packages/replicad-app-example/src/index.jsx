import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// This is here to compensate for a bug in vite
import "replicad-opencascadejs/wasm?url";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://vitejs.dev/guide/api-hmr.html
if (import.meta.hot) {
  import.meta.hot.accept();
}
