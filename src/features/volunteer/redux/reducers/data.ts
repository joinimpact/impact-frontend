import * as NS from '../../namespace';
import initial from '../initial';
import { IOpportunityResponse } from 'shared/types/responses/npo';

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
    case 'VOLUNTEER:BROWSE_OPPORTUNITIES_WITH_FILTER_SUCCESS':
      return {
        ...state,
        filteredOpportunities: action.payload,
      };
    case 'VOLUNTEER:BROWSE_OPPORTUNITIES_SUCCESS':
      let inUserAreaOpportunities: IOpportunityResponse[] = [];
      const inUserInterestsOpportunities: { [key in string]: IOpportunityResponse[] } = {};
      action.payload.sections.map(item => {
        switch (item.name) {
          case 'in_your_area':
            inUserAreaOpportunities = item.opportunities;
            break;
          default:
            inUserInterestsOpportunities[item.tag] = item.opportunities;
        }
      });
      return {
        ...state,
        inUserAreaOpportunities,
        inUserInterestsOpportunities,
      };
  }
  return state;
}

export default dataReducer;
