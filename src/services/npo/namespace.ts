import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';
import {
  INewOpportunityResponse,
  IOpportunityResponse,
  IOrganizationsResponseItem,
  IUserOrganizationsResponse,
} from 'shared/types/responses/npo';
import { ILoadOpportunitiesRequestParams } from 'shared/types/requests/npo';
import { ICreateOpportunityForm } from 'features/npo/namespace';

type TUserOrganizations = IUserOrganizationsResponse['organizations'];

export interface IReduxState {
  communications: {
    loadUserOrganizations: ICommunication;
    loadOpportunities: ICommunication;
    loadSingleOpportunity: ICommunication;
    requestNewOpportunityId: ICommunication;
    uploadOpportunityLogo: ICommunication;
    publishOpportunity: ICommunication;
    unpublishOpportunity: ICommunication;
    updateOpportunity: ICommunication;
  };
  data: {
    currentOrganization: IOrganizationsResponseItem | null;
    organizations: TUserOrganizations | null;
    isServiceReady: boolean;
    organizationOpportunities: IOpportunityResponse[];
    currentOpportunity: IOpportunityResponse | null;
    uploadOpportunityLogoProgress: number | null;
  };
}

export type ISetCurrentOrganization = IAction<'NPO_SERVICE:SET_CURRENT_ORGANIZATION', IOrganizationsResponseItem>;
export type IUpdateOrganizationLogo = IAction<'NPO_SERVICE:UPDATE_ORGANIZATION_LOGO', string>;
export type IChangeCurrentOrganization = IAction<'NPO_SERVICE:CHANGE_CURRENT_ORGANIZATION', IOrganizationsResponseItem>;

export type ILoadUserOrganizations = IPlainAction<'NPO_SERVICE:LOAD_USER_ORGANIZATIONS'>;
export type ILoadUserOrganizationsSuccess = IAction<'NPO_SERVICE:LOAD_USER_ORGANIZATIONS_SUCCESS', TUserOrganizations>;
export type ILoadUserOrganizationsFailed = IPlainFailAction<'NPO_SERVICE:LOAD_USER_ORGANIZATIONS_FAILED'>;

export type ILoadOpportunities = IAction<'NPO_SERVICE:LOAD_OPPORTUNITIES', ILoadOpportunitiesRequestParams | void>;
export type ILoadOpportunitiesSuccess = IAction<'NPO_SERVICE:LOAD_OPPORTUNITIES_SUCCESS', IOpportunityResponse[]>;
export type ILoadOpportunitiesFailed = IPlainFailAction<'NPO_SERVICE:LOAD_OPPORTUNITIES_FAILED'>;

export type IRequestNewOpportunityId = IPlainAction<'NPO_SERVICE:REQUEST_NEW_OPPORTUNITY_ID'>;
export type IRequestNewOpportunityIdSuccess = IAction<
  'NPO_SERVICE:REQUEST_NEW_OPPORTUNITY_ID_SUCCESS',
  INewOpportunityResponse
  >;
export type IRequestNewOpportunityIdFailed = IPlainFailAction<'NPO_SERVICE:REQUEST_NEW_OPPORTUNITY_ID_FAILED'>;

export type ISetUploadOpportunityLogoProgress = IAction<'NPO_SERVICE:SET_UPLOAD_OPPORTUNITY_LOGO_PROGRESS', number | null>;

export type IUploadOpportunityLogo = IAction<'NPO_SERVICE:UPLOAD_OPPORTUNITY_LOGO', File>;
export type IUploadOpportunityLogoSuccess = IAction<'NPO_SERVICE:UPLOAD_OPPORTUNITY_LOGO_SUCCESS', string>;
export type IUploadOpportunityLogoFailed = IPlainFailAction<'NPO_SERVICE:UPLOAD_OPPORTUNITY_LOGO_FAILED'>;

export type IPublishOpportunity = IAction<'NPO_SERVICE:PUBLISH_OPPORTUNITY', string>;
export type IPublishOpportunitySuccess = IAction<'NPO_SERVICE:PUBLISH_OPPORTUNITY_SUCCESS', string>;
export type IPublishOpportunityFailed = IPlainFailAction<'NPO_SERVICE:PUBLISH_OPPORTUNITY_FAILED'>;

export type IUnpublishOpportunity = IAction<'NPO_SERVICE:UNPUBLISH_OPPORTUNITY', string>;
export type IUnpublishOpportunitySuccess = IAction<'NPO_SERVICE:UNPUBLISH_OPPORTUNITY_SUCCESS', string>;
export type IUnpublishOpportunityFailed = IPlainFailAction<'NPO_SERVICE:UNPUBLISH_OPPORTUNITY_FAILED'>;

export type ILoadSingleOpportunity = IAction<'NPO_SERVICE:LOAD_SINGLE_OPPORTUNITY', string>;
export type ILoadSingleOpportunitySuccess = IAction<'NPO_SERVICE:LOAD_SINGLE_OPPORTUNITY_SUCCESS', IOpportunityResponse>;
export type ILoadSingleOpportunityFailed = IPlainFailAction<'NPO_SERVICE:LOAD_SINGLE_OPPORTUNITY_FAILED'>;

export type IUpdateOpportunity = IAction<'NPO_SERVICE:UPDATE_OPPORTUNITY', ICreateOpportunityForm>;
export type IUpdateOpportunitySuccess = IAction<'NPO_SERVICE:UPDATE_OPPORTUNITY_SUCCESS', IOpportunityResponse>;
export type IUpdateOpportunityFailed = IPlainFailAction<'NPO_SERVICE:UPDATE_OPPORTUNITY_FAILED'>;

export type Action =
  | ISetCurrentOrganization
  | IUpdateOrganizationLogo
  | ILoadUserOrganizations
  | ILoadUserOrganizationsSuccess
  | ILoadUserOrganizationsFailed
  | IChangeCurrentOrganization
  | ILoadOpportunities
  | ILoadOpportunitiesSuccess
  | ILoadOpportunitiesFailed
  | IRequestNewOpportunityId
  | IRequestNewOpportunityIdSuccess
  | IRequestNewOpportunityIdFailed
  | IPublishOpportunity
  | IPublishOpportunitySuccess
  | IPublishOpportunityFailed
  | IUnpublishOpportunity
  | IUnpublishOpportunitySuccess
  | IUnpublishOpportunityFailed
  | IUploadOpportunityLogo
  | IUploadOpportunityLogoSuccess
  | IUploadOpportunityLogoFailed
  | ILoadSingleOpportunity
  | ILoadSingleOpportunitySuccess
  | ILoadSingleOpportunityFailed
  | IUpdateOpportunity
  | IUpdateOpportunitySuccess
  | IUpdateOpportunityFailed
  | ISetUploadOpportunityLogoProgress;
