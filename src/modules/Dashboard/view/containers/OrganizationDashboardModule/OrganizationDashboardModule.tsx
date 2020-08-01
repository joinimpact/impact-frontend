import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Redirect, RouteComponentProps, Switch, withRouter } from 'react-router';
import { Entry as TopBarFeatureEntry } from 'features/topBar/entry';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IAppReduxState, ISideBarRoute } from 'shared/types/app';
import { loadEntry as topBarFeatureLoadEntry } from 'features/topBar/loader';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { NpoNoOrganizationModal, OrganizationPortfolioArea } from '../../components';
import {
  CreateOpportunityModule,
  CreateOrganizationFinished, EditOpportunityModule, NpoHomeModule,
  ViewOpportunitiesModule,
  ViewSingleOpportunityModule,
} from '..';
import AuthorizedRoute from 'modules/shared/AuthorizedRoute/AuthorizedRoute';
import routes from 'modules/routes';
import { Sidebar } from 'shared/view/components';
import { selectors as npoSelectors } from 'services/npo';
import {
  IOrganizationsResponseItem,
  IUserOrganizationsResponse,
} from 'shared/types/responses/npo';
import { actions as userActions, selectors as userSelectors } from 'services/user';
import { Entry as NPOFeatureEntry } from 'features/npo/entry';
import { loadEntry as npoFeatureLoadEntry } from 'features/npo/loader';
import OrganizationCalendarModule
  from 'modules/Dashboard/view/containers/OrganizationCalendarModule/OrganizationCalendarModule';

import './OrganizationDashboardModule.scss';

interface IFeatureProps {
  topBarFeatureEntry: TopBarFeatureEntry;
  npoFeatureEntry: NPOFeatureEntry;
}

interface IStateProps {
  isNpoServiceReady: boolean;
  isAuthorized: boolean;
  currentOrganization: IOrganizationsResponseItem | null;
  userOrganizations: IUserOrganizationsResponse['organizations'] | null;
}

interface IActionProps {
  setCurrentViewMode: typeof userActions.setCurrentViewMode;
}

interface IState {
  selectedRoute: string;
}

const b = block('organization-dashboard-module');

const sideBarRoutes: ISideBarRoute[] = [
  { title: 'ORGANIZATION-SIDEBAR:ROUTE-TITLE:HOME',
    icon: <i className="zi zi-home"/>,
    route: routes.dashboard.organization.home.getPath(), disabled: false },
  { title: 'ORGANIZATION-SIDEBAR:ROUTE-TITLE:MESSAGES',
    icon: <i className="zi zi-conversation"/>,
    route: routes.dashboard.organization.messages.getPath(), disabled: false },
  { title: 'ORGANIZATION-SIDEBAR:ROUTE-TITLE:VOLUNTEERS',
    icon: <i className="zi zi-network"/>,
    route: routes.dashboard.organization.volunteers.getPath(), disabled: false },
  { title: 'ORGANIZATION-SIDEBAR:ROUTE-TITLE:OPPORTUNITIES',
    icon: <i className="zi zi-view-tile"/>,
    route: routes.dashboard.organization.opportunity.getPath(), disabled: false },
  { title: 'ORGANIZATION-SIDEBAR:ROUTE-TITLE:CALENDAR',
    icon: <i className="zi zi-calendar"/>,
    route: routes.dashboard.organization.calendar.getPath(), disabled: false },
  { title: 'ORGANIZATION-SIDEBAR:ROUTE-TITLE:ORGANIZATION-TEAM',
    icon: <i className="zi zi-user-group"/>,
    route: routes.dashboard.organization.team.getPath(), disabled: false },
  { title: 'ORGANIZATION-SIDEBAR:ROUTE-TITLE:ORGANIZATION-SETTINGS',
    icon: <i className="zi zi-cog"/>,
    route: routes.dashboard.organization.settings.getPath(), disabled: false },
];

type TRouteProps = RouteComponentProps<{}>;
type TProps = IFeatureProps & IStateProps & IActionProps & ITranslateProps & RouteComponentProps<{}>;

