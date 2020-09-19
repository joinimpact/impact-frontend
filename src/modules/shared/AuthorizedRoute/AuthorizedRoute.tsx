import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { withRouter, RouteComponentProps, Route, RouteProps } from 'react-router';
import { actions as configActions } from 'services/config';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IAppReduxState } from 'shared/types/app';
import { selectors as userSelectors } from 'services/user';
import routes from '../../routes';

export interface IOwnProps extends RouteProps {
	allowUnauthorized?: boolean;
	title?: string;
	redirectTo?: string;
}

interface IStateProps {
	isAuthorized: boolean;
	isAuthRequested: boolean;
	isUserLoaded: boolean;
}

interface IDispatchProps {
	changeTitle: typeof configActions.changeTitle;
}

type TProps = IStateProps & IDispatchProps & IOwnProps & ITranslateProps & RouteComponentProps;

class AuthorizedRoute extends React.Component<TProps> {
	public static mapStateToProps(state: IAppReduxState): IStateProps {
		return {
			isAuthorized: userSelectors.selectIsAuthorized(state),
			isAuthRequested: userSelectors.selectIsAuthRequested(state),
			isUserLoaded: userSelectors.selectIsCurrentUserLoaded(state),
		};
	}

	public static mapDispatch(dispatch: Dispatch): IDispatchProps {
		return bindActionCreators(
			{
				changeTitle: configActions.changeTitle,
			},
			dispatch,
		);
	}

	public componentDidMount() {
		const { title, translate: t, isAuthRequested } = this.props;

		if (isAuthRequested) {
			this.checkAuthState();
		}

		if (title) {
			this.props.changeTitle(t(title));
		}
	}

	public componentDidUpdate({ isAuthRequested: prevIsAuthRequested, isAuthorized: prevIsAuthorized }: TProps) {
		const { isAuthRequested, isAuthorized } = this.props;

		if (!prevIsAuthRequested && isAuthRequested) {
			this.checkAuthState();
		}

		if (isAuthRequested) {
			if (prevIsAuthorized !== isAuthorized) {
				this.checkAuthState();
			}
		}
	}

	public render() {
		const { title, isAuthorized, isAuthRequested, allowUnauthorized, isUserLoaded, ...routeProps } = this.props;
		if (isAuthRequested && ((isAuthorized && isUserLoaded) || allowUnauthorized)) {
			return <Route {...routeProps} />;
		}

		return null;
	}

	private checkAuthState() {
		const { isAuthorized, allowUnauthorized = false, redirectTo = routes.auth.login.getPath(), location } = this.props;
		if (!isAuthorized && !allowUnauthorized) {
			this.props.history.push(`${redirectTo}?redirect=${location.pathname}`);
		}
	}
}

const withRedux = connect<IStateProps, IDispatchProps, IOwnProps>(
	AuthorizedRoute.mapStateToProps,
	AuthorizedRoute.mapDispatch,
)(AuthorizedRoute);
const routeConnected = withRouter(withRedux);
const i18nConnected = i18nConnect<IOwnProps>(routeConnected);
export default i18nConnected;
