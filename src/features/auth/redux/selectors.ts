import { IAppReduxState } from 'shared/types/app';

import * as NS from '../namespace';
import { ICommunication } from 'shared/types/redux';

function getFeatureState(state: IAppReduxState): NS.IReduxState {
	return state.auth;
}

export function selectCommunication(
	state: IAppReduxState,
	action: keyof NS.IReduxState['communications'],
): ICommunication {
	return getFeatureState(state).communications[action];
}
