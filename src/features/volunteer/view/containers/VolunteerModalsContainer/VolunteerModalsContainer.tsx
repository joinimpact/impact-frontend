import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplyForOpportunityModal, ShareOpportunityModal } from '../../components';
import * as selectors from '../../../redux/selectors';
import * as actions from '../../../redux/actions';
import { IAppReduxState } from 'shared/types/app';
import { bind } from 'decko';
import { ICommunication } from 'shared/types/redux';

interface IStateProps {
  applyOpportunityId: string | null;
  applyForOpportunityCommunication: ICommunication;
  isShowShareOpportunityModal: boolean;
}

interface IActionProps {
  resetRequestApplyOpportunity: typeof actions.resetRequestApplyOpportunity;
  applyForOpportunity: typeof actions.applyForOpportunity;
  showShareOpportunityModal: typeof actions.showShareOpportunityModal;
  closeShareOpportunityModal: typeof actions.closeShareOpportunityModal;
}

type TProps = IStateProps & IActionProps;

class VolunteerModalsContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      applyOpportunityId: selectors.selectApplyOpportunityId(state),
      applyForOpportunityCommunication: selectors.selectCommunication(state, 'applyForOpportunity'),
      isShowShareOpportunityModal: selectors.selectUiState(state, 'shareOpportunityVisible'),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      resetRequestApplyOpportunity: actions.resetRequestApplyOpportunity,
      applyForOpportunity: actions.applyForOpportunity,
      showShareOpportunityModal: actions.showShareOpportunityModal,
      closeShareOpportunityModal: actions.closeShareOpportunityModal,
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
}

const withRedux = connect<IStateProps, IActionProps>(
  VolunteerModalsContainer.mapStateToProps,
  VolunteerModalsContainer.mapDispatch,
)(VolunteerModalsContainer);
export default withRedux;
