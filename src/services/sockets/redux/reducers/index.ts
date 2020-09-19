import { combineReducers } from 'redux';
import * as NS from '../../namespace';

import communicationReducer from './communication';
import { ReducersMap } from 'shared/types/redux';

export default combineReducers<NS.IReduxState>({
	communications: communicationReducer,
} as ReducersMap<NS.IReduxState>);
