import * as NS from '../../namespace';
import initial from '../initial';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'NPO_SERVICE:SET_CURRENT_ORGANIZATION':
      return {
        ...state,
        currentOrganization: action.payload,
      };
  }
  return state;
}

export default dataReducer;
