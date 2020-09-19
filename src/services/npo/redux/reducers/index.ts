import * as NS from '../../namespace';
import { combineReducers } from 'redux';
import dataReducer from './data';
import communicationReducers from './communication';
import initial from '../initial';
import makeResetStateReducer from 'shared/redux/makeResetStateReducer';
import { IResetAppStateAction } from 'shared/redux/actions';
import { composeReducers } from 'shared/util/redux';

const baseReducer = combineReducers<NS.IReduxState>({
	communications: communicationReducers,
	data: dataReducer,
});

const resetReducer = makeResetStateReducer<IResetAppStateAction, NS.IReduxState>('APP:RESET', initial);
export default composeReducers([baseReducer, resetReducer]);
