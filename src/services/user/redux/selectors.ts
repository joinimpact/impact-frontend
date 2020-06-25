import { IAppReduxState } from 'shared/types/app';
import * as NS from '../namespace';
import { ICommunication } from 'shared/types/redux';

function getFeatureState(state: IAppReduxState): NS.IReduxState {
  return state.userService;
}

export function selectCommunication(state: IAppReduxState, key: keyof NS.IReduxState['communication']): ICommunication {
  return getFeatureState(state).communication[key];
}

export function selectIsAuthorized(state: IAppReduxState): boolean {
  return getFeatureState(state).data.isAuthorized;
}

export function selectIsAuthRequested(state: IAppReduxState): boolean {
  return getFeatureState(state).data.isAuthRequested;
}

export function selectLogoutRequested(state: IAppReduxState): boolean {
  return getFeatureState(state).data.logoutRequested;
}
