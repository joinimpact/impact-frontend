import { IAppReduxState } from 'shared/types/app';

import * as NS from '../namespace';
import { ICommunication } from 'shared/types/redux';

function getFeatureState(state: IAppReduxState): NS.IReduxState {
  return state.npo;
}

export function selectCommunication(
  state: IAppReduxState,
  action: keyof NS.IReduxState['communications'],
): ICommunication {
  return getFeatureState(state).communications[action];
}

export function selectUploadLogoProgress(state: IAppReduxState): number | null {
  return getFeatureState(state).data.uploadLogoProgress;
}
