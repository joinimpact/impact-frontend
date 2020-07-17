import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import moment from 'moment';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IEventResponseItem } from 'shared/types/responses/events';
import { NBSP } from 'shared/types/constants';

import './ThisWeekTasksComponent.scss';

interface IOwnProps {
  weekEvents: IEventResponseItem[];
  onViewTaskClicked(opportunityId: string): void;
}

const b = block('this-week-tasks-component');

type TProps = IOwnProps & ITranslateProps;

class ThisWeekTasksComponent extends React.PureComponent<TProps> {
  public render() {
    const { translate: t } = this.props;
    return (
      <div className={b()}>
        <div className={b('title')}>{t('THIS-WEEK-TASKS-COMPONENT:STATIC:THIS-WEEK')}</div>
        <div className={b('content')}>{this.renderWeekEvents()}</div>
      </div>
    );
  }

  @bind
  private renderWeekEvents() {
    const { weekEvents } = this.props;
    const res: JSX.Element[] = [];
    for (let i = 0; i < 6; i++) {
      if (weekEvents[i]) {
        res.push(this.renderEvent(weekEvents[i], `event-${i}`));
      } else {
        res.push(this.renderEventPlaceholder(`event-${i}`));
      }
    }
    return res;
  }

  @bind
  private renderEvent(event: IEventResponseItem, key: string) {
    return (
      <div
        className={b('event', { active: true })}
        key={key}
        onClick={this.handleViewEventClicked.bind(this, event.opportunityId)}
      >
        <div className={b('event-dot')} />
        <div className={b('event-title')}>{event.title}</div>
        <div className={b('event-date')}>{moment(event.schedule.from).format('MMM D')}</div>
      </div>
    );
  }

  @bind
  private renderEventPlaceholder(key: string) {
    return (
      <div className={b('event', { placeholder: true })} key={key}>
        {NBSP}
      </div>
    );
  }

  @bind
  private handleViewEventClicked(opportunityId: string) {
    this.props.onViewTaskClicked(opportunityId);
  }
}

export default i18nConnect<IOwnProps>(ThisWeekTasksComponent);
