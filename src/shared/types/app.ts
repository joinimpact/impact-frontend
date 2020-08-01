import React from 'react';
import { RouteProps } from 'react-router';
import { History } from 'history';
import { Store, Reducer, ActionCreator, Action, Dispatch } from 'redux';
import { RouterState } from 'connected-react-router';
import { SagaIterator } from 'redux-saga';
import { FormStateMap } from 'redux-form';

import Api from 'services/api/Api';
import { TranslateFunction } from 'services/i18n/namespace';

import * as AuthFeatureNamespace from 'features/auth/namespace';
import * as TopBarFeatureNamespace from 'features/topBar/namespace';
import * as VolunteerFeatureNamespace from 'features/volunteer/namespace';
import * as NPOFeatureNamespace from 'features/npo/namespace';

import { namespace as i18nServiceNamespace } from 'services/i18n';
import { namespace as configServiceNamespace } from 'services/config';
import { namespace as userServiceNamespace } from 'services/user';
import { namespace as npoServiceNamespace } from 'services/npo';
import { namespace as uiServiceNamespace } from 'services/ui';
import { namespace as eventsServiceNamespace } from 'services/events';
// import { IFeatureSettings } from './settings';

export interface IReduxEntry {
  reducers?: { [key in keyof IAppReduxState]?: Reducer<IAppReduxState[key]> };
  sagas?: RootSaga[];
}

export type IDictionary<T, S extends keyof any = string> = { [key in S]: T };

export interface IFeatureEntry {
  containers?: Record<string, React.ComponentType<any>>;
  actionCreators?: Record<string, ActionCreator<Action>>;
  selectors?: Record<string, (state: any, ...args: any[]) => any>;
  reduxEntry?: IReduxEntry;
}

export abstract class Module {
  public getRoutes?(): React.ReactElement<RouteProps> | Array<React.ReactElement<RouteProps>>;
  public getReduxEntry?(): IReduxEntry;
}

export interface IAppData {
  appModules: Module[];
  store: Store<IAppReduxState>;
  history: History;
}

export interface IDependencies {
  api: Api;
  translate: TranslateFunction;
  dispatch: Dispatch;
}

export interface IAppReduxState {
  i18n: i18nServiceNamespace.IReduxState;
  auth: AuthFeatureNamespace.IReduxState;
  volunteer: VolunteerFeatureNamespace.IReduxState;
  npo: NPOFeatureNamespace.IReduxState;
  topBar: TopBarFeatureNamespace.IReduxState;
  configService: configServiceNamespace.IReduxState;
  userService: userServiceNamespace.IReduxState;
  npoService: npoServiceNamespace.IReduxState;
  ui: uiServiceNamespace.IReduxState;
  events: eventsServiceNamespace.IReduxState;
  form: FormStateMap;
  router: RouterState;
}

export type Omit<T, K extends keyof T> = T extends any ? Pick<T, Exclude<keyof T, K>> : never;
export type ValueOf<T> = T[keyof T];

export type RootSaga = (deps: IDependencies) => () => SagaIterator;

export type RecursivePartial<T> = {
  [P in keyof T]?:
  T[P] extends Array<infer U> ? Array<RecursivePartial<U>> :
    T[P] extends object ? RecursivePartial<T[P]> :
      T[P];
};

export interface IQueryParams {
  [param: string]: string;
}

export interface IRoutable {
  getPath(queryParams?: IQueryParams): string;
  getElementKey(): string;
}

export type TRouteTree<T> =  { [P in keyof T]: TRouteTree<T[P]> & IRoutable };

export type TUserType = 'volunteer' | 'npo';

export interface ISideBarRoute {
  title: string;
  icon?: JSX.Element;
  disabled?: boolean;
  route?: string;
  hashRoute?: string;
  onClick?: () => void;
}

export const defaultDateFormat = 'MM/DD/YYYY';
export const defaultDateAndTimeFormat = 'MMM D, YYYY, H:mmA';
export const fnsDefaultDateFormat = 'MM/dd/y';
export const fnsDefaultDateTimeFormat = 'MM/dd/y h:mm aaa';

export enum ILayoutType {
  desktop = 'desktop',
  mobile = 'mobile',
}
