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
  execute: updateOrganization,
  completed: updateOrganizationComplete,
  failed: updateOrganizationFailed
} = makeCommunicationActionCreators<
  NS.IUpdateOrganization,
  NS.IUpdateOrganizationSuccess,
  NS.IUpdateOrganizationFailed
  >(
    'NPO:UPDATE_ORGANIZATION',
    'NPO:UPDATE_ORGANIZATION_SUCCESS',
    'NPO:UPDATE_ORGANIZATION_FAILED',
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
  execute: uploadEditableOrgLogo,
  completed: uploadEditableOrgLogoComplete,
  failed: uploadEditableOrgLogoFailed
} = makeCommunicationActionCreators<
  NS.IUploadEditableOrgLogo,
  NS.IUploadEditableOrgLogoSuccess,
  NS.IUploadEditableOrgLogoFailed
  >(
    'NPO:UPLOAD_EDITABLE_ORG_LOGO',
    'NPO:UPLOAD_EDITABLE_ORG_LOGO_SUCCESS',
    'NPO:UPLOAD_EDITABLE_ORG_LOGO_FAILED',
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
  execute: saveEditableOrganizationTags,
  completed: saveEditableOrganizationTagsComplete,
  failed: saveEditableOrganizationTagsFailed
} = makeCommunicationActionCreators<
  NS.ISaveEditableOrganizationTags,
  NS.ISaveEditableOrganizationTagsSuccess,
  NS.ISaveEditableOrganizationTagsFailed
  >(
    'NPO:SAVE_EDITABLE_ORGANIZATION_TAGS',
    'NPO:SAVE_EDITABLE_ORGANIZATION_TAGS_SUCCESS',
    'NPO:SAVE_EDITABLE_ORGANIZATION_TAGS_FAILED',
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
  execute: saveEditableOrganizationMembers,
  completed: saveEditableOrganizationMembersComplete,
  failed: saveEditableOrganizationMembersFailed,
} = makeCommunicationActionCreators<
  NS.ISaveEditableOrganizationMembers,
  NS.ISaveEditableOrganizationMembersSuccess,
  NS.ISaveEditableOrganizationMembersFailed
  >(
    'NPO:SAVE_EDITABLE_ORGANIZATION_MEMBERS',
    'NPO:SAVE_EDITABLE_ORGANIZATION_MEMBERS_SUCCESS',
    'NPO:SAVE_EDITABLE_ORGANIZATION_MEMBERS_FAILED',
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
  execute: acceptConversationInvite,
  completed: acceptConversationInviteComplete,
  failed: acceptConversationInviteFailed
} = makeCommunicationActionCreators<
  NS.IAcceptConversationInvite,
  NS.IAcceptConversationInviteSuccess,
  NS.IAcceptConversationInviteFailed
  >(
    'NPO:ACCEPT_CONVERSATION_INVITE',
    'NPO:ACCEPT_CONVERSATION_INVITE_SUCCESS',
    'NPO:ACCEPT_CONVERSATION_INVITE_FAILED',
);

export const {
  execute: declineConversationInvite,
  completed: declineConversationInviteComplete,
  failed: declineConversationInviteFailed
} = makeCommunicationActionCreators<
  NS.IDeclineConversationInvite,
  NS.IDeclineConversationInviteSuccess,
  NS.IDeclineConversationInviteFailed
  >(
    'NPO:DECLINE_CONVERSATION_INVITE',
    'NPO:DECLINE_CONVERSATION_INVITE_SUCCESS',
    'NPO:DECLINE_CONVERSATION_INVITE_FAILED',
);

export const {
  execute: acceptHours,
  completed: acceptHoursComplete,
  failed: acceptHoursFailed
} = makeCommunicationActionCreators<
  NS.IAcceptHours,
  NS.IAcceptHoursSuccess,
  NS.IAcceptHoursFailed
  >(
  'NPO:ACCEPT_HOURS',
  'NPO:ACCEPT_HOURS_SUCCESS',
  'NPO:ACCEPT_HOURS_FAILED',
);

export const {
  execute: declineHours,
  completed: declineHoursComplete,
  failed: declineHoursFailed
} = makeCommunicationActionCreators<
  NS.IDeclineHours,
  NS.IDeclineHoursSuccess,
  NS.IDeclineHoursFailed
  >(
  'NPO:DECLINE_HOURS',
  'NPO:DECLINE_HOURS_SUCCESS',
  'NPO:DECLINE_HOURS_FAILED',
);

export const {
  execute: loadOrganizationMembers,
  completed: loadOrganizationMembersComplete,
  failed: loadOrganizationMembersFailed
} = makeCommunicationActionCreators<
  NS.ILoadOrganizationMembers,
  NS.ILoadOrganizationMembersSuccess,
  NS.ILoadOrganizationMembersFailed
  >(
    'NPO:LOAD_ORGANIZATION_MEMBERS',
    'NPO:LOAD_ORGANIZATION_MEMBERS_SUCCESS',
    'NPO:LOAD_ORGANIZATION_MEMBERS_FAILED',
);
