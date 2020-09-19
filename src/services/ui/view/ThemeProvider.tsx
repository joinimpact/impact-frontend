import React from 'react';
import { IAppReduxState, ILayoutType } from 'shared/types/app';
import * as selectors from '../redux/selectors';
import { connect } from 'react-redux';

interface IStateProps {
	layoutType: ILayoutType;
}

type TProps = IStateProps;

class ThemeProvider extends React.PureComponent<TProps> {
	public static mapStateToProps(state: IAppReduxState): IStateProps {
		return {
			layoutType: selectors.selectLayoutType(state),
		};
	}

	public componentDidMount() {
		this.updateBodyTheme();
	}

	public componentDidUpdate() {
		this.updateBodyTheme();
	}

	public render() {
		return null;
	}

	private updateBodyTheme() {
		document.body.className = this.bodyClassName;
	}

	private get bodyClassName() {
		const { layoutType } = this.props;
		// We can modify theme here
		const theme = 'default';
		return `theme_${theme} ${layoutType}`;
	}
}

export default connect<IStateProps>(ThemeProvider.mapStateToProps)(ThemeProvider);
