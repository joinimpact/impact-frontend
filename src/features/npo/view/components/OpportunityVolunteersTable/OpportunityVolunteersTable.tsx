import React from 'react';
import block from 'bem-cn';
import moment from 'moment';
import { bind } from 'decko';
import {
  IAbstractVolunteer,
  IInvitedVolunteerResponseItem,
  IPendingVolunteerResponseItem,
  IVolunteerResponseItem,
  IVolunteersResponse,
} from 'shared/types/responses/npo';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button, Image, Link, Menu, Preloader, Select } from 'shared/view/elements';
import { SearchInput, UserAvatar } from 'shared/view/components';
import { ICommunication } from 'shared/types/redux';
import routes from 'modules/routes';

import './OpportunityVolunteersTable.scss';

interface IOwnProps {
  volunteers: IVolunteersResponse | null;
  acceptCommunication: ICommunication;
  declineCommunication: ICommunication;
  updatingUserId: string | null;
  onInviteVolunteers(): void;
  onAcceptInvitation(userId: string): void;
  onDeclineInvitation(userId: string): void;
}

type TVolunteerState = 'All' | 'Pending' | 'Invited' | 'Enrolled';

interface IState {
  selectedState: TVolunteerState;
  filterValue: string | null;
}

const b = block('opportunity-volunteers-table');

const statusOptions: Array<{ key: string; value: TVolunteerState }> = [
  { key: 'OPPORTUNITY-VOLUNTEERS-TABLE:STATUS:ALL', value: 'All' },
  { key: 'OPPORTUNITY-VOLUNTEERS-TABLE:STATUS:PENDING', value: 'Pending' },
  { key: 'OPPORTUNITY-VOLUNTEERS-TABLE:STATUS:INVITED', value: 'Invited' },
  { key: 'OPPORTUNITY-VOLUNTEERS-TABLE:STATUS:ENROLLED', value: 'Enrolled' },
];

type TProps = IOwnProps & ITranslateProps;

class OpportunityVolunteersTable extends React.PureComponent<TProps, IState> {
  public state: IState = {
    selectedState: 'All',
    filterValue: null,
  };

  public render() {
    const { translate: t, volunteers } = this.props;
    return (
      <div className={b()}>
        <div className={b('top')}>
          <div className={b('top-title')}>{t('OPPORTUNITY-VOLUNTEERS-TABLE:STATIC:TITLE')}</div>
          <div className={b('top-actions')}>
            <Button color="blue" onClick={this.props.onInviteVolunteers}>
              {t('OPPORTUNITY-VOLUNTEERS-TABLE:ACTION:INVITE-VOLUNTEERS')}
            </Button>
          </div>
        </div>

        <div className={b('search-bar')}>
          <div className={b('search-bar')}>
            <SearchInput
              withSearchIcon
              placeholder={t('OPPORTUNITY-VOLUNTEERS-TABLE:PLACEHOLDER:SEARCH')}
              onSearchRequested={this.handleSearchRequested}
            />
          </div>
          <div className={b('search-bar-status-filter')}>
            <div className={b('search-bar-status-filter-title')}>{t('OPPORTUNITY-VOLUNTEERS-TABLE:STATIC:STATUS')}</div>
            <Select
              readonly
              options={this.userStateOptions}
              onSelect={this.handleSelectStatusFilter}
              selectedValue={this.state.selectedState}
            />
          </div>
        </div>

        <div className={b('volunteers-table')}>{volunteers && this.renderVolunteersTable(volunteers)}</div>
      </div>
    );
  }

