import { Entry } from './entry';

export function loadEntry(): Promise<Entry> {
  return import(/* webpackChunkName: "npo" */'./entry').then(feature => feature.entry);
}
