import * as NS from '../../namespace';
import makeCommunicationActionCreators from 'shared/redux/communication/makeCommunicationActionCreators';

export const {
  execute: saveVolunteerPersonalInfo,
  completed: saveVolunteerPersonalInfoComplete,
  failed: saveVolunteerPersonalInfoFailed,
} = makeCommunicationActionCreators<
  NS.ISaveVolunteerPersonalInfo,
  NS.ISaveVolunteerPersonalInfoSuccess,
  NS.ISaveVolunteerPersonalInfoFailed
  >(
  'VOLUNTEER:SAVE_VOLUNTEER_PERSONAL_INFO',
  'VOLUNTEER:SAVE_VOLUNTEER_PERSONAL_INFO_SUCCESS',
  'VOLUNTEER:SAVE_VOLUNTEER_PERSONAL_INFO_FAILED',
);

export const {
  execute: uploadVolunteerLogo,
  completed: uploadVolunteerLogoComplete,
  failed: uploadVolunteerLogoFailed,
} = makeCommunicationActionCreators<
  NS.IUploadVolunteerLogo,
  NS.IUploadVolunteerLogoSuccess,
  NS.IUploadVolunteerLogoFailed
  >(
  'VOLUNTEER:UPLOAD_VOLUNTEER_LOGO',
  'VOLUNTEER:UPLOAD_VOLUNTEER_LOGO_SUCCESS',
  'VOLUNTEER:UPLOAD_VOLUNTEER_LOGO_FAILED',
);

export const {
  execute: saveVolunteerAreasOfInterest,
  completed: saveVolunteerAreasOfInterestComplete,
  failed: saveVolunteerAreasOfInterestFailed,
} = makeCommunicationActionCreators<
  NS.ISaveVolunteerAreaOfInterest,
  NS.ISaveVolunteerAreaOfInterestSuccess,
  NS.ISaveVolunteerAreaOfInterestFailed
  >(
  'VOLUNTEER:SAVE_VOLUNTEER_AREA_OF_INTEREST',
  'VOLUNTEER:SAVE_VOLUNTEER_AREA_OF_INTEREST_SUCCESS',
  'VOLUNTEER:SAVE_VOLUNTEER_AREA_OF_INTEREST_FAILED',
);

export const {
  execute: loadSingleOpportunity,
  completed: loadSingleOpportunityComplete,
  failed: loadSingleOpportunityFailed,
} = makeCommunicationActionCreators<
  NS.ILoadSingleOpportunity,
  NS.ILoadSingleOpportunitySuccess,
  NS.ILoadSingleOpportunityFailed
  >(
    'VOLUNTEER:LOAD_SINGLE_OPPORTUNITY',
    'VOLUNTEER:LOAD_SINGLE_OPPORTUNITY_SUCCESS',
    'VOLUNTEER:LOAD_SINGLE_OPPORTUNITY_FAILED',
);

export const {
  execute: applyForOpportunity,
  completed: applyForOpportunityComplete,
  failed: applyForOpportunityFailed,
} = makeCommunicationActionCreators<
  NS.IApplyForOpportunity,
  NS.IApplyForOpportunitySuccess,
  NS.IApplyForOpportunityFailed
  >(
    'VOLUNTEER:APPLY_FOR_OPPORTUNITY',
    'VOLUNTEER:APPLY_FOR_OPPORTUNITY_SUCCESS',
    'VOLUNTEER:APPLY_FOR_OPPORTUNITY_FAILED',
);

export const {
  execute: browseOpportunities,
  completed: browseOpportunitiesComplete,
  failed: browseOpportunitiesFailed
} = makeCommunicationActionCreators<
  NS.IBrowseOpportunities,
  NS.IBrowseOpportunitiesSuccess,
  NS.IBrowseOpportunitiesFailed
  >(
    'VOLUNTEER:BROWSE_OPPORTUNITIES',
    'VOLUNTEER:BROWSE_OPPORTUNITIES_SUCCESS',
    'VOLUNTEER:BROWSE_OPPORTUNITIES_FAILED',
);

export const {
  execute: loadEnrolledOpportunities,
  completed: loadEnrolledOpportunitiesComplete,
  failed: loadEnrolledOpportunitiesFailed,
} = makeCommunicationActionCreators<
  NS.ILoadEnrolledOpportunities,
  NS.ILoadEnrolledOpportunitiesSuccess,
  NS.ILoadEnrolledOpportunitiesFailed
  >(
    'VOLUNTEER:LOAD_ENROLLED_OPPORTUNITIES',
    'VOLUNTEER:LOAD_ENROLLED_OPPORTUNITIES_SUCCESS',
    'VOLUNTEER:LOAD_ENROLLED_OPPORTUNITIES_FAILED',
);

