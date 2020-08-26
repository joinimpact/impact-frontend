import * as NS from '../../namespace';
import initial from '../initial';

function modalReducer(state: NS.IReduxState['modal'] = initial.modal, action: NS.Action): NS.IReduxState['modal'] {
  switch (action.type) {
    case 'NPO:DELETE_OPPORTUNITY_SUCCESS':
      return {
        ...state,
        showDeleteOpportunityConfirmation: true,
      };
    case 'NPO:RESET_DELETE_OPPORTUNITY_CONFIRMATION':
      return {
        ...state,
        showDeleteOpportunityConfirmation: false,
      };
    case 'NPO:CREATE_EVENT_REQUEST':
      return {
        ...state,
        createNewEvent: true,
      };
    case 'NPO:EDIT_EVENT_SUCCESS':
    case 'NPO:EDIT_EVENT_RESET':
    case 'NPO:RESET_EDIT_EVENT_REQUEST':
      return {
        ...state,
        createNewEvent: false,
      };
    case 'NPO:SHOW_INVITE_TEAM_MEMBERS':
      return {
        ...state,
        inviteTeamMembers: true,
      };
    case 'NPO:SAVE_ORGANIZATION_MEMBERS_SUCCESS':
    case 'NPO:RESET_REQUEST_INVITE_VOLUNTEERS':
      return {
        ...state,
        inviteTeamMembers: false,
      };
  }

  return state;
}

export default modalReducer;
