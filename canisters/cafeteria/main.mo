import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";

actor cafeteria {
  // Tipo para un ítem de pedido: id, nombre, cantidad, precio (en centavos)
  public type Item = {
    id: Nat;
    nombre: Text;
    cantidad: Nat;
    precio: Nat;
  };

  // Almacenamiento en memoria: HashMap de id a Item
  let pedidos = HashMap.HashMap<Nat, Item>(0, Nat.equal, Nat.hash);
  var nextId: Nat = 1;

  // Agrega un pedido y retorna su id
  public func agregarPedido(
    nombre: Text,
    cantidad: Nat,
    precio: Nat
  ) : async Nat {
    let id = nextId;
    nextId += 1;
    let item : Item = { id; nombre; cantidad; precio };
    pedidos.put(id, item);
    Debug.print("Pedido agregado: " # Text.fromNat(id));
    return id;
  };

  // Listar todos los pedidos
  public query func listarPedidos() : async [Item] {
    let it = pedidos.entries();
    let itemsIter = Iter.map(it, func(entry) { entry.1 });
    return Iter.toArray(itemsIter);
  };

  // Limpiar todos los pedidos (elimina cada clave)
  public func limpiarPedidos() : async Bool {
    let keys = Iter.toArray(pedidos.keys());
    for (key in keys) {
      ignore pedidos.remove(key);
    };
    Debug.print("Pedidos limpiados");
    return true;
  };
};