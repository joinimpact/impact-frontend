import React from 'react';
import * as actions from '../redux/actions';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

interface IActionProps {
	loadFullSettings: typeof actions.loadFullSettings;
}

type TProps = IActionProps;

class ConfigProvider extends React.PureComponent<TProps> {
	public static mapDispatch(dispatch: Dispatch): IActionProps {
		return bindActionCreators(
			{
				loadFullSettings: actions.loadFullSettings,
			},
			dispatch,
		);
	}

	public componentDidMount() {
		this.props.loadFullSettings();
	}

	public render() {
		return null;
	}
}

export default connect<void, IActionProps>(null, ConfigProvider.mapDispatch)(ConfigProvider);
