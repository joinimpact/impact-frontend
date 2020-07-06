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
    case 'USER_SERVICE:SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };
    case 'USER_SERVICE:LOAD_TAGS_SUCCESS':
      return { ...state, tags: action.payload };
    case 'USER_SERVICE:LOAD_USER_TAGS_SUCCESS':
      return { ...state, userTags: action.payload };
    case 'USER_SERVICE:LOAD_SUCCESS':
      return {
        ...state,
        // TODO: We need to save user with ID in storage, when server will have correct response for me.
      };
  }
  return state;
}

export default dataReducer;
