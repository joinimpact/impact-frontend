import { IAppReduxState } from 'shared/types/app';
import * as NS from '../namespace';
import { IMessage } from 'shared/types/models/notify';

function getFeatureState(state: IAppReduxState): NS.IReduxState {
	return state.notifyService;
}

export function selectMessages(state: IAppReduxState): IMessage[] {
	return getFeatureState(state).data.stack;
}
