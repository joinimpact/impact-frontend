import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { makeCommunicationReducer } from 'shared/redux/communication';
import initial from '../initial';

export default combineReducers<NS.IReduxState['communications']>({
  search: makeCommunicationReducer<
    NS.ISearch,
    NS.ISearchSuccess,
    NS.ISearchFailed
    >(
    'TOP-BAR:SEARCH',
    'TOP-BAR:SEARCH_SUCCESS',
    'TOP-BAR:SEARCH_FAILED',
    initial.communications.search,
  )
});
