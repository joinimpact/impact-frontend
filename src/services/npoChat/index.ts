import { IReduxEntry } from 'shared/types/app';
import { actions, selectors, reducer, getSaga } from './redux';
import * as namespace from './namespace';
import NpoChatContainer from './view/NpoChatContainer';

export { namespace, selectors, actions, NpoChatContainer };

export const reduxEntry: IReduxEntry = {
	reducers: { npoChat: reducer },
	sagas: [getSaga],
};
