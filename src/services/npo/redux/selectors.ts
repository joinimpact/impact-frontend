import { IAppReduxState } from 'shared/types/app';
import * as NS from '../namespace';
import { createSelector } from 'reselect';
import { IOpportunityResponse, IOrganizationsResponseItem } from 'shared/types/responses/npo';
import { ICommunication } from 'shared/types/redux';

function getFeatureState(state: IAppReduxState): NS.IReduxState {
  return state.npoService;
}

export function selectCommunication(state: IAppReduxState, key: keyof NS.IReduxState['communications']): ICommunication {
  return getFeatureState(state).communications[key];
}

export function selectCurrentOrganization(state: IAppReduxState): IOrganizationsResponseItem | null {
  return getFeatureState(state).data.currentOrganization;
}

export const selectCurrentOrganizationId = createSelector(
  selectCurrentOrganization,
  (org: IOrganizationsResponseItem | null) => {
    return org ? org.id : null;
  },
);

export function selectUserOrganizations(state: IAppReduxState): NS.IReduxState['data']['organizations'] {
  return getFeatureState(state).data.organizations;
}

export function selectServiceIsReady(state: IAppReduxState): boolean {
  return getFeatureState(state).data.isServiceReady;
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

export function selectOrganizationOpportunities(state: IAppReduxState): IOpportunityResponse[] {
  return getFeatureState(state).data.organizationOpportunities;
}
