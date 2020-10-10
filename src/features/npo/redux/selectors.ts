import { IAppReduxState } from 'shared/types/app';

import * as NS from '../namespace';
import { ICommunication } from 'shared/types/redux';
import {
	IEventResponsesResponse,
	IOrganizationsResponseItem,
	IVolunteersResponse,
	IOrganizationVolunteersResponse,
} from 'shared/types/responses/npo';
import { IOpportunityWithEvents } from 'shared/types/responses/shared';
import { IEvent } from 'shared/types/models/events';
import { IOrganizationMembersResponse } from 'shared/types/responses/volunteer';

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

export function selectCurrentEditableOrganization(state: IAppReduxState): IOrganizationsResponseItem | null {
	return getFeatureState(state).data.editableOrganization;
}

export function selectOrganizationMembers(state: IAppReduxState): IOrganizationMembersResponse | null {
	return getFeatureState(state).data.organizationMembers;
}

export const selectOrganizationVolunteers = (state: IAppReduxState): IOrganizationVolunteersResponse | null =>
	getFeatureState(state).data.organizationVolunteers;
