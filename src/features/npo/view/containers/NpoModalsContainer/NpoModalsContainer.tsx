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
  CreateNewEventModal,
  DeletedOpportunityConfirmationModal,
  DeleteOpportunityModal,
  InviteTeamMembersModal,
} from '../../components';
import { ICommunication } from 'shared/types/redux';
import { createNewEventFormEntry } from 'features/npo/redux/reduxFormEntries';
import { getFormValues } from 'redux-form';
import { IOrganizationsResponseItem } from 'shared/types/responses/npo';
import { selectors as npoSelectors } from 'services/npo';

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
  newEventModalFormValues: NS.ICreateNewEventForm;
}

interface IActionProps {
  resetRequestDeleteOpportunityId: typeof actions.resetRequestDeleteOpportunity;
  deleteOpportunity: typeof actions.deleteOpportunity;
  resetDeletedOpportunityConfirmation: typeof actions.resetDeletedOpportunityConfirmation;
  resetRequestInviteVolunteers: typeof actions.resetRequestInviteVolunteers;
  saveOrganizationMembers: typeof actions.saveOrganizationMembers;
  resetRequestCreateNewEvent: typeof actions.resetRequestCreateNewEvent;
  createNewEvent: typeof actions.createNewEvent;
}

type TProps = IOwnProps & IStateProps & IActionProps & ITranslateProps;

class NpoModalsContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      deleteOpportunityCommunication: selectors.selectCommunication(state, 'deleteOpportunity'),
      saveOrganizationMembersCommunication: selectors.selectCommunication(state, 'saveOrganizationMembers'),
      createNewEventCommunication: selectors.selectCommunication(state, 'createNewEvent'),
      deleteOpportunityId: selectors.selectRequestDeleteOpportunity(state),
      showDeletedOpportunityConfirmation: selectors.selectModal(state, 'showDeleteOpportunityConfirmation'),
      showCreateNewEvent: selectors.selectModal(state, 'createNewEvent'),
      inviteVolunteersOpportunityId: selectors.selectInviteVolunteersOpportunityId(state),
      currentOrganization: npoSelectors.selectCurrentOrganization(state),
      newEventModalFormValues: getFormValues(createNewEventFormEntry.name)(state) as NS.ICreateNewEventForm,
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
        createNewEvent: actions.createNewEvent,
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
        {inviteVolunteersOpportunityId && (
          <InviteTeamMembersModal
            onClose={this.props.resetRequestInviteVolunteers}
            communication={this.props.saveOrganizationMembersCommunication}
            onInvite={this.handleInvite}
          />
        )}
        {((showCreateNewEvent) && this.props.currentOrganization) && (
          <CreateNewEventModal
            orgId={this.props.currentOrganization!.id}
            communication={this.props.createNewEventCommunication}
            currentValues={this.props.newEventModalFormValues}
            onClose={this.handleCloseCreateNewEvent}
            onCreateNewEvent={this.handleCreateNewEvent}
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
  }

  @bind
  private handleCreateNewEvent(values: NS.ICreateNewEventProps) {
    this.props.createNewEvent(values);
  }
}

const withRedux = connect<IStateProps, IActionProps>(
  NpoModalsContainer.mapStateToProps,
  NpoModalsContainer.mapDispatch,
)(NpoModalsContainer);
export default i18nConnect<IOwnProps>(withRedux);
