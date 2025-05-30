// frontend/src/actors.js
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as cafeteria_idl } from './cafeteria.did.js';
import canisterIds from './canister_ids.json';

const network     = import.meta.env.DEV ? 'local' : 'ic';
const cafeteriaId = canisterIds.cafeteria[network];

// En local usamos la replica en 8000
const agent = new HttpAgent({ host: 'http://127.0.0.1:8000' });
if (network === 'local') {
  agent.fetchRootKey();
}

export const cafeteria = Actor.createActor(cafeteria_idl, {
  agent,
  canisterId: cafeteriaId,
});
