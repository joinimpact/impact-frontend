import React from 'react';
import { connect } from 'react-redux';
import { selectors as userSelectors } from 'services/user';
import { IAppReduxState } from 'shared/types/app';

interface IStateProps {
	isAuthorized: boolean;
}

type TProps = IStateProps;

class EventsService extends React.PureComponent<TProps> {
	public static mapStateToProps(state: IAppReduxState): IStateProps {
		return {
			isAuthorized: userSelectors.selectIsAuthorized(state),
		};
	}

	public render() {
		return <></>;
	}
}

const withRedux = connect<IStateProps>(EventsService.mapStateToProps)(EventsService);
export default withRedux;
