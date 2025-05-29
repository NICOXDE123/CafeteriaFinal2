import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Connect2ICProvider } from "@connect2ic/react";
import { createAgent } from "@connect2ic/core";

import "./index.css";         // Vite CSS base
import "./assets/styles.css"; // Tus estilos globales

import App from "./App.jsx";
import canisterIds from "../.dfx/local/canister_ids.json";

const network = import.meta.env.DEV ? "local" : "ic";
const canisters = {
  cafeteria: canisterIds.cafeteria[network]
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Connect2ICProvider createAgent={createAgent} canisters={canisters}>
        <App />
      </Connect2ICProvider>
    </BrowserRouter>
  </StrictMode>
);
