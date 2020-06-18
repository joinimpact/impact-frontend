import { IAction, ICommunication, IPlainFailAction } from 'shared/types/redux';
import Translate from './view/Translate';

export type TranslateFunction = (key: string, args?: Record<string, string>) => string;
export type TranslateArrayFunction = (key: string, args?: Record<string, string>) => string[];
export type Lang = 'en';
export type ILocales = {[key in Lang]: ILocale};

export interface ILocale {
  [key: string]: string;
}

export interface IReduxState {
  data: {
    locales: ILocales;
    currentLocale: Lang;
  };
  communications: {
    changeLanguage: ICommunication;
  };
}

export interface ITranslateProps {
  locale: Lang;
  Translate: typeof Translate;
  translate: TranslateFunction;
  translateArray: TranslateArrayFunction;
}

export interface IChangeLanguagePayload {
  language: Lang;
  locale: ILocale;
}

export type IChangeLanguage = IAction<'I18N_SERVICE:CHANGE_LANGUAGE', Lang>;
export type IChangeLanguageCompleted = IAction<'I18N_SERVICE:CHANGE_LANGUAGE_COMPLETED', IChangeLanguagePayload>;
export type IChangeLanguageFail = IPlainFailAction<'I18N_SERVICE:CHANGE_LANGUAGE_FAIL'>;

export type Action = IChangeLanguage | IChangeLanguageCompleted | IChangeLanguageFail;
