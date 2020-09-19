import React from 'react';
import { actions, selectors } from '../redux';
import { ICommunication } from 'shared/types/redux';
import { IAppReduxState } from 'shared/types/app';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { selectors as userSelectors } from 'services/user';
import { bind } from 'decko';

interface IStateProps {
	connectCommunication: ICommunication;
	isAuthorized: boolean;
}

interface IActionProps {
	connect: typeof actions.connect;
	reconnect: typeof actions.reconnect;
	disconnect: typeof actions.disconnect;
}

type TProps = IStateProps & IActionProps;

class WebSocketServiceContainer extends React.PureComponent<TProps> {
	public static mapStateToProps(state: IAppReduxState): IStateProps {
		return {
			connectCommunication: selectors.selectCommunication(state, 'connect'),
			isAuthorized: userSelectors.selectIsAuthorized(state),
		};
	}

	public static mapDispatch(dispatch: Dispatch): IActionProps {
		return bindActionCreators(
			{
				connect: actions.connect,
				reconnect: actions.reconnect,
				disconnect: actions.disconnect,
			},
			dispatch,
		);
	}

	public componentDidMount() {
		if (this.props.isAuthorized) {
			this.connectWebSocket();
		}
	}

	public componentDidUpdate(prevProps: TProps) {
		if (!prevProps.isAuthorized && this.props.isAuthorized) {
			this.connectWebSocket();
		}

		if (prevProps.isAuthorized && !this.props.isAuthorized) {
			this.disconnectWebSocket();
		}
	}

	public render() {
		return null;
	}

	@bind
	private connectWebSocket() {
		this.props.connect();
	}

	@bind
	private disconnectWebSocket() {
		this.props.disconnect();
	}
}

const withRedux = connect<IStateProps, IActionProps>(
	WebSocketServiceContainer.mapStateToProps,
	WebSocketServiceContainer.mapDispatch,
)(WebSocketServiceContainer);
export default withRedux;
