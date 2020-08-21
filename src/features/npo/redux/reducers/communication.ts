import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { makeCommunicationReducer } from 'shared/redux/communication';
import initial from '../initial';

export default combineReducers<NS.IReduxState['communications']>({
  createOrganization: makeCommunicationReducer<
    NS.ICreateOrganization,
    NS.ICreateOrganizationSuccess,
    NS.ICreateOrganizationFailed
    >(
      'NPO:CREATE_ORGANIZATION',
      'NPO:CREATE_ORGANIZATION_SUCCESS',
      'NPO:CREATE_ORGANIZATION_FAILED',
    initial.communications.createOrganization,
  ),
  updateOrganization: makeCommunicationReducer<
    NS.IUpdateOrganization,
    NS.IUpdateOrganizationSuccess,
    NS.IUpdateOrganizationFailed
    >(
    'NPO:UPDATE_ORGANIZATION',
    'NPO:UPDATE_ORGANIZATION_SUCCESS',
    'NPO:UPDATE_ORGANIZATION_FAILED',
    initial.communications.updateOrganization,
  ),
  uploadOrgLogo: makeCommunicationReducer<
    NS.IUploadOrgLogo,
    NS.IUploadOrgLogoSuccess,
    NS.IUploadOrgLogoFailed
    >(
      'NPO:UPLOAD_ORG_LOGO',
      'NPO:UPLOAD_ORG_LOGO_SUCCESS',
      'NPO:UPLOAD_ORG_LOGO_FAILED',
    initial.communications.uploadOrgLogo,
  ),
  uploadEditableOrgLogo: makeCommunicationReducer<
    NS.IUploadEditableOrgLogo,
    NS.IUploadEditableOrgLogoSuccess,
    NS.IUploadEditableOrgLogoFailed
    >(
      'NPO:UPLOAD_EDITABLE_ORG_LOGO',
      'NPO:UPLOAD_EDITABLE_ORG_LOGO_SUCCESS',
      'NPO:UPLOAD_EDITABLE_ORG_LOGO_FAILED',
    initial.communications.uploadEditableOrgLogo,
  ),
  saveOrganizationTags: makeCommunicationReducer<
    NS.ISaveOrganizationTags,
    NS.ISaveOrganizationTagsSuccess,
    NS.ISaveOrganizationTagsFailed
    >(
      'NPO:SAVE_ORGANIZATION_TAGS',
      'NPO:SAVE_ORGANIZATION_TAGS_SUCCESS',
      'NPO:SAVE_ORGANIZATION_TAGS_FAILED',
    initial.communications.saveOrganizationTags,
  ),
  saveEditableOrganizationTags: makeCommunicationReducer<
    NS.ISaveEditableOrganizationTags,
    NS.ISaveEditableOrganizationTagsSuccess,
    NS.ISaveEditableOrganizationTagsFailed
    >(
    'NPO:SAVE_EDITABLE_ORGANIZATION_TAGS',
    'NPO:SAVE_EDITABLE_ORGANIZATION_TAGS_SUCCESS',
    'NPO:SAVE_EDITABLE_ORGANIZATION_TAGS_FAILED',
    initial.communications.saveEditableOrganizationTags,
  ),
  saveOrganizationMembers: makeCommunicationReducer<
    NS.ISaveOrganizationMembers,
    NS.ISaveOrganizationMembersSuccess,
    NS.ISaveOrganizationMembersFailed
    >(
      'NPO:SAVE_ORGANIZATION_MEMBERS',
      'NPO:SAVE_ORGANIZATION_MEMBERS_SUCCESS',
      'NPO:SAVE_ORGANIZATION_MEMBERS_FAILED',
    initial.communications.saveOrganizationMembers,
  ),
  saveEditableOrganizationMembers: makeCommunicationReducer<
    NS.ISaveEditableOrganizationMembers,
    NS.ISaveEditableOrganizationMembersSuccess,
    NS.ISaveEditableOrganizationMembersFailed
    >(
    'NPO:SAVE_EDITABLE_ORGANIZATION_MEMBERS',
    'NPO:SAVE_EDITABLE_ORGANIZATION_MEMBERS_SUCCESS',
    'NPO:SAVE_EDITABLE_ORGANIZATION_MEMBERS_FAILED',
    initial.communications.saveEditableOrganizationMembers,
  ),
  loadOrganizationTags: makeCommunicationReducer<
    NS.ILoadOrganizationTags,
    NS.ILoadOrganizationTagsSuccess,
    NS.ILoadOrganizationTagsFailed
    >(
      'NPO:LOAD_ORGANIZATION_TAGS',
      'NPO:LOAD_ORGANIZATION_TAGS_SUCCESS',
      'NPO:LOAD_ORGANIZATION_TAGS_FAILED',
    initial.communications.loadOrganizationTags,
  ),
  updateOpportunity: makeCommunicationReducer<
    NS.IUpdateOpportunity,
    NS.IUpdateOpportunitySuccess,
    NS.IUpdateOpportunityFailed
    >(
      'NPO:UPDATE_OPPORTUNITY',
      'NPO:UPDATE_OPPORTUNITY_SUCCESS',
      'NPO:UPDATE_OPPORTUNITY_FAILED',
    initial.communications.updateOpportunity,
  ),
  requestNewOpportunityId: makeCommunicationReducer<
    NS.IRequestNewOpportunityId,
    NS.IRequestNewOpportunityIdSuccess,
    NS.IRequestNewOpportunityIdFailed
    >(
      'NPO:REQUEST_NEW_OPPORTUNITY_ID',
      'NPO:REQUEST_NEW_OPPORTUNITY_ID_SUCCESS',
      'NPO:REQUEST_NEW_OPPORTUNITY_ID_FAILED',
    initial.communications.requestNewOpportunityId,
  ),
  uploadOpportunityLogo: makeCommunicationReducer<
    NS.IUploadOpportunityLogo,
    NS.IUploadOpportunityLogoSuccess,
    NS.IUploadOpportunityLogoFailed
    >(
      'NPO:UPLOAD_OPPORTUNITY_LOGO',
      'NPO:UPLOAD_OPPORTUNITY_LOGO_SUCCESS',
      'NPO:UPLOAD_OPPORTUNITY_LOGO_FAILED',
    initial.communications.uploadOpportunityLogo,
  ),
  loadOpportunities: makeCommunicationReducer<
    NS.ILoadOpportunities,
    NS.ILoadOpportunitiesSuccess,
    NS.ILoadOpportunitiesFailed
    >(
      'NPO:LOAD_OPPORTUNITIES',
      'NPO:LOAD_OPPORTUNITIES_SUCCESS',
      'NPO:LOAD_OPPORTUNITIES_FAILED',
    initial.communications.loadOpportunities,
  ),
  loadSingleOpportunity: makeCommunicationReducer<
    NS.ILoadSingleOpportunity,
    NS.ILoadSingleOpportunitySuccess,
    NS.ILoadSingleOpportunityFailed
    >(
    'NPO:LOAD_SINGLE_OPPORTUNITY',
    'NPO:LOAD_SINGLE_OPPORTUNITY_SUCCESS',
    'NPO:LOAD_SINGLE_OPPORTUNITY_FAILED',
    initial.communications.loadSingleOpportunity,
  ),
  deleteOpportunity: makeCommunicationReducer<
    NS.IDeleteOpportunity,
    NS.IDeleteOpportunitySuccess,
    NS.IDeleteOpportunityFailed
    >(
      'NPO:DELETE_OPPORTUNITY',
      'NPO:DELETE_OPPORTUNITY_SUCCESS',
      'NPO:DELETE_OPPORTUNITY_FAILED',
    initial.communications.deleteOpportunity,
  ),
  publicOpportunity: makeCommunicationReducer<
    NS.IPublishOpportunity,
    NS.IPublishOpportunitySuccess,
    NS.IPublishOpportunityFailed
    >(
      'NPO:PUBLISH_OPPORTUNITY',
      'NPO:PUBLISH_OPPORTUNITY_SUCCESS',
      'NPO:PUBLISH_OPPORTUNITY_FAILED',
    initial.communications.publicOpportunity,
  ),
  unpublishOpportunity: makeCommunicationReducer<
    NS.IUnpublishOpportunity,
    NS.IUnpublishOpportunitySuccess,
    NS.IUnpublishOpportunityFailed
    >(
    'NPO:UNPUBLISH_OPPORTUNITY',
    'NPO:UNPUBLISH_OPPORTUNITY_SUCCESS',
    'NPO:UNPUBLISH_OPPORTUNITY_FAILED',
    initial.communications.unpublishOpportunity,
  ),
  loadOpportunityVolunteers: makeCommunicationReducer<
    NS.ILoadOpportunityVolunteers,
    NS.ILoadOpportunityVolunteersSuccess,
    NS.ILoadOpportunityVolunteersFailed
    >(
      'NPO:LOAD_OPPORTUNITY_VOLUNTEERS',
      'NPO:LOAD_OPPORTUNITY_VOLUNTEERS_SUCCESS',
      'NPO:LOAD_OPPORTUNITY_VOLUNTEERS_FAILED',
    initial.communications.loadOpportunityVolunteers,
  ),
  acceptInvitation: makeCommunicationReducer<
    NS.IAcceptInvitation,
    NS.IAcceptInvitationSuccess,
    NS.IAcceptInvitationFailed
    >(
      'NPO:ACCEPT_INVITATION',
      'NPO:ACCEPT_INVITATION_SUCCESS',
      'NPO:ACCEPT_INVITATION_FAILED',
    initial.communications.acceptInvitation,
  ),
  declineInvitation: makeCommunicationReducer<
    NS.IDeclineInvitation,
    NS.IDeclineInvitationSuccess,
    NS.IDeclineInvitationFailed
    >(
      'NPO:DECLINE_INVITATION',
      'NPO:DECLINE_INVITATION_SUCCESS',
      'NPO:DECLINE_INVITATION_FAILED',
    initial.communications.declineInvitation,
  ),
  editEvent: makeCommunicationReducer<
    NS.IEditEvent,
    NS.IEditEventSuccess,
    NS.IEditEventFailed,
    NS.IEditEventReset
    >(
    'NPO:EDIT_EVENT',
    'NPO:EDIT_EVENT_SUCCESS',
    'NPO:EDIT_EVENT_FAILED',
    initial.communications.editEvent,
    'NPO:EDIT_EVENT_RESET',
  ),
  loadOpportunitiesWithEvents: makeCommunicationReducer<
    NS.ILoadOpportunitiesWithEvents,
    NS.ILoadOpportunitiesWithEventsSuccess,
    NS.ILoadOpportunitiesWithEventsFailed
    >(
      'NPO:LOAD_OPPORTUNITIES_WITH_EVENTS',
      'NPO:LOAD_OPPORTUNITIES_WITH_EVENTS_SUCCESS',
      'NPO:LOAD_OPPORTUNITIES_WITH_EVENTS_FAILED',
    initial.communications.loadOpportunitiesWithEvents,
  ),
  deleteEvent: makeCommunicationReducer<
    NS.IDeleteEvent,
    NS.IDeleteEventSuccess,
    NS.IDeleteEventFailed
    >(
      'NPO:DELETE_EVENT',
      'NPO:DELETE_EVENT_SUCCESS',
      'NPO:DELETE_EVENT_FAILED',
    initial.communications.deleteEvent,
  ),
  loadEventResponses: makeCommunicationReducer<
    NS.ILoadEventResponses,
    NS.ILoadEventResponsesSuccess,
    NS.ILoadEventResponsesFailed
    >(
      'NPO:LOAD_EVENT_RESPONSES',
      'NPO:LOAD_EVENT_RESPONSES_SUCCESS',
      'NPO:LOAD_EVENT_RESPONSES_FAILED',
    initial.communications.loadEventResponses,
  ),
  loadConversations: makeCommunicationReducer<
    NS.ILoadConversations,
    NS.ILoadConversationsSuccess,
    NS.ILoadConversationsFailed
    >(
    'NPO:LOAD_CONVERSATIONS',
    'NPO:LOAD_CONVERSATIONS_SUCCESS',
    'NPO:LOAD_CONVERSATIONS_FAILED',
    initial.communications.loadConversations,
  ),
  loadConversation: makeCommunicationReducer<
    NS.ILoadConversation,
    NS.ILoadConversationSuccess,
    NS.ILoadConversationFailed
    >(
    'NPO:LOAD_CONVERSATION',
    'NPO:LOAD_CONVERSATION_SUCCESS',
    'NPO:LOAD_CONVERSATION_FAILED',
    initial.communications.loadConversation,
  ),
  sendMessage: makeCommunicationReducer<
    NS.ISendMessage,
    NS.ISendMessageSuccess,
    NS.ISendMessageFailed
    >(
    'NPO:SEND_MESSAGE',
    'NPO:SEND_MESSAGE_SUCCESS',
    'NPO:SEND_MESSAGE_FAILED',
    initial.communications.sendMessage,
  ),
  setCurrentConversation: makeCommunicationReducer<
    NS.ISetCurrentConversation,
    NS.ISetCurrentConversationSuccess,
    NS.ISetCurrentConversationFailed
    >(
    'NPO:SET_CURRENT_CONVERSATION',
    'NPO:SET_CURRENT_CONVERSATION_SUCCESS',
    'NPO:SET_CURRENT_CONVERSATION_FAILED',
    initial.communications.setCurrentConversation,
  ),
  fetchChatHistory: makeCommunicationReducer<
    NS.IFetchChatHistory,
    NS.IFetchChatHistorySuccess,
    NS.IFetchChatHistoryFailed
    >(
    'NPO:FETCH_HISTORY',
    'NPO:FETCH_HISTORY_SUCCESS',
    'NPO:FETCH_HISTORY_FAILED',
    initial.communications.fetchChatHistory,
  ),
  chatStatePrepare: makeCommunicationReducer<
    NS.IChatStatePrepare,
    NS.IChatStatePrepareSuccess,
    NS.IChatStatePrepareFailed
    >(
      'NPO:CHAT_STATE_PREPARE',
      'NPO:CHAT_STATE_PREPARE_SUCCESS',
      'NPO:CHAT_STATE_PREPARE_FAILED',
    initial.communications.chatStatePrepare,
  ),
  acceptConversationInvite: makeCommunicationReducer<
    NS.IAcceptConversationInvite,
    NS.IAcceptConversationInviteSuccess,
    NS.IAcceptConversationInviteFailed
    >(
      'NPO:ACCEPT_CONVERSATION_INVITE',
      'NPO:ACCEPT_CONVERSATION_INVITE_SUCCESS',
      'NPO:ACCEPT_CONVERSATION_INVITE_FAILED',
    initial.communications.acceptConversationInvite,
  ),
  declineConversationInvite: makeCommunicationReducer<
    NS.IDeclineConversationInvite,
    NS.IDeclineConversationInviteSuccess,
    NS.IDeclineConversationInviteFailed
    >(
      'NPO:DECLINE_CONVERSATION_INVITE',
      'NPO:DECLINE_CONVERSATION_INVITE_SUCCESS',
      'NPO:DECLINE_CONVERSATION_INVITE_FAILED',
    initial.communications.declineConversationInvite,
  ),
  acceptHours: makeCommunicationReducer<
    NS.IAcceptHours,
    NS.IAcceptHoursSuccess,
    NS.IAcceptHoursFailed
    >(
      'NPO:ACCEPT_HOURS',
      'NPO:ACCEPT_HOURS_SUCCESS',
      'NPO:ACCEPT_HOURS_FAILED',
    initial.communications.acceptHours,
  ),
  declineHours: makeCommunicationReducer<
    NS.IDeclineHours,
    NS.IDeclineHoursSuccess,
    NS.IDeclineHoursFailed
    >(
      'NPO:DECLINE_HOURS',
      'NPO:DECLINE_HOURS_SUCCESS',
      'NPO:DECLINE_HOURS_FAILED',
    initial.communications.declineHours,
  ),
});
