import React from 'react';
import * as actions from '../redux/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { selectors as userSelectors } from 'services/user';
import { IAppReduxState } from 'shared/types/app';
import { bind } from 'decko';
import { connect } from 'react-redux';

interface IStateProps {
	isAuthorized: boolean;
}

interface IActionProps {
	subscribeToSocket: typeof actions.subscribeToSocket;
	unsubscribeFromSocket: typeof actions.unsubscribeFromSocket;
}

interface IState {
	isSubscribed: boolean;
}

type TProps = IStateProps & IActionProps;

class NotifyService extends React.PureComponent<TProps, IState> {
	public static mapStateToProps(state: IAppReduxState): IStateProps {
		return {
			isAuthorized: userSelectors.selectIsAuthorized(state),
		};
	}

	public static mapDispatch(dispatch: Dispatch): IActionProps {
		return bindActionCreators(
			{
				subscribeToSocket: actions.subscribeToSocket,
				unsubscribeFromSocket: actions.unsubscribeFromSocket,
			},
			dispatch,
		);
	}

	public state: IState = {
		isSubscribed: false,
	};

	public componentDidMount() {
		this.prepareState();
	}

	public componentDidUpdate(prevProps: TProps) {
		const { isAuthorized } = this.props;

		if (!prevProps.isAuthorized && isAuthorized) {
			this.prepareState();
		}
	}

	public componentWillUnmount() {
		this.props.unsubscribeFromSocket();
	}

	public render() {
		return null;
	}

	@bind
	private prepareState() {
		if (!this.state.isSubscribed && this.props.isAuthorized) {
			this.setState({ isSubscribed: true }, () => {
				this.props.subscribeToSocket();
			});
		}
	}
}

const withRedux = connect<IStateProps, IActionProps>(
	NotifyService.mapStateToProps,
	NotifyService.mapDispatch,
)(NotifyService);
export default withRedux;
