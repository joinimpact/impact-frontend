import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';
import { IAddressLocation } from 'shared/types/requests/auth';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import {
  IBrowseRecommendedOpportunitiesResponse,
  IConversationResponseItem,
  IEventUserResponse,
} from 'shared/types/responses/volunteer';
import { IBrowseOpportunitiesRequest } from 'shared/types/requests/volunteers';
import { IGoogleAddressSuggestion } from 'shared/view/redux-form/CountryField/CountryField';
import { IEvent } from 'shared/types/models/events';
import { IOpportunitiesResponseHash } from 'shared/types/models/opportunity';
import {
  IConversationMessageResponseItem,
  IConversationMessagesResponseExtended,
  IConversationResponse,
} from 'shared/types/responses/chat';

export type TUserInterestsOpportunities = { [key in string]: IOpportunityResponse[] };

export interface IRequestHoursProps {
  organizationId: string;
}

export interface IReduxState {
  communications: {
    saveVolunteerPersonalInformation: ICommunication;
    uploadVolunteerLogo: ICommunication;
    saveVolunteerAreasOfInterest: ICommunication;
    loadSingleOpportunity: ICommunication;
    applyForOpportunity: ICommunication;
    browseOpportunities: ICommunication;
    browseOpportunitiesWithFilters: ICommunication;
    loadUserEnrolledOpportunities: ICommunication;
    loadUserEvents: ICommunication;
    attendEvent: ICommunication;
    declineEvent: ICommunication;
    getMyEventResponse: ICommunication;
    loadConversation: ICommunication;
    loadConversations: ICommunication;
    sendMessage: ICommunication;
    setCurrentConversation: ICommunication;
    fetchChatHistory: ICommunication;
    requestHours: ICommunication;
  };
  data: {
    uploadLogoProgress: number | null;
    currentOpportunity: IOpportunityResponse | null;

    applyOpportunityId: string | null;
    //  User opportunities filtered by user location radius
    inUserAreaOpportunities: IOpportunityResponse[];
    // User opportunities filtered by user interests
    inUserInterestsOpportunities: TUserInterestsOpportunities;
    // User opportunities filtered by user filter
    filteredOpportunities: IOpportunityResponse[];

    currentRecommendOpportunities: IBrowseRecommendedOpportunitiesResponse | null;
    currentEnrolledOpportunities: IOpportunityResponse[];
    currentEnrolledOpportunitiesHash: IOpportunitiesResponseHash;
    userEvents: IEvent[];
    myResponseToEvent: IEventUserResponse | null;

    // Chat section
    conversations: IConversationResponseItem[];
    currentConversation: IConversationResponseItem | null;
    conversationItem: IConversationResponse | null;
    currentConversationMessages: IConversationMessageResponseItem[];
    totalMessagesCount: number;
    hoursRequest: IRequestHoursProps | null;
  };
  ui: {
    shareOpportunityVisible: boolean;
  };
}

export interface IVolunteerPersonalInfoForm {
  firstName: string;
  lastName: string;
  email: string;
  address: IAddressLocation;
  birthday: string;
  school: string;
}

export interface IInterestAreaForm {
  value: string;
}

export interface IApplyForOpportunityForm {
  message: string;
}

export interface IBrowseOpportunitiesForm {
  location: IGoogleAddressSuggestion;
  ageRange: string;
  commitment: number[];
}

export interface IBrowseOpportunitiesRequestProps {
  location: {
    lat: number;
    long: number;
  };
  ageRange: string;
  commitment: number[];
}

export interface IRequestHoursForm {
  hours: number;
  description: string;
}

export type ISaveVolunteerPersonalInfo = IAction<'VOLUNTEER:SAVE_VOLUNTEER_PERSONAL_INFO', IVolunteerPersonalInfoForm>;
export type ISaveVolunteerPersonalInfoSuccess = IPlainAction<'VOLUNTEER:SAVE_VOLUNTEER_PERSONAL_INFO_SUCCESS'>;
export type ISaveVolunteerPersonalInfoFailed = IPlainFailAction<'VOLUNTEER:SAVE_VOLUNTEER_PERSONAL_INFO_FAILED'>;

