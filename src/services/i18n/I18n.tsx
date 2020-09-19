import { Store } from 'redux';
import { ITranslateProp, TranslateArrayFunction, TranslateFunction } from 'services/i18n/namespace';
import { IAppReduxState } from 'shared/types/app';
import { bind } from 'decko';
import {
	selectCurrentLocale,
	selectCurrentStrings,
	selectLanguageLoaded,
	selectLanguageRequestingStatus,
} from 'services/i18n/redux/selectors';
import Translate from './view/Translate';
import * as actions from './redux/actions';
import config, { TLang } from 'config';

type Subscriber = () => void;

class I18n {
	public static get instance(): I18n {
		this._instance = this._instance || new I18n();
		return this._instance;
	}
	private static _instance: I18n;

	public actions: typeof actions = actions;
	public View: typeof Translate = Translate;

	private _locale: TLang = config.lang;
	private _subscribers: Set<Subscriber> = new Set();
	private _isLanguageRequesting = false;
	private _isLoaded = false;
	private _store: Store<IAppReduxState> | null = null;

	public set store(store: Store<IAppReduxState>) {
		this._store = store;
		this._store.subscribe(this.onStateChange);
	}

	public get locale() {
		return this._locale;
	}

	public get translate() {
		return this.translator;
	}

	public get translateArray() {
		return this.translatorArray;
	}

	public get isLoaded() {
		return this._isLoaded;
	}

	public subscribe(subscriber: Subscriber) {
		this._subscribers.add(subscriber);
	}

	public unsubscribe(subscriber: Subscriber) {
		this._subscribers.delete(subscriber);
	}

	@bind
	private onStateChange() {
		const state = this._store!.getState();
		const locale = selectCurrentLocale(state);
		const isLanguageRequesting = selectLanguageRequestingStatus(state);
		this._isLoaded = selectLanguageLoaded(state);

		if (locale !== this._locale || (!isLanguageRequesting && this._isLanguageRequesting)) {
			this._locale = locale;
			this.translator = (key, args) => this._translateString(key, args);
			this.translatorArray = (key, args) => this._translateArray(key, args);
			this._subscribers.forEach((subscriber) => subscriber());
		}

		this._isLanguageRequesting = isLanguageRequesting;
	}

	private translator: TranslateFunction = (key: any, args?: Record<string, ITranslateProp>) =>
		this._translateString(key, args);
	private translatorArray: TranslateArrayFunction = (key: any, args?: Record<string, ITranslateProp>) =>
		this._translateArray(key, args);

	/* tslint:disable:function-name */

	@bind
	private _translateString(key: string, args?: Record<string, ITranslateProp>): string {
		return this._translate(key, args) as string;
	}

	@bind
	private _translateArray(key: string, args?: Record<string, ITranslateProp>): string[] {
		return this._translate(key, args) as string[];
	}

	@bind
	private _translate(key: string, args?: Record<string, ITranslateProp>): React.ReactNode {
		const state = this._store!.getState();
		const strings = selectCurrentStrings(state);

		const translation = strings[key] !== undefined ? strings[key] : key;
		if (args) {
			return Array.isArray(translation)
				? translation.map((str: string) => this._objectTranslation(str, args))
				: this._objectTranslation(translation, args);
		}
		return translation;
	}

	private _lexParser(text: string, callback: (value: string) => ITranslateProp): React.ReactNode[] {
		const res: (string | React.ReactNode)[] = [];

		const rexp = /%{([\w\d]+?)}/g;
		let prevPos = 0;

		text.replace(rexp, (cmp: string, value: string, idx: number) => {
			const word = text.substring(prevPos, idx);
			prevPos = idx + cmp.length;
			if (word) {
				res.push(word);
			}
			res.push(callback(value));
			return cmp;
		});

		if (prevPos <= text.length - 1) {
			res.push(text.substring(prevPos, text.length));
		}

		return res;
	}

	private _objectTranslation(translation: string, params: Record<string, ITranslateProp>): React.ReactNode {
		const isNotString = Object.values(params).some((value) => typeof value !== 'string');
		const res: (string | React.ReactNode)[] = this._lexParser(translation, (key: string) => {
			return params[key];
		});
		// return translation.replace(/%{([\w\d]+?)}/g, (_, value) => params[value] as string);
		return isNotString ? res : res.join('');
	}
}

export default I18n;
export const instance = I18n.instance;
