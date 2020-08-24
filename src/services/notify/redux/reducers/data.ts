import * as NS from '../../namespace';
import initial from '../initial';
import uuid from 'uuid';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'NOTIFY_SERVICE:ADD_MESSAGE':
      return {
        ...state,
        stack: [
          ...state.stack,
          {
            ...action.payload,
            id: uuid(),
          }
        ],
      };
    case 'NOTIFY_SERVICE:REMOVE_MESSAGE':
      return {
        ...state,
        stack: state.stack.filter(message => message.id !== action.payload),
      };
  }

  return state;
}

export default dataReducer;
