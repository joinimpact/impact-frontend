import moment from 'moment';
import { IEventResponseItem } from 'shared/types/responses/events';

export interface ICalendarEvent {
  id: string;
  title: string;
  dateStart: moment.Moment;
  dateTo?: moment.Moment;
}

export interface IEvent extends Omit<IEventResponseItem, 'schedule'> {
  colorIndex?: number;
  schedule: {
    dateOnly: boolean;
    from: moment.Moment;
    singleDate: boolean;
    to: moment.Moment;
  };
}

export interface IEventsGroup {
  minDate: moment.Moment;
  maxDate: moment.Moment;
  basket: IEvent[];
}
