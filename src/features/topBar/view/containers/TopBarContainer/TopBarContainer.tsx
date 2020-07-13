import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Logo } from 'shared/view/elements';
import { TopBarOrganizationsMenu, TopBarSearchForm, TopUserMenu } from '../../components';
import * as NS from '../../../namespace';
import { selectors as userSelectors } from 'services/user';
import { selectors as npoSelectors, actions as npoActions } from 'services/npo';
import { IUser } from 'shared/types/models/user';
import { IAppReduxState, TUserType } from 'shared/types/app';
// import { mockUser } from 'shared/defaults/mocks';
import { IOrganizationsResponseItem, IUserOrganizationsResponse } from 'shared/types/responses/npo';

import './TopBarContainer.scss';
import { bindActionCreators, Dispatch } from 'redux';

interface IStateProps {
  currentUser: IUser | null;
  currentViewMode: TUserType;
  userOrganizations: IUserOrganizationsResponse['organizations'] | null;
  currentOrganization: IOrganizationsResponseItem | null;
}

interface IActionProps {
  changeCurrentOrganization: typeof npoActions.changeCurrentOrganization;
}

const b = block('top-bar-container');

type TProps = ITranslateProps & IStateProps & IActionProps;

class TopBarContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      currentUser: userSelectors.selectCurrentUser(state),
      currentViewMode: userSelectors.selectCurrentViewType(state),
      userOrganizations: npoSelectors.selectUserOrganizations(state),
      currentOrganization: npoSelectors.selectCurrentOrganization(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      changeCurrentOrganization: npoActions.changeCurrentOrganization,
    }, dispatch);
  }

  public render() {
    const { currentUser, userOrganizations, currentOrganization } = this.props;
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
                { id: 'dashboard', titleKey: 'TOP-BAR-CONTAINER:MENU-ITEMS:DASHBOARD' },
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
    console.log('[handleMenuItemSelected]', item);
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
export default i18nConnect<{}>(withRedux);
