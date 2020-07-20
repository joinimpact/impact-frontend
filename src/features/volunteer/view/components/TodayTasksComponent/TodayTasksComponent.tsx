import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IEvent } from 'shared/types/models/events';

import './TodayTasksComponent.scss';

interface IOwnProps {
  todayTasks: IEvent[];
  onViewTaskClicked(opportunityId: string): void;
}

const b = block('today-tasks-component');

type TProps = IOwnProps & ITranslateProps;

class TodayTasksComponent extends React.PureComponent<TProps> {
  public render() {
    const { translate: t } = this.props;
    return (
      <div className={b()}>
        <div className={b('title')}>
          {t('TODAY-TASKS-COMPONENT:STATIC:TODAY')}
        </div>
        <div className={b('content')}>
          {this.renderTodayTasks()}
        </div>
      </div>
    );
  }

  @bind
  private renderTodayTasks() {
    const { translate: t } = this.props;
    return this.props.todayTasks.map((task: IEvent, index: number) => {

      return (
        <div key={`task-${index}`} className={b('task')}>
          <div className={b('task-left-part')}>
            <div className={b('task-left-part-dot')}/>
            <div className={b('task-left-part-title')}>
              {task.title}
            </div>
          </div>
          <div className={b('task-right-part')}>
            <span className={b('view-button')} onClick={this.handleViewClicked.bind(this, task.opportunityId)}>
              {t('TODAY-TASKS-COMPONENT:ACTION:VIEW')}
            </span>
          </div>
        </div>
      );
    });
  }

  @bind
  private handleViewClicked(opportunityId: string) {
    this.props.onViewTaskClicked(opportunityId);
  }
}

export default i18nConnect<IOwnProps>(TodayTasksComponent);
