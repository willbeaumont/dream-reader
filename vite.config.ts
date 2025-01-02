import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@aws-amplify")) {
              return "aws-amplify";
            }
            if (id.includes("react")) {
              return "react-vendor";
            }
          }
        },
      },
    },
  },
});
