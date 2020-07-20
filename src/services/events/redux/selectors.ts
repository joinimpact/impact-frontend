import * as NS from '../namespace';
import { IAppReduxState } from 'shared/types/app';
import { ICommunication } from 'shared/types/redux';

function getFeatureState(state: IAppReduxState): NS.IReduxState {
  return state.events;
}

export function selectCommunication(
  state: IAppReduxState,
  key: keyof NS.IReduxState['communications'],
): ICommunication {
  return getFeatureState(state).communications[key];
}
