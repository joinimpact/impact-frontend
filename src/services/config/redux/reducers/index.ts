import { combineReducers } from 'redux';
import * as NS from '../../namespace';

import communicationReducer from './communication';
import uiReducer from './ui';
import dataReducer from './data';
import { ReducersMap } from 'shared/types/redux';

export default combineReducers<NS.IReduxState>({
	ui: uiReducer,
	data: dataReducer,
	communication: communicationReducer,
} as ReducersMap<NS.IReduxState>);
