import BaseApi from './Base';
import { bind } from 'decko';

class StorageApi extends BaseApi {

  @bind
  public async changeLanguage(language: string) {
    this.storage.set('lang', language);
    return require(`shared/lang/${language}.json`);
  }
}

export default StorageApi;
