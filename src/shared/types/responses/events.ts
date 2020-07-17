import { ILocation } from 'shared/types/responses/shared';

export interface IEventResponseItem {
  title: string;
  description: string;
  hours: number;
  id: string;
  location: ILocation;
  opportunityId: string;
  schedule: {
    dateOnly: boolean;
    from: string;
    singleDate: boolean;
    to: string;
  };
}
