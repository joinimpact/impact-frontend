import { IAppReduxState } from 'shared/types/app';

import * as NS from '../namespace';
import { ICommunication } from 'shared/types/redux';
import { IOpportunityResponse, IVolunteersResponse } from 'shared/types/responses/npo';
import { createSelector } from 'reselect';
import { IOpportunityWithEvents } from 'shared/types/responses/shared';
import { IEvent } from 'shared/types/models/events';

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

export function selectOrganizationOpportunities(state: IAppReduxState): IOpportunityResponse[] {
  return getFeatureState(state).data.organizationOpportunities;
}

export function selectRequestDeleteOpportunity(state: IAppReduxState): string | null {
  return getFeatureState(state).data.deleteOpportunityId;
}

export function selectModal(state: IAppReduxState, modal: keyof NS.IReduxState['modal']): boolean {
  return getFeatureState(state).modal[modal];
}

export function selectCurrentOpportunityVolunteers(state: IAppReduxState): IVolunteersResponse | null {
  return getFeatureState(state).data.currentOrganizationVolunteer;
}

export function selectInviteVolunteersOpportunityId(state: IAppReduxState): string | null {
  return getFeatureState(state).data.inviteVolunteersOpportunityId;
}

export function selectOpportunitiesWithEvents(state: IAppReduxState): IOpportunityWithEvents[] {
  return getFeatureState(state).data.opportunitiesWithEvents;
}

export function selectEditEvent(state: IAppReduxState): IEvent | null {
  return getFeatureState(state).data.currentEditEvent;
}
