import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { selectors as userSelectors } from 'services/user';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { Preloader } from 'shared/view/elements';
import { IUser } from 'shared/types/models/user';
import { ErrorScreen, OpportunitiesGrid } from 'shared/view/components';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import { UserProfileAboutComponent, UserProfileComponent } from '../../components';
import routes from 'modules/routes';

import './UserViewProfileContainer.scss';

type TTab = 'activities' | 'about';

interface IOwnProps {
  userId?: string;
}

interface IStateProps {
  currentUserId: string | null;
  loadUserCommunication: ICommunication;
  loadedUser: IUser | null;
  loadedUserOpportunities: IOpportunityResponse[];
}

interface IActionProps {
  loadUser: typeof actions.loadUser;
  loadUserOpportunities: typeof actions.loadUserOpportunities;
}

interface IState {
  currentTab: TTab;
}

const b = block('user-view-profile-container');
const tabs: TTab[] = ['activities', 'about'];
const tabLabels: { [key in TTab]: string } = {
  activities: 'USER-VIEW-PROFILE-CONTAINER:TABS:ACTIVITIES',
  about: 'USER-VIEW-PROFILE-CONTAINER:TABS:ABOUT',
};

type TRouteProp = RouteComponentProps<{}>;
type TProps = IOwnProps & ITranslateProps & IStateProps & IActionProps & TRouteProp;

class UserViewProfileContainer extends React.PureComponent<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      currentUserId: userSelectors.selectCurrentUserId(state),
      loadUserCommunication: selectors.selectCommunication(state, 'loadUser'),
      loadedUser: selectors.selectLoadedUser(state),
      loadedUserOpportunities: selectors.selectLoadedUserOpportunities(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators(
      {
        loadUser: actions.loadUser,
        loadUserOpportunities: actions.loadUserOpportunities,
      },
      dispatch,
    );
  }

  public state: IState = {
    currentTab: (!this.props.userId || this.props.userId === this.props.currentUserId) ? 'activities' : 'about',
  };

  public componentDidMount() {
    this.props.loadUser(this.props.userId);
  }

  public render() {
    const { loadedUser, translate: t } = this.props;
    return (
      <div className={b()}>
        <Preloader isShow={this.props.loadUserCommunication.isRequesting} position="relative" size={14}>
          {Boolean(loadedUser) ? (
            this.renderContent(loadedUser!)
          ) : (
            <ErrorScreen
              title={t('USER-VIEW-PROFILE-CONTAINER:ERROR:TITLE')}
              message={this.props.loadUserCommunication.error || ''}
            />
          )}
        </Preloader>
      </div>
    );
  }

  @bind
  private renderContent(user: IUser) {
    const { currentUserId } = this.props;
    return (
      <div className={b('content')}>
        <div className={b('content-top')}>
          <UserProfileComponent user={user} onMessageClicked={this.handleMessageClicked} />
          {this.renderTabs( user.userId === currentUserId ? tabs : [tabs[1]])}
        </div>
        <div className={b('content-bottom')}>{this.renderCurrentTab()}</div>
      </div>
    );
  }

  @bind
  private renderCurrentTab() {
    const { currentTab } = this.state;

    switch (currentTab) {
      case 'activities':
        return (
          <div>
            <OpportunitiesGrid
              opportunities={this.props.loadedUserOpportunities}
              onViewOpportunity={this.handleViewOpportunity}
            />
          </div>
        );
      case 'about':
        return (
          <div>
            <UserProfileAboutComponent user={this.props.loadedUser!} />
          </div>
        );
    }

    return null;
  }

  @bind
  private renderTabs(tabs: TTab[]) {
    const { translate: t } = this.props;
    const { currentTab } = this.state;
    return (
      <div className={b('tabs')}>
        {tabs.map((name, index) => {
          return (
            <div
              className={b('tab', { selected: currentTab === name })}
              onClick={this.handleSelectTab.bind(this, name)}
              key={`tab-${index}`}
            >
              <div className={b('tab-name')}>{t(tabLabels[name])}</div>
            </div>
          );
        })}
      </div>
    );
  }

  @bind
  private handleSelectTab(tab: TTab) {
    this.setState({ currentTab: tab });
  }

  @bind
  private handleMessageClicked() {
    console.log('[handleMessageClicked]');
  }

  @bind
  private handleViewOpportunity(opportunity: IOpportunityResponse) {
    this.props.history.push(`${routes.dashboard.user.opportunities.view.getPath()}/${opportunity.id}`);
  }
}

const withRedux = connect<IStateProps, IActionProps, IOwnProps & ITranslateProps>(
  UserViewProfileContainer.mapStateToProps,
  UserViewProfileContainer.mapDispatch,
)(UserViewProfileContainer);
export default i18nConnect<IOwnProps>(withRouter(withRedux));
