import { IAction } from 'shared/types/redux';
import { IOrganization } from 'shared/types/models/organization';

export interface IReduxState {
  data: {
    currentOrganization: IOrganization | null;
  };
}

export type ISetCurrentOrganization = IAction<'NPO_SERVICE:SET_CURRENT_ORGANIZATION', IOrganization>;
export type IUpdateOrganizationLogo = IAction<'NPO_SERVICE:UPDATE_ORGANIZATION_LOGO', string>;

export type Action =
  | ISetCurrentOrganization
  | IUpdateOrganizationLogo;
