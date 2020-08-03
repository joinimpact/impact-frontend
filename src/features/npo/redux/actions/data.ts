import * as NS from '../../namespace';
import { IEvent } from 'shared/types/models/events';

export function setUploadOrganizationLogoProgress(progress: number | null): NS.ISetUploadOrganizationLogoProgress {
  return { payload: progress, type: 'NPO:SET_UPLOAD_ORGANIZATION_LOGO_PROGRESS' };
}

export function setUploadOpportunityLogoProgress(progress: number | null): NS.ISetUploadOpportunityLogoProgress {
  return { payload: progress, type: 'NPO:SET_UPLOAD_OPPORTUNITY_LOGO_PROGRESS' };
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
