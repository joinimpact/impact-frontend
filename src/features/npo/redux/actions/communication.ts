import * as NS from '../../namespace';
import makeCommunicationActionCreators from 'shared/redux/communication/makeCommunicationActionCreators';

export const {
  execute: createNewOrganization,
  completed: createNewOrganizationComplete,
  failed: createNewOrganizationFailed
} = makeCommunicationActionCreators<
  NS.ICreateOrganization,
  NS.ICreateOrganizationSuccess,
  NS.ICreateOrganizationFailed
  >(
  'NPO:CREATE_ORGANIZATION',
  'NPO:CREATE_ORGANIZATION_SUCCESS',
  'NPO:CREATE_ORGANIZATION_FAILED',
);

export const {
  execute: uploadOrgLogo,
  completed: uploadOrgLogoComplete,
  failed: uploadOrgLogoFailed,
} = makeCommunicationActionCreators<
  NS.IUploadOrgLogo,
  NS.IUploadOrgLogoSuccess,
  NS.IUploadOrgLogoFailed
  >(
  'NPO:UPLOAD_ORG_LOGO',
  'NPO:UPLOAD_ORG_LOGO_SUCCESS',
  'NPO:UPLOAD_ORG_LOGO_FAILED',
);

export const {
  execute: saveOrganizationTags,
  completed: saveOrganizationTagsComplete,
  failed: saveOrganizationTagsFailed,
} = makeCommunicationActionCreators<
  NS.ISaveOrganizationTags,
  NS.ISaveOrganizationTagsSuccess,
  NS.ISaveOrganizationTagsFailed
  >(
  'NPO:SAVE_ORGANIZATION_TAGS',
  'NPO:SAVE_ORGANIZATION_TAGS_SUCCESS',
  'NPO:SAVE_ORGANIZATION_TAGS_FAILED',
);

export const {
  execute: saveOrganizationMembers,
  completed: saveOrganizationMembersComplete,
  failed: saveOrganizationMembersFailed,
} = makeCommunicationActionCreators<
  NS.ISaveOrganizationMembers,
  NS.ISaveOrganizationMembersSuccess,
  NS.ISaveOrganizationMembersFailed
  >(
  'NPO:SAVE_ORGANIZATION_MEMBERS',
  'NPO:SAVE_ORGANIZATION_MEMBERS_SUCCESS',
  'NPO:SAVE_ORGANIZATION_MEMBERS_FAILED',
);

export const {
  execute: loadOrganizationTags,
  completed: loadOrganizationTagsComplete,
  failed: loadOrganizationTagsFailed,
} = makeCommunicationActionCreators<
  NS.ILoadOrganizationTags,
  NS.ILoadOrganizationTagsSuccess,
  NS.ILoadOrganizationTagsFailed
  >(
    'NPO:LOAD_ORGANIZATION_TAGS',
    'NPO:LOAD_ORGANIZATION_TAGS_SUCCESS',
    'NPO:LOAD_ORGANIZATION_TAGS_FAILED',
);

export const {
  execute: updateOpportunity,
  completed: updateOpportunityComplete,
  failed: updateOpportunityFailed,
} = makeCommunicationActionCreators<
  NS.IUpdateOpportunity,
  NS.IUpdateOpportunitySuccess,
  NS.IUpdateOpportunityFailed
  >(
    'NPO:UPDATE_OPPORTUNITY',
    'NPO:UPDATE_OPPORTUNITY_SUCCESS',
    'NPO:UPDATE_OPPORTUNITY_FAILED',
);

export const {
  execute: requestNewOpportunityId,
  completed: requestNewOpportunityIdComplete,
  failed: requestNewOpportunityIdFailed,
} = makeCommunicationActionCreators<
  NS.IRequestNewOpportunityId,
  NS.IRequestNewOpportunityIdSuccess,
  NS.IRequestNewOpportunityIdFailed
  >(
  'NPO:REQUEST_NEW_OPPORTUNITY_ID',
  'NPO:REQUEST_NEW_OPPORTUNITY_ID_SUCCESS',
  'NPO:REQUEST_NEW_OPPORTUNITY_ID_FAILED',
);

