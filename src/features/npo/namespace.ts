import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';
import { IAddressLocation } from 'shared/types/requests/auth';
import { IGoogleAddressSuggestion } from 'shared/view/redux-form/CountryField/CountryField';

export interface IReduxState {
  communications: {
    createOrganization: ICommunication;
    uploadOrgLogo: ICommunication;
    saveOrganizationTags: ICommunication;
    saveOrganizationMembers: ICommunication;
  };
  data: {};
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

export type ICreateOrganization = IAction<'NPO:CREATE_ORGANIZATION', ICreateNewOrganizationValues>;
export type ICreateOrganizationSuccess = IPlainAction<'NPO:CREATE_ORGANIZATION_SUCCESS'>;
export type ICreateOrganizationFailed = IPlainFailAction<'NPO:CREATE_ORGANIZATION_FAILED'>;

export type IUploadOrgLogo = IAction<'NPO:UPLOAD_ORG_LOGO', File>;
export type IUploadOrgLogoSuccess = IPlainAction<'NPO:UPLOAD_ORG_LOGO_SUCCESS'>;
export type IUploadOrgLogoFailed = IPlainFailAction<'NPO:UPLOAD_ORG_LOGO_FAILED'>;

export type ISaveOrganizationTags = IAction<'NPO:SAVE_ORGANIZATION_TAGS', string[]>;
export type ISaveOrganizationTagsSuccess = IPlainAction<'NPO:SAVE_ORGANIZATION_TAGS_SUCCESS'>;
export type ISaveOrganizationTagsFailed = IPlainFailAction<'NPO:SAVE_ORGANIZATION_TAGS_FAILED'>;

export type ISaveOrganizationMembers = IAction<'NPO:SAVE_ORGANIZATION_MEMBERS', string[]>;
export type ISaveOrganizationMembersSuccess = IPlainAction<'NPO:SAVE_ORGANIZATION_MEMBERS_SUCCESS'>;
export type ISaveOrganizationMembersFailed = IPlainFailAction<'NPO:SAVE_ORGANIZATION_MEMBERS_FAILED'>;

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
  | ISaveOrganizationMembersFailed;
