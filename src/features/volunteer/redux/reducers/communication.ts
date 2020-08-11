import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { makeCommunicationReducer } from 'shared/redux/communication';
import initial from '../initial';

export default combineReducers<NS.IReduxState['communications']>({
  saveVolunteerPersonalInformation: makeCommunicationReducer<
    NS.ISaveVolunteerPersonalInfo,
    NS.ISaveVolunteerPersonalInfoSuccess,
    NS.ISaveVolunteerPersonalInfoFailed
    >(
      'VOLUNTEER:SAVE_VOLUNTEER_PERSONAL_INFO',
      'VOLUNTEER:SAVE_VOLUNTEER_PERSONAL_INFO_SUCCESS',
      'VOLUNTEER:SAVE_VOLUNTEER_PERSONAL_INFO_FAILED',
    initial.communications.saveVolunteerPersonalInformation,
  ),
  uploadVolunteerLogo: makeCommunicationReducer<
    NS.IUploadVolunteerLogo,
    NS.IUploadVolunteerLogoSuccess,
    NS.IUploadVolunteerLogoFailed
    >(
      'VOLUNTEER:UPLOAD_VOLUNTEER_LOGO',
      'VOLUNTEER:UPLOAD_VOLUNTEER_LOGO_SUCCESS',
      'VOLUNTEER:UPLOAD_VOLUNTEER_LOGO_FAILED',
    initial.communications.uploadVolunteerLogo,
  ),
  saveVolunteerAreasOfInterest: makeCommunicationReducer<
    NS.ISaveVolunteerAreaOfInterest,
    NS.ISaveVolunteerAreaOfInterestSuccess,
    NS.ISaveVolunteerAreaOfInterestFailed
    >(
    'VOLUNTEER:SAVE_VOLUNTEER_AREA_OF_INTEREST',
    'VOLUNTEER:SAVE_VOLUNTEER_AREA_OF_INTEREST_SUCCESS',
    'VOLUNTEER:SAVE_VOLUNTEER_AREA_OF_INTEREST_FAILED',
    initial.communications.saveVolunteerAreasOfInterest,
  ),
  loadSingleOpportunity: makeCommunicationReducer<
    NS.ILoadSingleOpportunity,
    NS.ILoadSingleOpportunitySuccess,
    NS.ILoadSingleOpportunityFailed
    >(
      'VOLUNTEER:LOAD_SINGLE_OPPORTUNITY',
      'VOLUNTEER:LOAD_SINGLE_OPPORTUNITY_SUCCESS',
      'VOLUNTEER:LOAD_SINGLE_OPPORTUNITY_FAILED',
    initial.communications.loadSingleOpportunity,
  ),
  applyForOpportunity: makeCommunicationReducer<
    NS.IApplyForOpportunity,
    NS.IApplyForOpportunitySuccess,
    NS.IApplyForOpportunityFailed
    >(
      'VOLUNTEER:APPLY_FOR_OPPORTUNITY',
      'VOLUNTEER:APPLY_FOR_OPPORTUNITY_SUCCESS',
      'VOLUNTEER:APPLY_FOR_OPPORTUNITY_FAILED',
    initial.communications.applyForOpportunity,
  ),
  browseOpportunities: makeCommunicationReducer<
    NS.IBrowseOpportunities,
    NS.IBrowseOpportunitiesSuccess,
    NS.IBrowseOpportunitiesFailed
    >(
      'VOLUNTEER:BROWSE_OPPORTUNITIES',
      'VOLUNTEER:BROWSE_OPPORTUNITIES_SUCCESS',
      'VOLUNTEER:BROWSE_OPPORTUNITIES_FAILED',
    initial.communications.browseOpportunities,
  ),
  loadUserEnrolledOpportunities: makeCommunicationReducer<
    NS.ILoadEnrolledOpportunities,
    NS.ILoadEnrolledOpportunitiesSuccess,
    NS.ILoadEnrolledOpportunitiesFailed
    >(
      'VOLUNTEER:LOAD_ENROLLED_OPPORTUNITIES',
      'VOLUNTEER:LOAD_ENROLLED_OPPORTUNITIES_SUCCESS',
      'VOLUNTEER:LOAD_ENROLLED_OPPORTUNITIES_FAILED',
    initial.communications.loadUserEnrolledOpportunities,
  ),
  browseOpportunitiesWithFilters: makeCommunicationReducer<
    NS.IBrowseOpportunitiesWithFilter,
    NS.IBrowseOpportunitiesWithFilterSuccess,
    NS.IBrowseOpportunitiesWithFilterFailed
    >(
      'VOLUNTEER:BROWSE_OPPORTUNITIES_WITH_FILTER',
      'VOLUNTEER:BROWSE_OPPORTUNITIES_WITH_FILTER_SUCCESS',
      'VOLUNTEER:BROWSE_OPPORTUNITIES_WITH_FILTER_FAILED',
    initial.communications.browseOpportunitiesWithFilters,
  ),
  loadUserEvents: makeCommunicationReducer<
    NS.ILoadUserEvents,
    NS.ILoadUserEventsSuccess,
    NS.ILoadUserEventsFailed
    >(
      'VOLUNTEER:LOAD_USER_EVENTS',
      'VOLUNTEER:LOAD_USER_EVENTS_SUCCESS',
      'VOLUNTEER:LOAD_USER_EVENTS_FAILED',
    initial.communications.loadUserEvents,
  ),
  attendEvent: makeCommunicationReducer<
    NS.IAttendEvent,
    NS.IAttendEventSuccess,
    NS.IAttendEventFailed
    >(
      'VOLUNTEER:ATTEND_EVENT',
      'VOLUNTEER:ATTEND_EVENT_SUCCESS',
      'VOLUNTEER:ATTEND_EVENT_FAILED',
    initial.communications.attendEvent,
  ),
  declineEvent: makeCommunicationReducer<
    NS.IDeclineEvent,
    NS.IDeclineEventSuccess,
    NS.IDeclineEventFailed
    >(
      'VOLUNTEER:DECLINE_EVENT',
      'VOLUNTEER:DECLINE_EVENT_SUCCESS',
      'VOLUNTEER:DECLINE_EVENT_FAILED',
    initial.communications.declineEvent,
  ),
  getMyEventResponse: makeCommunicationReducer<
    NS.IGetMyResponseToEvent,
    NS.IGetMyResponseToEventSuccess,
    NS.IGetMyResponseToEventFailed
    >(
    'VOLUNTEER:GET_MY_RESPONSE_TO_EVENT',
    'VOLUNTEER:GET_MY_RESPONSE_TO_EVENT_SUCCESS',
    'VOLUNTEER:GET_MY_RESPONSE_TO_EVENT_FAILED',
    initial.communications.getMyEventResponse,
  ),
  loadConversations: makeCommunicationReducer<
    NS.ILoadConversations,
    NS.ILoadConversationsSuccess,
    NS.ILoadConversationsFailed
    >(
      'VOLUNTEER:LOAD_CONVERSATIONS',
      'VOLUNTEER:LOAD_CONVERSATIONS_SUCCESS',
      'VOLUNTEER:LOAD_CONVERSATIONS_FAILED',
    initial.communications.loadConversations,
  ),
  loadConversation: makeCommunicationReducer<
    NS.ILoadConversation,
    NS.ILoadConversationSuccess,
    NS.ILoadConversationFailed
    >(
    'VOLUNTEER:LOAD_CONVERSATION',
    'VOLUNTEER:LOAD_CONVERSATION_SUCCESS',
    'VOLUNTEER:LOAD_CONVERSATION_FAILED',
    initial.communications.loadConversation,
  ),
  sendMessage: makeCommunicationReducer<
    NS.ISendMessage,
    NS.ISendMessageSuccess,
    NS.ISendMessageFailed
    >(
    'VOLUNTEER:SEND_MESSAGE',
    'VOLUNTEER:SEND_MESSAGE_SUCCESS',
    'VOLUNTEER:SEND_MESSAGE_FAILED',
    initial.communications.sendMessage,
  ),
});
