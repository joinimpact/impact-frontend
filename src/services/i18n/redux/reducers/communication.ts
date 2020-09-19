import { makeCommunicationReducer } from 'shared/redux/communication';
import { combineReducers } from 'redux';
import initial from '../initial';
import * as NS from '../../namespace';
import { ReducersMap } from 'shared/types/redux';

export default combineReducers({
	changeLanguage: makeCommunicationReducer<NS.IChangeLanguage, NS.IChangeLanguageCompleted, NS.IChangeLanguageFail>(
		'I18N_SERVICE:CHANGE_LANGUAGE',
		'I18N_SERVICE:CHANGE_LANGUAGE_COMPLETED',
		'I18N_SERVICE:CHANGE_LANGUAGE_FAIL',
		initial.communications.changeLanguage,
	),
	setLanguage: makeCommunicationReducer<NS.ISetLanguage, NS.ISetLanguageComplete, NS.ISetLanguageFail>(
		'I18N_SERVICE:SET_LANGUAGE',
		'I18N_SERVICE:SET_LANGUAGE_COMPLETED',
		'I18N_SERVICE:SET_LANGUAGE_FAIL',
		initial.communications.setLanguage,
	),
} as ReducersMap<NS.IReduxState['communications']>);
