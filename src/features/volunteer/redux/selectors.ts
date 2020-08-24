import { IAppReduxState } from 'shared/types/app';

import * as NS from '../namespace';
import { ICommunication } from 'shared/types/redux';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import {
  IBrowseRecommendedOpportunitiesResponse,
  IEventUserResponse,
} from 'shared/types/responses/volunteer';
import { IEvent } from 'shared/types/models/events';
import { IOpportunitiesResponseHash } from 'shared/types/models/opportunity';
import { IRequestHoursProps } from '../namespace';

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

export function selectRequestHours(state: IAppReduxState): IRequestHoursProps | null {
  return getFeatureState(state).data.hoursRequest;
}
