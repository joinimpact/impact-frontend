import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { ReducersMap } from 'shared/types/redux';
import { makeCommunicationReducer } from 'shared/redux/communication';
import initial from '../initial';

export default combineReducers({
  loadEvents: makeCommunicationReducer<
    NS.ILoadEvents,
    NS.ILoadEventsSuccess,
    NS.ILoadEventsFailed
    >(
      'EVENT_SERVICE:LOAD_EVENTS',
      'EVENT_SERVICE:LOAD_EVENTS_SUCCESS',
      'EVENT_SERVICE:LOAD_EVENTS_FAILED',
    initial.communications.loadEvents,
  ),
} as ReducersMap<NS.IReduxState['communications']>);
