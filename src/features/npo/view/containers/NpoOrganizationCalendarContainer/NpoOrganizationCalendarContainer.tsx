import React from 'react';
import block from 'bem-cn';
import moment from 'moment';
import { bind } from 'decko';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button, Preloader } from 'shared/view/elements';
import { /*DatePicker, */SearchInput } from 'shared/view/components';
import { EventsCalendarComponent } from 'features/npo/view/components';
import { sortEventsByLeftDate, splitEventsToIntersectionGroups } from 'shared/helpers/events';
import { mockEvents } from 'shared/defaults/mocks';
import { ICommunication } from 'shared/types/redux';
import * as actions from 'features/npo/redux/actions';
import { IAppReduxState } from 'shared/types/app';
import * as selectors from 'features/npo/redux/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IOpportunityResponse } from 'shared/types/responses/npo';

import './NpoOrganizationCalendarContainer.scss';

interface IOwnProps {
  onGoToOpportunity(opportunityId: string): void;
}

interface IStateProps {
  loadOpportunitiesCommunication: ICommunication;
  organizationOpportunities: IOpportunityResponse[];
}

interface IActionProps {
  loadOpportunities: typeof actions.loadOpportunities;
  requestCreateNewEvent: typeof actions.requestCreateNewEvent;
}

interface IState {
  currentDate: moment.Moment;
}

const b = block('new-organization-calendar-container');

type TProps = IOwnProps & IStateProps & IActionProps & ITranslateProps & ITranslateProps;

class NpoOrganizationCalendarContainer extends React.PureComponent<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      loadOpportunitiesCommunication: selectors.selectCommunication(state, 'loadOpportunities'),
      organizationOpportunities: selectors.selectOrganizationOpportunities(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      loadOpportunities: actions.loadOpportunities,
      requestCreateNewEvent: actions.requestCreateNewEvent,
    }, dispatch);
  }

  public state: IState = {
    currentDate: moment(),
  };

  public componentDidMount() {
    this.props.loadOpportunities({
      limit: 100,
      page: 0,
    });
  }

  public render() {
    const { loadOpportunitiesCommunication } = this.props;

    return (
      <Preloader isShow={loadOpportunitiesCommunication.isRequesting} position="relative" size={14}>
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
            <div className={b('top-left-title')}>
              {currentDate.format('MMMM YYYY')}
            </div>
            <div className={b('top-left-actions')}>
              <div className={b('move-btn')} onClick={this.handleGoToPrevMonth}>
                <i className="zi zi-cheveron-left"/>
              </div>
              <div className={b('move-btn')} onClick={this.handleGoToNextMonth}>
                <i className="zi zi-cheveron-right"/>
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
    const { translate: t, organizationOpportunities } = this.props;
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
            <div className={b('sidebar-button')}>
              {t('NPO-ORGANIZATION-CALENDAR-CONTAINER:STATIC:ALL-CALENDARS')}
            </div>
          </div>

          <div className={b('sidebar-block', { extended: true })}>
            <div className={b('sidebar-block-title')}>
              {t('NPO-ORGANIZATION-CALENDAR-CONTAINER:STATIC:BY-OPPORTUNITY')}
            </div>
            <div className={b('sidebar-block-content')}>
              {organizationOpportunities.map((opportunity, index: number) => {

                return (
                  <div className={b('opportunity')} key={`opportunity-${index}`}>
                    <div className={b('dot')}/>
                    <div className={b('opportunity-title')}>
                      {opportunity.title}
                    </div>
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
    return (
      <div className={b('content-right')}>
        <EventsCalendarComponent
          date={currentDate}
          events={splitEventsToIntersectionGroups(mockEvents)}
          allEvents={sortEventsByLeftDate(mockEvents)}
          onGoToOpportunity={this.props.onGoToOpportunity}
        />
      </div>
    );
  }

  @bind
  private handleSearch(value: string) {
    console.log('[handleSearch] value: ', value);
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
      currentDate: this.state.currentDate.clone().subtract(1, 'month')
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
}

const withRedux = connect<IStateProps, IActionProps, ITranslateProps & IOwnProps>(
  NpoOrganizationCalendarContainer.mapStateToProps,
  NpoOrganizationCalendarContainer.mapDispatch,
)(NpoOrganizationCalendarContainer);
export default i18nConnect<IOwnProps>(withRedux);