export type IUploadVolunteerLogo = IAction<'VOLUNTEER:UPLOAD_VOLUNTEER_LOGO', File>;
export type IUploadVolunteerLogoSuccess = IPlainAction<'VOLUNTEER:UPLOAD_VOLUNTEER_LOGO_SUCCESS'>;
export type IUploadVolunteerLogoFailed = IPlainFailAction<'VOLUNTEER:UPLOAD_VOLUNTEER_LOGO_FAILED'>;

export type ISaveVolunteerAreaOfInterest = IAction<'VOLUNTEER:SAVE_VOLUNTEER_AREA_OF_INTEREST', string[]>;
export type ISaveVolunteerAreaOfInterestSuccess = IPlainAction<'VOLUNTEER:SAVE_VOLUNTEER_AREA_OF_INTEREST_SUCCESS'>;
export type ISaveVolunteerAreaOfInterestFailed = IPlainFailAction<'VOLUNTEER:SAVE_VOLUNTEER_AREA_OF_INTEREST_FAILED'>;

export type ILoadVolunteer = IPlainAction<'VOLUNTEER:LOAD'>;
export type ILoadVolunteerSuccess = IPlainAction<'VOLUNTEER:LOAD_SUCCESS'>;
export type ILoadVolunteerFailed = IPlainFailAction<'VOLUNTEER:LOAD_FAILED'>;

export type ISetUploadLogoProgress = IAction<'VOLUNTEER:SET_UPLOAD_LOGO_PROGRESS', number | null>;

export type ILoadSingleOpportunity = IAction<'VOLUNTEER:LOAD_SINGLE_OPPORTUNITY', string>;
export type ILoadSingleOpportunitySuccess = IAction<'VOLUNTEER:LOAD_SINGLE_OPPORTUNITY_SUCCESS', IOpportunityResponse>;
export type ILoadSingleOpportunityFailed = IPlainFailAction<'VOLUNTEER:LOAD_SINGLE_OPPORTUNITY_FAILED'>;

export type IRequestApplyOpportunity = IAction<'VOLUNTEER:REQUEST_APPLY_OPPORTUNITY', string>;
export type IResetRequestApplyOpportunity = IPlainAction<'VOLUNTEER:RESET_REQUEST_APPLY_OPPORTUNITY'>;

export interface IApplyForOpportunityParams {
  message: string;
  opportunityId: string;
}

export type IApplyForOpportunity = IAction<'VOLUNTEER:APPLY_FOR_OPPORTUNITY', IApplyForOpportunityParams>;
export type IApplyForOpportunitySuccess = IPlainAction<'VOLUNTEER:APPLY_FOR_OPPORTUNITY_SUCCESS'>;
export type IApplyForOpportunityFailed = IPlainFailAction<'VOLUNTEER:APPLY_FOR_OPPORTUNITY_FAILED'>;

export type IBrowseOpportunities = IPlainAction<'VOLUNTEER:BROWSE_OPPORTUNITIES'>;
export type IBrowseOpportunitiesSuccess = IAction<
  'VOLUNTEER:BROWSE_OPPORTUNITIES_SUCCESS',
  IBrowseRecommendedOpportunitiesResponse
>;
export type IBrowseOpportunitiesFailed = IPlainFailAction<'VOLUNTEER:BROWSE_OPPORTUNITIES_FAILED'>;

export type IBrowseOpportunitiesWithFilter = IAction<
  'VOLUNTEER:BROWSE_OPPORTUNITIES_WITH_FILTER',
  IBrowseOpportunitiesRequest
>;
export type IBrowseOpportunitiesWithFilterSuccess = IAction<'VOLUNTEER:BROWSE_OPPORTUNITIES_WITH_FILTER_SUCCESS', any>;
export type IBrowseOpportunitiesWithFilterFailed = IPlainFailAction<
  'VOLUNTEER:BROWSE_OPPORTUNITIES_WITH_FILTER_FAILED'
>;

export type IShowShareOpportunityModal = IPlainAction<'VOLUNTEER:SHOW_OPPORTUNITY_MODAL'>;
export type ICloseShareOpportunityModal = IPlainAction<'VOLUNTEER:CLOSE_SHARE_OPPORTUNITY_MODAL'>;

