import { IReduxEntry } from 'shared/types/app';
import { actions, selectors, reducer, getSaga } from './redux';
import * as namespace from './namespace';
import UserService from './view/UserService';
import UserServiceInterceptor from './UserServiceInterceptor';

export { namespace, selectors, actions, UserService, UserServiceInterceptor };

export const reduxEntry: IReduxEntry = {
	reducers: { userService: reducer },
	sagas: [getSaga],
};
