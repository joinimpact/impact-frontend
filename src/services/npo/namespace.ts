import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';
import { IOrganizationsResponseItem, IUserOrganizationsResponse } from 'shared/types/responses/npo';

type TUserOrganizations = IUserOrganizationsResponse['organizations'];

export interface IReduxState {
  communications: {
    loadUserOrganizations: ICommunication;
  };
  data: {
    currentOrganization: IOrganizationsResponseItem | null;
    organizations: TUserOrganizations | null;
    isServiceReady: boolean;
  };
}

export type ISetCurrentOrganization = IAction<'NPO_SERVICE:SET_CURRENT_ORGANIZATION', IOrganizationsResponseItem>;
export type IUpdateOrganizationLogo = IAction<'NPO_SERVICE:UPDATE_ORGANIZATION_LOGO', string>;
export type IChangeCurrentOrganization = IAction<'NPO_SERVICE:CHANGE_CURRENT_ORGANIZATION', IOrganizationsResponseItem>;

export type ILoadUserOrganizations = IPlainAction<'NPO_SERVICE:LOAD_USER_ORGANIZATIONS'>;
export type ILoadUserOrganizationsSuccess = IAction<'NPO_SERVICE:LOAD_USER_ORGANIZATIONS_SUCCESS', TUserOrganizations>;
export type ILoadUserOrganizationsFailed = IPlainFailAction<'NPO_SERVICE:LOAD_USER_ORGANIZATIONS_FAILED'>;

export type Action =
  | ISetCurrentOrganization
  | IUpdateOrganizationLogo
  | ILoadUserOrganizations
  | ILoadUserOrganizationsSuccess
  | ILoadUserOrganizationsFailed
  | IChangeCurrentOrganization;
