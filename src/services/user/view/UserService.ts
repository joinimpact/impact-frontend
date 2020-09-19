import React from 'react';
import * as selectors from '../redux/selectors';
import * as actions from '../redux/actions';
import { IAppReduxState } from 'shared/types/app';
import { connect } from 'react-redux';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { bindActionCreators, Dispatch } from 'redux';
import { IInviteProps } from 'shared/types/models/auth';
import { bind } from 'decko';

interface IStateProps {
	isAuthorized: boolean;
	inviteProps: IInviteProps | null;
}

interface IActionProps {
	loadTags: typeof actions.loadTags;
	loadUser: typeof actions.loadUser;
	loadUserTags: typeof actions.loadUserTags;
	loadInvitedOrganization: typeof actions.loadInvitedOrganization;
}

type TProps = IStateProps & IActionProps & ITranslateProps;

class UserService extends React.PureComponent<TProps> {
	public static mapStateToProps(state: IAppReduxState): IStateProps {
		return {
			isAuthorized: selectors.selectIsAuthorized(state),
			inviteProps: selectors.selectInviteProps(state),
		};
	}

	public static mapDispatch(dispatch: Dispatch): IActionProps {
		return bindActionCreators(
			{
				loadTags: actions.loadTags,
				loadUser: actions.loadUser,
				loadUserTags: actions.loadUserTags,
				loadInvitedOrganization: actions.loadInvitedOrganization,
			},
			dispatch,
		);
	}

	public componentDidMount() {
		this.props.loadUser();
		this.props.loadTags();
		// this.props.loadUserTags(); // TODO: REMOVE AFTER AUTHORITY WILL BE WORKED
		this.prepareInternal();
	}

	public componentDidUpdate(prevProps: TProps) {
		const { isAuthorized } = this.props;
		if (!prevProps.isAuthorized && isAuthorized) {
			this.props.loadUserTags();
			this.prepareInternal();
		}
	}

	public render() {
		return null;
	}

	@bind
	private prepareInternal() {
		if (this.props.isAuthorized) {
			this.props.loadInvitedOrganization();
		}
	}
}

const i18nConnected = i18nConnect<{}>(UserService);
const withRedux = connect<IStateProps, IActionProps>(
	UserService.mapStateToProps,
	UserService.mapDispatch,
)(i18nConnected);
export default withRedux;
