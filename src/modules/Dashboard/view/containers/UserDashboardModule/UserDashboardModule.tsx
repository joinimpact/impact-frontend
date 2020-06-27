import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { RouteComponentProps, withRouter } from 'react-router';
import { UserPortfolioArea } from '../../../../shared/components';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { Entry as TopBarFeatureEntry } from 'features/topBar/entry';
import { loadEntry as topBarFeatureLoadEntry } from 'features/topBar/loader';
import Sidebar from '../../../../shared/components/Sidebar/Sidebar';
import { ISideBarRoute } from 'shared/types/app';
import { i18nConnect, ITranslateProps } from 'services/i18n';

import './UserDashboardModule.scss';

interface IFeatureProps {
  topBarFeatureEntry: TopBarFeatureEntry;
}

interface IState {
  selectedRoute: string;
}

const b = block('user-dashboard-module');

const sideBarRoutes: ISideBarRoute[] = [
  { title: 'USER-SIDEBAR:ROUTE-TITLE:HOME',
    icon: <i className="zi-home"/>,
    route: '/home', disabled: false },
  { title: 'USER-SIDEBAR:ROUTE-TITLE:BROWSE',
    icon: <i className="zi-search"/>,
    route: '/browse', disabled: false },
  { title: 'USER-SIDEBAR:ROUTE-TITLE:MESSAGES',
    icon: <i className="zi-conversation"/>,
    route: '/messages', disabled: false },
  { title: 'USER-SIDEBAR:ROUTE-TITLE:ENROLLED-OPPORTUNITIES',
    icon: <i className="zi-view-tile"/>,
    route: '/opportunities', disabled: false },
  { title: 'USER-SIDEBAR:ROUTE-TITLE:CALENDAR',
    icon: <i className="zi-calendar"/>,
    route: '/calendar', disabled: false
  },
  { title: 'USER-SIDEBAR:ROUTE-TITLE:SETTINGS',
    icon: <i className="zi-cog"/>,
    route: '/settings', disabled: false },
];

type TProps = IFeatureProps & ITranslateProps & RouteComponentProps<{}>;

class UserDashboardModule extends React.PureComponent<TProps, IState> {
  public state: IState = {
    selectedRoute: sideBarRoutes[1].route, // Temporary solution!
  };

  public render() {
    const { TopBarContainer } = this.props.topBarFeatureEntry.containers;
    return (
      <div className={b()}>
        <div className={b('top')}>
          <TopBarContainer/>
        </div>
        <div className={b('content')}>
          <div className={b('content-left')}>
            <UserPortfolioArea
              user={{
                firstName: 'Tayler',
                lastName: 'Lafayette',
                avatarUrl: '/static/demo-avatar.png',
                since: '2016',
              }}
            />
            <Sidebar
              routes={sideBarRoutes}
              selectedRoute={this.state.selectedRoute}
              onSelectRoute={this.handleSelectRoute}
            />
          </div>
          <div className={b('content-right')}/>
        </div>
      </div>
    );
  }

  @bind
  private handleSelectRoute(route: ISideBarRoute) {
    this.setState({ selectedRoute: route.route });
  }
}

const withFeatures = withAsyncFeatures({
  topBarFeatureEntry: topBarFeatureLoadEntry,
})(UserDashboardModule);
const i18nConnected = i18nConnect(withFeatures);
export default withRouter(i18nConnected);
