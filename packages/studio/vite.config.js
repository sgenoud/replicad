import fs from "node:fs";
import path from "node:path";

import { defineConfig } from "vite";
import reactPlugin from "@vitejs/plugin-react";

import { VitePWA } from "vite-plugin-pwa";

const TRAILING_SOURCEMAP_COMMENT = /\n\/\/# sourceMappingURL=(\S+)[ \t]*\n?$/;

// manifold-3d ships `//# sourceMappingURL=` comments but not the .map files
// themselves: its package.json `files` list covers `lib/*.js` and never
// `lib/*.js.map`. Because we keep it out of optimizeDeps, vite serves those
// files straight from disk and logs a "Failed to load source map" error for
// each one. Returning the code from a `load` hook is what fixes it -- vite
// only extracts sourcemaps for files it reads itself, so a `transform` hook
// would run too late.
const stripMissingSourcemapComments = () => ({
  name: "strip-missing-sourcemap-comments",
  apply: "serve",
  load(id) {
    const file = id.split("?")[0];
    if (!file.includes("/node_modules/manifold-3d/") || !file.endsWith(".js")) {
      return null;
    }

    let code;
    try {
      code = fs.readFileSync(file, "utf-8");
    } catch {
      return null;
    }

    const match = code.match(TRAILING_SOURCEMAP_COMMENT);
    // Leave it alone if the map is actually there.
    if (!match || fs.existsSync(path.resolve(path.dirname(file), match[1]))) {
      return null;
    }

    return { code: code.replace(TRAILING_SOURCEMAP_COMMENT, "\n"), map: null };
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    stripMissingSourcemapComments(),
    reactPlugin(),
    VitePWA({
      manifest: {
        short_name: "Replicad Studio",
        name: "The sandbox for your replicad projects",
        icons: [
          {
            src: "favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "rgb(90, 130, 150)",
        background_color: "#ffffff",
      },
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
        "fonts/*",
        "textures/*",
      ],
      workbox: {
        cacheId: "replicad-studio",
        globPatterns: [
          "assets/**.{js,css,html,jpg,wasm}",
          "*.{svg,png,jpg,ico}",
          "*.html",
          "manifest.webmanifest",
        ],
        maximumFileSizeToCacheInBytes: 2000000000,
      },
    }),
  ],
  optimizeDeps: { exclude: ["replicad", "manifold-3d"] },
  resolve: {
    // npm workspaces may hoist peer dependencies from another application.
    // Hooks and Three.js state require a single runtime instance.
    dedupe: ["react", "react-dom", "three"],
  },
  build: {
    outDir: "dist",
    manifest: true,
    rollupOptions: {
      output: {},
    },
  },
  worker: {
    format: "es",
  },
  server: {
    port: 5555,
  },
});
