import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';
import { IAddressLocation } from 'shared/types/requests/auth';
import { IGoogleAddressSuggestion } from 'shared/view/redux-form/CountryField/CountryField';
import {
  ICreateOrganizationResponse,
  IEventResponsesResponse,
  IOrganizationsResponseItem,
  IVolunteersResponse,
} from 'shared/types/responses/npo';
import { IOpportunityWithEvents } from 'shared/types/responses/shared';
import { IEvent } from 'shared/types/models/events';

export interface IReduxState {
  communications: {
    createOrganization: ICommunication;
    updateOrganization: ICommunication;
    uploadOrgLogo: ICommunication;
    uploadEditableOrgLogo: ICommunication;
    saveOrganizationTags: ICommunication;
    saveEditableOrganizationTags: ICommunication;
    saveOrganizationMembers: ICommunication;
    saveEditableOrganizationMembers: ICommunication;
    loadOrganizationTags: ICommunication;

    loadOpportunitiesWithEvents: ICommunication;

    deleteOpportunity: ICommunication;

    loadOpportunityVolunteers: ICommunication;
    acceptInvitation: ICommunication;
    declineInvitation: ICommunication;

    editEvent: ICommunication;
    deleteEvent: ICommunication;
    loadEventResponses: ICommunication;

    // Chat inject
    acceptConversationInvite: ICommunication;
    declineConversationInvite: ICommunication;
    acceptHours: ICommunication;
    declineHours: ICommunication;
  };
  data: {
    uploadLogoProgress: number | null;
    deleteOpportunityId: string | null;
    currentOrganizationVolunteer: IVolunteersResponse | null;
    inviteVolunteersOpportunityId: string | null;
    opportunitiesWithEvents: IOpportunityWithEvents[];
    currentEditEvent: IEvent | null;
    currentEventResponses: IEventResponsesResponse[];
    createNewOrganizationResponse: ICreateOrganizationResponse | null;
    editableOrganization: IOrganizationsResponseItem | null;

    // Chat section
  };
  modal: {
    showDeleteOpportunityConfirmation: boolean;
    createNewEvent: boolean;
  };
}

export interface ICreateNewOrganizationForm {
  organizationName: string;
  website: string;
  address: IGoogleAddressSuggestion;
  description: string;
}

export interface ICreateNewOrganizationValues extends Omit<ICreateNewOrganizationForm, 'address'> {
  address: IAddressLocation | null;
}

export interface IInviteTeamForm {
  email: string[];
}

export interface ICreateOpportunityForm {
  title: string;
  description: string;
  ageLimitEnabled: boolean;
  minAge: number;
  maxAge: number;
  hoursPerWeekLimitEnabled: boolean;
  hoursPerWeek: number;
  capLimitEnabled: boolean;
  volunteersCap: number;
  published: boolean;
  tags: string[];
}

export interface IEditEventForm {
  title: string;
  description: string;
  location: IGoogleAddressSuggestion;
  opportunityId: string;
  isAllDay: boolean;
  startTime: string;
  endTime: string;
  hours: number;
  hoursFrequency: number;
}

export type ICreateOrganization = IAction<'NPO:CREATE_ORGANIZATION', ICreateNewOrganizationValues>;
export type ICreateOrganizationSuccess = IAction<'NPO:CREATE_ORGANIZATION_SUCCESS', ICreateOrganizationResponse>;
export type ICreateOrganizationFailed = IPlainFailAction<'NPO:CREATE_ORGANIZATION_FAILED'>;

export interface IUpdateOrganizationProps {
  organizationId: string;
  data: ICreateNewOrganizationValues;
}

export type IUpdateOrganization = IAction<'NPO:UPDATE_ORGANIZATION', IUpdateOrganizationProps>;
export type IUpdateOrganizationSuccess = IAction<'NPO:UPDATE_ORGANIZATION_SUCCESS', ICreateOrganizationResponse>;
export type IUpdateOrganizationFailed = IPlainFailAction<'NPO:UPDATE_ORGANIZATION_FAILED'>;

export type IResetCreateNewOrganizationResponse = IPlainAction<'NPO:RESET_CREATE_NEW_ORGANIZATION_RESPONSE'>;

export type ISetCurrentEditableOrganization = IAction<'NPO:SET_CURRENT_EDITABLE_ORGANIZATION', IOrganizationsResponseItem>;
export type IResetCurrentEditableOrganization = IPlainAction<'NPO:RESET_CURRENT_EDITABLE_ORGANIZATION'>;

