import * as NS from '../../namespace';
import { makeCommunicationActionCreators } from 'shared/redux/communication';

export const {
  execute: loadEvents,
  completed: loadEventsComplete,
  failed: loadEventsFailed
} = makeCommunicationActionCreators<
  NS.ILoadEvents,
  NS.ILoadEventsSuccess,
  NS.ILoadEventsFailed
  >(
  'EVENT_SERVICE:LOAD_EVENTS',
  'EVENT_SERVICE:LOAD_EVENTS_SUCCESS',
  'EVENT_SERVICE:LOAD_EVENTS_FAILED',
);
