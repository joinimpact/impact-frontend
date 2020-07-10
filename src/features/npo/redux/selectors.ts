import { IAppReduxState } from 'shared/types/app';

import * as NS from '../namespace';
import { ICommunication } from 'shared/types/redux';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import { createSelector } from 'reselect';

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

export function selectCurrentOpportunity(state: IAppReduxState): IOpportunityResponse | null {
  return getFeatureState(state).data.currentOpportunity;
}

export const selectCurrentOpportunityId = createSelector(
  selectCurrentOpportunity,
  (opportunity: IOpportunityResponse | null): string | null => {
    return opportunity ? opportunity.id : null;
  }
);

export function selectUploadOpportunityLogloProgress(state: IAppReduxState): number | null {
  return getFeatureState(state).data.uploadOpportunityLogoProgress;
}
