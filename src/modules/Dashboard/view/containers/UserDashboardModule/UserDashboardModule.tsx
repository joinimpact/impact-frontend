import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Redirect, RouteComponentProps, Switch, withRouter } from 'react-router';
import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { Entry as TopBarFeatureEntry } from 'features/topBar/entry';
import { Entry as VolunteerFeatureEntry } from 'features/volunteer/entry';
import { loadEntry as topBarFeatureLoadEntry } from 'features/topBar/loader';
import { loadEntry as volunteerFeatureLoadEntry } from 'features/volunteer/loader';
import { ISideBarRoute } from 'shared/types/app';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import AuthorizedRoute from 'modules/shared/AuthorizedRoute/AuthorizedRoute';
import { Sidebar } from 'shared/view/components';
import routes from 'modules/routes';
import { actions as userActions } from 'services/user';
import {
	UserCalendarModule,
	UserChatModule,
	UserEditProfileModule,
	UserHomeModule,
	UserViewOpportunitiesModule,
	UserViewProfileModule,
	UserViewSingleOpportunityModule,
} from '../../containers';
import UserBrowseOpportunitiesModule from 'modules/Dashboard/view/containers/UserBrowseOpportunitiesModule/UserBrowseOpportunitiesModule';

import './UserDashboardModule.scss';

interface IFeatureProps {
	topBarFeatureEntry: TopBarFeatureEntry;
	volunteerFeatureEntry: VolunteerFeatureEntry;
}

interface IActionProps {
	setCurrentViewMode: typeof userActions.setCurrentViewMode;
}

interface IState {
	selectedRoute: string;
}

const b = block('user-dashboard-module');

const sideBarRoutes: ISideBarRoute[] = [
	{
		title: 'USER-SIDEBAR:ROUTE-TITLE:HOME',
		icon: <i className="zi zi-home" />,
		route: routes.dashboard.user.home.getPath(),
		disabled: false,
	},
	{
		title: 'USER-SIDEBAR:ROUTE-TITLE:BROWSE',
		icon: <i className="zi zi-search" />,
		route: routes.dashboard.user.browse.getPath(),
		disabled: false,
	},
	{
		title: 'USER-SIDEBAR:ROUTE-TITLE:MESSAGES',
		icon: <i className="zi zi-conversation" />,
		route: routes.dashboard.user.messages.getPath(),
		disabled: false,
	},
	{
		title: 'USER-SIDEBAR:ROUTE-TITLE:ENROLLED-OPPORTUNITIES',
		icon: <i className="zi zi-view-tile" />,
		route: routes.dashboard.user.opportunities.getPath(),
		disabled: false,
	},
	{
		title: 'USER-SIDEBAR:ROUTE-TITLE:CALENDAR',
		icon: <i className="zi zi-calendar" />,
		route: routes.dashboard.user.calendar.getPath(),
		disabled: false,
	},
	{
		title: 'USER-SIDEBAR:ROUTE-TITLE:SETTINGS',
		icon: <i className="zi zi-cog" />,
		route: routes.dashboard.user.settings.getPath(),
		disabled: false,
	},
];

type TRouteProp = RouteComponentProps<{}>;
type TProps = IFeatureProps & IActionProps & ITranslateProps & TRouteProp;

class UserDashboardModule extends React.PureComponent<TProps, IState> {
	public static mapDispatch(dispatch: Dispatch): IActionProps {
		return bindActionCreators(
			{
				setCurrentViewMode: userActions.setCurrentViewMode,
			},
			dispatch,
		);
	}

	public state: IState = {
		selectedRoute: sideBarRoutes[1].route!, // Temporary solution!
	};

	public componentDidMount() {
		this.props.setCurrentViewMode('volunteer');
	}

	public render() {
		const { TopBarContainer } = this.props.topBarFeatureEntry.containers;
		const { UserPortfolioSidebarAreaContainer, VolunteerModalsContainer } = this.props.volunteerFeatureEntry.containers;
		return (
			<div className={b()}>
				<div className={b('top')}>
					<TopBarContainer onChangeDashboardViewMode={this.handleChangeDashboardViewMode} />
				</div>
				<VolunteerModalsContainer />
				<div className={b('content')}>
					<div className={b('content-left')}>
						<UserPortfolioSidebarAreaContainer onEditUserProfile={this.handleGoToEditProfile} />
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
								key={routes.dashboard.user.home.getElementKey()}
								path={routes.dashboard.user.home.getPath()}
								component={UserHomeModule}
							/>
							<AuthorizedRoute
								exact
								key={routes.dashboard.user.browse.getElementKey()}
								path={routes.dashboard.user.browse.getPath()}
								component={UserBrowseOpportunitiesModule}
							/>
							<AuthorizedRoute
								key={routes.dashboard.user.opportunities.view.getElementKey()}
								path={`${routes.dashboard.user.opportunities.view.getPath()}/:opportunityId`}
								component={UserViewSingleOpportunityModule}
							/>
							<AuthorizedRoute
								key={routes.dashboard.user.opportunities.getElementKey()}
								path={routes.dashboard.user.opportunities.getPath()}
								component={UserViewOpportunitiesModule}
							/>
							<AuthorizedRoute
								key={routes.dashboard.user.calendar.getElementKey()}
								path={routes.dashboard.user.calendar.getPath()}
								component={UserCalendarModule}
							/>
							<AuthorizedRoute
								key={routes.dashboard.user.messages.getElementKey()}
								path={routes.dashboard.user.messages.getPath()}
								component={UserChatModule}
							/>
							<AuthorizedRoute
								key={routes.dashboard.user.profile.view.getElementKey()}
								path={`${routes.dashboard.user.profile.view.getPath()}/:userId?`}
								component={UserViewProfileModule}
							/>
							<AuthorizedRoute
								key={routes.dashboard.user.profile.getElementKey()}
								path={routes.dashboard.user.profile.getPath()}
								component={UserEditProfileModule}
							/>
							<Redirect to={routes.dashboard.user.home.getPath()} />
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

	@bind
	private handleChangeDashboardViewMode() {
		this.props.history.push(routes.dashboard.organization.getPath());
	}

	@bind
	private handleGoToEditProfile() {
		this.props.history.push(routes.dashboard.user.profile.getPath());
	}
}

const withFeatures = withAsyncFeatures({
	topBarFeatureEntry: topBarFeatureLoadEntry,
	volunteerFeatureEntry: volunteerFeatureLoadEntry,
})(UserDashboardModule);
const withRedux = connect<null, IActionProps, ITranslateProps & TRouteProp>(
	null,
	UserDashboardModule.mapDispatch,
)(withFeatures);
const i18nConnected = i18nConnect(withRedux);
export default withRouter(i18nConnected);
