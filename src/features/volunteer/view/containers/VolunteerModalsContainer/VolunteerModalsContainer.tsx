import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplyForOpportunityModal } from '../../components';
import * as selectors from '../../../redux/selectors';
import * as actions from '../../../redux/actions';
import { IAppReduxState } from 'shared/types/app';
import { bind } from 'decko';
import { ICommunication } from 'shared/types/redux';

interface IStateProps {
  applyOpportunityId: string | null;
  applyForOpportunityCommunication: ICommunication;
}

interface IActionProps {
  resetRequestApplyOpportunity: typeof actions.resetRequestApplyOpportunity;
  applyForOpportunity: typeof actions.applyForOpportunity;
}

type TProps = IStateProps & IActionProps;

class VolunteerModalsContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      applyOpportunityId: selectors.selectApplyOpportunityId(state),
      applyForOpportunityCommunication: selectors.selectCommunication(state, 'applyForOpportunity'),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      resetRequestApplyOpportunity: actions.resetRequestApplyOpportunity,
      applyForOpportunity: actions.applyForOpportunity,
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
