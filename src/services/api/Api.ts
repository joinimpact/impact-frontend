import { bind } from 'decko';
import HttpActions from './HttpActions';
import { ApiErrorInterceptor } from './namespace';
import StorageApi from './modules/Storage';
import AuthApi from './modules/Auth';

class Api {
  public storage: StorageApi;
  public auth: AuthApi;
  private readonly actions: HttpActions;
  private errorInterceptors: ApiErrorInterceptor[] = [];

  constructor() {
    this.actions = new HttpActions('', this.errorInterceptors);
    this.storage = new StorageApi(this.actions);
    this.auth = new AuthApi(this.actions);
  }

  @bind
  public addErrorInterceptor(errorInterceptor: ApiErrorInterceptor) {
    this.errorInterceptors.push(errorInterceptor);
  }
}

export default Api;
