import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { ReducersMap } from 'shared/types/redux';
import { makeCommunicationReducer } from 'shared/redux/communication';
import initial from '../initial';

export default combineReducers({
  logout: makeCommunicationReducer<
    NS.ILogout,
    NS.ILogoutSuccess,
    NS.ILogoutFailed
    >(
    'USER_SERVICE:LOGOUT',
    'USER_SERVICE:LOGOUT_SUCCESS',
    'USER_SERVICE:LOGOUT_FAILED',
    initial.communication.logout,
  ),
} as ReducersMap<NS.IReduxState['communication']>);
