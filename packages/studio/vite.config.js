import { defineConfig } from "vite";
import reactPlugin from "@vitejs/plugin-react";

import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
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
  optimizeDeps: { exclude: ["replicad"] },
  build: {
    outDir: "dist",
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("replicad")) {
            return "replicad";
          }
        },
      },
    },
  },
  server: {
    port: 5555,
  },
});
