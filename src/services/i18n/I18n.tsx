import { Store } from 'redux';
import { Lang, TranslateArrayFunction, TranslateFunction } from 'services/i18n/namespace';
import { IAppReduxState } from 'shared/types/app';
import { bind } from 'decko';
import {
  selectCurrentLocale,
  selectCurrentStrings,
  selectLanguageRequestingStatus,
} from 'services/i18n/redux/selectors';
import Translate from './view/Translate';
import * as actions from './redux/actions';

type Subscriber = () => void;

class I18n {
  public static get instance(): I18n {
    this._instance = this._instance || new I18n();
    return this._instance;
  }
  private static _instance: I18n;

  public actions: typeof actions = actions;
  public View: typeof Translate = Translate;

  private _locale: Lang = 'en';
  private _subscribers: Set<Subscriber> = new Set();
  private _isLanguageRequesting: boolean = false;
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

    if (locale !== this._locale || (!isLanguageRequesting && this._isLanguageRequesting)) {
      this._locale = locale;
      this.translator = (key, args) => this._translateString(key, args);
      this.translatorArray = (key, args) => this._translateArray(key, args);
      this._subscribers.forEach(subscriber => subscriber());
    }

    this._isLanguageRequesting = isLanguageRequesting;
  }

  private translator: TranslateFunction = (key: any, args?: Record<string, string>) => this._translateString(key, args);
  private translatorArray: TranslateArrayFunction = (key: any, args?: Record<string, string>) =>
    this._translateArray(key, args);

  /* tslint:disable:function-name */

  @bind
  private _translateString(key: string, args?: Record<string, string>): string {
    return this._translate(key, args) as string;
  }

  @bind
  private _translateArray(key: string, args?: Record<string, string>): string[] {
    return this._translate(key, args) as string[];
  }

  @bind
  private _translate(key: string, args?: Record<string, string>): string | string[] {
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

  private _objectTranslation(translation: string, params: Record<string, string>): string {
    return translation.replace(/%{([\w\d]+?)}/g, (_, value) => params[value]);
  }
}

export default I18n;
export const instance = I18n.instance;
