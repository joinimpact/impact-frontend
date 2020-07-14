import * as NS from '../../namespace';
import initial from '../initial';
import { emptyOpportunity } from 'shared/defaults/npo';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'NPO:SET_UPLOAD_ORGANIZATION_LOGO_PROGRESS':
      return {
        ...state,
        uploadLogoProgress: action.payload,
      };
    case 'NPO:REQUEST_NEW_OPPORTUNITY_ID_SUCCESS':
      return {
        ...state,
        currentOpportunity: {
          ...emptyOpportunity,
          id: action.payload.opportunityId,
        },
      };
    case 'NPO:UPLOAD_OPPORTUNITY_LOGO_SUCCESS':
      return {
        ...state,
        currentOpportunity: {
          ...(state.currentOpportunity || emptyOpportunity),
          profilePicture: action.payload,
        }
      };
    case 'NPO:SET_UPLOAD_OPPORTUNITY_LOGO_PROGRESS':
      return {
        ...state,
        uploadOpportunityLogoProgress: action.payload,
      };
    case 'NPO:LOAD_OPPORTUNITIES_SUCCESS':
      return {
        ...state,
        organizationOpportunities: action.payload,
      };
    case 'NPO:LOAD_SINGLE_OPPORTUNITY_SUCCESS':
      return {
        ...state,
        currentOpportunity: action.payload,
      };
    case 'NPO:UPDATE_OPPORTUNITY_SUCCESS':
      return {
        ...state,
        currentOpportunity: {
          ...action.payload,
          profilePicture:
            state.currentOpportunity ? state.currentOpportunity.profilePicture : action.payload.profilePicture,
        }
      };
    case 'NPO:REQUEST_DELETE_OPPORTUNITY':
      return {
        ...state,
        deleteOpportunityId: action.payload,
      };
    case 'NPO:RESET_REQUEST_DELETE_OPPORTUNITY':
      return {
        ...state,
        deleteOpportunityId: null,
      };
    case 'NPO:DELETE_OPPORTUNITY_SUCCESS':
      return {
        ...state,
        deleteOpportunityId: null,
      };
  }
  return state;
}

export default dataReducer;
