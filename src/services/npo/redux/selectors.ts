import { IAppReduxState } from 'shared/types/app';
import * as NS from '../namespace';
import { IOrganization } from 'shared/types/models/organization';
import { createSelector } from 'reselect';

function getFeatureState(state: IAppReduxState): NS.IReduxState {
  return state.npoService;
}

export function selectCurrentOrganization(state: IAppReduxState): IOrganization | null {
  return getFeatureState(state).data.currentOrganization;
}

export const selectCurrentOrganizationId = createSelector(
  selectCurrentOrganization,
  (org: IOrganization | null) => {
    return org ? org.id : null;
  },
);
