import * as NS from '../../namespace';
import initial from '../initial';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'VOLUNTEER:SET_UPLOAD_LOGO_PROGRESS':
      return {
        ...state,
        uploadLogoProgress: action.payload,
      };
    case 'VOLUNTEER:LOAD_SINGLE_OPPORTUNITY_SUCCESS':
      return {
        ...state,
        currentOpportunity: action.payload,
      };
    case 'VOLUNTEER:REQUEST_APPLY_OPPORTUNITY':
      return {
        ...state,
        applyOpportunityId: action.payload,
      };
    case 'VOLUNTEER:RESET_REQUEST_APPLY_OPPORTUNITY':
      return {
        ...state,
        applyOpportunityId: null,
      };
    case 'VOLUNTEER:APPLY_FOR_OPPORTUNITY_SUCCESS':
      return {
        ...state,
        applyOpportunityId: null,
      };
  }
  return state;
}

export default dataReducer;
