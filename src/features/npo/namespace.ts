import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';
import { IAddressLocation } from 'shared/types/requests/auth';
import { IGoogleAddressSuggestion } from 'shared/view/redux-form/CountryField/CountryField';
import { INewOpportunityResponse, IOpportunityResponse } from 'shared/types/responses/npo';

export interface IReduxState {
  communications: {
    createOrganization: ICommunication;
    uploadOrgLogo: ICommunication;
    saveOrganizationTags: ICommunication;
    saveOrganizationMembers: ICommunication;
    loadOrganizationTags: ICommunication;
    requestNewOpportunityId: ICommunication;
    createNewOpportunity: ICommunication;

    uploadOpportunityLogo: ICommunication;
  };
  data: {
    uploadLogoProgress: number | null;
    currentOpportunity: IOpportunityResponse | null;
    uploadOpportunityLogoProgress: number | null;
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
  email: string;
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
export type IUpdateOpportunitySuccess = IPlainAction<'NPO:UPDATE_OPPORTUNITY_SUCCESS'>;
export type IUpdateOpportunityFailed = IPlainFailAction<'NPO:UPDATE_OPPORTUNITY_FAILED'>;

export type IUploadOpportunityLogo = IAction<'NPO:UPLOAD_OPPORTUNITY_LOGO', File>;
export type IUploadOpportunityLogoSuccess = IAction<'NPO:UPLOAD_OPPORTUNITY_LOGO_SUCCESS', string>;
export type IUploadOpportunityLogoFailed = IPlainFailAction<'NPO:UPLOAD_OPPORTUNITY_LOGO_FAILED'>;

export type ISetUploadOpportunityLogoProgress = IAction<'NPO:SET_UPLOAD_OPPORTUNITY_LOGO_PROGRESS', number | null>;

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
  | ISetUploadOpportunityLogoProgress;
