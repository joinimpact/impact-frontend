import { Entry } from './entry';

export function loadEntry(): Promise<Entry> {
	return import(/* webpackChunkName: "topBar" */ './entry').then((feature) => feature.entry);
}
