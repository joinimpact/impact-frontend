import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { IAppReduxState } from 'shared/types/app';
import { bindActionCreators, Dispatch } from 'redux';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import {
  CreateNewEventModal,
  DeletedOpportunityConfirmationModal,
  DeleteOpportunityModal,
  InviteTeamMembersModal,
} from '../../components';
import { bind } from 'decko';
import { ICommunication } from 'shared/types/redux';

interface IOwnProps {
  onDeleteOpportunityDone?(): void;
}

interface IStateProps {
  deleteOpportunityCommunication: ICommunication;
  saveOrganizationMembersCommunication: ICommunication;
  deleteOpportunityId: string | null;
  showDeletedOpportunityConfirmation: boolean;
  inviteVolunteersOpportunityId: string | null;
  showCreateNewEvent: boolean;
}

interface IActionProps {
  resetRequestDeleteOpportunityId: typeof actions.resetRequestDeleteOpportunity;
  deleteOpportunity: typeof actions.deleteOpportunity;
  resetDeletedOpportunityConfirmation: typeof actions.resetDeletedOpportunityConfirmation;
  resetRequestInviteVolunteers: typeof actions.resetRequestInviteVolunteers;
  saveOrganizationMembers: typeof actions.saveOrganizationMembers;
  resetRequestCreateNewEvent: typeof actions.resetRequestCreateNewEvent;
}

type TProps = IOwnProps & IStateProps & IActionProps & ITranslateProps;

class NpoModalsContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      deleteOpportunityCommunication: selectors.selectCommunication(state, 'deleteOpportunity'),
      saveOrganizationMembersCommunication: selectors.selectCommunication(state, 'saveOrganizationMembers'),
      deleteOpportunityId: selectors.selectRequestDeleteOpportunity(state),
      showDeletedOpportunityConfirmation: selectors.selectModal(state, 'showDeleteOpportunityConfirmation'),
      showCreateNewEvent: selectors.selectModal(state, 'createNewEvent'),
      inviteVolunteersOpportunityId: selectors.selectInviteVolunteersOpportunityId(state),
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
        {(showCreateNewEvent) && (
          <CreateNewEventModal
            onClose={this.handleCloseCreateNewEvent} />
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
}

const withRedux = connect<IStateProps, IActionProps>(
  NpoModalsContainer.mapStateToProps,
  NpoModalsContainer.mapDispatch,
)(NpoModalsContainer);
export default i18nConnect<IOwnProps>(withRedux);
