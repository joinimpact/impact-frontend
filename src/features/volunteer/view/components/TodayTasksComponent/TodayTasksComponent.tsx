import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IEvent } from 'shared/types/models/events';
import { Menu } from 'shared/view/elements';
import { IMenuContentProps } from 'shared/view/elements/Menu/Menu';

import './TodayTasksComponent.scss';

interface IOwnProps {
  todayTasks: IEvent[];
  renderEventPopper(event: IEvent, props: IMenuContentProps): React.ReactNode;
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
              <div className={b('task-left-part-title-content')}>
                {task.title}
              </div>
            </div>
          </div>
          <div className={b('task-right-part')}>
            <Menu
              placement="bottom"
              className={b('task-view-button')}
              btn={(
                <span
                  className={b('view-button')}
                  // onClick={this.handleViewClicked.bind(this, task.opportunityId)}
                >
                  {t('TODAY-TASKS-COMPONENT:ACTION:VIEW')}
                </span>
              )}
            >
              {(props: IMenuContentProps) => this.props.renderEventPopper(task, props)}
            </Menu>
          </div>
        </div>
      );
    });
  }

  /*@bind
  private handleViewClicked(opportunityId: string) {
    this.props.onViewTaskClicked(opportunityId);
  }*/
}

export default i18nConnect<IOwnProps>(TodayTasksComponent);
