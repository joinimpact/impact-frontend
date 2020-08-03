import React from 'react';
import block from 'bem-cn';
import moment from 'moment';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { sortEventsByLeftDate, splitEventsToIntersectionGroups } from 'shared/helpers/events';
import { EventsCalendarComponent } from 'features/npo/view/components';
import { IEvent } from 'shared/types/models/events';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import { UserEventPopperComponent } from 'features/volunteer/view/components';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { SearchInput } from 'shared/view/components';

import './UserCalendarContainer.scss';

interface IOwnProps {
  onGoToViewOpportunity(opportunityId: string): void;
}

interface IStateProps {
  loadEnrolledOpportunitiesCommunication: ICommunication;
  currentEnrolledOpportunities: IOpportunityResponse[];
  userEvents: IEvent[];
  attendEventCommunication: ICommunication;
  declineEventCommunication: ICommunication;
}

interface IActionProps {
  loadEnrolledOpportunities: typeof actions.loadEnrolledOpportunities;
  loadUserEvents: typeof actions.loadUserEvents;
  attendEvent: typeof actions.attendEvent;
  declineEvent: typeof actions.declineEvent;
}

interface IState {
  currentDate: moment.Moment;
  currentOpportunity: string | null;
}

const b = block('user-calendar-container');

type TProps = IOwnProps & IStateProps & IActionProps & ITranslateProps;

class UserCalendarContainer extends React.PureComponent<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      loadEnrolledOpportunitiesCommunication: selectors.selectCommunication(state, 'loadUserEnrolledOpportunities'),
      currentEnrolledOpportunities: selectors.selectCurrentEnrolledOpportunities(state),
      userEvents: selectors.selectUserEvents(state),
      attendEventCommunication: selectors.selectCommunication(state, 'attendEvent'),
      declineEventCommunication: selectors.selectCommunication(state, 'declineEvent'),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      loadEnrolledOpportunities: actions.loadEnrolledOpportunities,
      loadUserEvents: actions.loadUserEvents,
      attendEvent: actions.attendEvent,
      declineEvent: actions.declineEvent,
    }, dispatch);
  }

  public state: IState = {
    currentDate: moment(),
    currentOpportunity: null,
  };

  public componentDidMount() {
    this.props.loadEnrolledOpportunities();
    this.props.loadUserEvents();
  }

  public render() {
    return (
      <div className={b()}>
        <div className={b('content')}>
          {this.renderLeftPart()}
          {this.renderRightPart()}
        </div>
      </div>
    );
  }

  @bind
  private renderLeftPart() {
    const { translate: t, currentEnrolledOpportunities } = this.props;
    const { currentOpportunity } = this.state;
    return (
      <div className={b('content-left')}>
        <div className={b('search-bar')}>
          <SearchInput
            withSearchIcon
            placeholder={t('USER-CALENDAR-CONTAINER:PLACEHOLDER:SEARCH')}
            onSearchRequested={this.handleSearch}
          />
        </div>
        <div className={b('sidebar')}>
          <div className={b('sidebar-block')}>
            <div
              className={b('sidebar-button', { selected: !currentOpportunity })}
              onClick={this.handleClearSelectedOpportunity}
            >
              {t('USER-CALENDAR-CONTAINER:STATIC:ALL-CALENDARS')}
            </div>
          </div>

          <div className={b('sidebar-block', { extended: true })}>
            <div className={b('sidebar-block-title')}>
              {t('USER-CALENDAR-CONTAINER:STATIC:BY-OPPORTUNITY')}
            </div>
            <div className={b('sidebar-block-content')}>
              {currentEnrolledOpportunities.map((opportunity, index: number) => {
                return (
                  <div
                    className={b('opportunity', { selected: currentOpportunity === opportunity.id })}
                    key={`opportunity-${index}`}
                    onClick={this.handleSelectOpportunity.bind(this, opportunity.id)}
                  >
                    <div className={b('dot')} />
                    <div className={b('opportunity-title')}>{opportunity.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  @bind
  private renderRightPart() {
    const { currentDate } = this.state;
    const events = this.events;
    return (
      <div className={b('content-right')}>
        <EventsCalendarComponent
          date={currentDate}
          events={splitEventsToIntersectionGroups(events)}
          allEvents={sortEventsByLeftDate(events)}
          renderEventPopup={this.renderEventPopup}
        />
      </div>
    );
  }

  @bind
  private renderEventPopup(event: IEvent, topOffset: number) {
    return (
      <UserEventPopperComponent
        event={event}
        paletteIndex={topOffset}
        opportunity={this.getOpportunityById(event.opportunityId)!}
        onAttend={this.handleAttendEvent}
        onDecline={this.handleDeclineEvent}
        onGoToOpportunity={this.props.onGoToViewOpportunity}
      />
    );
  }

  @bind
  private handleClearSelectedOpportunity() {
    this.setState({ currentOpportunity: null } );
  }

  @bind
  private handleSelectOpportunity(opportunityId: string) {
    this.setState({ currentOpportunity: opportunityId });
  }

  private get events(): IEvent[] {
    const { currentOpportunity } = this.state;
    const res: IEvent[] = [];

    // Return filtered events
    for (const event of this.props.userEvents) {
      if (!currentOpportunity || event.opportunityId === currentOpportunity) {
        res.push(event);
      }
    }

    return res;
  }

  @bind
  private handleSearch(value: string) {
    console.log('[handleSearch] value: ', value);
  }

  @bind
  private getOpportunityById(opportunityId: string) {
    return this.props.currentEnrolledOpportunities.find(opportunity => opportunity.id === opportunityId);
  }

  @bind
  private handleAttendEvent(event: IEvent) {
    this.props.attendEvent(event);
  }

  @bind
  private handleDeclineEvent(event: IEvent) {
    this.props.declineEvent(event);
  }
}

const withRedux = connect<IStateProps, IActionProps, ITranslateProps>(
  UserCalendarContainer.mapStateToProps,
  UserCalendarContainer.mapDispatch,
)(UserCalendarContainer);
export default i18nConnect<IOwnProps>(withRedux);
