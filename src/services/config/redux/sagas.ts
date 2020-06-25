import { all, takeLatest, takeEvery, put, call } from 'redux-saga/effects';
import { IDependencies } from 'shared/types/app';
import * as NS from '../namespace';
import * as actions from './actions';
import config from 'config';
import { getErrorMsg } from 'services/api';
import { actions as langActions } from 'services/i18n';
import { ISettings } from 'shared/types/settings';

const changeTitleType: NS.IChangeTitle['type'] = 'CONFIG:CHANGE_TITLE';
const loadFullSettingsType: NS.ILoadFullSettings['type'] = 'CONFIG:LOAD_FULL_SETTINGS';
const loadSettingsType: NS.ILoadSettings['type'] = 'CONFIG:LOAD_SETTINGS';
const updateSettingsType: NS.IUpdateSettings['type'] = 'CONFIG:UPDATE_SETTINGS';

export default function getSaga(deps: IDependencies) {
  return function* saga() {
    yield all([
      takeLatest(changeTitleType, executeChangeTitle),
      takeEvery(updateSettingsType, executeUpdateSettings, deps),
      takeEvery(loadSettingsType, executeLoadSettings, deps),
      takeEvery(loadFullSettingsType, executeLoadFullSettings, deps),
    ]);
  };
}

function* executeChangeTitle({ payload }: NS.IChangeTitle) {
  document.title = payload ? `${payload} | ${config.title}` : config.title;
}

function* executeUpdateSettings({ api }: IDependencies, { payload }: NS.IUpdateSettings) {
  try {
    yield call(api.storage.updateSettings, payload.key, payload.value);
    yield put(actions.updateSettingsComplete());
  } catch (error) {
    yield put(actions.updateSettingsFailed(getErrorMsg(error)));
  }
}

function* executeLoadSettings({ api }: IDependencies, { payload }: NS.ILoadSettings) {
  try {
    const settings: ISettings = yield call(api.storage.loadSettings);
    yield put(actions.loadSettingsComplete({
      key: payload.key,
      value: settings[payload.key],
    }));
  } catch (error) {
    yield put(actions.loadSettingsFailed(getErrorMsg(error)));
  }
}

function* executeLoadFullSettings({ api }: IDependencies) {
  try {
    const settings: ISettings = yield call(api.storage.loadSettings);
    yield put(actions.loadFullSettingsComplete(settings));
    yield put(langActions.setLanguage(settings.language));
  } catch (error) {
    yield put(actions.loadFullSettingsFailed(getErrorMsg(error)));
  }
}

