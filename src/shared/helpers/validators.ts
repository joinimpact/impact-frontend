import { i18nInstance } from 'services/i18n';

export function required(value: string | undefined): string | undefined {
	return typeof value !== 'undefined' && value != null && String(value).trim()
		? undefined
		: i18nInstance.translate('SHARED:ERROR:FIELD-IS-REQUIRED');
}

export function validateEmail(value: string | undefined): string | undefined {
	// tslint:disable-next-line:max-line-length
	const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return value && !emailReg.test(value) ? i18nInstance.translate('SHARED:ERROR:INVALID-EMAIL') : undefined;
}

export function minLengthValidatorGenerator(minLength: number) {
	return (value: string | null) => {
		if (value && value.length < minLength) {
			return i18nInstance.translate('SHARED:ERROR:FIELD-IS-TO-SHORT', { num: minLength });
		}
	};
}

export function validateUrlFormat(value: string | null) {
	if (value && !/https?\:\/\/[^\/]/.test(value)) {
		return i18nInstance.translate('SHARED:ERROR:URL-NOT-CORRECT');
	}
}
