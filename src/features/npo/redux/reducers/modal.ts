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
    case 'NPO:CREATE_NEW_EVENT_REQUEST':
      return {
        ...state,
        createNewEvent: true,
      };
    case 'NPO:CREATE_NEW_EVENT_SUCCESS':
    case 'NPO:RESET_CREATE_NEW_EVENT_REQUEST':
      return {
        ...state,
        createNewEvent: false,
      };
  }

  return state;
}

export default modalReducer;
