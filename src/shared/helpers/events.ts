import moment from 'moment';
import { $moment } from 'shared/helpers/moment';
import { IEvent, IEventsGroup } from 'shared/types/models/events';

export const $event = (event: IEvent) => {
  return {
    inRange: (from: moment.Moment, to: moment.Moment) => {
      if (!event) {
        return null;
      }
      const eventFrom = event.schedule.from.clone().startOf('day');
      const eventTo = event.schedule.to.clone().endOf('day');
      return from && to ? (
        $moment(event.schedule.from).inRange(from, to) ||
        $moment(event.schedule.to).inRange(from, to) ||
        $moment(from).inRange(eventFrom, eventTo) ||
        $moment(to).inRange(eventFrom, eventTo)
      ) : null;
    },
    /* tslint:disable:object-literal-shorthand */
    interceptsEvent: function(counterEvent: IEvent) {
      return event && counterEvent ? this.inRange(counterEvent.schedule.from, counterEvent.schedule.to) : null;
    }
  };
};

export function dumpIntercectionGroups(groups: IEventsGroup[]) {
  const dateFmt = 'YYYY-MM-DD';
  for (const group of groups) {
    console.group(`[${group.basket.length}] ${group.minDate.format(dateFmt)} - ${group.maxDate.format(dateFmt)}`);
    for (const event of group.basket) {
      console.log(`[${event.title}]`, event.schedule.from.format(dateFmt), event.schedule.to.format(dateFmt));
    }
    console.groupEnd();
  }
}

export function sortEventsByLeftDate(events: IEvent[]) {
  const subArray = events.concat();
  return subArray.sort((leftEvent, rightEvent) => {
    return leftEvent.schedule.from.diff(rightEvent.schedule.from);
  });
}

/**
 * Returning sorted by left date (date from) and splitted by intersections events
 * @param {IEvent[]} events
 * @returns {IEventsGroup[]}
 */
export function splitEventsToIntersectionGroups(events: IEvent[]): IEventsGroup[] {
  if (!events.length) {
    return [];
  }
  const subArray = sortEventsByLeftDate(events);
  const firstEvent = subArray.shift()!;
  const baskets: IEventsGroup[] = [
    {
      minDate: firstEvent.schedule.from.clone().startOf('day'),
      maxDate: firstEvent.schedule.to.clone().endOf('day'),
      basket: [firstEvent],
    },
  ];

  const putInBasket = (event: IEvent) => {
    for (const eventGroup of baskets) {
      for (const basketEvent of eventGroup.basket) {
        const basketEventFrom = basketEvent.schedule.from.clone().startOf('day');
        const basketEventTo = basketEvent.schedule.to.clone().endOf('day');
        const eventFrom = event.schedule.from.clone().startOf('day');
        const eventTo = event.schedule.to.clone().endOf('day');
        const isIntercepted =
          $moment(event.schedule.from).inRange(basketEventFrom, basketEventTo) ||
          $moment(event.schedule.to).inRange(basketEventFrom, basketEventTo) ||
          $moment(basketEvent.schedule.from).inRange(eventFrom, eventTo) ||
          $moment(basketEvent.schedule.to).inRange(eventFrom, eventTo);

        if (isIntercepted) {
          if ($moment(event.schedule.from).lessThan(eventGroup.minDate)) {
            eventGroup.minDate = event.schedule.from.clone().startOf('day');
          }
          if ($moment(event.schedule.to).moreThan(eventGroup.maxDate)) {
            eventGroup.maxDate = event.schedule.to.clone().endOf('day');
          }
          eventGroup.basket.push(event);
          return true;
        }
      }
    }

    return false;
  };

  while (subArray.length) {
    const event = subArray.shift()!;
    if (!putInBasket(event)) {
      // Create new basket
      baskets.push({
        minDate: event.schedule.from.clone().startOf('day'),
        maxDate: event.schedule.to.clone().endOf('day'),
        basket: [event],
      });
    }
  }

  // dumpIntercectionGroups(baskets);

  return baskets;
}

/**
 * Returning plain events array (or empty array) with events to selected date
 * @param {moment.Moment} date selected date
 * @param {IEventsGroup[]} events sorted and splitted to interception groups events
 * (use splitEventsToIntersectionGroups method)
 * @returns {Array<IEvent | null>} plain array with events that keeps empty lines for events that over for that date
 */
export function getEventsByDate(date: moment.Moment, events: IEventsGroup[]): Array<IEvent | null> {
  for (const group of events) {
    if ($moment(date).inRange(group.minDate.clone().startOf('day'), group.maxDate.clone().endOf('day'))) {
      const res: Array<IEvent | null> = [];
      for (const event of group.basket) {
        if ($moment(date).inRange(event.schedule.from.clone().startOf('day'), event.schedule.to.clone().endOf('day'))) {
          res.push(event);
        } else {
          // We need to stay sorted by height for to show the real event placement in vertical range
          res.push(null);
        }
      }
      return res; // Return
    }
  }
  return [];
}
