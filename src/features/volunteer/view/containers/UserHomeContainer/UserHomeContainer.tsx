import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IUser } from 'shared/types/models/user';
import { selectors as userSelectors } from 'services/user';
import { IAppReduxState } from 'shared/types/app';
import { Button, Preloader } from 'shared/view/elements';
import { ThisWeekTasksComponent, TodayTasksComponent } from 'features/volunteer/view/components';
import { mockEvents } from 'shared/defaults/mocks';
import { NBSP } from 'shared/types/constants';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { ICommunication } from 'shared/types/redux';

import './UserHomeContainer.scss';

interface IOwnProps {
  onViewOpportunityClicked(opportunityId: string): void;
}

interface IStateProps {
  currentUser: IUser | null;
  loadEnrolledOpportunitiesCommunication: ICommunication;
}

interface IActionProps {
  loadEnrolledOpportunities: typeof actions.loadEnrolledOpportunities;
}

const b = block('user-home-container');

type TProps = IOwnProps & ITranslateProps & IStateProps & IActionProps;

class UserHomeContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      currentUser: userSelectors.selectCurrentUser(state),
      loadEnrolledOpportunitiesCommunication: selectors.selectCommunication(state, 'loadUserEnrolledOpportunities'),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      loadEnrolledOpportunities: actions.loadEnrolledOpportunities,
    }, dispatch);
  }

  public componentDidMount() {
    this.props.loadEnrolledOpportunities();
  }

  public render() {
    const { translate: t, currentUser, loadEnrolledOpportunitiesCommunication } = this.props;
    // console.log('currentRecommendOpportunities: ', this.props.currentRecommendOpportunities);
    return (
      <div className={b()}>
        <div className={b('top-pane')}>
          <div className={b('top-pane-title')}>
            {t('USER-HOME-CONTAINER:TOP:TITLE', {
              name: <span key="name" className={b('top-pane-user-name')}>{currentUser!.firstName}</span>,
            })}
          </div>
          <div className={b('top-pane-spent-time-notify')}>
            {this.renderSpentTimeNotify()}
          </div>
        </div>
        <div className={b('events')}>
          <div className={b('events-top')}>
            <div className={b('events-top-title')}>
              {t('USER-HOME-CONTAINER:STATIC:UPCOMING-EVENTS')}
            </div>
            <div className={b('events-top-actions')}>
              <Button color="blue">
                {t('USER-HOME-CONTAINER:BUTTON:VIEW-CALENDAR')}
              </Button>
            </div>
          </div>
          <div className={b('events-body')}>
            <TodayTasksComponent
              todayTasks={mockEvents}
              onViewTaskClicked={this.props.onViewOpportunityClicked}
            />
            <ThisWeekTasksComponent
              weekEvents={mockEvents}
              onViewTaskClicked={this.props.onViewOpportunityClicked}
            />
          </div>
        </div>
        <div className={b('enrolled-opportunities')}>
          <Preloader isShow={loadEnrolledOpportunitiesCommunication.isRequesting} position="relative" size={14}>
            {NBSP}
          </Preloader>
        </div>
      </div>
    );
  }

  @bind
  private renderSpentTimeNotify() {
    const { translate: t } = this.props;
    return (
      <div className={b('spent-time')}>
        <div className={b('spent-time-hours')}>23 <i className="zi zi-checkmark"/></div>
        <div className={b('spent-time-title')}>
          {t('USER-HOME-CONTAINER:TOP:SPENT-TIME-TITLE')}
        </div>
      </div>
    );
  }
}

const withRedux = connect<IStateProps, IActionProps, ITranslateProps>(
  UserHomeContainer.mapStateToProps,
  UserHomeContainer.mapDispatch,
)(UserHomeContainer);
export default i18nConnect<IOwnProps>(withRedux);
