import * as NS from '../../namespace';
import initial from '../initial';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import { converOpportunitiesArrayToOpportunitiesHash } from 'services/api/converters/opportunity';

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
    case 'VOLUNTEER:LOAD_ENROLLED_OPPORTUNITIES_SUCCESS':
      return {
        ...state,
        currentEnrolledOpportunities: action.payload,
        currentEnrolledOpportunitiesHash: converOpportunitiesArrayToOpportunitiesHash(action.payload),
      };
    case 'VOLUNTEER:LOAD_USER_EVENTS_SUCCESS':
      return {
        ...state,
        userEvents: action.payload,
      };
    case 'VOLUNTEER:GET_MY_RESPONSE_TO_EVENT_SUCCESS':
      return {
        ...state,
        myResponseToEvent: action.payload,
      };
    case 'VOLUNTEER:RESET_MY_RESPONSE_TO_EVENT':
      return {
        ...state,
        myResponseToEvent: null,
      };
    case 'VOLUNTEER:LOAD_CONVERSATIONS_SUCCESS':
      return {
        ...state,
        conversations: action.payload,
      };
    case 'VOLUNTEER:SET_CURRENT_CONVERSATION_MESSAGES':
      return {
        ...state,
        currentConversationMessages: action.payload,
      };
    case 'VOLUNTEER:SET_CURRENT_CONVERSATION':
      return {
        ...state,
        currentConversation: action.payload,
      };
    case 'VOLUNTEER:RESET_CURRENT_CONVERSATION_MESSAGES':
      return {
        ...state,
        currentConversationMessages: [],
      };
    case 'VOLUNTEER:LOAD_CONVERSATION_SUCCESS': {
      return {
        ...state,
        conversationItem: action.payload,
      };
    }
  }
  return state;
}

export default dataReducer;
