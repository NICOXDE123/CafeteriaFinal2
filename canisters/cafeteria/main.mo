// canisters/cafeteria/main.mo

import Debug "mo:base/Debug";
import Nat   "mo:base/Nat";
import Text  "mo:base/Text";
import Array "mo:base/Array";

actor Cafeteria {
  // Tipo de un pedido
  public type Item = {
    id      : Nat;
    nombre  : Text;
    cantidad: Nat;
    precio  : Nat;
  };

  // Lista en memoria de pedidos
  var pedidos : [Item] = [];
  var nextId  : Nat     = 1;

  // Agrega un pedido y devuelve su id
  public func agregarPedido(
    nombre  : Text,
    cantidad: Nat,
    precio  : Nat
  ) : async Nat {
    let id   = nextId;
    nextId  += 1;
    let itm  : Item = { id; nombre; cantidad; precio };
    // concatenamos el array existente con uno nuevo de un solo elemento
    pedidos := Array.append(pedidos, [ itm ]);
    Debug.print("Pedido agregado: " # Nat.toText(id));
    return id;
  };

  // Devuelve todos los pedidos
  public query func listarPedidos() : async [Item] {
    return pedidos;
  };

  // Elimina todos los pedidos
  public func limpiarPedidos() : async Bool {
    pedidos := [];            // reasignamos lista vacía
    Debug.print("Pedidos limpiados");
    return true;
  };
};
