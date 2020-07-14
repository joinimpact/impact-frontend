import { combineReducers } from 'redux';
import * as NS from '../../namespace';

import { ReducersMap } from 'shared/types/redux';
import communicationReducer from './communication';
import dataReducer from './data';
import modalReducer from './modal';

export default combineReducers<NS.IReduxState>({
  data: dataReducer,
  modal: modalReducer,
  communications: communicationReducer,
} as ReducersMap<NS.IReduxState>);
