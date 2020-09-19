import * as NS from '../../namespace';
import { combineReducers } from 'redux';
import communicationReducers from './communication';

export default combineReducers<NS.IReduxState>({
	communications: communicationReducers,
});
