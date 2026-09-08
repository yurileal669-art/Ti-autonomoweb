import {seed} from './data.js';
const KEY='ti_autonomo_db_v1';
export function clone(value){return JSON.parse(JSON.stringify(value));}
export function loadDB(){
  const raw=localStorage.getItem(KEY);
  if(!raw){const fresh=clone(seed);saveDB(fresh);return fresh;}
  try{return JSON.parse(raw);}catch{const fresh=clone(seed);saveDB(fresh);return fresh;}
}
export function saveDB(db){localStorage.setItem(KEY,JSON.stringify(db));}
export function resetDB(){const fresh=clone(seed);saveDB(fresh);return fresh;}
export function replaceDB(next){saveDB(next);return next;}
export function uid(prefix){return `${prefix}-${Date.now().toString().slice(-6)}${Math.floor(Math.random()*90+10)}`;}
