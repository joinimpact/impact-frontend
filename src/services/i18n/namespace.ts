import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';
import Translate from './view/Translate';
import { TLang } from 'config';

export type ITranslateProp = string | number | React.ReactNode;
export type TranslateFunction = (key: string, args?: Record<string, ITranslateProp>) => string;
export type TranslateArrayFunction = (key: string, args?: Record<string, ITranslateProp>) => string[];
export type ILocales = { [key in TLang]: ILocale };

export interface ILocale {
	[key: string]: string;
}

export interface IReduxState {
	communications: {
		changeLanguage: ICommunication; // load dictionary and save to settings
		setLanguage: ICommunication; // load dictionary
	};
	data: {
		locales: ILocales;
		currentLocale: TLang;
	};
}

export interface ITranslateProps {
	locale: TLang;
	Translate: typeof Translate;
	translate: TranslateFunction;
	translateArray: TranslateArrayFunction;
}

export interface IChangeLanguagePayload {
	language: TLang;
	locale: ILocale;
}

export type IChangeLanguage = IAction<'I18N_SERVICE:CHANGE_LANGUAGE', TLang>;
export type IChangeLanguageCompleted = IPlainAction<'I18N_SERVICE:CHANGE_LANGUAGE_COMPLETED'>;
export type IChangeLanguageFail = IPlainFailAction<'I18N_SERVICE:CHANGE_LANGUAGE_FAIL'>;

export type ISetLanguage = IAction<'I18N_SERVICE:SET_LANGUAGE', TLang>;
export type ISetLanguageComplete = IAction<'I18N_SERVICE:SET_LANGUAGE_COMPLETED', IChangeLanguagePayload>;
export type ISetLanguageFail = IPlainFailAction<'I18N_SERVICE:SET_LANGUAGE_FAIL'>;

export type Action =
	| IChangeLanguage
	| IChangeLanguageCompleted
	| IChangeLanguageFail
	| ISetLanguage
	| ISetLanguageComplete
	| ISetLanguageFail;
