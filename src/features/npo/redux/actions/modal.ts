import * as NS from '../../namespace';

export function resetDeletedOpportunityConfirmation(): NS.IResetDeletedOpportunityConfirmation {
  return { type: 'NPO:RESET_DELETE_OPPORTUNITY_CONFIRMATION' };
}

export function requestCreateNewEvent(): NS.ICreateNewEventRequest {
  return { type: 'NPO:CREATE_EVENT_REQUEST' };
}

export function resetRequestCreateNewEvent(): NS.IResetEditEventRequest {
  return { type: 'NPO:RESET_EDIT_EVENT_REQUEST' };
}

export function showInviteTeamMembersModal(): NS.IShowInviteTeamMembers {
  return { type: 'NPO:SHOW_INVITE_TEAM_MEMBERS' };
}

export function resetInviteTeamMembersModal(): NS.IResetInviteTeamMembers {
  return { type: 'NPO:RESET_INVITE_TEAM_MEMBERS' };
}
