import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Item {
  'id' : bigint,
  'nombre' : string,
  'precio' : bigint,
  'cantidad' : bigint,
}
export interface _SERVICE {
  'agregarPedido' : ActorMethod<[string, bigint, bigint], bigint>,
  'limpiarPedidos' : ActorMethod<[], boolean>,
  'listarPedidos' : ActorMethod<[], Array<Item>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