export const {
  execute: browseOpportunitiesWithFilter,
  completed: browseOpportunitiesWithFilterComplete,
  failed: browseOpportunitiesWithFilterFailed
} = makeCommunicationActionCreators<
  NS.IBrowseOpportunitiesWithFilter,
  NS.IBrowseOpportunitiesWithFilterSuccess,
  NS.IBrowseOpportunitiesWithFilterFailed
  >(
    'VOLUNTEER:BROWSE_OPPORTUNITIES_WITH_FILTER',
    'VOLUNTEER:BROWSE_OPPORTUNITIES_WITH_FILTER_SUCCESS',
    'VOLUNTEER:BROWSE_OPPORTUNITIES_WITH_FILTER_FAILED'
);

export const {
  execute: loadUserEvents,
  completed: loadUserEventsComplete,
  failed: loadUserEventsFailed,
} = makeCommunicationActionCreators<
  NS.ILoadUserEvents,
  NS.ILoadUserEventsSuccess,
  NS.ILoadUserEventsFailed
  >(
    'VOLUNTEER:LOAD_USER_EVENTS',
    'VOLUNTEER:LOAD_USER_EVENTS_SUCCESS',
    'VOLUNTEER:LOAD_USER_EVENTS_FAILED',
);

export const {
  execute: attendEvent,
  completed: attendEventComplete,
  failed: attendEventFailed,
} = makeCommunicationActionCreators<
  NS.IAttendEvent,
  NS.IAttendEventSuccess,
  NS.IAttendEventFailed
  >(
    'VOLUNTEER:ATTEND_EVENT',
    'VOLUNTEER:ATTEND_EVENT_SUCCESS',
    'VOLUNTEER:ATTEND_EVENT_FAILED',
);

export const {
  execute: declineEvent,
  completed: declineEventComplete,
  failed: declineEventFailed,
} = makeCommunicationActionCreators<
  NS.IDeclineEvent,
  NS.IDeclineEventSuccess,
  NS.IDeclineEventFailed
  >(
    'VOLUNTEER:DECLINE_EVENT',
    'VOLUNTEER:DECLINE_EVENT_SUCCESS',
    'VOLUNTEER:DECLINE_EVENT_FAILED',
);

export const {
  execute: getMyResponseToEvent,
  completed: getMyResponseToEventComplete,
  failed: getMyResponseToEventFailed,
} = makeCommunicationActionCreators<
  NS.IGetMyResponseToEvent,
  NS.IGetMyResponseToEventSuccess,
  NS.IGetMyResponseToEventFailed
  >(
    'VOLUNTEER:GET_MY_RESPONSE_TO_EVENT',
    'VOLUNTEER:GET_MY_RESPONSE_TO_EVENT_SUCCESS',
    'VOLUNTEER:GET_MY_RESPONSE_TO_EVENT_FAILED',
);

export const {
  execute: loadConversations,
  completed: loadConversationsComplete,
  failed: loadConversationsFailed,
} = makeCommunicationActionCreators<
  NS.ILoadConversations,
  NS.ILoadConversationsSuccess,
  NS.ILoadConversationsFailed
  >(
    'VOLUNTEER:LOAD_CONVERSATIONS',
    'VOLUNTEER:LOAD_CONVERSATIONS_SUCCESS',
    'VOLUNTEER:LOAD_CONVERSATIONS_FAILED',
);

export const {
  execute: loadConversation,
  completed: loadConversationComplete,
  failed: loadConversationFailed,
} = makeCommunicationActionCreators<
  NS.ILoadConversation,
  NS.ILoadConversationSuccess,
  NS.ILoadConversationFailed
  >(
    'VOLUNTEER:LOAD_CONVERSATION',
    'VOLUNTEER:LOAD_CONVERSATION_SUCCESS',
    'VOLUNTEER:LOAD_CONVERSATION_FAILED'
);

export const {
  execute: sendMessage,
  completed: sendMessageComplete,
  failed: sendMessageFailed
} = makeCommunicationActionCreators<
  NS.ISendMessage,
  NS.ISendMessageSuccess,
  NS.ISendMessageFailed
  >(
    'VOLUNTEER:SEND_MESSAGE',
    'VOLUNTEER:SEND_MESSAGE_SUCCESS',
    'VOLUNTEER:SEND_MESSAGE_FAILED'
);

export const {
  execute: setCurrentConversation,
  completed: setCurrentConversationComplete,
  failed: setCurrentConversationFailed
} = makeCommunicationActionCreators<
  NS.ISetCurrentConversation,
  NS.ISetCurrentConversationSuccess,
  NS.ISetCurrentConversationFailed
  >(
    'VOLUNTEER:SET_CURRENT_CONVERSATION',
    'VOLUNTEER:SET_CURRENT_CONVERSATION_SUCCESS',
    'VOLUNTEER:SET_CURRENT_CONVERSATION_FAILED',
);

export const {
  execute: fetchChatHistory,
  completed: fetchChatHistoryComplete,
  failed: fetchChatHistoryFailed
} = makeCommunicationActionCreators<
  NS.IFetchChatHistory,
  NS.IFetchChatHistorySuccess,
  NS.IFetchChatHistoryFailed
  >(
    'VOLUNTEERS:FETCH_HISTORY',
    'VOLUNTEERS:FETCH_HISTORY_SUCCESS',
    'VOLUNTEERS:FETCH_HISTORY_FAILED',
);
