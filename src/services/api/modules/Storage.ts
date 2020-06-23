import BaseApi from './Base';
import { bind } from 'decko';
import { ValueOf } from 'shared/types/app';
import { defaultSettings } from 'shared/defaults/settings';
import { ISettings } from 'shared/types/settings';

class StorageApi extends BaseApi {

  @bind
  public async changeLanguage(language: string) {
    this.storage.set('lang', language);
    return require(`shared/lang/${language}.json`);
  }

  @bind
  public loadSettings(): ISettings {
    return this.storage.get('settings', defaultSettings);
  }

  @bind
  public updateSettings(key: keyof ISettings, value: ValueOf<ISettings>) {
    const settings = this.loadSettings();
    this.storage.set('settings', {
      ...settings,
      [key]: value,
    });
  }
}

export default StorageApi;
