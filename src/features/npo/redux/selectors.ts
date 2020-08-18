import { IAppReduxState } from 'shared/types/app';

import * as NS from '../namespace';
import { ICommunication } from 'shared/types/redux';
import { IEventResponsesResponse, IOpportunityResponse, IVolunteersResponse } from 'shared/types/responses/npo';
import { createSelector } from 'reselect';
import { IOpportunityWithEvents } from 'shared/types/responses/shared';
import { IEvent } from 'shared/types/models/events';
import { IConversationMessageResponseItem, IConversationResponse } from 'shared/types/responses/chat';
import { IConversationResponseItem } from 'shared/types/responses/volunteer';

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

export function selectCurrentEventResponses(state: IAppReduxState): IEventResponsesResponse[] {
  return getFeatureState(state).data.currentEventResponses;
}

export function selectConversations(state: IAppReduxState): IConversationResponseItem[] {
  return getFeatureState(state).data.conversations;
}

export function selectCurrentConversation(state: IAppReduxState): IConversationResponseItem | null {
  return getFeatureState(state).data.currentConversation;
}

export function selectCurrentConversationMessages(state: IAppReduxState): IConversationMessageResponseItem[] {
  return getFeatureState(state).data.currentConversationMessages;
}

export function selectConversationItem(state: IAppReduxState): IConversationResponse | null {
  return getFeatureState(state).data.conversationItem;
}

export function selectTotalMessagesCount(state: IAppReduxState): number {
  return getFeatureState(state).data.totalMessagesCount;
}

export function selectCurrentConversationOpportunity(state: IAppReduxState): IOpportunityResponse | null | undefined {
  return getFeatureState(state).data.currentConversationOpportunity;
}