  @bind
  private renderVolunteersTable(volunteers: IVolunteersResponse) {
    const { translate: t } = this.props;
    const { selectedState } = this.state;

    return (
      <table className={b('table')} cellPadding={0} cellSpacing={0}>
        <thead>
          <tr className={b('table-head-row')}>
            <th>{t('OPPORTUNITY-VOLUNTEERS-TABLE:TABLE-HEADER:VOLUNTEER')}</th>
            <th>{t('OPPORTUNITY-VOLUNTEERS-TABLE:TABLE-HEADER:STATUS')}</th>
            <th>{t('OPPORTUNITY-VOLUNTEERS-TABLE:TABLE-HEADER:STARTING-DATE')}</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {(selectedState === 'All' || selectedState === 'Pending') &&
            this.renderPendingVolunteers(this.filteredPendingVolunteers)}
          {(selectedState === 'All' || selectedState === 'Invited') &&
            this.renderInvitedVolunteers(this.filteredInvitedVolunteers)}
          {(selectedState === 'All' || selectedState === 'Enrolled') &&
            this.renderEnrolledVolunteers(this.filteredEnrolledVolunteers)}
        </tbody>
      </table>
    );
  }

  @bind
  private renderEnrolledVolunteers(volunteers: IVolunteerResponseItem[]) {
    const { translate: t } = this.props;
    return volunteers.map((volunteer: IVolunteerResponseItem, index: number) => {
      return (
        <tr className={b('table-row', { enrolled: true })} key={`volunteers-${index}`}>
          <td>
            {this.renderVolunteerProfile(volunteer)}
          </td>
          <td>
            <div className={b('user-status', { enrolled: true })}>
              {t('OPPORTUNITY-VOLUNTEERS-TABLE:STATUS:ENROLLED')}
            </div>
          </td>
          <td>
            {t('OPPORTUNITY-VOLUNTEERS-TABLE:TABLE-DATA:SINCE', {
              since: moment(volunteer.joinedAt).format('MMMM D, YYYY HH:mm'),
            })}
          </td>
          <td>
            <div className={b('row-actions')}>
              <Button color="grey">{t('OPPORTUNITY-VOLUNTEERS-TABLE:ACTION:MESSAGE')}</Button>
            </div>
          </td>
        </tr>
      );
    });
  }

  @bind
  private renderInvitedVolunteers(volunteers: IInvitedVolunteerResponseItem[]) {
    const { translate: t } = this.props;
    return volunteers.map((volunteer: IInvitedVolunteerResponseItem, index: number) => {
      return (
        <tr className={b('table-row', { invited: true })} key={`invited-${index}`}>
          <td className={b('table-cell-volunteer')}>
            {this.renderVolunteerProfile(volunteer)}
          </td>
          <td className={b('table-cell-status', { invited: true })}>
            <div className={b('user-status', { invited: true })}>
              {t('OPPORTUNITY-VOLUNTEERS-TABLE:STATUS:INVITED')}
            </div>
          </td>
          <td>{t('OPPORTUNITY-VOLUNTEERS-TABLE:STATIC:NA')}</td>
          <td>
            <div className={b('row-actions')}>
              <Button color="grey">{t('OPPORTUNITY-VOLUNTEERS-TABLE:ACTION:MESSAGE')}</Button>
            </div>
          </td>
        </tr>
      );
    });
  }

  @bind
  private renderPendingVolunteers(volunteers: IPendingVolunteerResponseItem[]) {
    const { translate: t, updatingUserId, declineCommunication, acceptCommunication } = this.props;
    return volunteers.map((volunteer: IPendingVolunteerResponseItem, index: number) => {

      const isButtonBusy = updatingUserId === volunteer.volunteerID &&
        (declineCommunication.isRequesting || acceptCommunication.isRequesting);

      return (
        <tr className={b('table-row', { pending: true })} key={`pending-${index}`}>
          <td className={b('table-cell-volunteer')}>
            {this.renderVolunteerProfile(volunteer)}
          </td>
          <td className={b('table-cell-status', { pending: true })}>
            <div className={b('user-status', { pending: true })}>
              {t('OPPORTUNITY-VOLUNTEERS-TABLE:STATUS:PENDING')}
            </div>
          </td>
          <td>{t('OPPORTUNITY-VOLUNTEERS-TABLE:STATIC:NA')}</td>
          <td>
            <div className={b('row-actions')}>
              <Button color="grey">
                {t('OPPORTUNITY-VOLUNTEERS-TABLE:ACTION:MESSAGE')}
              </Button>
              <Menu
                btn={
                  <div className={b('user-menu')}>
                    <Preloader type="button" position="relative" size={2} isShow={isButtonBusy}>
                      <i className="zi zi-dots-horizontal-triple" />
                    </Preloader>
                  </div>
                }
                placement="bottom-start"
              >
                {() => (
                  <div className={b('user-menu-content')}>
                    <div className={b('user-menu-item')} onClick={this.handleAcceptInvitation.bind(this, volunteer)}>
                      {t('OPPORTUNITY-VOLUNTEERS-TABLE:MENU-ITEM:ACCEPT')}
                    </div>
                    <div className={b('user-menu-item')} onClick={this.handleDeclineInvitation.bind(this, volunteer)}>
                      {t('OPPORTUNITY-VOLUNTEERS-TABLE:MENU-ITEM:DECLINE')}
                    </div>
                  </div>
                )}
              </Menu>
            </div>
          </td>
        </tr>
      );
    });
  }

