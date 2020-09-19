import * as NS from '../../namespace';
import { IEvent } from 'shared/types/models/events';
import { IOrganizationsResponseItem } from 'shared/types/responses/npo';

export function setUploadOrganizationLogoProgress(progress: number | null): NS.ISetUploadOrganizationLogoProgress {
	return { payload: progress, type: 'NPO:SET_UPLOAD_ORGANIZATION_LOGO_PROGRESS' };
}

export function requestDeleteOpportunity(opportunityId: string): NS.IRequestDeleteOpportunity {
	return { payload: opportunityId, type: 'NPO:REQUEST_DELETE_OPPORTUNITY' };
}

export function resetRequestDeleteOpportunity(): NS.IResetRequestDeleteOpportunity {
	return { type: 'NPO:RESET_REQUEST_DELETE_OPPORTUNITY' };
}

export function requestInviteVolunteers(opportunityId: string): NS.IRequestInviteVolunteers {
	return { payload: opportunityId, type: 'NPO:REQUEST_INVITE_VOLUNTEERS' };
}

export function resetRequestInviteVolunteers(): NS.IResetRequestInviteVolunteers {
	return { type: 'NPO:RESET_REQUEST_INVITE_VOLUNTEERS' };
}

export function requestEditEvent(event: IEvent): NS.IRequestEditEvent {
	return { payload: event, type: 'NPO:REQUEST_EDIT_EVENT' };
}

export function resetEventResponses(): NS.IResetEventResponses {
	return { type: 'NPO:RESET_EVENT_RESPONSES' };
}

export function chatSubscribe(): NS.IChatSubscribe {
	return { type: 'NPO:SUBSCRIBE' };
}

export function chatUnsubscribe(): NS.IChatUnsubscribe {
	return { type: 'NPO:UNSUBSCRIBE' };
}

export function resetCreateNewOrganizationResponse(): NS.IResetCreateNewOrganizationResponse {
	return { type: 'NPO:RESET_CREATE_NEW_ORGANIZATION_RESPONSE' };
}

export function setCurrentEditableOrganization(
	organization: IOrganizationsResponseItem,
): NS.ISetCurrentEditableOrganization {
	return { payload: organization, type: 'NPO:SET_CURRENT_EDITABLE_ORGANIZATION' };
}

export function resetCurrentEditableOrganization(): NS.IResetCurrentEditableOrganization {
	return { type: 'NPO:RESET_CURRENT_EDITABLE_ORGANIZATION' };
}

export function updateEditableOrganizationLogo(logo: string): NS.IUpdateEditableOrganizationLogo {
	return { payload: logo, type: 'NPO:UPDATE_EDITABLE_ORGANIZATION_LOGO' };
}

export function editCurrentOrganization(): NS.IEditCurrentOrganization {
	return { type: 'NPO:EDIT_CURRENT_ORGANIZATION' };
}