class OrganizationDashboardModule extends React.PureComponent<TProps, IState> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      isNpoServiceReady: npoSelectors.selectServiceIsReady(state),
      currentOrganization: npoSelectors.selectCurrentOrganization(state),
      userOrganizations: npoSelectors.selectUserOrganizations(state),
      isAuthorized: userSelectors.selectIsAuthorized(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      setCurrentViewMode: userActions.setCurrentViewMode,
    }, dispatch);
  }

  public state: IState = {
    selectedRoute: sideBarRoutes[1].route!, // Temporary solution!
  };

  public componentDidMount() {
    this.props.setCurrentViewMode('npo');
  }

  public render() {
    const { isNpoServiceReady } = this.props;
    const { TopBarContainer } = this.props.topBarFeatureEntry.containers;
    const { NpoModalsContainer } = this.props.npoFeatureEntry.containers;

    return (
      <div className={b()}>
        <div className={b('top')}>
          <TopBarContainer onChangeDashboardViewMode={this.handleChangeDashboardViewMode}/>
        </div>
        {isNpoServiceReady && this.renderContent()}
        <NpoModalsContainer
          onDeleteOpportunityDone={this.handleGoToAllOpportunities}
        />
      </div>
    );
  }

  @bind
  private renderContent() {
    const { isAuthorized, currentOrganization, userOrganizations } = this.props;

    if (isAuthorized && (!userOrganizations || userOrganizations.length === 0)) {
      return (
        <NpoNoOrganizationModal
          onClose={this.handleChangeDashboardViewMode}
          onCreateNewOrganization={this.handleCreateNewOrganization}
        />
      );
    }

    return (
      <div className={b('content')}>
        <div className={b('content-left')}>
          {currentOrganization && (
            <OrganizationPortfolioArea
              organization={currentOrganization}
            />
          )}
          <Sidebar
            routes={sideBarRoutes}
            selectedRoute={this.state.selectedRoute}
            onSelectRoute={this.handleSelectRoute}
          />
        </div>
        <div className={b('content-right')}>
          <Switch>
            <AuthorizedRoute
              exact
              key={routes.dashboard.organization.home.getElementKey()}
              path={routes.dashboard.organization.home.getPath()}
              component={NpoHomeModule}
            />
            <AuthorizedRoute
              exact
              key={routes.dashboard.organization['registration-done'].getElementKey()}
              path={routes.dashboard.organization['registration-done'].getPath()}
              component={CreateOrganizationFinished}
            />
            <AuthorizedRoute
              exact
              key={routes.dashboard.organization.opportunity.getElementKey()}
              path={routes.dashboard.organization.opportunity.getPath()}
              component={ViewOpportunitiesModule}
            />
            <AuthorizedRoute
              exact
              key={routes.dashboard.organization.opportunity.create.getElementKey()}
              path={routes.dashboard.organization.opportunity.create.getPath()}
              component={CreateOpportunityModule}
            />
            <AuthorizedRoute
              exact
              key={routes.dashboard.organization.opportunity.view.getElementKey()}
              path={`${routes.dashboard.organization.opportunity.view.getPath()}/:opportunityId`}
              component={ViewSingleOpportunityModule}
            />
            <AuthorizedRoute
              exact
              key={routes.dashboard.organization.opportunity.edit.getElementKey()}
              path={`${routes.dashboard.organization.opportunity.edit.getPath()}/:opportunityId`}
              component={EditOpportunityModule}
            />
            <AuthorizedRoute
              exact
              key={routes.dashboard.organization.calendar.getElementKey()}
              path={routes.dashboard.organization.calendar.getPath()}
              component={OrganizationCalendarModule}
            />
            <Redirect to={routes.dashboard.organization.home.getPath()}/>
          </Switch>
        </div>
      </div>
    );
  }

  @bind
  private handleSelectRoute(route: ISideBarRoute) {
    this.setState({ selectedRoute: route.route! }, () => {
      this.props.history.push(route.route!);
    });
  }

  @bind
  private handleChangeDashboardViewMode() {
    this.props.history.push(routes.dashboard.user.getPath());
  }

  @bind
  private handleCreateNewOrganization() {
    console.log('[handleCreateNewOrganization]');
  }

  @bind
  private handleGoToAllOpportunities() {
    this.props.history.push(routes.dashboard.organization.opportunity.getPath());
  }
}

const withFeatures = withAsyncFeatures({
  npoFeatureEntry: npoFeatureLoadEntry,
  topBarFeatureEntry: topBarFeatureLoadEntry,
})(OrganizationDashboardModule);
const withRedux = connect<IStateProps, IActionProps, ITranslateProps & TRouteProps>(
  OrganizationDashboardModule.mapStateToProps,
  OrganizationDashboardModule.mapDispatch,
)(withFeatures);
const i18nConnected = i18nConnect(withRedux);
export default withRouter(i18nConnected);
