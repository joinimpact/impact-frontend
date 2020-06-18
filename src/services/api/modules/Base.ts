import HttpActions from '../HttpActions';
import storage, { LocalStorage } from '../LocalStorage';

class BaseApi {
  protected actions: HttpActions;
  protected storage: LocalStorage;

  constructor(actions: HttpActions) {
    this.actions = actions;
    this.storage = storage;
  }
}

export default BaseApi;