export type IUploadOrgLogo = IAction<'NPO:UPLOAD_ORG_LOGO', File>;
export type IUploadOrgLogoSuccess = IPlainAction<'NPO:UPLOAD_ORG_LOGO_SUCCESS'>;
export type IUploadOrgLogoFailed = IPlainFailAction<'NPO:UPLOAD_ORG_LOGO_FAILED'>;

export type IUploadEditableOrgLogo = IAction<'NPO:UPLOAD_EDITABLE_ORG_LOGO', File>;
export type IUploadEditableOrgLogoSuccess = IPlainAction<'NPO:UPLOAD_EDITABLE_ORG_LOGO_SUCCESS'>;
export type IUploadEditableOrgLogoFailed = IPlainFailAction<'NPO:UPLOAD_EDITABLE_ORG_LOGO_FAILED'>;

export type IUpdateEditableOrganizationLogo = IAction<'NPO:UPDATE_EDITABLE_ORGANIZATION_LOGO', string>;

export type ILoadOrganizationTags = IPlainAction<'NPO:LOAD_ORGANIZATION_TAGS'>;
export type ILoadOrganizationTagsSuccess = IPlainAction<'NPO:LOAD_ORGANIZATION_TAGS_SUCCESS'>;
export type ILoadOrganizationTagsFailed = IPlainFailAction<'NPO:LOAD_ORGANIZATION_TAGS_FAILED'>;

export type ISaveOrganizationTags = IAction<'NPO:SAVE_ORGANIZATION_TAGS', string[]>;
export type ISaveOrganizationTagsSuccess = IPlainAction<'NPO:SAVE_ORGANIZATION_TAGS_SUCCESS'>;
export type ISaveOrganizationTagsFailed = IPlainFailAction<'NPO:SAVE_ORGANIZATION_TAGS_FAILED'>;

export type ISaveEditableOrganizationTags = IAction<'NPO:SAVE_EDITABLE_ORGANIZATION_TAGS', string[]>;
export type ISaveEditableOrganizationTagsSuccess = IPlainAction<'NPO:SAVE_EDITABLE_ORGANIZATION_TAGS_SUCCESS'>;
export type ISaveEditableOrganizationTagsFailed = IPlainFailAction<'NPO:SAVE_EDITABLE_ORGANIZATION_TAGS_FAILED'>;

export type ISaveOrganizationMembers = IAction<'NPO:SAVE_ORGANIZATION_MEMBERS', string[]>;
export type ISaveOrganizationMembersSuccess = IPlainAction<'NPO:SAVE_ORGANIZATION_MEMBERS_SUCCESS'>;
export type ISaveOrganizationMembersFailed = IPlainFailAction<'NPO:SAVE_ORGANIZATION_MEMBERS_FAILED'>;

export type ISaveEditableOrganizationMembers = IAction<'NPO:SAVE_EDITABLE_ORGANIZATION_MEMBERS', string[]>;
export type ISaveEditableOrganizationMembersSuccess = IPlainAction<'NPO:SAVE_EDITABLE_ORGANIZATION_MEMBERS_SUCCESS'>;
export type ISaveEditableOrganizationMembersFailed = IPlainFailAction<'NPO:SAVE_EDITABLE_ORGANIZATION_MEMBERS_FAILED'>;

export type ISetUploadOrganizationLogoProgress = IAction<'NPO:SET_UPLOAD_ORGANIZATION_LOGO_PROGRESS', number | null>;

export type ILoadOpportunitiesWithEvents = IPlainAction<'NPO:LOAD_OPPORTUNITIES_WITH_EVENTS'>;
export type ILoadOpportunitiesWithEventsSuccess = IAction<
  'NPO:LOAD_OPPORTUNITIES_WITH_EVENTS_SUCCESS',
  IOpportunityWithEvents[]
>;
export type ILoadOpportunitiesWithEventsFailed = IPlainFailAction<'NPO:LOAD_OPPORTUNITIES_WITH_EVENTS_FAILED'>;

export type IDeleteOpportunity = IAction<'NPO:DELETE_OPPORTUNITY', string>;
export type IDeleteOpportunitySuccess = IPlainAction<'NPO:DELETE_OPPORTUNITY_SUCCESS'>;
export type IDeleteOpportunityFailed = IPlainFailAction<'NPO:DELETE_OPPORTUNITY_FAILED'>;

