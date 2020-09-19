import { ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';

export interface IReduxState {
	communications: {
		loadEvents: ICommunication;
	};
}

export type ILoadEvents = IPlainAction<'EVENT_SERVICE:LOAD_EVENTS'>;
export type ILoadEventsSuccess = IPlainAction<'EVENT_SERVICE:LOAD_EVENTS_SUCCESS'>;
export type ILoadEventsFailed = IPlainFailAction<'EVENT_SERVICE:LOAD_EVENTS_FAILED'>;

export type Action = ILoadEvents | ILoadEventsSuccess | ILoadEventsFailed;
