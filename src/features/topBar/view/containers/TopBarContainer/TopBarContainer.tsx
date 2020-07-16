import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Logo } from 'shared/view/elements';
import { TopBarOrganizationsMenu, TopBarSearchForm, TopUserMenu } from '../../components';
import * as NS from '../../../namespace';
import { selectors as userSelectors, actions as userActions } from 'services/user';
import { selectors as npoSelectors, actions as npoActions } from 'services/npo';
import { IUser } from 'shared/types/models/user';
import { IAppReduxState, TUserType } from 'shared/types/app';
// import { mockUser } from 'shared/defaults/mocks';
import { bindActionCreators, Dispatch } from 'redux';
import { IOrganizationsResponseItem, IUserOrganizationsResponse } from 'shared/types/responses/npo';
import { ICommunication } from 'shared/types/redux';

import './TopBarContainer.scss';

interface IOwnProps {
  onChangeDashboardViewMode(): void;
}

interface IStateProps {
  currentUser: IUser | null;
  logoutCommunication: ICommunication;
  currentViewMode: TUserType;
  userOrganizations: IUserOrganizationsResponse['organizations'] | null;
  currentOrganization: IOrganizationsResponseItem | null;
}

interface IActionProps {
  changeCurrentOrganization: typeof npoActions.changeCurrentOrganization;
  logout: typeof userActions.logout;
}

const b = block('top-bar-container');

type TProps = IOwnProps & ITranslateProps & IStateProps & IActionProps;

class TopBarContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      currentUser: userSelectors.selectCurrentUser(state),
      currentViewMode: userSelectors.selectCurrentViewType(state),
      userOrganizations: npoSelectors.selectUserOrganizations(state),
      currentOrganization: npoSelectors.selectCurrentOrganization(state),
      logoutCommunication: userSelectors.selectCommunication(state, 'logout'),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      changeCurrentOrganization: npoActions.changeCurrentOrganization,
      logout: userActions.logout,
    }, dispatch);
  }

  public render() {
    const { currentUser, userOrganizations, currentOrganization, currentViewMode } = this.props;
    return (
      <div className={b()}>
        <div className={b('left-part')}>
          <div className={b('logo')}>
            <a className={b('logo-link')} href="/">
              <Logo/>
            </a>
          </div>
          {(userOrganizations && currentOrganization) && (
            <TopBarOrganizationsMenu
              userOrganizations={userOrganizations}
              currentOrganization={currentOrganization}
              onSelectOrganization={this.handleSelectOrganization}
              onCreateNewOrganization={this.handleCreateNewOrganization}
            />
          )}
          <div className={b('search-field')}>
            <TopBarSearchForm/>
          </div>
        </div>
        <div className={b('right-part')}>
          <div className={b('top-menu')}>
            <TopUserMenu
              user={currentUser!}
              items={[
                { id: 'dashboard',
                  titleKey: currentViewMode === 'volunteer' ?
                    'TOP-BAR-CONTAINER:MENU-ITEMS:ORGANIZATION-DASHBOARD' :
                    'TOP-BAR-CONTAINER:MENU-ITEMS:VOLUNTEER-DASHBOARD'
                },
                { id: 'create-org', titleKey: 'TOP-BAR-CONTAINER:MENU-ITEMS:CREATE-ORG' },
                { id: 'log-out', titleKey: 'TOP-BAR-CONTAINER:MENU-ITEMS:LOG-OUT' },
              ]}
              onMenuItemSelected={this.handleMenuItemSelected}
            />
          </div>
        </div>
      </div>
    );
  }

  @bind
  private handleMenuItemSelected(item: NS.IMenuItem) {
    switch (item.id) {
      case 'dashboard':
        this.props.onChangeDashboardViewMode();
        break;
      case 'log-out':
        this.props.logout();
        break;
    }
  }

  @bind
  private handleSelectOrganization(organization: IOrganizationsResponseItem) {
    this.props.changeCurrentOrganization(organization);
  }

  @bind
  private handleCreateNewOrganization() {
    console.log('[handleCreateNewOrganization]');
  }
}

const withRedux = connect<IStateProps, IActionProps, ITranslateProps>(
  TopBarContainer.mapStateToProps,
  TopBarContainer.mapDispatch,
)(TopBarContainer);
export default i18nConnect<IOwnProps>(withRedux);