export type ILoadEnrolledOpportunities = IPlainAction<'VOLUNTEER:LOAD_ENROLLED_OPPORTUNITIES'>;
export type ILoadEnrolledOpportunitiesSuccess = IAction<
  'VOLUNTEER:LOAD_ENROLLED_OPPORTUNITIES_SUCCESS',
  IOpportunityResponse[]
>;
export type ILoadEnrolledOpportunitiesFailed = IPlainFailAction<'VOLUNTEER:LOAD_ENROLLED_OPPORTUNITIES_FAILED'>;

export type ILoadUserEvents = IPlainAction<'VOLUNTEER:LOAD_USER_EVENTS'>;
export type ILoadUserEventsSuccess = IAction<'VOLUNTEER:LOAD_USER_EVENTS_SUCCESS', IEvent[]>;
export type ILoadUserEventsFailed = IPlainFailAction<'VOLUNTEER:LOAD_USER_EVENTS_FAILED'>;

export type IAttendEvent = IAction<'VOLUNTEER:ATTEND_EVENT', IEvent>;
export type IAttendEventSuccess = IPlainAction<'VOLUNTEER:ATTEND_EVENT_SUCCESS'>;
export type IAttendEventFailed = IPlainFailAction<'VOLUNTEER:ATTEND_EVENT_FAILED'>;

export type IDeclineEvent = IAction<'VOLUNTEER:DECLINE_EVENT', IEvent>;
export type IDeclineEventSuccess = IPlainAction<'VOLUNTEER:DECLINE_EVENT_SUCCESS'>;
export type IDeclineEventFailed = IPlainFailAction<'VOLUNTEER:DECLINE_EVENT_FAILED'>;

export type IGetMyResponseToEvent = IAction<'VOLUNTEER:GET_MY_RESPONSE_TO_EVENT', string>;
export type IGetMyResponseToEventSuccess = IAction<'VOLUNTEER:GET_MY_RESPONSE_TO_EVENT_SUCCESS', IEventUserResponse>;
export type IGetMyResponseToEventFailed = IPlainFailAction<'VOLUNTEER:GET_MY_RESPONSE_TO_EVENT_FAILED'>;
export type IResetMyResponseToEvent = IPlainAction<'VOLUNTEER:RESET_MY_RESPONSE_TO_EVENT'>;

export type ILoadConversations = IPlainAction<'VOLUNTEER:LOAD_CONVERSATIONS'>;
export type ILoadConversationsSuccess = IAction<'VOLUNTEER:LOAD_CONVERSATIONS_SUCCESS', IConversationResponseItem[]>;
export type ILoadConversationsFailed = IPlainFailAction<'VOLUNTEER:LOAD_CONVERSATIONS_FAILED'>;

export type ILoadConversation = IAction<'VOLUNTEER:LOAD_CONVERSATION', string>;
export type ILoadConversationSuccess = IAction<'VOLUNTEER:LOAD_CONVERSATION_SUCCESS', IConversationResponse>;
export type ILoadConversationFailed = IPlainFailAction<'VOLUNTEER:LOAD_CONVERSATION_FAILED'>;

export type ISetCurrentConversation = IAction<'VOLUNTEER:SET_CURRENT_CONVERSATION', IConversationResponseItem>;
export type ISetCurrentConversationSuccess = IPlainAction<'VOLUNTEER:SET_CURRENT_CONVERSATION_SUCCESS'>;
export type ISetCurrentConversationFailed = IPlainFailAction<'VOLUNTEER:SET_CURRENT_CONVERSATION_FAILED'>;

export type ISetCurrentConversationMessages = IAction<
  'VOLUNTEER:SET_CURRENT_CONVERSATION_MESSAGES',
  IConversationMessagesResponseExtended
>;
export type IResetCurrentConversationMessages = IPlainAction<'VOLUNTEER:RESET_CURRENT_CONVERSATION_MESSAGES'>;

export interface ISendMessageProps {
  conversationId: string;
  message: string;
}

export type ISendMessage = IAction<'VOLUNTEER:SEND_MESSAGE', ISendMessageProps>;
export type ISendMessageSuccess = IPlainAction<'VOLUNTEER:SEND_MESSAGE_SUCCESS'>;
export type ISendMessageFailed = IPlainFailAction<'VOLUNTEER:SEND_MESSAGE_FAILED'>;

