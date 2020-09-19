import React from 'react';
import { Route, RouteProps } from 'react-router';
import { actions as configActions } from 'services/config';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { i18nConnect, ITranslateProps } from 'services/i18n';

export interface IOwnProps extends RouteProps {
	title?: string;
}

interface IDispatchProps {
	changeTitle: typeof configActions.changeTitle;
}

type TProps = IDispatchProps & IOwnProps & ITranslateProps;

class RouteEntry extends React.Component<TProps> {
	public static mapDispatch(dispatch: Dispatch): IDispatchProps {
		return bindActionCreators(
			{
				changeTitle: configActions.changeTitle,
			},
			dispatch,
		);
	}

	public componentDidMount() {
		const { title, translate: t } = this.props;
		if (title) {
			this.props.changeTitle(t(title));
		}
	}

	public render() {
		const { title, ...routeProps } = this.props;
		return <Route {...routeProps} />;
	}
}

const i18nConnected = i18nConnect(RouteEntry);
export default connect<void, IDispatchProps, IOwnProps>(null, RouteEntry.mapDispatch)(i18nConnected);
