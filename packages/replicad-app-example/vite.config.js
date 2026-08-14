import { defineConfig } from "vite";
import reactPlugin from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactPlugin()],
  resolve: {
    // Keep renderer dependencies on the application's runtime instances.
    dedupe: ["react", "react-dom", "three"],
  },
  build: {
    outDir: "build",
  },
  worker: {
    format: "es",
  },
  server: {
    port: 4444,
  },
});
