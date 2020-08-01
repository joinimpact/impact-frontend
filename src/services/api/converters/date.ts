import moment from 'moment';
import { format } from 'date-fns';

export function convertMomentToFns(value: moment.Moment, fmt: string) {
  return format(value.toDate(), fmt);
}
