import { Entry } from './entry';

export function loadEntry(): Promise<Entry> {
	return import(/* webpackChunkName: "notify" */ './entry').then((feature) => feature.entry);
}