export const {
  execute: uploadOpportunityLogo,
  completed: uploadOpportunityLogoComplete,
  failed: uploadOpportunityLogoFailed,
} = makeCommunicationActionCreators<
  NS.IUploadOpportunityLogo,
  NS.IUploadOpportunityLogoSuccess,
  NS.IUploadOpportunityLogoFailed
  >(
    'NPO:UPLOAD_OPPORTUNITY_LOGO',
    'NPO:UPLOAD_OPPORTUNITY_LOGO_SUCCESS',
    'NPO:UPLOAD_OPPORTUNITY_LOGO_FAILED',
);

export const {
  execute: loadOpportunities,
  completed: loadOpportunitiesCompleted,
  failed: loadOpportunitiesFailed
} = makeCommunicationActionCreators<
  NS.ILoadOpportunities,
  NS.ILoadOpportunitiesSuccess,
  NS.ILoadOpportunitiesFailed
  >(
  'NPO:LOAD_OPPORTUNITIES',
  'NPO:LOAD_OPPORTUNITIES_SUCCESS',
  'NPO:LOAD_OPPORTUNITIES_FAILED',
);

export const {
  execute: loadSingleOpportunity,
  completed: loadSingleOpportunityCompleted,
  failed: loadSingleOpportunityFailed,
} = makeCommunicationActionCreators<
  NS.ILoadSingleOpportunity,
  NS.ILoadSingleOpportunitySuccess,
  NS.ILoadSingleOpportunityFailed
  >(
    'NPO:LOAD_SINGLE_OPPORTUNITY',
    'NPO:LOAD_SINGLE_OPPORTUNITY_SUCCESS',
    'NPO:LOAD_SINGLE_OPPORTUNITY_FAILED',
);

export const {
  execute: deleteOpportunity,
  completed: deleteOpportunityComplete,
  failed: deleteOpportunityFailed,
} = makeCommunicationActionCreators<
  NS.IDeleteOpportunity,
  NS.IDeleteOpportunitySuccess,
  NS.IDeleteOpportunityFailed
  >(
    'NPO:DELETE_OPPORTUNITY',
    'NPO:DELETE_OPPORTUNITY_SUCCESS',
    'NPO:DELETE_OPPORTUNITY_FAILED',
);

export const {
  execute: publishOpportunity,
  completed: publishOpportunityComplete,
  failed: publishOpportunityFailed
} = makeCommunicationActionCreators<
  NS.IPublishOpportunity,
  NS.IPublishOpportunitySuccess,
  NS.IPublishOpportunityFailed
  >(
    'NPO:PUBLISH_OPPORTUNITY',
    'NPO:PUBLISH_OPPORTUNITY_SUCCESS',
    'NPO:PUBLISH_OPPORTUNITY_FAILED',
);

export const {
  execute: unpublishOpportunity,
  completed: unpublishOpportunityComplete,
  failed: unpublishOpportunityFailed,
} = makeCommunicationActionCreators<
  NS.IUnpublishOpportunity,
  NS.IUnpublishOpportunitySuccess,
  NS.IUnpublishOpportunityFailed
  >(
    'NPO:UNPUBLISH_OPPORTUNITY',
    'NPO:UNPUBLISH_OPPORTUNITY_SUCCESS',
    'NPO:UNPUBLISH_OPPORTUNITY_FAILED',
);

export const {
  execute: loadOpportunityVolunteers,
  completed: loadOpportunityVolunteersComplete,
  failed: loadOpportunityVolunteersFailed
} = makeCommunicationActionCreators<
  NS.ILoadOpportunityVolunteers,
  NS.ILoadOpportunityVolunteersSuccess,
  NS.ILoadOpportunityVolunteersFailed
  >(
    'NPO:LOAD_OPPORTUNITY_VOLUNTEERS',
    'NPO:LOAD_OPPORTUNITY_VOLUNTEERS_SUCCESS',
    'NPO:LOAD_OPPORTUNITY_VOLUNTEERS_FAILED',
);

