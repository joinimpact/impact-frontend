import * as NS from '../../namespace';
import initial from '../initial';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'NPO_SERVICE:SET_CURRENT_ORGANIZATION':
      return {
        ...state,
        currentOrganization: action.payload,
      };
    case 'NPO_SERVICE:UPDATE_ORGANIZATION_LOGO':
      if (state.currentOrganization) {
        return {
          ...state,
          currentOrganization: {
            ...state.currentOrganization,
            profilePicture: action.payload,
          }
        };
      }
      return state;
    case 'NPO_SERVICE:LOAD_USER_ORGANIZATIONS_SUCCESS':
      return {
        ...state,
        isServiceReady: true,
        organizations: action.payload,
        currentOrganization: (
          state.currentOrganization || (action.payload || [])[0]
        )
      };
    case 'NPO_SERVICE:LOAD_USER_ORGANIZATIONS_FAILED':
      return {
        ...state,
        isServiceReady: true,
      };
    case 'NPO_SERVICE:CHANGE_CURRENT_ORGANIZATION':
      return {
        ...state,
        currentOrganization: action.payload,
      };
  }
  return state;
}

export default dataReducer;
