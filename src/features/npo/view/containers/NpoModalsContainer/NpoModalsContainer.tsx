import React from 'react';
import { bind } from 'decko';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import * as NS from '../../../namespace';
import { IAppReduxState } from 'shared/types/app';
import { bindActionCreators, Dispatch } from 'redux';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import {
	EditEventModal,
	DeletedOpportunityConfirmationModal,
	DeleteOpportunityModal,
	InviteTeamMembersModal,
} from '../../components';
import { ICommunication } from 'shared/types/redux';
import { createNewEventFormEntry } from 'features/npo/redux/reduxFormEntries';
import { getFormValues } from 'redux-form';
import { IOrganizationsResponseItem } from 'shared/types/responses/npo';
import { selectors as npoSelectors } from 'services/npo';
import { IEvent } from 'shared/types/models/events';

interface IOwnProps {
	onDeleteOpportunityDone?(): void;
}

interface IStateProps {
	deleteOpportunityCommunication: ICommunication;
	saveOrganizationMembersCommunication: ICommunication;
	createNewEventCommunication: ICommunication;
	currentOrganization: IOrganizationsResponseItem | null;
	deleteOpportunityId: string | null;
	showDeletedOpportunityConfirmation: boolean;
	inviteVolunteersOpportunityId: string | null;
	showCreateNewEvent: boolean;
	currentEditEvent: IEvent | null;
	newEventModalFormValues: NS.IEditEventForm;
	inviteTeamMembers: boolean;
}

interface IActionProps {
	resetRequestDeleteOpportunityId: typeof actions.resetRequestDeleteOpportunity;
	deleteOpportunity: typeof actions.deleteOpportunity;
	resetDeletedOpportunityConfirmation: typeof actions.resetDeletedOpportunityConfirmation;
	resetRequestInviteVolunteers: typeof actions.resetRequestInviteVolunteers;
	saveOrganizationMembers: typeof actions.saveOrganizationMembers;
	resetRequestCreateNewEvent: typeof actions.resetRequestCreateNewEvent;
	editEvent: typeof actions.editEvent;
	resetEditEvent: typeof actions.resetEditEvent;
}

type TProps = IOwnProps & IStateProps & IActionProps & ITranslateProps;

class NpoModalsContainer extends React.PureComponent<TProps> {
	public static mapStateToProps(state: IAppReduxState): IStateProps {
		return {
			deleteOpportunityCommunication: selectors.selectCommunication(state, 'deleteOpportunity'),
			saveOrganizationMembersCommunication: selectors.selectCommunication(state, 'saveOrganizationMembers'),
			createNewEventCommunication: selectors.selectCommunication(state, 'editEvent'),
			deleteOpportunityId: selectors.selectRequestDeleteOpportunity(state),
			showDeletedOpportunityConfirmation: selectors.selectModal(state, 'showDeleteOpportunityConfirmation'),
			showCreateNewEvent: selectors.selectModal(state, 'createNewEvent'),
			currentEditEvent: selectors.selectEditEvent(state),
			inviteVolunteersOpportunityId: selectors.selectInviteVolunteersOpportunityId(state),
			currentOrganization: npoSelectors.selectCurrentOrganization(state),
			newEventModalFormValues: getFormValues(createNewEventFormEntry.name)(state) as NS.IEditEventForm,
			inviteTeamMembers: selectors.selectModal(state, 'inviteTeamMembers'),
		};
	}

	public static mapDispatch(dispatch: Dispatch): IActionProps {
		return bindActionCreators(
			{
				resetRequestDeleteOpportunityId: actions.resetRequestDeleteOpportunity,
				deleteOpportunity: actions.deleteOpportunity,
				resetDeletedOpportunityConfirmation: actions.resetDeletedOpportunityConfirmation,
				resetRequestInviteVolunteers: actions.resetRequestInviteVolunteers,
				saveOrganizationMembers: actions.saveOrganizationMembers,
				resetRequestCreateNewEvent: actions.resetRequestCreateNewEvent,
				resetEditEvent: actions.resetEditEvent,
				editEvent: actions.editEvent,
			},
			dispatch,
		);
	}

	public componentDidUpdate(prevProps: TProps) {
		const { deleteOpportunityCommunication } = this.props;

		if (!prevProps.deleteOpportunityCommunication.isLoaded && deleteOpportunityCommunication.isLoaded) {
			this.props.onDeleteOpportunityDone && this.props.onDeleteOpportunityDone();
		}
	}

	public render() {
		const {
			deleteOpportunityId,
			showDeletedOpportunityConfirmation,
			inviteVolunteersOpportunityId,
			showCreateNewEvent,
			currentEditEvent,
			inviteTeamMembers,
		} = this.props;
		return (
			<>
				{deleteOpportunityId && (
					<DeleteOpportunityModal
						communication={this.props.deleteOpportunityCommunication}
						onClose={this.props.resetRequestDeleteOpportunityId}
						onDelete={this.handleDeleteOpportunity}
					/>
				)}
				{false && showDeletedOpportunityConfirmation && (
					<DeletedOpportunityConfirmationModal onClose={this.props.resetDeletedOpportunityConfirmation} />
				)}
				{(inviteVolunteersOpportunityId || inviteTeamMembers) && (
					<InviteTeamMembersModal
						onClose={this.props.resetRequestInviteVolunteers}
						communication={this.props.saveOrganizationMembersCommunication}
						onInvite={this.handleInvite}
					/>
				)}
				{(showCreateNewEvent || currentEditEvent != null) && this.props.currentOrganization && (
					<EditEventModal
						event={currentEditEvent}
						orgId={this.props.currentOrganization!.id}
						communication={this.props.createNewEventCommunication}
						currentValues={this.props.newEventModalFormValues}
						onClose={this.handleCloseCreateNewEvent}
						onEditEvent={this.handleEditEvent}
					/>
				)}
			</>
		);
	}

	@bind
	private handleDeleteOpportunity() {
		this.props.deleteOpportunity(this.props.deleteOpportunityId!);
	}

	@bind
	private handleInvite(members: string[]) {
		this.props.saveOrganizationMembers(members);
	}

	@bind
	private handleCloseCreateNewEvent() {
		this.props.resetRequestCreateNewEvent();
		this.props.resetEditEvent();
	}

	@bind
	private handleEditEvent(values: NS.IEditEventProps) {
		this.props.editEvent(values);
	}
}

const withRedux = connect<IStateProps, IActionProps>(
	NpoModalsContainer.mapStateToProps,
	NpoModalsContainer.mapDispatch,
)(NpoModalsContainer);
export default i18nConnect<IOwnProps>(withRedux);
