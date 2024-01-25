// vite.config.ts
import { unstable_vitePlugin as remix } from "file:///C:/Users/gaurav/Desktop/Projects/tanstack.com/node_modules/.pnpm/@remix-run+dev@2.4.1_@remix-run+serve@2.4.1_typescript@5.2.2_vite@5.0.11/node_modules/@remix-run/dev/dist/index.js";
import { defineConfig } from "file:///C:/Users/gaurav/Desktop/Projects/tanstack.com/node_modules/.pnpm/vite@5.0.11/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///C:/Users/gaurav/Desktop/Projects/tanstack.com/node_modules/.pnpm/vite-tsconfig-paths@4.2.3_typescript@5.2.2_vite@5.0.11/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/.*"],
      serverModuleFormat: "esm"
    }),
    tsconfigPaths()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxnYXVyYXZcXFxcRGVza3RvcFxcXFxQcm9qZWN0c1xcXFx0YW5zdGFjay5jb21cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGdhdXJhdlxcXFxEZXNrdG9wXFxcXFByb2plY3RzXFxcXHRhbnN0YWNrLmNvbVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvZ2F1cmF2L0Rlc2t0b3AvUHJvamVjdHMvdGFuc3RhY2suY29tL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgdW5zdGFibGVfdml0ZVBsdWdpbiBhcyByZW1peCB9IGZyb20gXCJAcmVtaXgtcnVuL2RldlwiO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZW1peCh7XHJcbiAgICAgIGlnbm9yZWRSb3V0ZUZpbGVzOiBbXCIqKi8uKlwiXSxcclxuICAgICAgc2VydmVyTW9kdWxlRm9ybWF0OiAnZXNtJyxcclxuICAgIH0pLFxyXG4gICAgdHNjb25maWdQYXRocygpXHJcbiAgXSxcclxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFxVSxTQUFTLHVCQUF1QixhQUFhO0FBQ2xYLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sbUJBQW1CO0FBRTFCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxNQUNKLG1CQUFtQixDQUFDLE9BQU87QUFBQSxNQUMzQixvQkFBb0I7QUFBQSxJQUN0QixDQUFDO0FBQUEsSUFDRCxjQUFjO0FBQUEsRUFDaEI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