  @bind
  private handleSelectStatusFilter(value: TVolunteerState) {
    this.setState({ selectedState: value });
  }

  @bind
  private handleSearchRequested(value: string) {
    this.setState({ filterValue: value });
  }

  @bind
  private handleAcceptInvitation(invite: IPendingVolunteerResponseItem) {
    this.props.onAcceptInvitation(invite.volunteerID);
  }

  @bind
  private handleDeclineInvitation(invite: IPendingVolunteerResponseItem) {
    this.props.onDeclineInvitation(invite.volunteerID);
  }

  @bind
  private filterAbstractVolunteers<T extends IAbstractVolunteer>(volunteers: T[]): T[] {
    const { filterValue } = this.state;

    if (filterValue) {
      const lowerFilterValue = filterValue.toLowerCase();
      return volunteers.filter((volunteer: IAbstractVolunteer) => {
        return (
          volunteer.firstName.toLowerCase().indexOf(lowerFilterValue) >= 0 ||
          volunteer.lastName.toLowerCase().indexOf(lowerFilterValue) >= 0
        );
      });
    }

    return volunteers;
  }

  private get filteredPendingVolunteers(): IPendingVolunteerResponseItem[] {
    const { volunteers } = this.props;

    if (!volunteers || !volunteers.pending) {
      return [];
    }

    return this.filterAbstractVolunteers(volunteers!.pending);
  }

  private get filteredInvitedVolunteers(): IInvitedVolunteerResponseItem[] {
    const { volunteers } = this.props;

    if (!volunteers || !volunteers.invited) {
      return [];
    }

    return this.filterAbstractVolunteers(volunteers!.invited);
  }

  private get filteredEnrolledVolunteers(): IVolunteerResponseItem[] {
    const { volunteers } = this.props;

    if (!volunteers || !volunteers.volunteers) {
      return [];
    }

    return this.filterAbstractVolunteers(volunteers!.volunteers);
  }

  private get userStateOptions() {
    const { translate: t } = this.props;
    return statusOptions.map(item => {
      return {
        value: item.value,
        label: t(item.key),
      };
    });
  }

  @bind
  private renderVolunteerProfile(volunteer: IAbstractVolunteer) {
    return (
      <Link href={`${routes.dashboard.organization.profile.view.getPath()}/${volunteer.id}`}>
        <div className={b('table-cell-volunteer-profile')}>
          {volunteer.profilePicture ? (
            <Image className={b('table-cell-volunteer-image')} src={volunteer.profilePicture} />
          ) : (
            <UserAvatar
              className={b('table-cell-volunteer-no-image')}
              firstName={volunteer.firstName}
              lastName={volunteer.lastName}
            />
          )}
          <div className={b('table-cell-volunteer-name')}>
            {volunteer.firstName} {volunteer.lastName}
          </div>
        </div>
      </Link>
    );
  }
}

export default i18nConnect<IOwnProps>(OpportunityVolunteersTable);
