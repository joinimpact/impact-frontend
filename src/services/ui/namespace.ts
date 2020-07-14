import { ILayoutType } from 'shared/types/app';
import { IAction } from 'shared/types/redux';

export interface IReduxState {
  data: {
    layoutType: ILayoutType;
  };
}

export type IChangeLayoutType = IAction<'UI:CHANGE_LAYOUT_TYPE', ILayoutType>;

export type Action =
  | IChangeLayoutType;