export type IRequestDeleteOpportunity = IAction<'NPO:REQUEST_DELETE_OPPORTUNITY', string>;
export type IResetRequestDeleteOpportunity = IPlainAction<'NPO:RESET_REQUEST_DELETE_OPPORTUNITY'>;
export type IResetDeletedOpportunityConfirmation = IPlainAction<'NPO:RESET_DELETE_OPPORTUNITY_CONFIRMATION'>;

export type ILoadOpportunityVolunteers = IAction<'NPO:LOAD_OPPORTUNITY_VOLUNTEERS', string>;
export type ILoadOpportunityVolunteersSuccess = IAction<'NPO:LOAD_OPPORTUNITY_VOLUNTEERS_SUCCESS', IVolunteersResponse>;
export type ILoadOpportunityVolunteersFailed = IPlainFailAction<'NPO:LOAD_OPPORTUNITY_VOLUNTEERS_FAILED'>;

export interface IAcceptInvitationProps {
  opportunityId: string;
  userId: string;
}

export type IAcceptInvitation = IAction<'NPO:ACCEPT_INVITATION', IAcceptInvitationProps>;
export type IAcceptInvitationSuccess = IPlainAction<'NPO:ACCEPT_INVITATION_SUCCESS'>;
export type IAcceptInvitationFailed = IPlainFailAction<'NPO:ACCEPT_INVITATION_FAILED'>;

export interface IDeclineInvitationProps {
  opportunityId: string;
  userId: string;
}

export type IDeclineInvitation = IAction<'NPO:DECLINE_INVITATION', IDeclineInvitationProps>;
export type IDeclineInvitationSuccess = IPlainAction<'NPO:DECLINE_INVITATION_SUCCESS'>;
export type IDeclineInvitationFailed = IPlainFailAction<'NPO:DECLINE_INVITATION_FAILED'>;

export type IAcceptConversationInvite = IAction<'NPO:ACCEPT_CONVERSATION_INVITE', IAcceptInvitationProps>;
export type IAcceptConversationInviteSuccess = IPlainAction<'NPO:ACCEPT_CONVERSATION_INVITE_SUCCESS'>;
export type IAcceptConversationInviteFailed = IPlainFailAction<'NPO:ACCEPT_CONVERSATION_INVITE_FAILED'>;

export type IDeclineConversationInvite = IAction<'NPO:DECLINE_CONVERSATION_INVITE', IDeclineInvitationProps>;
export type IDeclineConversationInviteSuccess = IPlainAction<'NPO:DECLINE_CONVERSATION_INVITE_SUCCESS'>;
export type IDeclineConversationInviteFailed = IPlainFailAction<'NPO:DECLINE_CONVERSATION_INVITE_FAILED'>;

export type IRequestInviteVolunteers = IAction<'NPO:REQUEST_INVITE_VOLUNTEERS', string>;
export type IResetRequestInviteVolunteers = IPlainAction<'NPO:RESET_REQUEST_INVITE_VOLUNTEERS'>;

export type ICreateNewEventRequest = IPlainAction<'NPO:CREATE_EVENT_REQUEST'>;
export type IResetEditEventRequest = IPlainAction<'NPO:RESET_EDIT_EVENT_REQUEST'>;
export type IRequestEditEvent = IAction<'NPO:REQUEST_EDIT_EVENT', IEvent>;
export type IResetEditEventCommunications = IPlainAction<'NPO:RESET_EDIT_EVENT_COMMUNICATIONS'>;

export interface IEditEventProps extends Omit<IEditEventForm, 'location'> {
  id?: string;
  location: IAddressLocation;
}

export type IEditEvent = IAction<'NPO:EDIT_EVENT', IEditEventProps>;
export type IEditEventSuccess = IPlainAction<'NPO:EDIT_EVENT_SUCCESS'>;
export type IEditEventFailed = IPlainFailAction<'NPO:EDIT_EVENT_FAILED'>;
export type IEditEventReset = IPlainAction<'NPO:EDIT_EVENT_RESET'>;

export type IDeleteEvent = IAction<'NPO:DELETE_EVENT', string>;
export type IDeleteEventSuccess = IPlainAction<'NPO:DELETE_EVENT_SUCCESS'>;
export type IDeleteEventFailed = IPlainFailAction<'NPO:DELETE_EVENT_FAILED'>;

export type ILoadEventResponses = IAction<'NPO:LOAD_EVENT_RESPONSES', string>;
export type ILoadEventResponsesSuccess = IAction<'NPO:LOAD_EVENT_RESPONSES_SUCCESS', IEventResponsesResponse[]>;
export type ILoadEventResponsesFailed = IPlainFailAction<'NPO:LOAD_EVENT_RESPONSES_FAILED'>;
export type IResetEventResponses = IPlainAction<'NPO:RESET_EVENT_RESPONSES'>;

