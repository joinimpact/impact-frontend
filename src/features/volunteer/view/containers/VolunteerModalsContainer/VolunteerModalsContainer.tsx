import React from 'react';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  ApplyForOpportunityModal,
  DeleteAccountModal, InviteOrganizationModal,
  RequestHoursModal,
  ShareOpportunityModal,
} from '../../components';
import * as selectors from '../../../redux/selectors';
import * as actions from '../../../redux/actions';
import * as NS from '../../../namespace';
import { IAppReduxState } from 'shared/types/app';
import { ICommunication } from 'shared/types/redux';
import { IRequestHoursProps } from '../../../namespace';
import { actions as userActions, selectors as userSelectors } from 'services/user';
import { IInviteProps } from 'shared/types/models/auth';
import { IOrganizationsResponseItem } from 'shared/types/responses/npo';

interface IStateProps {
  applyOpportunityId: string | null;
  applyForOpportunityCommunication: ICommunication;
  isShowShareOpportunityModal: boolean;
  hoursRequest: IRequestHoursProps | null;
  hoursRequestCommunication: ICommunication;
  isShowDeleteAccountModal: boolean;
  deleteAccountCommunication: ICommunication;
  inviteProps: IInviteProps | null;
  inviteOrganization: IOrganizationsResponseItem | null;
  acceptInvitationCommunication: ICommunication;
  declineInvitationCommunication: ICommunication;
}

interface IActionProps {
  resetRequestApplyOpportunity: typeof actions.resetRequestApplyOpportunity;
  applyForOpportunity: typeof actions.applyForOpportunity;
  showShareOpportunityModal: typeof actions.showShareOpportunityModal;
  closeShareOpportunityModal: typeof actions.closeShareOpportunityModal;
  resetRequestHours: typeof actions.resetRequestHours;
  requestHours: typeof actions.requestHours;
  resetDeleteAccountRequest: typeof actions.resetDeleteAccountRequest;
  deleteAccount: typeof actions.deleteAccount;
  resetInviteProps: typeof userActions.resetInviteProps;
  acceptInvitation: typeof actions.acceptInvitation;
  declineInvitation: typeof actions.declineInvitation;
}

type TProps = IStateProps & IActionProps;

class VolunteerModalsContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      applyOpportunityId: selectors.selectApplyOpportunityId(state),
      applyForOpportunityCommunication: selectors.selectCommunication(state, 'applyForOpportunity'),
      isShowShareOpportunityModal: selectors.selectUiState(state, 'shareOpportunityVisible'),
      hoursRequest: selectors.selectRequestHours(state),
      hoursRequestCommunication: selectors.selectCommunication(state, 'requestHours'),
      isShowDeleteAccountModal: selectors.selectUiState(state, 'deleteAccountVisible'),
      deleteAccountCommunication: selectors.selectCommunication(state, 'deleteAccount'),
      inviteProps: userSelectors.selectInviteProps(state),
      inviteOrganization: userSelectors.selectInviteOrganization(state),
      acceptInvitationCommunication: selectors.selectCommunication(state, 'acceptInvitation'),
      declineInvitationCommunication: selectors.selectCommunication(state, 'declineInvitation'),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      resetRequestApplyOpportunity: actions.resetRequestApplyOpportunity,
      applyForOpportunity: actions.applyForOpportunity,
      showShareOpportunityModal: actions.showShareOpportunityModal,
      closeShareOpportunityModal: actions.closeShareOpportunityModal,
      resetRequestHours: actions.resetRequestHours,
      requestHours: actions.requestHours,
      resetDeleteAccountRequest: actions.resetDeleteAccountRequest,
      deleteAccount: actions.deleteAccount,
      resetInviteProps: userActions.resetInviteProps,
      acceptInvitation: actions.acceptInvitation,
      declineInvitation: actions.declineInvitation,
    }, dispatch);
  }

  public render() {
    return (
      <>
        {(this.props.applyOpportunityId) && (
          <ApplyForOpportunityModal
            communication={this.props.applyForOpportunityCommunication}
            onApply={this.handleApplyForOpportunity}
            onClose={this.props.resetRequestApplyOpportunity}
          />
        )}
        {(this.props.isShowShareOpportunityModal) && (
          <ShareOpportunityModal
            onClose={this.props.closeShareOpportunityModal}
          />
        )}
        {(this.props.hoursRequest) && (
          <RequestHoursModal
            communication={this.props.hoursRequestCommunication}
            onClose={this.props.resetRequestHours}
            onRequest={this.handleRequestHours}
          />
        )}
        {(this.props.isShowDeleteAccountModal) && (
          <DeleteAccountModal
            communication={this.props.deleteAccountCommunication}
            onClose={this.props.resetDeleteAccountRequest}
            onDelete={this.handleDeleteAccount}
          />
        )}
        {(Boolean(this.props.inviteProps) && Boolean(this.props.inviteOrganization)) && (
          <InviteOrganizationModal
            organization={this.props.inviteOrganization!}
            onClose={this.props.resetInviteProps}
            onAccept={this.handleAcceptOrganizationInvitation}
            onDecline={this.handleDeclineOrganizationInvitation}
            acceptCommunication={this.props.acceptInvitationCommunication}
            declineCommunication={this.props.declineInvitationCommunication}
          />
        )}
      </>
    );
  }

  @bind
  private handleApplyForOpportunity(message: string) {
    this.props.applyForOpportunity({
      message,
      opportunityId: this.props.applyOpportunityId!,
    });
  }

  @bind
  private handleRequestHours(values: NS.IRequestHoursForm) {
    const { hoursRequest } = this.props;
    this.props.requestHours({
      hours: values.hours,
      description: values.description,
      organizationId: hoursRequest!.organizationId,
    });
  }

  @bind
  private handleDeleteAccount() {
    this.props.deleteAccount();
  }

  @bind
  private handleAcceptOrganizationInvitation() {
    this.props.acceptInvitation();
  }

  @bind
  private handleDeclineOrganizationInvitation() {
    this.props.declineInvitation();
  }
}

const withRedux = connect<IStateProps, IActionProps>(
  VolunteerModalsContainer.mapStateToProps,
  VolunteerModalsContainer.mapDispatch,
)(VolunteerModalsContainer);
export default withRedux;
