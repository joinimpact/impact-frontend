import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { makeCommunicationReducer } from 'shared/redux/communication';
import initial from '../initial';

export default combineReducers<NS.IReduxState['communication']>({
  loadSettings: makeCommunicationReducer<
    NS.ILoadSettings,
    NS.ILoadSettingsSuccess,
    NS.ILoadSettingsFailed
    >(
    'CONFIG:LOAD_SETTINGS',
    'CONFIG:LOAD_SETTINGS_SUCCESS',
    'CONFIG:LOAD_SETTINGS_FAILED',
    initial.communication.loadSettings,
  ),
  loadFullSettings: makeCommunicationReducer<
    NS.ILoadFullSettings,
    NS.ILoadFullSettingsSuccess,
    NS.ILoadFullSettingsFailed
    >(
    'CONFIG:LOAD_FULL_SETTINGS',
    'CONFIG:LOAD_FULL_SETTINGS_SUCCESS',
    'CONFIG:LOAD_FULL_SETTINGS_FAILED',
    initial.communication.loadFullSettings,
  ),
  updateSettings: makeCommunicationReducer<
    NS.IUpdateSettings,
    NS.IUpdateSettingsSuccess,
    NS.IUpdateSettingsFailed
    >(
    'CONFIG:UPDATE_SETTINGS',
    'CONFIG:UPDATE_SETTINGS_SUCCESS',
    'CONFIG:UPDATE_SETTINGS_FAILED',
    initial.communication.updateSettings,
  )
});
