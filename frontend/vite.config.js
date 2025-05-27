import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";
import fs from "fs";
import dfxJson from "../dfx.json";

const isDev = process.env.DFX_NETWORK !== "ic";

// Carga los IDs de canister
let canisterIds = {};
try {
  const file = isDev
    ? ".dfx/local/canister_ids.json"
    : "./canister_ids.json";
  canisterIds = JSON.parse(fs.readFileSync(file).toString());
} catch {
  console.warn("⚠️  Ejecuta `dfx deploy` antes de levantar el dev server");
}

// Alias para importar tu canister
const aliases = {
  "canisters/cafeteria": path.resolve(
    __dirname,
    "../.dfx",
    isDev ? "local" : "ic",
    "canisters",
    "cafeteria",
    "index.js"
  )
};

// Puerto en el que corre tu dfx local
const DFX_PORT = dfxJson.networks.local.bind.split(":")[1];

export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: aliases
  },
  server: {
    fs: { allow: [".."] },
    proxy: {
      "/api": {
        target: `http://127.0.0.1:${DFX_PORT}`,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, "/api")
      }
    }
  },
  define: {
    "process.env.CAFETERIA_CANISTER_ID": JSON.stringify(
      isDev ? canisterIds.cafeteria.local : canisterIds.cafeteria.ic
    )
  }
});
