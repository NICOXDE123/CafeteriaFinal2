import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    // polyfill para que @dfinity/agent encuentre "global"
    global: "globalThis"
  },
});
