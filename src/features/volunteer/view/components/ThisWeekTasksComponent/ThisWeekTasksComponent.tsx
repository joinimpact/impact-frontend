import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import moment from 'moment';
import { IEvent } from 'shared/types/models/events';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { NBSP } from 'shared/types/constants';
import { Menu } from 'shared/view/elements';
import { IMenuContentProps } from 'shared/view/elements/Menu/Menu';

import './ThisWeekTasksComponent.scss';

interface IOwnProps {
  weekEvents: IEvent[];
  onViewTaskClicked(opportunityId: string): void;
  renderEventPopper(event: IEvent, props: IMenuContentProps): React.ReactNode;
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
  private renderEvent(event: IEvent, key: string) {
    return (
      <Menu
        placement="bottom"
        className={b('task-view-button')}
        key={key}
        btn={(
          <div
            className={b('event', { active: true })}
            // onClick={this.handleViewEventClicked.bind(this, event.opportunityId)}
          >
            <div className={b('event-content')}>
              <div className={b('event-dot')} />
              <div className={b('event-title')}>
                {event.title}
              </div>
              <div className={b('event-date')}>{moment(event.schedule.from).format('MMM D')}</div>
            </div>
          </div>
        )}
      >
        {(props: IMenuContentProps) => this.props.renderEventPopper(event, props)}
      </Menu>
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

  /*@bind
  private handleViewEventClicked(opportunityId: string) {
    this.props.onViewTaskClicked(opportunityId);
  }*/
}

export default i18nConnect<IOwnProps>(ThisWeekTasksComponent);
