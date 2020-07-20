import React from 'react';
import block from 'bem-cn';
import moment from 'moment';
import { bind } from 'decko';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button } from 'shared/view/elements';
import { SearchInput } from 'shared/view/components';
import { EventsCalendarComponent } from 'features/npo/view/components';
import { sortEventsByLeftDate, splitEventsToIntersectionGroups } from 'shared/helpers/events';
import { mockEvents } from 'shared/defaults/mocks';

import './NpoOrganizationCalendarContainer.scss';

interface IState {
  currentDate: moment.Moment;
}

const b = block('new-organization-calendar-container');

type TProps = ITranslateProps;

class NpoOrganizationCalendarContainer extends React.PureComponent<TProps, IState> {
  public state: IState = {
    currentDate: moment(),
  };

  public render() {
    const { translate: t } = this.props;
    const { currentDate } = this.state;
    return (
      <div className={b()}>
        <div className={b('top')}>
          <div className={b('top-left')}>
            <div className={b('top-left-title')}>
              {currentDate.format('MMMM YYYY')}
            </div>
            <div className={b('top-left-actions')}>
              <div className={b('move-btn')}><i className="zi zi-cheveron-left"/></div>
              <div className={b('move-btn')}><i className="zi zi-cheveron-right"/></div>
            </div>
          </div>
          <div className={b('top-right')}>
            <Button color="blue">
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
    const { translate: t } = this.props;
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
            <div className={b('sidebar-block-content')}/>
          </div>

          <div className={b('sidebar-block', { extended: true })}>
            <div className={b('sidebar-block-title')}>
              {t('NPO-ORGANIZATION-CALENDAR-CONTAINER:STATIC:BY-VOLUNTEER')}
            </div>
            <div className={b('sidebar-block-content')}/>
          </div>
        </div>
      </div>
    );
  }

  @bind
  private renderRightPart() {
    return (
      <div className={b('content-right')}>
        <EventsCalendarComponent
          date={moment()}
          events={splitEventsToIntersectionGroups(mockEvents)}
          allEvents={sortEventsByLeftDate(mockEvents)}
        />
      </div>
    );
  }

  @bind
  private handleSearch(value: string) {
    console.log('[handleSearch] value: ', value);
  }
}

export default i18nConnect<{}>(NpoOrganizationCalendarContainer);
