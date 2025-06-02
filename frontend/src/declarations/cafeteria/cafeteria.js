// ─────────────────────────────────────────────────────────────────────────────
//   frontend/src/declarations/cafeteria.js
// ─────────────────────────────────────────────────────────────────────────────

import { Actor } from "@dfinity/agent";

export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    "agregarPedido": IDL.Func(
      [IDL.Text, IDL.Nat, IDL.Nat],
      [IDL.Nat],
      []
    ),
    "listarPedidos": IDL.Func(
      [], [IDL.Vec(
        IDL.Record({
          "id": IDL.Nat,
          "nombre": IDL.Text,
          "cantidad": IDL.Nat,
          "precio": IDL.Nat,
        })
      )], ["query"]
    ),
    "limpiarPedidos": IDL.Func([], [IDL.Bool], []),
  });
};

// ←←← Reemplaza esta cadena EXACTAMENTE con tu canisterId de `dfx deploy` →→→
export const canisterId = "u6s2n-gx777-77774-qaaba-cai";
//               ↑↑↑ Asegúrate de usar el ID tal cual te lo devolvió DFX.
//     Por ejemplo, si tu terminal dijo “Deployed cafeteria: u6s2n-gx777-77774-qaaba-cai”,
//     pégalo aquí dentro de las comillas.

// Opcional: helper para instanciar actor rápidamente
export const createActor = (options) => {
  return Actor.createActor(idlFactory, {
    ...options,
    canisterId,
  });
};
