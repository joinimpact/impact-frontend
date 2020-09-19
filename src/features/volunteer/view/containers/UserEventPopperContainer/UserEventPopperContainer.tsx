import React from 'react';
import { bind } from 'decko';
// import block from 'bem-cn';
import { connect } from 'react-redux';
import { IEvent } from 'shared/types/models/events';
import { IAppReduxState } from 'shared/types/app';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from 'features/volunteer/redux/actions';
import { ICommunication } from 'shared/types/redux';
import * as selectors from 'features/volunteer/redux/selectors';
import { UserEventPopperComponent } from 'features/volunteer/view/components';
import { IOpportunityResponse } from 'shared/types/responses/npo';
import { RouteComponentProps, withRouter } from 'react-router';
import routes from 'modules/routes';
import { IEventUserResponse } from 'shared/types/responses/volunteer';

interface IOwnProps {
	event: IEvent;
	paletteIndex: number;
	readonly?: boolean;
	onClose(): void;
}

interface IStateProps {
	attendEventCommunication: ICommunication;
	declineEventCommunication: ICommunication;
	currentEnrolledOpportunities: IOpportunityResponse[];
	getMyResponseToEventCommunication: ICommunication;
	myResponseToThisEvent: IEventUserResponse | null;
}

interface IActionProps {
	attendEvent: typeof actions.attendEvent;
	declineEvent: typeof actions.declineEvent;
	getMyResponseToEvent: typeof actions.getMyResponseToEvent;
	resetMyResponseToEvent: typeof actions.resetMyResponseToEvent;
}

// const b = block('user-event-popper-container');
type TRouteProps = RouteComponentProps<{}>;
type TProps = IOwnProps & IStateProps & IActionProps & TRouteProps;

class UserEventPopperContainer extends React.PureComponent<TProps> {
	public static mapStateToProps(state: IAppReduxState): IStateProps {
		return {
			attendEventCommunication: selectors.selectCommunication(state, 'attendEvent'),
			declineEventCommunication: selectors.selectCommunication(state, 'declineEvent'),
			currentEnrolledOpportunities: selectors.selectCurrentEnrolledOpportunities(state),
			getMyResponseToEventCommunication: selectors.selectCommunication(state, 'getMyEventResponse'),
			myResponseToThisEvent: selectors.selectMyResponseToEvent(state),
		};
	}

	public static mapDispatch(dispatch: Dispatch): IActionProps {
		return bindActionCreators(
			{
				attendEvent: actions.attendEvent,
				declineEvent: actions.declineEvent,
				getMyResponseToEvent: actions.getMyResponseToEvent,
				resetMyResponseToEvent: actions.resetMyResponseToEvent,
			},
			dispatch,
		);
	}

	public componentDidMount() {
		this.props.getMyResponseToEvent(this.props.event.id);
	}

	public componentDidUpdate(prevProps: TProps) {
		if (prevProps.declineEventCommunication.isRequesting && this.props.declineEventCommunication.isLoaded) {
			this.props.onClose();
		}
		if (prevProps.attendEventCommunication.isRequesting && this.props.attendEventCommunication.isLoaded) {
			this.props.onClose();
		}
	}

	public componentWillUnmount() {
		this.props.resetMyResponseToEvent();
	}

	public render() {
		const { event, readonly } = this.props;
		return (
			<UserEventPopperComponent
				event={event}
				paletteIndex={this.props.paletteIndex}
				opportunity={this.opportunity!}
				getMyResponseToEventCommunication={this.props.getMyResponseToEventCommunication}
				myResponseToThisEvent={this.props.myResponseToThisEvent}
				attendCommunication={this.props.attendEventCommunication}
				declineCommunication={this.props.declineEventCommunication}
				onAttend={readonly ? undefined : this.props.attendEvent}
				onDecline={readonly ? undefined : this.props.declineEvent}
				onGoToOpportunity={this.handleGoToOpportunity}
			/>
		);
	}

	private get opportunity(): IOpportunityResponse | undefined {
		const { event } = this.props;
		return this.props.currentEnrolledOpportunities.find((opportunity) => opportunity.id === event.opportunityId);
	}

	@bind
	private handleGoToOpportunity(opportunityId: string) {
		this.props.history.push(`${routes.dashboard.user.opportunities.view.getPath()}/${opportunityId}`);
	}
}

const withRedux = connect<IStateProps, IActionProps, IOwnProps>(
	UserEventPopperContainer.mapStateToProps,
	UserEventPopperContainer.mapDispatch,
)(UserEventPopperContainer);
export default withRouter(withRedux);
