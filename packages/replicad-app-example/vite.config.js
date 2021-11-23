import { defineConfig } from "vite";
import reactPlugin from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactPlugin()],
  build: {
    outDir: "build",
  },
  server: {
    port: 4444,
  },
});
