import React from 'react';
import block from 'bem-cn';
import moment from 'moment';
import { bind } from 'decko';
import { IEvent, IEventsGroup } from 'shared/types/models/events';
import { $event, getEventsByDate } from 'shared/helpers/events';
import { NBSP, RESPONSE_DECLINED } from 'shared/types/constants';
import { $moment } from 'shared/helpers/moment';
import { Menu } from 'shared/view/elements';
import { IMenuContentProps } from 'shared/view/elements/Menu/Menu';

import './EventsCalendarComponent.scss';

interface IOwnProps {
  date: moment.Moment;
  events: IEventsGroup[];
  allEvents: IEvent[];
  renderEventPopup(event: IEvent, colorIndex: number, props: IMenuContentProps): React.ReactNode;
}

interface ICellProps {
  day: moment.Moment;
  isCurrentMonth: boolean;
  events: Array<IEvent | null>;
}

const b = block('events-calendar-component');

type TProps = IOwnProps;

class EventsCalendarComponent extends React.PureComponent<TProps> {
  public render() {
    return (
      <div className={b()}>
        <div className={b('header')}>{this.renderHeadCells(this.weekRange)}</div>
        <div className={b('calendar')}>{this.renderDateCells(this.dateRange)}</div>
      </div>
    );
  }

  @bind
  private renderHeadCells(daysOfWeek: string[]) {
    return daysOfWeek.map((day: string, index: number) => {
      return (
        <div className={b('header-cell')} key={`cell-${index}`}>
          {day}
        </div>
      );
    });
  }

  @bind
  private renderDateCells(dateRange: ICellProps[]) {
    const rows = [];
    for (let rowNum = 0, rowsLength = Math.floor(dateRange.length / 7); rowNum < rowsLength; rowNum++) {
      const leftIndex = rowNum * 7;
      const rightIndex = rowNum * 7 + 7;
      rows.push(
        <div className={b('calendar-row')} key={`row-${rowNum}`}>
          {this.renderDatesRow(dateRange, leftIndex, rightIndex)}
          {this.renderRowEvents(dateRange[leftIndex].day, dateRange[rightIndex - 1].day)}
        </div>,
      );
    }

    return rows;
  }

  @bind
  private renderDatesRow(dateRange: ICellProps[], from: number, to: number) {
    const res = [];
    for (let weekNum = from; weekNum < to; weekNum++) {
      const cell = dateRange[weekNum];
      res.push(
        <div className={b('cell', { 'not-current-month': !cell.isCurrentMonth })} key={`cell-${weekNum}`}>
          <div className={b('cell-content')}>
            <div className={b('cell-label')}>{cell.day.format('D')}</div>
            {false && this.renderCellEvents(cell)}
          </div>
        </div>,
      );
    }
    return res;
  }

  @bind
  private renderRowEvents(leftDay: moment.Moment, rightDay: moment.Moment) {
    const { allEvents } = this.props;
    const res: JSX.Element[] = [];

    // const fm = 'YYYY-MM-DD';
    // console.group(`week [${leftDay.format(fm)} - ${rightDay.format(fm)}]`);

    let topOffset = 0;
    const rowHeight = 25;
    for (const event of allEvents) {
      if ($event(event).inRange(leftDay, rightDay)) {
        // Got event for week row
        const daysToWeekStart = $moment(event.schedule.from.clone().startOf('day')).daysBetween(
          leftDay.startOf('day')
        ) as number;
        // daysToWeekEnd < 0   =>   event.schedule.to in future
        // daysToWeekEnd >= 0  =>   event.schedule.to in current week
        const daysToWeekEnd = $moment(rightDay.clone().startOf('day')).daysBetween(
          event.schedule.to.clone().startOf('day'),
        ) as number;
        const currentWeekEventStart = daysToWeekStart > 0 ? daysToWeekStart : 0;
        const currentWeekEventEnd = daysToWeekEnd >= 0 ? (7 - daysToWeekEnd) : 7;

        const isThisWeekStarted = daysToWeekStart >= 0;
        const isThisWeekEnded = daysToWeekEnd >= 0;

        const isEventDeclined = event.userResponse ? event.userResponse.response === RESPONSE_DECLINED : false;

        // console.log(`[${event.title.substr(0, 5)}...] ` +
        //   `[${event.schedule.from.format(fm)} - ${event.schedule.to.format(fm)}] ` +
        //   `[daysToWeekStart: ${daysToWeekStart}; daysToWeekEnd: ${daysToWeekEnd}]`);

        res.push(
          <div
            className={b('row-event', {
              'with-start': isThisWeekStarted,
              'with-end': isThisWeekEnded,
            })}
            style={{
              top: `${topOffset * rowHeight}px`,
              left: `calc((100% / 7) * ${currentWeekEventStart})`,
              width: `calc((100% / 7) * ${currentWeekEventEnd - currentWeekEventStart})`,
            }}
            key={`event-${event.id}`}
          >
            <Menu
              placement="bottom"
              className={b('row-event-menu-button')}
              btn={(
                <div className={b('row-event-content', {
                  // Warning! Using event.colorIndex that got from opportunity
                  [`color-${event.colorIndex || topOffset}`]: !isEventDeclined,
                  declined: isEventDeclined
                })}>
                <div className={b('row-event-content-holder' )}>
                  {isThisWeekStarted && (<div className={b('event-dot')} />)}
                  <div className={b('row-event-content-title')}>
                    {event.title}
                  </div>
                </div>
                </div>
              )}
            >
              {(props: IMenuContentProps) => this.props.renderEventPopup(event, event.colorIndex || topOffset, props)}
            </Menu>
          </div>,
        );
        topOffset++;
      }
    }

    // console.groupEnd();

    return <div className={b('calendar-row-events')}>{res}</div>;
  }

  @bind
  private renderCellEvents(cell: ICellProps) {
    return (
      <div className={b('cell-events-container')}>
        {cell.events.map((event: IEvent | null, eventIndex: number) => {
          if (!event) {
            return (
              <div className={b('cell-events-container-row-holder')} key={`event-${eventIndex}`}>
                {NBSP}
              </div>
            );
          }

          const isFirstEventDay = $moment(event.schedule.from.clone().startOf('day')).equals(
            cell.day.clone().startOf('day'),
          );
          const isLastEventDay = $moment(event.schedule.to.clone().startOf('day')).equals(
            cell.day.clone().startOf('day'),
          );

          return (
            <div
              className={b('cell-events-container-event', {
                'first-day': isFirstEventDay,
                'last-day': isLastEventDay,
              })}
              key={`event-${eventIndex}`}
            >
              {isFirstEventDay && <div className={b('event-dot')} />}
              <div className={b('event-title')}>{isFirstEventDay ? event.title : NBSP}</div>
            </div>
          );
        })}
      </div>
    );
  }

  private get dateRange(): ICellProps[] {
    const { date, events } = this.props;
    const startOfMonth = date.clone().startOf('month');
    const endOfMonth = date.clone().endOf('month');
    const curDay = startOfMonth.clone().startOf('week');
    const lastCalendarDay = endOfMonth.clone().endOf('week');
    const res: ICellProps[] = [];
    while (curDay.diff(lastCalendarDay) < 0) {
      res.push({
        day: curDay.clone(),
        isCurrentMonth: curDay.diff(startOfMonth) >= 0 && curDay.diff(endOfMonth) <= 0,
        events: getEventsByDate(curDay, events),
      });
      curDay.add(1, 'd');
    }
    return res;
  }

  private get weekRange(): string[] {
    return moment.weekdays();
  }
}

export default EventsCalendarComponent;
