import { IAppReduxState } from 'shared/types/app';

import * as NS from '../namespace';
import { ICommunication } from 'shared/types/redux';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import {
  IBrowseRecommendedOpportunitiesResponse,
  IConversationResponseItem,
  IEventUserResponse,
} from 'shared/types/responses/volunteer';
import { IEvent } from 'shared/types/models/events';
import { IOpportunitiesResponseHash } from 'shared/types/models/opportunity';
import { IConversationMessageResponseItem, IConversationResponse } from 'shared/types/responses/chat';

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

export function selectInUserAreaOpportunities(state: IAppReduxState): IOpportunityResponse[] {
  return getFeatureState(state).data.inUserAreaOpportunities;
}

export function selectInUserInterestsOpportunities(state: IAppReduxState): NS.TUserInterestsOpportunities {
  return getFeatureState(state).data.inUserInterestsOpportunities;
}

export function selectFilteredOpportunities(state: IAppReduxState): IOpportunityResponse[] {
  return getFeatureState(state).data.filteredOpportunities;
}

export function selectRecommendedOpportunities(state: IAppReduxState): IBrowseRecommendedOpportunitiesResponse | null {
  return getFeatureState(state).data.currentRecommendOpportunities;
}

export function selectCurrentEnrolledOpportunities(state: IAppReduxState): IOpportunityResponse[] {
  return getFeatureState(state).data.currentEnrolledOpportunities;
}

export function selectCurrentEnrolledOpportunitiesHash(state: IAppReduxState): IOpportunitiesResponseHash {
  return getFeatureState(state).data.currentEnrolledOpportunitiesHash;
}

export function selectUserEvents(state: IAppReduxState): IEvent[] {
  return getFeatureState(state).data.userEvents;
}

export function selectMyResponseToEvent(state: IAppReduxState): IEventUserResponse | null {
  return getFeatureState(state).data.myResponseToEvent;
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
