import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';

export interface IMenuItem {
  id: string;
  titleKey: string;
}

export interface IReduxState {
  communications: {
    search: ICommunication;
  };
  data: {};
}

export interface ISearchBarForm {
  search: string;
}

export type ISearch = IAction<'TOP-BAR:SEARCH', ISearchBarForm>;
export type ISearchSuccess = IPlainAction<'TOP-BAR:SEARCH_SUCCESS'>;
export type ISearchFailed = IPlainFailAction<'TOP-BAR:SEARCH_FAILED'>;

export type Action =
  | ISearch
  | ISearchSuccess
  | ISearchFailed;
