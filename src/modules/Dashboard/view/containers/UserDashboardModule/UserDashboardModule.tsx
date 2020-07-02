import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { RouteComponentProps, withRouter } from 'react-router';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { Entry as TopBarFeatureEntry } from 'features/topBar/entry';
import { Entry as VolunteerFeatureEntry } from 'features/volunteer/entry';
import { loadEntry as topBarFeatureLoadEntry } from 'features/topBar/loader';
import { loadEntry as volunteerFeatureLoadEntry } from 'features/volunteer/loader';
import { ISideBarRoute } from 'shared/types/app';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { Sidebar } from 'shared/view/components';

import './UserDashboardModule.scss';

interface IFeatureProps {
  topBarFeatureEntry: TopBarFeatureEntry;
  volunteerFeatureEntry: VolunteerFeatureEntry;
}

interface IState {
  selectedRoute: string;
}

const b = block('user-dashboard-module');

const sideBarRoutes: ISideBarRoute[] = [
  { title: 'USER-SIDEBAR:ROUTE-TITLE:HOME',
    icon: <i className="zi zi-home"/>,
    route: '/home', disabled: false },
  { title: 'USER-SIDEBAR:ROUTE-TITLE:BROWSE',
    icon: <i className="zi zi-search"/>,
    route: '/browse', disabled: false },
  { title: 'USER-SIDEBAR:ROUTE-TITLE:MESSAGES',
    icon: <i className="zi zi-conversation"/>,
    route: '/messages', disabled: false },
  { title: 'USER-SIDEBAR:ROUTE-TITLE:ENROLLED-OPPORTUNITIES',
    icon: <i className="zi zi-view-tile"/>,
    route: '/opportunities', disabled: false },
  { title: 'USER-SIDEBAR:ROUTE-TITLE:CALENDAR',
    icon: <i className="zi zi-calendar"/>,
    route: '/calendar', disabled: false
  },
  { title: 'USER-SIDEBAR:ROUTE-TITLE:SETTINGS',
    icon: <i className="zi zi-cog"/>,
    route: '/settings', disabled: false },
];

type TProps = IFeatureProps & ITranslateProps & RouteComponentProps<{}>;

class UserDashboardModule extends React.PureComponent<TProps, IState> {
  public state: IState = {
    selectedRoute: sideBarRoutes[1].route!, // Temporary solution!
  };

  public render() {
    const { TopBarContainer } = this.props.topBarFeatureEntry.containers;
    const { UserPortfolioSidebarAreaContainer } = this.props.volunteerFeatureEntry.containers;
    return (
      <div className={b()}>
        <div className={b('top')}>
          <TopBarContainer/>
        </div>
        <div className={b('content')}>
          <div className={b('content-left')}>
            <UserPortfolioSidebarAreaContainer/>
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
    this.setState({ selectedRoute: route.route! });
  }
}

const withFeatures = withAsyncFeatures({
  topBarFeatureEntry: topBarFeatureLoadEntry,
  volunteerFeatureEntry: volunteerFeatureLoadEntry,
})(UserDashboardModule);
const i18nConnected = i18nConnect(withFeatures);
export default withRouter(i18nConnected);
