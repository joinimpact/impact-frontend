import { IAppReduxState } from 'shared/types/app';
import * as NS from '../namespace';
import { IOrganization } from 'shared/types/models/organization';

function getFeatureState(state: IAppReduxState): NS.IReduxState {
  return state.npoService;
}

export function selectCurrentOrganization(state: IAppReduxState): IOrganization | null {
  return getFeatureState(state).data.currentOrganization;
}