export type IChatSubscribe = IPlainAction<'VOLUNTEER:SUBSCRIBE'>;
export type IChatUnsubscribe = IPlainAction<'VOLUNTEER:UNSUBSCRIBE'>;

export type IAddChatMessage = IAction<'VOLUNTEER:ADD_CHAT_MESSAGE', IConversationMessageResponseItem>;

interface IFetchChatHistoryProps {
  startIndex: number;
  stopIndex: number;
}

export type IFetchChatHistory = IAction<'VOLUNTEER:FETCH_HISTORY', IFetchChatHistoryProps>;
export type IFetchChatHistorySuccess = IAction<
  'VOLUNTEER:FETCH_HISTORY_SUCCESS',
  IConversationMessagesResponseExtended
>;
export type IFetchChatHistoryFailed = IPlainFailAction<'VOLUNTEER:FETCH_HISTORY_FAILED'>;

export type IRequestHoursRequest = IAction<'VOLUNTEER:REQUEST_HOURS_REQUEST', IRequestHoursProps>;
export type IResetHoursRequest = IPlainAction<'VOLUNTEER:RESET_HOURS_REQUEST'>;

export interface IRequestHoursPayload {
  hours: number;
  description: string;
  organizationId: string;
}

export type IRequestHours = IAction<'VOLUNTEER:REQUEST_HOURS', IRequestHoursPayload>;
export type IRequestHoursSuccess = IPlainAction<'VOLUNTEER:REQUEST_HOURS_SUCCESS'>;
export type IRequestHoursFailed = IPlainFailAction<'VOLUNTEER:REQUEST_HOURS_FAILED'>;

export type Action =
  | ISaveVolunteerPersonalInfo
  | ISaveVolunteerPersonalInfoSuccess
  | ISaveVolunteerPersonalInfoFailed
  | IUploadVolunteerLogo
  | IUploadVolunteerLogoSuccess
  | IUploadVolunteerLogoFailed
  | ISaveVolunteerAreaOfInterest
  | ISaveVolunteerAreaOfInterestSuccess
  | ISaveVolunteerAreaOfInterestFailed
  | ILoadVolunteer
  | ILoadVolunteerSuccess
  | ILoadVolunteerFailed
  | ISetUploadLogoProgress
  | ILoadSingleOpportunity
  | ILoadSingleOpportunitySuccess
  | ILoadSingleOpportunityFailed
  | IRequestApplyOpportunity
  | IResetRequestApplyOpportunity
  | IApplyForOpportunity
  | IApplyForOpportunitySuccess
  | IApplyForOpportunityFailed
  | IBrowseOpportunities
  | IBrowseOpportunitiesSuccess
  | IBrowseOpportunitiesFailed
  | IBrowseOpportunitiesWithFilter
  | IBrowseOpportunitiesWithFilterSuccess
  | IBrowseOpportunitiesWithFilterFailed
  | IShowShareOpportunityModal
  | ICloseShareOpportunityModal
  | ILoadEnrolledOpportunities
  | ILoadEnrolledOpportunitiesSuccess
  | ILoadEnrolledOpportunitiesFailed
  | ILoadUserEvents
  | ILoadUserEventsSuccess
  | ILoadUserEventsFailed
  | IGetMyResponseToEvent
  | IGetMyResponseToEventSuccess
  | IGetMyResponseToEventFailed
  | IResetMyResponseToEvent
  | ILoadConversations
  | ILoadConversationsSuccess
  | ILoadConversationsFailed
  | ILoadConversation
  | ILoadConversationSuccess
  | ILoadConversationFailed
  | ISetCurrentConversation
  | ISetCurrentConversationSuccess
  | ISetCurrentConversationFailed
  | ISetCurrentConversationMessages
  | IResetCurrentConversationMessages
  | ISendMessage
  | ISendMessageSuccess
  | ISendMessageFailed
  | IChatSubscribe
  | IChatUnsubscribe
  | IAddChatMessage
  | IFetchChatHistory
  | IFetchChatHistorySuccess
  | IFetchChatHistoryFailed
  | IRequestHoursRequest
  | IResetHoursRequest
  | IRequestHours
  | IRequestHoursSuccess
  | IRequestHoursFailed;
