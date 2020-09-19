import * as NS from '../namespace';
import { IAppReduxState, ILayoutType } from 'shared/types/app';

function getFeatureState(state: IAppReduxState): NS.IReduxState {
	return state.ui;
}

export function selectLayoutType(state: IAppReduxState): ILayoutType {
	return getFeatureState(state).data.layoutType;
}
