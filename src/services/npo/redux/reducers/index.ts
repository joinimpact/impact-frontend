import * as NS from '../../namespace';
import { combineReducers } from 'redux';
import dataReducer from './data';
import communicationReducers from './communication';

export default combineReducers<NS.IReduxState>({
  communications: communicationReducers,
  data: dataReducer,
});
