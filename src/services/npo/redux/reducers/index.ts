import * as NS from '../../namespace';
import { combineReducers } from 'redux';
import dataReducer from './data';

export default combineReducers<NS.IReduxState>({
  data: dataReducer,
});
