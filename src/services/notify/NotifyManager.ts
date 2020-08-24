import { Store } from 'redux';
import * as actions from './redux/actions';
import ReferenceManager from 'core/ReferenceManager';
import NotifyConsumer from 'services/notify/NotifyConsumer';
import { IAppReduxState } from 'shared/types/app';
import { IMessage } from 'shared/types/models/notify';
import { bind } from 'decko';

class NotifyManager extends ReferenceManager<NotifyConsumer> {
  public static get instance(): NotifyManager {
    this._instance = this._instance || new NotifyManager();
    return this._instance;
  }
  private static _instance: NotifyManager;
  private _store: Store<IAppReduxState> | null = null;

  public set store(store: Store<IAppReduxState>) {
    this._store = store;
  }

  @bind
  public notifyError(message: string) {
    this._store!.dispatch(actions.addMessage({
      type: 'ERROR',
      body: message,
    }));
  }

  @bind
  public notifyWarn(message: string) {
    this._store!.dispatch(actions.addMessage({
      type: 'WARN',
      body: message,
    }));
  }

  @bind
  public notifyInfo(message: string) {
    this._store!.dispatch(actions.addMessage({
      type: 'INFO',
      body: message,
    }));
  }

  @bind
  public notifyMessage(message: IMessage) {
    this._store!.dispatch(actions.addMessage(message));
  }
}

export default NotifyManager;
export const instance = NotifyManager.instance;
