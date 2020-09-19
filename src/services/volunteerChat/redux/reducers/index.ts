import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import initial from '../initial';

import { ReducersMap } from 'shared/types/redux';
import communicationReducer from './communication';
import dataReducer from './data';
import makeResetStateReducer from 'shared/redux/makeResetStateReducer';
import { IResetAppStateAction } from 'shared/redux/actions';
import { composeReducers } from 'shared/util/redux';

const baseReducer = combineReducers<NS.IReduxState>({
	data: dataReducer,
	communications: communicationReducer,
} as ReducersMap<NS.IReduxState>);
const resetReducer = makeResetStateReducer<IResetAppStateAction, NS.IReduxState>('APP:RESET', initial);
export default composeReducers([baseReducer, resetReducer]);
