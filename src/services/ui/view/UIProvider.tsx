import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import { bindActionCreators, Dispatch } from 'redux';
import MediaQuery from 'react-responsive';
import { ILayoutType } from 'shared/types/app';
import MediaContainer from './MediaContainer';

interface IActionProps {
	changeLayout: typeof actions.changeLayout;
}

type TProps = IActionProps;

class UIProvider extends React.PureComponent<TProps> {
	public static mapDispatch(dispatch: Dispatch): IActionProps {
		return bindActionCreators(
			{
				changeLayout: actions.changeLayout,
			},
			dispatch,
		);
	}

	public render() {
		return (
			<>
				<MediaQuery minWidth={1024}>
					<MediaContainer callback={this.props.changeLayout.bind(this, ILayoutType.desktop)} />
				</MediaQuery>
				<MediaQuery maxWidth={1023}>
					<MediaContainer callback={this.props.changeLayout.bind(this, ILayoutType.mobile)} />
				</MediaQuery>
			</>
		);
	}
}

export default connect<void, IActionProps>(null, UIProvider.mapDispatch)(UIProvider);
