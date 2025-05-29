import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import dfxJson from "../dfx.json";

const isDev = process.env.DFX_NETWORK !== "ic";

let canisterIds = {};
try {
  const localFile = path.resolve(__dirname, "../.dfx/local/canister_ids.json");
  const icFile = path.resolve(__dirname, "../canister_ids.json");
  const file = isDev ? localFile : icFile;
  canisterIds = JSON.parse(fs.readFileSync(file, "utf8"));
} catch {
  console.warn("⚠️  Ejecuta `dfx deploy` antes de levantar el dev server");
}

const DFX_PORT = dfxJson.networks.local.bind.split(":")[1];

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "canisters/cafeteria": path.resolve(
        __dirname,
        "../.dfx",
        isDev ? "local" : "ic",
        "canisters",
        "cafeteria",
        "index.js"
      ),
    },
  },
  server: {
    fs: { allow: [".."] },
    proxy: {
      "/api": {
        target: `http://127.0.0.1:${DFX_PORT}`,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, "/api"),
      },
    },
  },
  define: {
    "process.env.CAFETERIA_CANISTER_ID": JSON.stringify(
      isDev ? canisterIds.cafeteria.local : canisterIds.cafeteria.ic
    ),
  },
});
