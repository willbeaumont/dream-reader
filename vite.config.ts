import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1000 },
  esbuild: {
    supported: {
      "top-level-await": true,
    },
  },
});
