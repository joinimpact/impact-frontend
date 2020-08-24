import { combineReducers } from 'redux';
import * as NS from '../../namespace';

import { ReducersMap } from 'shared/types/redux';
import communicationReducer from './communication';
import dataReducer from './data';

export default combineReducers<NS.IReduxState>({
  data: dataReducer,
  communications: communicationReducer,
} as ReducersMap<NS.IReduxState>);
