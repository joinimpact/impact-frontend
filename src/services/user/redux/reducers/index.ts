import * as NS from '../../namespace';
import { combineReducers } from 'redux';
import communicationReducer from './communication';
import dataReducer from './data';

export default combineReducers<NS.IReduxState>({
  data: dataReducer,
  communication: communicationReducer,
});
