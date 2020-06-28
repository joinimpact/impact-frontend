import { Entry } from './entry';

export function loadEntry(): Promise<Entry> {
  return import(/* webpackChunkName: "volunteer" */'./entry').then(feature => feature.entry);
}
