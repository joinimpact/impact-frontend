import { takeLatest, call, put, all } from 'redux-saga/effects';
import { IDependencies } from 'shared/types/app';
import * as actions from './actions';
import moment from 'services/moment';
import { IChangeLanguage, ILocale } from '../namespace';
import { getErrorMsg } from 'services/api';

function getSaga({ api }: IDependencies) {
  function* executeLanguageLoading({ payload: language }: IChangeLanguage) {
    try {
      const languageTranslations: ILocale = yield call(api.storage.changeLanguage, language);
      moment.updateLocale(language, {});
      yield put(actions.changeLanguageCompleted({
        language,
        locale: languageTranslations,
      }));
    } catch (error) {
      yield put(actions.changeLanguageFail(getErrorMsg(error)));
    }
  }

  function* saga() {
    yield all([
      takeLatest('I18N_SERVICE:CHANGE_LANGUAGE', executeLanguageLoading)
    ]);
  }

  return saga;
}

export default getSaga;
