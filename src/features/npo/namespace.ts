import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';
import { IAddressLocation } from 'shared/types/requests/auth';
import { IGoogleAddressSuggestion } from 'shared/view/redux-form/CountryField/CountryField';
import { INewOpportunityResponse, IOpportunityResponse, IVolunteersResponse } from 'shared/types/responses/npo';
import { ILoadOpportunitiesRequestParams } from 'shared/types/requests/npo';
import { IOpportunityWithEvents } from 'shared/types/responses/shared';

export interface IReduxState {
  communications: {
    createOrganization: ICommunication;
    uploadOrgLogo: ICommunication;
    saveOrganizationTags: ICommunication;
    saveOrganizationMembers: ICommunication;
    loadOrganizationTags: ICommunication;
    requestNewOpportunityId: ICommunication;
    updateOpportunity: ICommunication;

    uploadOpportunityLogo: ICommunication;
    loadOpportunities: ICommunication;
    loadOpportunitiesWithEvents: ICommunication;
    loadSingleOpportunity: ICommunication;

    deleteOpportunity: ICommunication;
    publicOpportunity: ICommunication;
    unpublishOpportunity: ICommunication;

    loadOpportunityVolunteers: ICommunication;
    acceptInvitation: ICommunication;
    declineInvitation: ICommunication;

    createNewEvent: ICommunication;
    deleteEvent: ICommunication;
  };
  data: {
    uploadLogoProgress: number | null;
    currentOpportunity: IOpportunityResponse | null;
    uploadOpportunityLogoProgress: number | null;
    organizationOpportunities: IOpportunityResponse[];

    deleteOpportunityId: string | null;
    currentOrganizationVolunteer: IVolunteersResponse | null;
    inviteVolunteersOpportunityId: string | null;

    opportunitiesWithEvents: IOpportunityWithEvents[];
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
  address: IAddressLocation;
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

export interface ICreateNewEventForm {
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
export type ICreateOrganizationSuccess = IPlainAction<'NPO:CREATE_ORGANIZATION_SUCCESS'>;
export type ICreateOrganizationFailed = IPlainFailAction<'NPO:CREATE_ORGANIZATION_FAILED'>;

export type IUploadOrgLogo = IAction<'NPO:UPLOAD_ORG_LOGO', File>;
export type IUploadOrgLogoSuccess = IPlainAction<'NPO:UPLOAD_ORG_LOGO_SUCCESS'>;
export type IUploadOrgLogoFailed = IPlainFailAction<'NPO:UPLOAD_ORG_LOGO_FAILED'>;

export type ILoadOrganizationTags = IPlainAction<'NPO:LOAD_ORGANIZATION_TAGS'>;
export type ILoadOrganizationTagsSuccess = IPlainAction<'NPO:LOAD_ORGANIZATION_TAGS_SUCCESS'>;
export type ILoadOrganizationTagsFailed = IPlainFailAction<'NPO:LOAD_ORGANIZATION_TAGS_FAILED'>;

export type ISaveOrganizationTags = IAction<'NPO:SAVE_ORGANIZATION_TAGS', string[]>;
export type ISaveOrganizationTagsSuccess = IPlainAction<'NPO:SAVE_ORGANIZATION_TAGS_SUCCESS'>;
export type ISaveOrganizationTagsFailed = IPlainFailAction<'NPO:SAVE_ORGANIZATION_TAGS_FAILED'>;

export type ISaveOrganizationMembers = IAction<'NPO:SAVE_ORGANIZATION_MEMBERS', string[]>;
export type ISaveOrganizationMembersSuccess = IPlainAction<'NPO:SAVE_ORGANIZATION_MEMBERS_SUCCESS'>;
export type ISaveOrganizationMembersFailed = IPlainFailAction<'NPO:SAVE_ORGANIZATION_MEMBERS_FAILED'>;

export type ISetUploadOrganizationLogoProgress = IAction<'NPO:SET_UPLOAD_ORGANIZATION_LOGO_PROGRESS', number | null>;

export type IRequestNewOpportunityId = IPlainAction<'NPO:REQUEST_NEW_OPPORTUNITY_ID'>;
export type IRequestNewOpportunityIdSuccess = IAction<
  'NPO:REQUEST_NEW_OPPORTUNITY_ID_SUCCESS',
  INewOpportunityResponse
>;
export type IRequestNewOpportunityIdFailed = IPlainFailAction<'NPO:REQUEST_NEW_OPPORTUNITY_ID_FAILED'>;

export type IUpdateOpportunity = IAction<'NPO:UPDATE_OPPORTUNITY', ICreateOpportunityForm>;
export type IUpdateOpportunitySuccess = IAction<'NPO:UPDATE_OPPORTUNITY_SUCCESS', IOpportunityResponse>;
export type IUpdateOpportunityFailed = IPlainFailAction<'NPO:UPDATE_OPPORTUNITY_FAILED'>;

export type IUploadOpportunityLogo = IAction<'NPO:UPLOAD_OPPORTUNITY_LOGO', File>;
export type IUploadOpportunityLogoSuccess = IAction<'NPO:UPLOAD_OPPORTUNITY_LOGO_SUCCESS', string>;
export type IUploadOpportunityLogoFailed = IPlainFailAction<'NPO:UPLOAD_OPPORTUNITY_LOGO_FAILED'>;

export type ISetUploadOpportunityLogoProgress = IAction<'NPO:SET_UPLOAD_OPPORTUNITY_LOGO_PROGRESS', number | null>;

export type ILoadOpportunities = IAction<'NPO:LOAD_OPPORTUNITIES', ILoadOpportunitiesRequestParams>;
export type ILoadOpportunitiesSuccess = IAction<'NPO:LOAD_OPPORTUNITIES_SUCCESS', IOpportunityResponse[]>;
export type ILoadOpportunitiesFailed = IPlainFailAction<'NPO:LOAD_OPPORTUNITIES_FAILED'>;

export type ILoadOpportunitiesWithEvents = IPlainAction<'NPO:LOAD_OPPORTUNITIES_WITH_EVENTS'>;
export type ILoadOpportunitiesWithEventsSuccess = IAction<
  'NPO:LOAD_OPPORTUNITIES_WITH_EVENTS_SUCCESS',
  IOpportunityWithEvents[]
>;
export type ILoadOpportunitiesWithEventsFailed = IPlainFailAction<'NPO:LOAD_OPPORTUNITIES_WITH_EVENTS_FAILED'>;

export type ILoadSingleOpportunity = IAction<'NPO:LOAD_SINGLE_OPPORTUNITY', string>;
export type ILoadSingleOpportunitySuccess = IAction<'NPO:LOAD_SINGLE_OPPORTUNITY_SUCCESS', IOpportunityResponse>;
export type ILoadSingleOpportunityFailed = IPlainFailAction<'NPO:LOAD_SINGLE_OPPORTUNITY_FAILED'>;

export type IDeleteOpportunity = IAction<'NPO:DELETE_OPPORTUNITY', string>;
export type IDeleteOpportunitySuccess = IPlainAction<'NPO:DELETE_OPPORTUNITY_SUCCESS'>;
export type IDeleteOpportunityFailed = IPlainFailAction<'NPO:DELETE_OPPORTUNITY_FAILED'>;

export type IRequestDeleteOpportunity = IAction<'NPO:REQUEST_DELETE_OPPORTUNITY', string>;
export type IResetRequestDeleteOpportunity = IPlainAction<'NPO:RESET_REQUEST_DELETE_OPPORTUNITY'>;
export type IResetDeletedOpportunityConfirmation = IPlainAction<'NPO:RESET_DELETE_OPPORTUNITY_CONFIRMATION'>;

export type IPublishOpportunity = IAction<'NPO:PUBLISH_OPPORTUNITY', string>;
export type IPublishOpportunitySuccess = IAction<'NPO:PUBLISH_OPPORTUNITY_SUCCESS', string>;
export type IPublishOpportunityFailed = IPlainFailAction<'NPO:PUBLISH_OPPORTUNITY_FAILED'>;

export type IUnpublishOpportunity = IAction<'NPO:UNPUBLISH_OPPORTUNITY', string>;
export type IUnpublishOpportunitySuccess = IAction<'NPO:UNPUBLISH_OPPORTUNITY_SUCCESS', string>;
export type IUnpublishOpportunityFailed = IPlainFailAction<'NPO:UNPUBLISH_OPPORTUNITY_FAILED'>;

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

export interface IAcceptInvitationProps {
  opportunityId: string;
  userId: string;
}

export type IDeclineInvitation = IAction<'NPO:DECLINE_INVITATION', IAcceptInvitationProps>;
export type IDeclineInvitationSuccess = IPlainAction<'NPO:DECLINE_INVITATION_SUCCESS'>;
export type IDeclineInvitationFailed = IPlainFailAction<'NPO:DECLINE_INVITATION_FAILED'>;

export type IRequestInviteVolunteers = IAction<'NPO:REQUEST_INVITE_VOLUNTEERS', string>;
export type IResetRequestInviteVolunteers = IPlainAction<'NPO:RESET_REQUEST_INVITE_VOLUNTEERS'>;

export type ICreateNewEventRequest = IPlainAction<'NPO:CREATE_NEW_EVENT_REQUEST'>;
export type IResetCreateNewEventRequest = IPlainAction<'NPO:RESET_CREATE_NEW_EVENT_REQUEST'>;

export interface ICreateNewEventProps extends Omit<ICreateNewEventForm, 'location'> {
  location: IAddressLocation;
}

export type ICreateNewEvent = IAction<'NPO:CREATE_NEW_EVENT', ICreateNewEventProps>;
export type ICreateNewEventSuccess = IPlainAction<'NPO:CREATE_NEW_EVENT_SUCCESS'>;
export type ICreateNewEventFailed = IPlainFailAction<'NPO:CREATE_NEW_EVENT_FAILED'>;

export type IDeleteEvent = IAction<'NPO:DELETE_EVENT', string>;
export type IDeleteEventSuccess = IPlainAction<'NPO:DELETE_EVENT_SUCCESS'>;
export type IDeleteEventFailed = IPlainFailAction<'NPO:DELETE_EVENT_FAILED'>;

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
  | ISaveOrganizationMembers
  | ISaveOrganizationMembersSuccess
  | ISaveOrganizationMembersFailed
  | ILoadOrganizationTags
  | ILoadOrganizationTagsSuccess
  | ILoadOrganizationTagsFailed
  | ISetUploadOrganizationLogoProgress
  | IUpdateOpportunity
  | IUpdateOpportunitySuccess
  | IUpdateOpportunityFailed
  | IRequestNewOpportunityId
  | IRequestNewOpportunityIdSuccess
  | IRequestNewOpportunityIdFailed
  | IUploadOpportunityLogo
  | IUploadOpportunityLogoSuccess
  | IUploadOpportunityLogoFailed
  | ISetUploadOpportunityLogoProgress
  | ILoadOpportunities
  | ILoadOpportunitiesSuccess
  | ILoadOpportunitiesFailed
  | ILoadOpportunitiesWithEvents
  | ILoadOpportunitiesWithEventsSuccess
  | ILoadOpportunitiesWithEventsFailed
  | ILoadSingleOpportunity
  | ILoadSingleOpportunitySuccess
  | ILoadSingleOpportunityFailed
  | IDeleteOpportunity
  | IDeleteOpportunitySuccess
  | IDeleteOpportunityFailed
  | IRequestDeleteOpportunity
  | IResetRequestDeleteOpportunity
  | IResetDeletedOpportunityConfirmation
  | IPublishOpportunity
  | IPublishOpportunitySuccess
  | IPublishOpportunityFailed
  | IUnpublishOpportunity
  | IUnpublishOpportunitySuccess
  | IUnpublishOpportunityFailed
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
  | IResetCreateNewEventRequest
  | ICreateNewEvent
  | ICreateNewEventSuccess
  | ICreateNewEventFailed
  | IDeleteEvent
  | IDeleteEventSuccess
  | IDeleteEventFailed;
