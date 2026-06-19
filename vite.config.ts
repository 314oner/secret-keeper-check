// vite.config.ts

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/env-crypto-deploy-check/",
  plugins: [react()],
  server: {
    proxy: {
      "/nestApi": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
