import * as NS from '../../namespace';
import { makeCommunicationActionCreators } from 'shared/redux/communication';

export const {
  execute: loadSettings,
  completed: loadSettingsComplete,
  failed: loadSettingsFailed
} = makeCommunicationActionCreators<
  NS.ILoadSettings,
  NS.ILoadSettingsSuccess,
  NS.ILoadSettingsFailed
  >(
  'CONFIG:LOAD_SETTINGS',
  'CONFIG:LOAD_SETTINGS_SUCCESS',
  'CONFIG:LOAD_SETTINGS_FAILED',
);

export const {
  execute: loadFullSettings,
  completed: loadFullSettingsComplete,
  failed: loadFullSettingsFailed
} = makeCommunicationActionCreators<
  NS.ILoadFullSettings,
  NS.ILoadFullSettingsSuccess,
  NS.ILoadFullSettingsFailed
  >(
  'CONFIG:LOAD_FULL_SETTINGS',
  'CONFIG:LOAD_FULL_SETTINGS_SUCCESS',
  'CONFIG:LOAD_FULL_SETTINGS_FAILED',
);

export const {
  execute: updateSettings,
  completed: updateSettingsComplete,
  failed: updateSettingsFailed,
} = makeCommunicationActionCreators<
  NS.IUpdateSettings,
  NS.IUpdateSettingsSuccess,
  NS.IUpdateSettingsFailed
  >(
  'CONFIG:UPDATE_SETTINGS',
  'CONFIG:UPDATE_SETTINGS_SUCCESS',
  'CONFIG:UPDATE_SETTINGS_FAILED',
);
