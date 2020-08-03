import React from 'react';
import block from 'bem-cn';
import moment from 'moment';
import { bind } from 'decko';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button, Preloader } from 'shared/view/elements';
import { /*DatePicker, */ SearchInput } from 'shared/view/components';
import { EventsCalendarComponent } from 'features/npo/view/components';
import { sortEventsByLeftDate, splitEventsToIntersectionGroups } from 'shared/helpers/events';
import { ICommunication } from 'shared/types/redux';
import * as actions from 'features/npo/redux/actions';
import { IAppReduxState } from 'shared/types/app';
import * as selectors from 'features/npo/redux/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IOpportunityWithEvents } from 'shared/types/responses/shared';
import { IEvent } from 'shared/types/models/events';

import './NpoOrganizationCalendarContainer.scss';

interface IStateProps {
  loadOpportunitiesWithEventsCommunication: ICommunication;
  opportunitiesWithEvents: IOpportunityWithEvents[];
  deleteEventCommunication: ICommunication;
}

interface IActionProps {
  loadOpportunities: typeof actions.loadOpportunities;
  requestCreateNewEvent: typeof actions.requestCreateNewEvent;
  loadOpportunitiesWithEvents: typeof actions.loadOpportunitiesWithEvents;
  deleteEvent: typeof actions.deleteEvent;
  requestEditEvent: typeof actions.requestEditEvent;
}

interface IState {
  currentDate: moment.Moment;
  currentOpportunity: string | null;
}

const b = block('new-organization-calendar-container');

type TProps = IStateProps & IActionProps & ITranslateProps & ITranslateProps;

class NpoOrganizationCalendarContainer extends React.PureComponent<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      loadOpportunitiesWithEventsCommunication: selectors.selectCommunication(state, 'loadOpportunitiesWithEvents'),
      opportunitiesWithEvents: selectors.selectOpportunitiesWithEvents(state),
      deleteEventCommunication: selectors.selectCommunication(state, 'deleteEvent'),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators(
      {
        loadOpportunities: actions.loadOpportunities,
        requestCreateNewEvent: actions.requestCreateNewEvent,
        loadOpportunitiesWithEvents: actions.loadOpportunitiesWithEvents,
        deleteEvent: actions.deleteEvent,
        requestEditEvent: actions.requestEditEvent,
      },
      dispatch,
    );
  }

  public state: IState = {
    currentDate: moment(),
    currentOpportunity: null,
  };

  public componentDidMount() {
    this.props.loadOpportunitiesWithEvents();
  }

  public render() {
    const { loadOpportunitiesWithEventsCommunication } = this.props;

    return (
      <Preloader isShow={loadOpportunitiesWithEventsCommunication.isRequesting} position="relative" size={14}>
        {this.renderContent()}
      </Preloader>
    );
  }

  @bind
  private renderContent() {
    const { translate: t } = this.props;
    const { currentDate } = this.state;

    return (
      <div className={b()}>
        <div className={b('top')}>
          <div className={b('top-left')}>
            {/*<DatePicker
              className={b('top-left-title').toString()}
              // readOnly
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={15}
              showMonthYearPicker
              showFullMonthYearPicker
              // showTwoColumnMonthYearPicker
              selected={currentDate.toDate()}
              onChange={this.handleCalendarChange}
              dateFormat="LLLL yyyy"
              customInput={(
                <div>
                  {currentDate.format('MMMM YYYY')}
                </div>
              )}
            />*/}
            <div className={b('top-left-title')}>{currentDate.format('MMMM YYYY')}</div>
            <div className={b('top-left-actions')}>
              <div className={b('move-btn')} onClick={this.handleGoToPrevMonth}>
                <i className="zi zi-cheveron-left" />
              </div>
              <div className={b('move-btn')} onClick={this.handleGoToNextMonth}>
                <i className="zi zi-cheveron-right" />
              </div>
            </div>
          </div>
          <div className={b('top-right')}>
            <Button color="blue" onClick={this.handleCreateNewEvent}>
              {t('NPO-ORGANIZATION-CALENDAR-CONTAINER:ACTION:NEW-EVENT')}
            </Button>
          </div>
        </div>
        <div className={b('content')}>
          {this.renderLeftPart()}
          {this.renderRightPart()}
        </div>
      </div>
    );
  }

  @bind
  private renderLeftPart() {
    const { translate: t, opportunitiesWithEvents } = this.props;
    const { currentOpportunity } = this.state;
    return (
      <div className={b('content-left')}>
        <div className={b('search-bar')}>
          <SearchInput
            withSearchIcon
            placeholder={t('NPO-ORGANIZATION-CALENDAR-CONTAINER:PLACEHOLDER:SEARCH')}
            onSearchRequested={this.handleSearch}
          />
        </div>
        <div className={b('sidebar')}>
          <div className={b('sidebar-block')}>
            <div
              className={b('sidebar-button', { selected: !currentOpportunity })}
              onClick={this.handleClearSelectedOpportunity}
            >
              {t('NPO-ORGANIZATION-CALENDAR-CONTAINER:STATIC:ALL-CALENDARS')}
            </div>
          </div>

          <div className={b('sidebar-block', { extended: true })}>
            <div className={b('sidebar-block-title')}>
              {t('NPO-ORGANIZATION-CALENDAR-CONTAINER:STATIC:BY-OPPORTUNITY')}
            </div>
            <div className={b('sidebar-block-content')}>
              {opportunitiesWithEvents.map((opportunity, index: number) => {
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
          getOpportunityById={this.getOpportunityById}
          onEditEvent={this.editEventHandler}
          onDeleteEvent={this.handleDeleteEvent}
          deleteCommunication={this.props.deleteEventCommunication}
        />
      </div>
    );
  }

  @bind
  private handleSearch(value: string) {
    console.log('[handleSearch] value: ', value);
  }

  @bind
  private getOpportunityById(opportunityId: string) {
    return this.props.opportunitiesWithEvents.find(opportunity => opportunity.id === opportunityId);
  }

  /*@bind
  private handleCalendarChange(date: Date) {
    this.setState({
      currentDate: moment(date),
    });
  }*/

  @bind
  private handleGoToPrevMonth() {
    this.setState({
      currentDate: this.state.currentDate.clone().subtract(1, 'month'),
    });
  }

  @bind
  private handleGoToNextMonth() {
    this.setState({ currentDate: this.state.currentDate.clone().add(1, 'month') });
  }

  @bind
  private handleCreateNewEvent() {
    this.props.requestCreateNewEvent();
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
    for (const opportunity of this.props.opportunitiesWithEvents) {
      if (!currentOpportunity || opportunity.id === currentOpportunity) {
        res.push.apply(res, opportunity.events);
      }
    }
    return res;
  }

  @bind
  private handleDeleteEvent(event: IEvent) {
    console.log('[handleDeleteEvent]', event);
    this.props.deleteEvent(event.id);
  }

  @bind
  private editEventHandler(event: IEvent) {
    this.props.requestEditEvent(event);
  }
}

const withRedux = connect<IStateProps, IActionProps, ITranslateProps>(
  NpoOrganizationCalendarContainer.mapStateToProps,
  NpoOrganizationCalendarContainer.mapDispatch,
)(NpoOrganizationCalendarContainer);
export default i18nConnect<{}>(withRedux);
