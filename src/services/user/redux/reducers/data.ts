import * as NS from '../../namespace';
import initial from '../initial';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'USER_SERVICE:SET_AUTHORIZED_STATUS': {
      return {
        ...state,
        isAuthorized: action.payload,
      };
    }
    case 'USER_SERVICE:LOGOUT_SUCCESS':
      return {
        ...state,
        isAuthorized: false,
        logoutRequested: false,
      };
    case 'USER_SERVICE:REQUEST_LOGOUT':
      return { ...state, logoutRequested: true, };
    case 'USER_SERVICE:RESET_REQUEST_LOGOUT':
      return { ...state, logoutRequested: false };
  }
  return state;
}

export default dataReducer;
