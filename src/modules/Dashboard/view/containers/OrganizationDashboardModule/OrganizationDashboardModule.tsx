import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { RouteComponentProps, Switch, withRouter } from 'react-router';
import { Entry as TopBarFeatureEntry } from 'features/topBar/entry';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { ISideBarRoute } from 'shared/types/app';
import { loadEntry as topBarFeatureLoadEntry } from 'features/topBar/loader';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { OrganizationPortfolioArea } from '../../components';
import { CreateOrganizationFinished } from '..';
import RouteEntry from 'modules/shared/RouteEntry/RouteEntry';
import routes from 'modules/routes';
import { Sidebar } from 'shared/view/components';

import './OrganizationDashboardModule.scss';

interface IFeatureProps {
  topBarFeatureEntry: TopBarFeatureEntry;
}

interface IState {
  selectedRoute: string;
}

const b = block('organization-dashboard-module');

const sideBarRoutes: ISideBarRoute[] = [
  { title: 'ORGANIZATION-SIDEBAR:ROUTE-TITLE:HOME',
    icon: <i className="zi zi-home"/>,
    route: '/home', disabled: false },
  { title: 'ORGANIZATION-SIDEBAR:ROUTE-TITLE:MESSAGES',
    icon: <i className="zi zi-conversation"/>,
    route: '/messages', disabled: false },
  { title: 'ORGANIZATION-SIDEBAR:ROUTE-TITLE:VOLUNTEERS',
    icon: <i className="zi zi-network"/>,
    route: '/volunteers', disabled: false },
  { title: 'ORGANIZATION-SIDEBAR:ROUTE-TITLE:OPPORTUNITIES',
    icon: <i className="zi zi-view-tile"/>,
    route: '/opportunities', disabled: false },
  { title: 'ORGANIZATION-SIDEBAR:ROUTE-TITLE:CALENDAR',
    icon: <i className="zi zi-calendar"/>,
    route: '/calendar', disabled: false },
  { title: 'ORGANIZATION-SIDEBAR:ROUTE-TITLE:ORGANIZATION-TEAM',
    icon: <i className="zi zi-user-group"/>,
    route: '/organization-team', disabled: false },
  { title: 'ORGANIZATION-SIDEBAR:ROUTE-TITLE:ORGANIZATION-SETTINGS',
    icon: <i className="zi zi-cog"/>,
    route: '/organization-settings', disabled: false },
];

type TProps = IFeatureProps & ITranslateProps & RouteComponentProps<{}>;

class OrganizationDashboardModule extends React.PureComponent<TProps, IState> {
  public state: IState = {
    selectedRoute: sideBarRoutes[1].route!, // Temporary solution!
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
            <OrganizationPortfolioArea
              organization={{
                isAdmin: true,
                name: 'Birdwatchers International',
                avatarUrl: '/static/demo-org-avatar.png',
              }}
            />
            <Sidebar
              routes={sideBarRoutes}
              selectedRoute={this.state.selectedRoute}
              onSelectRoute={this.handleSelectRoute}
            />
          </div>
          <div className={b('content-right')}>
            <Switch>
              <RouteEntry
                key={routes.dashboard.organization['registration-done'].getElementKey()}
                path={routes.dashboard.organization['registration-done'].getPath()}
                component={CreateOrganizationFinished}
              />
            </Switch>
          </div>
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
})(OrganizationDashboardModule);
const i18nConnected = i18nConnect(withFeatures);
export default withRouter(i18nConnected);
