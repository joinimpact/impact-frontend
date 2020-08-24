import { combineReducers } from 'redux';
import * as NS from '../../namespace';

import { ReducersMap } from 'shared/types/redux';
import dataReducer from './data';

export default combineReducers<NS.IReduxState>({
  data: dataReducer,
} as ReducersMap<NS.IReduxState>);
