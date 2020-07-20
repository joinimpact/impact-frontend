import moment from 'moment';
import { IEventResponseItem } from 'shared/types/responses/events';
import { IEvent } from 'shared/types/models/events';

export function convertEventResponseToEvent(event: IEventResponseItem): IEvent {
  return {
    ...event,
    schedule: {
      ...event.schedule,
      from: moment(event.schedule.from),
      to: event.schedule.to ? moment(event.schedule.to) : moment(event.schedule.from),
    }
  };
}
