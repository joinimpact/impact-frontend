import { combineReducers } from 'redux';
import * as NS from '../../namespace';

import { ReducersMap } from 'shared/types/redux';
import communicationReducer from './communication';
import dataReducer from './data';
import uiReducer from './ui';

export default combineReducers<NS.IReduxState>({
  data: dataReducer,
  communications: communicationReducer,
  ui: uiReducer,
} as ReducersMap<NS.IReduxState>);
