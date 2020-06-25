import * as NS from '../../namespace';
import initial from '../initial';

function uiReducer(state: NS.IReduxState['ui'] = initial.ui, action: NS.Action): NS.IReduxState['ui'] {
  switch (action.type) {
    case 'CONFIG:CHANGE_TITLE':
      return {
        ...state,
        title: action.payload || '',
      };
  }

  return state;
}

export default uiReducer;
