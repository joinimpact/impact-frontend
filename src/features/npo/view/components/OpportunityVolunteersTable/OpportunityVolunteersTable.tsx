import React from 'react';
import block from 'bem-cn';
import moment from 'moment';
import { bind } from 'decko';
import { IPendingVolunteerResponseItem, IVolunteersResponse } from 'shared/types/responses/npo';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Button, Image, Menu, Select } from 'shared/view/elements';
import { SearchInput } from 'shared/view/components';

import './OpportunityVolunteersTable.scss';

interface IOwnProps {
  volunteers: IVolunteersResponse | null;
  onInviteVolunteers(): void;
  onAcceptInvitation(inviteId: string, key: string): void;
}

const b = block('opportunity-volunteers-table');

type TVolunteerState = 'Pending' | 'Invited' | 'Volunteer';

const statusOptions: Array<{ key: string, value: TVolunteerState }> = [
  { key: 'OPPORTUNITY-VOLUNTEERS-TABLE:STATUS:PENDING', value: 'Pending' },
  { key: 'OPPORTUNITY-VOLUNTEERS-TABLE:STATUS:INVITED', value: 'Invited' },
  { key: 'OPPORTUNITY-VOLUNTEERS-TABLE:STATUS:VOLUNTEERS', value: 'Volunteer' },
];

type TProps = IOwnProps & ITranslateProps;

class OpportunityVolunteersTable extends React.PureComponent<TProps> {
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
            <div className={b('search-bar-status-filter-title')}>
              {t('OPPORTUNITY-VOLUNTEERS-TABLE:STATIC:STATUS')}
            </div>
            <Select
              readonly
              options={this.userStateOptions}
              onSelect={this.handleSelectStatusFilter}
              selectedValue={'Pending'}
            />
          </div>
        </div>

        <div className={b('volunteers-table')}>
          {volunteers && this.renderVolunteersTable(volunteers)}
        </div>

      </div>
    );
  }

  @bind
  private renderVolunteersTable(volunteers: IVolunteersResponse) {
    const { translate: t } = this.props;

    return (
      <table className={b('table')} cellPadding={0} cellSpacing={0}>
        <thead>
          <tr className={b('table-head-row')}>
            <th>{t('OPPORTUNITY-VOLUNTEERS-TABLE:TABLE-HEADER:VOLUNTEER')}</th>
            <th>{t('OPPORTUNITY-VOLUNTEERS-TABLE:TABLE-HEADER:STATUS')}</th>
            <th>{t('OPPORTUNITY-VOLUNTEERS-TABLE:TABLE-HEADER:STARTING-DATE')}</th>
            <th/>
          </tr>
        </thead>
        <tbody>
          {this.renderPendingVolunteers(volunteers.pending)}
        </tbody>
      </table>
    );
  }

  @bind
  private renderPendingVolunteers(volunteers: IPendingVolunteerResponseItem[]) {
    const { translate: t } = this.props;
    return volunteers.map((volunteer: IPendingVolunteerResponseItem, index: number) => {
      return (
        <tr className={b('table-row', { pending: true })} key={`pending-${index}`}>
          <td className={b('table-cell-volunteer')}>
            {volunteer.profilePicture && (
              <Image className={b('table-cell-volunteer-image')} src={volunteer.profilePicture}/>
            )}
            <div className={b('table-cell-volunteer-name')}>{volunteer.firstName} {volunteer.lastName}</div>
          </td>
          <td className={b('table-cell-status', { pending: true })}>
            <div className={b('user-status', { pending: true })}>
              {t('OPPORTUNITY-VOLUNTEERS-TABLE:STATUS:PENDING')}
            </div>
          </td>
          <td>
            {t('OPPORTUNITY-VOLUNTEERS-TABLE:TABLE-DATA:SINCE', {
              since: moment(volunteer.createdAt).format('MMMM D, YYYY'),
            })}
          </td>
          <td>
            <div className={b('row-actions')}>
              <Button color="grey">
                {t('OPPORTUNITY-VOLUNTEERS-TABLE:ACTION:MESSAGE')}
              </Button>
              <Menu
                btn={
                  <div className={b('user-menu')}>
                    <i className="zi zi-dots-horizontal-triple"/>
                  </div>
                }
                placement="bottom-start"
              >
                <div className={b('user-menu-content')}>
                  <div className={b('user-menu-item')} onClick={this.handleAcceptInvitation.bind(this, volunteer)}>
                    {t('OPPORTUNITY-VOLUNTEERS-TABLE:MENU-ITEM:ACCEPT')}
                  </div>
                </div>
              </Menu>

            </div>
          </td>
        </tr>
      );
    });
  }

  @bind
  private handleSelectStatusFilter(value: string) {
    console.log('[handleSelectStatusFilter]', value);
  }

  @bind
  private handleSearchRequested(value: string) {
    console.log('[handleSearchRequested]');
  }

  @bind
  private handleAcceptInvitation(invite: IPendingVolunteerResponseItem) {
    this.props.onAcceptInvitation(invite.id, '');
  }

  private get userStateOptions() {
    const { translate: t } = this.props;
    return statusOptions.map(item => {
      return {
        value: item.value,
        label: t(item.key)
      };
    });
  }
}

export default i18nConnect<IOwnProps>(OpportunityVolunteersTable);
