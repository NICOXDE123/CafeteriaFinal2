// frontend/src/cafeteria.did.js
export const idlFactory = ({ IDL }) => {
    const Item = IDL.Record({
      'id': IDL.Nat,
      'nombre': IDL.Text,
      'precio': IDL.Nat,
      'cantidad': IDL.Nat,
    });
    return IDL.Service({
      'agregarPedido':   IDL.Func([IDL.Text, IDL.Nat, IDL.Nat], [IDL.Nat], []),
      'limpiarPedidos':  IDL.Func([], [IDL.Bool], []),
      'listarPedidos':   IDL.Func([], [IDL.Vec(Item)], ['query']),
    });
  };
  export const init = ({ IDL }) => { return []; };
  