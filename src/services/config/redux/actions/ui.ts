import * as NS from '../../namespace';

export function changeTitle(payload?: string): NS.IChangeTitle {
	return { payload, type: 'CONFIG:CHANGE_TITLE' };
}
