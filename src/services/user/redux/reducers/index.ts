import * as NS from '../../namespace';
import { combineReducers } from 'redux';
import communicationReducer from './communication';
import dataReducer from './data';
import initial from '../initial';
import makeResetStateReducer from 'shared/redux/makeResetStateReducer';
import { IResetAppStateAction } from 'shared/redux/actions';
import { composeReducers } from 'shared/util/redux';

const baseReducer = combineReducers<NS.IReduxState>({
  data: dataReducer,
  communications: communicationReducer,
});

const appResetReducer = (state: NS.IReduxState): NS.IReduxState => {
  return {
    ...initial,
    data: {
      ...initial.data,
      isAuthRequested: state.data.isAuthRequested,
    },
  };
};

const resetReducer = makeResetStateReducer<IResetAppStateAction, NS.IReduxState>('APP:RESET', appResetReducer);

export default composeReducers([baseReducer, resetReducer]);