export const {
  execute: acceptInvitation,
  completed: acceptInvitationComplete,
  failed: acceptInvitationFailed
} = makeCommunicationActionCreators<
  NS.IAcceptInvitation,
  NS.IAcceptInvitationSuccess,
  NS.IAcceptInvitationFailed
  >(
    'NPO:ACCEPT_INVITATION',
    'NPO:ACCEPT_INVITATION_SUCCESS',
    'NPO:ACCEPT_INVITATION_FAILED',
);

export const {
  execute: declineInvitation,
  completed: declineInvitationComplated,
  failed: declineInvitationFailed,
} = makeCommunicationActionCreators<
  NS.IDeclineInvitation,
  NS.IDeclineInvitationSuccess,
  NS.IDeclineInvitationFailed
  >(
    'NPO:DECLINE_INVITATION',
    'NPO:DECLINE_INVITATION_SUCCESS',
    'NPO:DECLINE_INVITATION_FAILED',
);

export const {
  execute: editEvent,
  completed: editEventComplete,
  failed: editEventFailed,
  reset: resetEditEvent,
} = makeCommunicationActionCreators<
  NS.IEditEvent,
  NS.IEditEventSuccess,
  NS.IEditEventFailed,
  NS.IEditEventReset
  >(
    'NPO:EDIT_EVENT',
    'NPO:EDIT_EVENT_SUCCESS',
    'NPO:EDIT_EVENT_FAILED',
  'NPO:EDIT_EVENT_RESET',
);

export const {
  execute: loadOpportunitiesWithEvents,
  completed: loadOpportunitiesWithEventsComplete,
  failed: loadOpportunitiesWithEventsFailed
} = makeCommunicationActionCreators<
  NS.ILoadOpportunitiesWithEvents,
  NS.ILoadOpportunitiesWithEventsSuccess,
  NS.ILoadOpportunitiesWithEventsFailed
  >(
    'NPO:LOAD_OPPORTUNITIES_WITH_EVENTS',
    'NPO:LOAD_OPPORTUNITIES_WITH_EVENTS_SUCCESS',
    'NPO:LOAD_OPPORTUNITIES_WITH_EVENTS_FAILED',
);

export const {
  execute: deleteEvent,
  completed: deleteEventComplete,
  failed: deleteEventFailed
} = makeCommunicationActionCreators<
  NS.IDeleteEvent,
  NS.IDeleteEventSuccess,
  NS.IDeleteEventFailed
  >(
    'NPO:DELETE_EVENT',
    'NPO:DELETE_EVENT_SUCCESS',
    'NPO:DELETE_EVENT_FAILED',
);

export const {
  execute: loadEventResponses,
  completed: loadEventResponsesComplete,
  failed: loadEventResponsesFailed,
} = makeCommunicationActionCreators<
  NS.ILoadEventResponses,
  NS.ILoadEventResponsesSuccess,
  NS.ILoadEventResponsesFailed
  >(
    'NPO:LOAD_EVENT_RESPONSES',
    'NPO:LOAD_EVENT_RESPONSES_SUCCESS',
    'NPO:LOAD_EVENT_RESPONSES_FAILED',
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
  'NPO:LOAD_CONVERSATIONS',
  'NPO:LOAD_CONVERSATIONS_SUCCESS',
  'NPO:LOAD_CONVERSATIONS_FAILED',
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
  'NPO:LOAD_CONVERSATION',
  'NPO:LOAD_CONVERSATION_SUCCESS',
  'NPO:LOAD_CONVERSATION_FAILED'
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
  'NPO:SEND_MESSAGE',
  'NPO:SEND_MESSAGE_SUCCESS',
  'NPO:SEND_MESSAGE_FAILED'
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
  'NPO:SET_CURRENT_CONVERSATION',
  'NPO:SET_CURRENT_CONVERSATION_SUCCESS',
  'NPO:SET_CURRENT_CONVERSATION_FAILED',
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
  'NPO:FETCH_HISTORY',
  'NPO:FETCH_HISTORY_SUCCESS',
  'NPO:FETCH_HISTORY_FAILED',
);

