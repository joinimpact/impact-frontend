import moment from 'moment';
import { IEventResponseItem } from 'shared/types/responses/events';
import { IEvent } from 'shared/types/models/events';
import { IOpportunityResponse } from 'shared/types/responses/npo';

export function convertEventResponseToEvent(event: IEventResponseItem, opportunity?: IOpportunityResponse): IEvent {
  return {
    ...event,
    colorIndex: opportunity ? opportunity.colorIndex : undefined,
    schedule: {
      ...event.schedule,
      from: moment(event.schedule.from),
      to: event.schedule.to ? moment(event.schedule.to) : moment(event.schedule.from),
    }
  };
}
