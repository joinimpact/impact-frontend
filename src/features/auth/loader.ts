import { Entry } from './entry';

export function loadEntry(): Promise<Entry> {
  return import(/* webpackChunkName: "auth" */'./entry').then(feature => feature.entry);
}
