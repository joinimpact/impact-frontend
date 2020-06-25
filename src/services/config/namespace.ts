import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';
import { ISettings } from 'shared/types/settings';
import { ValueOf } from 'shared/types/app';

export interface IReduxState {
  communication: {
    updateSettings: ICommunication;
    loadFullSettings: ICommunication;
    loadSettings: ICommunication;
  };
  data: {
    settings: ISettings;
  };
  ui: {
    title: string;
  };
}

export type IChangeTitle = IAction<'CONFIG:CHANGE_TITLE', string | void>;

export interface IUpdateSettingsPayload {
  key: keyof ISettings;
  value: ValueOf<ISettings>;
}

export interface ILoadSettingsPayload {
  key: keyof ISettings;
}

export type ILoadFullSettings = IPlainAction<'CONFIG:LOAD_FULL_SETTINGS'>;
export type ILoadFullSettingsSuccess = IAction<'CONFIG:LOAD_FULL_SETTINGS_SUCCESS', ISettings>;
export type ILoadFullSettingsFailed = IPlainFailAction<'CONFIG:LOAD_FULL_SETTINGS_FAILED'>;

export type ILoadSettings = IAction<'CONFIG:LOAD_SETTINGS', ILoadSettingsPayload>;
export type ILoadSettingsSuccess = IAction<'CONFIG:LOAD_SETTINGS_SUCCESS', IUpdateSettingsPayload>;
export type ILoadSettingsFailed = IPlainFailAction<'CONFIG:LOAD_SETTINGS_FAILED'>;

export type IUpdateSettings = IAction<'CONFIG:UPDATE_SETTINGS', IUpdateSettingsPayload>;
export type IUpdateSettingsSuccess = IPlainAction<'CONFIG:UPDATE_SETTINGS_SUCCESS'>;
export type IUpdateSettingsFailed = IPlainFailAction<'CONFIG:UPDATE_SETTINGS_FAILED'>;


export type Action =
  | IChangeTitle
  | ILoadSettings
  | ILoadSettingsSuccess
  | ILoadSettingsFailed
  | ILoadFullSettings
  | ILoadFullSettingsSuccess
  | ILoadFullSettingsFailed
  | IUpdateSettings
  | IUpdateSettingsSuccess
  | IUpdateSettingsFailed;
