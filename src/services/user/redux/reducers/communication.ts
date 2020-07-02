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
    initial.communications.logout,
  ),
  loadTags: makeCommunicationReducer<
    NS.ILoadUserTags,
    NS.ILoadUserTagsSuccess,
    NS.ILoadUserTagsFailed
    >(
    'USER_SERVICE:LOAD_USER_TAGS',
    'USER_SERVICE:LOAD_USER_TAGS_SUCCESS',
    'USER_SERVICE:LOAD_USER_TAGS_FAILED',
    initial.communications.loadTags,
  ),
} as ReducersMap<NS.IReduxState['communications']>);
