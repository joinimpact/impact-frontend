import { IAppReduxState } from 'shared/types/app';
import { ILocales, IReduxState } from '../namespace';

function getFeatureState(state: IAppReduxState): IReduxState {
	return state.i18n;
}

export function selectLocaleStrings(state: IAppReduxState, locale: keyof ILocales) {
	return getFeatureState(state).data.locales[locale];
}

export function selectCurrentLocale(state: IAppReduxState): keyof ILocales {
	return getFeatureState(state).data.currentLocale;
}

export function selectCurrentStrings(state: IAppReduxState): { [key: string]: string } {
	return getFeatureState(state).data.locales[state.i18n.data.currentLocale];
}

export function selectLanguageRequestingStatus(state: IAppReduxState): boolean {
	return getFeatureState(state).communications.setLanguage.isRequesting;
}

export function selectLanguageLoaded(state: IAppReduxState): boolean {
	const comm = getFeatureState(state).communications.setLanguage;
	return comm.isLoaded || !!comm.error;
}
