import { Store } from 'redux';
import { bind } from 'decko';
import { IAppReduxState } from 'shared/types/app';
import * as actions from './redux/actions';

class UserServiceInterceptor {
	public static get instance() {
		this._instance = this._instance || new UserServiceInterceptor();
		return this._instance;
	}
	private static _instance: UserServiceInterceptor;
	private _store: Store<IAppReduxState> | null = null;

	public set store(store: Store<IAppReduxState>) {
		this._store = store;
	}

	@bind
	public responseInterceptor(response: any): Promise<void> {
		if (response.status === 401) {
			return this.handleResponse(response.config, response);
		}

		return Promise.resolve(response);
	}

	@bind
	private handleResponse(config: any, response: any): Promise<void> {
		this._store!.dispatch(actions.setAuthorizedStatus(false));
		return Promise.reject(response.data);
	}
}

const instance = UserServiceInterceptor.instance;
export default instance;
