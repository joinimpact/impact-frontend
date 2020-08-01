import { bind } from 'decko';
import HttpActions from './HttpActions';
import { ApiErrorInterceptor } from './namespace';
import StorageApi from './modules/Storage';
import AuthApi from './modules/Auth';
import NPOApi from './modules/NPO';
import VolunteerApi from './modules/Volunteer';
import EventsApi from './modules/Events';

class Api {
  public static get instance(): Api {
    this._instance = this._instance || new Api();
    return this._instance;
  }
  private static _instance: Api;

  public storage: StorageApi;
  public auth: AuthApi;
  public npo: NPOApi;
  public volunteer: VolunteerApi;
  public events: EventsApi;
  private readonly actions: HttpActions;
  private errorInterceptors: ApiErrorInterceptor[] = [];

  constructor() {
    this.actions = new HttpActions('', this.errorInterceptors);
    this.storage = new StorageApi(this.actions);
    this.auth = new AuthApi(this.actions);
    this.npo = new NPOApi(this.actions);
    this.volunteer = new VolunteerApi(this.actions);
    this.events = new EventsApi(this.actions);
  }

  @bind
  public addErrorInterceptor(errorInterceptor: ApiErrorInterceptor) {
    this.errorInterceptors.push(errorInterceptor);
  }
}

export default Api;
