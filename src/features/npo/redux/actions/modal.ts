import * as NS from '../../namespace';

export function resetDeletedOpportunityConfirmation(): NS.IResetDeletedOpportunityConfirmation {
  return { type: 'NPO:RESET_DELETE_OPPORTUNITY_CONFIRMATION' };
}

export function requestCreateNewEvent(): NS.ICreateNewEventRequest {
  return { type: 'NPO:CREATE_NEW_EVENT_REQUEST' };
}

export function resetRequestCreateNewEvent(): NS.IResetCreateNewEventRequest {
  return { type: 'NPO:RESET_CREATE_NEW_EVENT_REQUEST' };
}
