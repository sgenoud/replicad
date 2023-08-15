// vite.config.js
import { resolve } from "path";
import { defineConfig } from "file:///Users/stevegenoud/workbench/replicad/node_modules/.pnpm/vite@4.0.4_@types+node@17.0.45/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/stevegenoud/workbench/replicad/node_modules/.pnpm/vite-plugin-dts@1.7.1_rollup@3.10.1_vite@4.0.4/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/stevegenoud/workbench/replicad/packages/replicad";
var _a;
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "replicad",
      fileName: "replicad",
      formats: ["es", "umd", "cjs"]
    },
    sourcemap: true,
    minify: false
  },
  plugins: [
    ((_a = process.env.NO_TYPES) == null ? void 0 : _a.toLowerCase()) === "true" ? null : dts({
      rollupTypes: true
    })
  ].filter((a) => !!a),
  test: {
    setupFiles: ["./__tests__/setup.ts"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc3RldmVnZW5vdWQvd29ya2JlbmNoL3JlcGxpY2FkL3BhY2thZ2VzL3JlcGxpY2FkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvc3RldmVnZW5vdWQvd29ya2JlbmNoL3JlcGxpY2FkL3BhY2thZ2VzL3JlcGxpY2FkL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zdGV2ZWdlbm91ZC93b3JrYmVuY2gvcmVwbGljYWQvcGFja2FnZXMvcmVwbGljYWQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvaW5kZXgudHNcIiksXG4gICAgICBuYW1lOiBcInJlcGxpY2FkXCIsXG4gICAgICBmaWxlTmFtZTogXCJyZXBsaWNhZFwiLFxuICAgICAgZm9ybWF0czogW1wiZXNcIiwgXCJ1bWRcIiwgXCJjanNcIl0sXG4gICAgfSxcbiAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgbWluaWZ5OiBmYWxzZSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHByb2Nlc3MuZW52Lk5PX1RZUEVTPy50b0xvd2VyQ2FzZSgpID09PSBcInRydWVcIlxuICAgICAgPyBudWxsXG4gICAgICA6IGR0cyh7XG4gICAgICAgICAgcm9sbHVwVHlwZXM6IHRydWUsXG4gICAgICAgIH0pLFxuICBdLmZpbHRlcigoYSkgPT4gISFhKSxcbiAgdGVzdDoge1xuICAgIHNldHVwRmlsZXM6IFtcIi4vX190ZXN0c19fL3NldHVwLnRzXCJdLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVWLFNBQVMsZUFBZTtBQUMvVyxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFGaEIsSUFBTSxtQ0FBbUM7QUFBekM7QUFJQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ3hDLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFNBQVMsQ0FBQyxNQUFNLE9BQU8sS0FBSztBQUFBLElBQzlCO0FBQUEsSUFDQSxXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBUztBQUFBLE1BQ1AsYUFBUSxJQUFJLGFBQVosbUJBQXNCLG1CQUFrQixTQUNwQyxPQUNBLElBQUk7QUFBQSxNQUNGLGFBQWE7QUFBQSxJQUNmLENBQUM7QUFBQSxFQUNQLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFBQSxFQUNuQixNQUFNO0FBQUEsSUFDSixZQUFZLENBQUMsc0JBQXNCO0FBQUEsRUFDckM7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
