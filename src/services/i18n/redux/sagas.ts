import { takeLatest, call, put, all } from 'redux-saga/effects';
import { IDependencies } from 'shared/types/app';
import * as actions from './actions';
// import { actions as configActions } from 'services/config';
import moment from 'services/moment';
import { IChangeLanguage, ISetLanguage, ILocale } from '../namespace';
import { getErrorMsg } from 'services/api';

const changeLanguageType: IChangeLanguage['type'] = 'I18N_SERVICE:CHANGE_LANGUAGE';
const setLanguageType: ISetLanguage['type'] = 'I18N_SERVICE:SET_LANGUAGE';

function getSaga(deps: IDependencies) {
	function* saga() {
		yield all([
			takeLatest(changeLanguageType, executeLanguageLoading, deps),
			takeLatest(setLanguageType, executeSetLanguage, deps),
		]);
	}

	return saga;
}

function* executeSetLanguage({ api }: IDependencies, { payload: language }: ISetLanguage) {
	try {
		const languageTranslations: ILocale = yield call(api.storage.changeLanguage, language);
		moment.updateLocale(language, {});
		yield put(
			actions.setLanguageComplete({
				language,
				locale: languageTranslations,
			}),
		);
	} catch (error) {
		yield put(actions.setLanguageFail(getErrorMsg(error)));
	}
}

function* executeLanguageLoading({ api }: IDependencies, { payload: language }: IChangeLanguage) {
	try {
		// Change language and load dictionary
		yield put(actions.setLanguage(language));
		// And then save to settings
		/* yield put(configActions.updateSettings({
      key: 'language',
      value: language,
    }));*/
		yield put(actions.changeLanguageCompleted());
	} catch (error) {
		yield put(actions.changeLanguageFail(getErrorMsg(error)));
	}
}

export default getSaga;
