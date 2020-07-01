import { IAction } from 'shared/types/redux';
import { IOrganization } from 'shared/types/models/organization';

export interface IReduxState {
  data: {
    currentOrganization: IOrganization | null;
  };
}

export type ISetCurrentOrganization = IAction<'NPO_SERVICE:SET_CURRENT_ORGANIZATION', IOrganization>;

export type Action =
  | ISetCurrentOrganization;
