import * as NS from '../../namespace';
import initial from '../initial';

function uiReducer(state: NS.IReduxState['ui'] = initial.ui,  action: NS.Action): NS.IReduxState['ui'] {
  switch (action.type) {
    case 'VOLUNTEER:SHOW_OPPORTUNITY_MODAL':
      return {
        ...state,
        shareOpportunityVisible: true,
      };
    case 'VOLUNTEER:CLOSE_SHARE_OPPORTUNITY_MODAL':
      return {
        ...state,
        shareOpportunityVisible: false,
      };
    case 'VOLUNTEER:REQUEST_DELETE_ACCOUNT':
      return {
        ...state,
        deleteAccountVisible: true,
      };
    case 'VOLUNTEER:RESET_DELETE_ACCOUNT_REQUEST':
      return {
        ...state,
        deleteAccountVisible: false,
      };
  }

  return state;
}

export default uiReducer;
