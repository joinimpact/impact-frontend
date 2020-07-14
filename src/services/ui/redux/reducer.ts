import { combineReducers, Reducer } from 'redux';
import * as NS from '../namespace';
import { initial } from './initial';

const dataReducer = (state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] => {
  switch (action.type) {
    case 'UI:CHANGE_LAYOUT_TYPE':
      return {
        ...state,
        layoutType: action.payload,
      };
  }

  return state;
};

const reducer: Reducer<NS.IReduxState> = combineReducers<NS.IReduxState>({
  data: dataReducer,
});

export default reducer;
