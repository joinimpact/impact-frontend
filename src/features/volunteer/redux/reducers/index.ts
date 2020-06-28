import { combineReducers } from 'redux';
import * as NS from '../../namespace';

import { ReducersMap } from 'shared/types/redux';
import communicationReducer from './communication';

export default combineReducers<NS.IReduxState>({
  data: {},
  communications: communicationReducer,
} as ReducersMap<NS.IReduxState>);
