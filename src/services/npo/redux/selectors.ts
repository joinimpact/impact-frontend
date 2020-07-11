import { IAppReduxState } from 'shared/types/app';
import * as NS from '../namespace';
import { createSelector } from 'reselect';
import { IOrganizationsResponseItem } from 'shared/types/responses/npo';

function getFeatureState(state: IAppReduxState): NS.IReduxState {
  return state.npoService;
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
