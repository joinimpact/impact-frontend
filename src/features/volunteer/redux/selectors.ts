import { IAppReduxState } from 'shared/types/app';

import * as NS from '../namespace';
import { ICommunication } from 'shared/types/redux';
import { IOpportunityResponse } from 'shared/types/responses/npo';

function getFeatureState(state: IAppReduxState): NS.IReduxState {
  return state.volunteer;
}

export function selectCommunication(
  state: IAppReduxState,
  action: keyof NS.IReduxState['communications'],
): ICommunication {
  return getFeatureState(state).communications[action];
}

export function selectUiState(state: IAppReduxState, key: keyof NS.IReduxState['ui']) {
  return getFeatureState(state).ui[key];
}

export function selectUploadProgress(state: IAppReduxState): number | null {
  return getFeatureState(state).data.uploadLogoProgress;
}

export function selectCurrentOpportunity(state: IAppReduxState): IOpportunityResponse | null {
  return getFeatureState(state).data.currentOpportunity;
}

export function selectApplyOpportunityId(state: IAppReduxState): string | null {
  return getFeatureState(state).data.applyOpportunityId;
}
