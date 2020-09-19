import * as NS from '../../namespace';
import makeCommunicationActionCreators from 'shared/redux/communication/makeCommunicationActionCreators';

export const { execute: search, completed: searchSuccess, failed: searchFailed } = makeCommunicationActionCreators<
NS.ISearch,
NS.ISearchSuccess,
NS.ISearchFailed
>('TOP-BAR:SEARCH', 'TOP-BAR:SEARCH_SUCCESS', 'TOP-BAR:SEARCH_FAILED');
