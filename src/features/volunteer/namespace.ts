import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';
import { IAddressLocation } from 'shared/types/requests/auth';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import { IBrowseRecommendedOpportunitiesResponse, IEventUserResponse } from 'shared/types/responses/volunteer';
import { IBrowseOpportunitiesRequest } from 'shared/types/requests/volunteers';
import { IGoogleAddressSuggestion } from 'shared/view/redux-form/CountryField/CountryField';
import { IEvent } from 'shared/types/models/events';
import { IOpportunitiesResponseHash } from 'shared/types/models/opportunity';

export type TUserInterestsOpportunities = { [key in string]: IOpportunityResponse[] };

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
  | IResetMyResponseToEvent;
