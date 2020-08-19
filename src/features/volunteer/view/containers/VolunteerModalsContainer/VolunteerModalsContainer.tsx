import React from 'react';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplyForOpportunityModal, RequestHoursModal, ShareOpportunityModal } from '../../components';
import * as selectors from '../../../redux/selectors';
import * as actions from '../../../redux/actions';
import * as NS from '../../../namespace';
import { IAppReduxState } from 'shared/types/app';
import { ICommunication } from 'shared/types/redux';
import { IRequestHoursProps } from '../../../namespace';


interface IStateProps {
  applyOpportunityId: string | null;
  applyForOpportunityCommunication: ICommunication;
  isShowShareOpportunityModal: boolean;
  hoursRequest: IRequestHoursProps | null;
  hoursRequestCommunication: ICommunication;
}

interface IActionProps {
  resetRequestApplyOpportunity: typeof actions.resetRequestApplyOpportunity;
  applyForOpportunity: typeof actions.applyForOpportunity;
  showShareOpportunityModal: typeof actions.showShareOpportunityModal;
  closeShareOpportunityModal: typeof actions.closeShareOpportunityModal;
  resetRequestHours: typeof actions.resetRequestHours;
  requestHours: typeof actions.requestHours;
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
    console.log('hoursRequest: ', hoursRequest);
    this.props.requestHours({
      hours: values.hours,
      description: values.description,
      organizationId: hoursRequest!.organizationId,
    });
  }
}

const withRedux = connect<IStateProps, IActionProps>(
  VolunteerModalsContainer.mapStateToProps,
  VolunteerModalsContainer.mapDispatch,
)(VolunteerModalsContainer);
export default withRedux;