export type IChatSubscribe = IPlainAction<'NPO:SUBSCRIBE'>;
export type IChatUnsubscribe = IPlainAction<'NPO:UNSUBSCRIBE'>;

export interface IAcceptHoursProps {
  organizationId: string;
  requestId: string;
}

export type IAcceptHours = IAction<'NPO:ACCEPT_HOURS', IAcceptHoursProps>;
export type IAcceptHoursSuccess = IPlainAction<'NPO:ACCEPT_HOURS_SUCCESS'>;
export type IAcceptHoursFailed = IPlainFailAction<'NPO:ACCEPT_HOURS_FAILED'>;

export interface IDeclineHoursProps {
  organizationId: string;
  requestId: string;
}

export type IDeclineHours = IAction<'NPO:DECLINE_HOURS', IDeclineHoursProps>;
export type IDeclineHoursSuccess = IPlainAction<'NPO:DECLINE_HOURS_SUCCESS'>;
export type IDeclineHoursFailed = IPlainFailAction<'NPO:DECLINE_HOURS_FAILED'>;

export type Action =
  | ICreateOrganization
  | ICreateOrganizationSuccess
  | ICreateOrganizationFailed
  | IUploadOrgLogo
  | IUploadOrgLogoSuccess
  | IUploadOrgLogoFailed
  | ISaveOrganizationTags
  | ISaveOrganizationTagsSuccess
  | ISaveOrganizationTagsFailed
  | ISaveEditableOrganizationTags
  | ISaveEditableOrganizationTagsSuccess
  | ISaveEditableOrganizationTagsFailed
  | ISaveOrganizationMembers
  | ISaveOrganizationMembersSuccess
  | ISaveOrganizationMembersFailed
  | ISaveEditableOrganizationMembers
  | ISaveEditableOrganizationMembersSuccess
  | ISaveEditableOrganizationMembersFailed
  | ILoadOrganizationTags
  | ILoadOrganizationTagsSuccess
  | ILoadOrganizationTagsFailed
  | ISetUploadOrganizationLogoProgress
  | ILoadOpportunitiesWithEvents
  | ILoadOpportunitiesWithEventsSuccess
  | ILoadOpportunitiesWithEventsFailed
  | IDeleteOpportunity
  | IDeleteOpportunitySuccess
  | IDeleteOpportunityFailed
  | IRequestDeleteOpportunity
  | IResetRequestDeleteOpportunity
  | IResetDeletedOpportunityConfirmation
  | ILoadOpportunityVolunteers
  | ILoadOpportunityVolunteersSuccess
  | ILoadOpportunityVolunteersFailed
  | IAcceptInvitation
  | IAcceptInvitationSuccess
  | IAcceptInvitationFailed
  | IDeclineInvitation
  | IDeclineInvitationSuccess
  | IDeclineInvitationFailed
  | IRequestInviteVolunteers
  | IResetRequestInviteVolunteers
  | ICreateNewEventRequest
  | IResetEditEventRequest
  | IRequestEditEvent
  | IEditEvent
  | IEditEventSuccess
  | IEditEventFailed
  | IEditEventReset
  | IDeleteEvent
  | IDeleteEventSuccess
  | IDeleteEventFailed
  | IResetEditEventCommunications
  | ILoadEventResponses
  | ILoadEventResponsesSuccess
  | ILoadEventResponsesFailed
  | IResetEventResponses
  | IChatSubscribe
  | IChatUnsubscribe
  | IAcceptConversationInvite
  | IAcceptConversationInviteSuccess
  | IAcceptConversationInviteFailed
  | IDeclineConversationInvite
  | IDeclineConversationInviteSuccess
  | IDeclineConversationInviteFailed
  | IAcceptHours
  | IAcceptHoursSuccess
  | IAcceptHoursFailed
  | IDeclineHours
  | IDeclineHoursSuccess
  | IDeclineHoursFailed
  | IResetCreateNewOrganizationResponse
  | ISetCurrentEditableOrganization
  | IResetCurrentEditableOrganization
  | IUploadEditableOrgLogo
  | IUploadEditableOrgLogoSuccess
  | IUploadEditableOrgLogoFailed
  | IUpdateEditableOrganizationLogo
  | IUpdateOrganization
  | IUpdateOrganizationSuccess
  | IUpdateOrganizationFailed;
