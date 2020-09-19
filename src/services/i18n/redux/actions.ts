import { makeCommunicationActionCreators } from 'shared/redux/communication';

import * as NS from './../namespace';

export const {
	execute: changeLanguage,
	completed: changeLanguageCompleted,
	failed: changeLanguageFail,
} = makeCommunicationActionCreators<NS.IChangeLanguage, NS.IChangeLanguageCompleted, NS.IChangeLanguageFail>(
	'I18N_SERVICE:CHANGE_LANGUAGE',
	'I18N_SERVICE:CHANGE_LANGUAGE_COMPLETED',
	'I18N_SERVICE:CHANGE_LANGUAGE_FAIL',
);

export const {
	execute: setLanguage,
	completed: setLanguageComplete,
	failed: setLanguageFail,
} = makeCommunicationActionCreators<NS.ISetLanguage, NS.ISetLanguageComplete, NS.ISetLanguageFail>(
	'I18N_SERVICE:SET_LANGUAGE',
	'I18N_SERVICE:SET_LANGUAGE_COMPLETED',
	'I18N_SERVICE:SET_LANGUAGE_FAIL',
);
