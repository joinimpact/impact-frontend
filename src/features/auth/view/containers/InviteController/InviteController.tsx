import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import routes from 'modules/routes';
import { actions as userActions, selectors as userSelectors } from 'services/user';
import { IAppReduxState } from 'shared/types/app';

interface IStateProps {
	isAuthorized: boolean;
}

interface IOwnProps {
	organizationId: string;
	inviteId: string;
	keyValue: string;
}

interface IActionProps {
	setInviteProps: typeof userActions.setInviteProps;
	loadInvitedOrganization: typeof userActions.loadInvitedOrganization;
}

type TRouteProps = RouteComponentProps<{}>;
type TProps = IOwnProps & IStateProps & IActionProps & TRouteProps;

class InviteController extends React.PureComponent<TProps> {
	public static mapStateToProps(state: IAppReduxState): IStateProps {
		return {
			isAuthorized: userSelectors.selectIsAuthorized(state),
		};
	}

	public static mapDispatch(dispatch: Dispatch): IActionProps {
		return bindActionCreators(
			{
				setInviteProps: userActions.setInviteProps,
				loadInvitedOrganization: userActions.loadInvitedOrganization,
			},
			dispatch,
		);
	}

	public componentDidMount() {
		const { organizationId, inviteId, keyValue, isAuthorized } = this.props;
		this.props.setInviteProps({
			organizationId,
			inviteId,
			key: keyValue,
		});
		if (isAuthorized) {
			this.props.loadInvitedOrganization();
			this.props.history.push(routes.dashboard.user.home.getPath());
		} else {
			this.props.history.push(routes.auth.login.getPath());
		}
	}

	public render() {
		return null;
	}
}

const withRedux = connect<IStateProps, IActionProps, IOwnProps & TRouteProps>(
	InviteController.mapStateToProps,
	InviteController.mapDispatch,
)(InviteController);
export default withRouter(withRedux);
