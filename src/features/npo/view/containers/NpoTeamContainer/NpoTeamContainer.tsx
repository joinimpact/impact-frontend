import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ICommunication } from 'shared/types/redux';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { IAppReduxState } from 'shared/types/app';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IMember, IOrganizationMembersResponse } from 'shared/types/responses/volunteer';
import { Button, Preloader } from 'shared/view/elements';
import { ErrorScreen, SearchInput } from 'shared/view/components';
import { NpoMembersTable } from 'features/npo/view/components';

import './NpoTeamContainer.scss';

interface IStateProps {
  loadOrganizationMembersCommunication: ICommunication;
  organizationMembers: IOrganizationMembersResponse | null;
}

interface IActionProps {
  loadOrganizationMembers: typeof actions.loadOrganizationMembers;
  showInviteTeamMembersModal: typeof actions.showInviteTeamMembersModal;
}

interface IState {
  currentFilter: string | null;
}

const b = block('npo-team-container');

type TProps = IStateProps & IActionProps & ITranslateProps;

class NpoTeamContainer extends React.PureComponent<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      loadOrganizationMembersCommunication: selectors.selectCommunication(state, 'loadOrganizationMembers'),
      organizationMembers: selectors.selectOrganizationMembers(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      loadOrganizationMembers: actions.loadOrganizationMembers,
      showInviteTeamMembersModal: actions.showInviteTeamMembersModal,
    }, dispatch);
  }

  public state: IState = {
    currentFilter: null,
  };

  public componentDidMount() {
    this.props.loadOrganizationMembers();
  }

  public render() {
    const { translate: t, organizationMembers, loadOrganizationMembersCommunication } = this.props;
    return (
      <div className={b()}>
        <Preloader isShow={loadOrganizationMembersCommunication.isRequesting} position="relative" size={14}>
          {Boolean(loadOrganizationMembersCommunication.error) && (
            <ErrorScreen
              title={t('NPO-TEAM-CONTAINER:ERROR:TITLE')}
              message={loadOrganizationMembersCommunication.error!}
            />
          )}
          {Boolean(organizationMembers) && this.renderOrganizationMembers(organizationMembers!)}
        </Preloader>
      </div>
    );
  }

  @bind
  private renderOrganizationMembers(organizationMembers: IOrganizationMembersResponse) {
    const { translate: t } = this.props;

    return (
      <div className={b('content')}>
        <div className={b('top-bar')}>
          <div className={b('top-bar-title')}>
            {t('NPO-TEAM-CONTAINER:STATIC:TITLE')}
          </div>
          <div className={b('top-bar-actions')}>
            <Button color="blue" onClick={this.handleShowInviteTeamMembersModal}>
              {t('NPO-TEAM-CONTAINER:ACTIONS:INVITE-MEMBERS')}
            </Button>
          </div>
        </div>
        <div className={b('search-bar')}>
          <SearchInput
            withSearchIcon
            placeholder={t('NPO-TEAM-CONTAINER:PLACEHOLDER:SEARCH-TEAM')}
            onSearchRequested={this.handleSearchRequested}
          />
        </div>
        <div className={b('members-table')}>
          <NpoMembersTable
            allMembers={organizationMembers.members}
            filteredMembers={this.members}
          />
        </div>
      </div>
    );
  }

  private get members(): IMember[] {
    const { currentFilter } = this.state;
    const { organizationMembers } = this.props;

    if (organizationMembers) {
      if (!currentFilter) {
        return organizationMembers.members;
      }

      const lowerValue = currentFilter.toLowerCase();
      return organizationMembers.members.filter(member => {
        return `${member.firstName}${member.lastName}`.toLowerCase().indexOf(lowerValue) >= 0;
      });
    }

    return [];
  }

  @bind
  private handleSearchRequested(value: string | null) {
    this.setState({ currentFilter: value });
  }

  @bind
  private handleShowInviteTeamMembersModal() {
    this.props.showInviteTeamMembersModal();
  }
}

const withRedux = connect<IStateProps, IActionProps, ITranslateProps>(
  NpoTeamContainer.mapStateToProps,
  NpoTeamContainer.mapDispatch,
)(NpoTeamContainer);
export default i18nConnect<{}>(withRedux);
