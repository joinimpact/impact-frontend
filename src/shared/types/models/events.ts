import moment from 'moment';
import { ILocation } from 'shared/types/responses/shared';

export interface ICalendarEvent {
  id: string;
  title: string;
  dateStart: moment.Moment;
  dateTo?: moment.Moment;
}

export interface IEvent {
  title: string;
  description: string;
  hours: number;
  id: string;
  location: ILocation;
  opportunityId: string;
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
