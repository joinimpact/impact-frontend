import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';
import { IAppReduxState } from 'shared/types/app';
import { bindActionCreators, Dispatch } from 'redux';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { DeletedOpportunityConfirmationModal, DeleteOpportunityModal } from '../../components';
import { bind } from 'decko';
import { ICommunication } from 'shared/types/redux';

interface IOwnProps {
  onDeleteOpportunityDone?(): void;
}

interface IStateProps {
  deleteOpportunityCommunication: ICommunication;
  deleteOpportunityId: string | null;
  showDeletedOpportunityConfirmation: boolean;
}

interface IActionProps {
  resetRequestDeleteOpportunityId: typeof actions.resetRequestDeleteOpportunity;
  deleteOpportunity: typeof actions.deleteOpportunity;
  resetDeletedOpportunityConfirmation: typeof actions.resetDeletedOpportunityConfirmation;
}

type TProps = IOwnProps & IStateProps & IActionProps & ITranslateProps;

class NpoModalsContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      deleteOpportunityCommunication: selectors.selectCommunication(state, 'deleteOpportunity'),
      deleteOpportunityId: selectors.selectRequestDeleteOpportunity(state),
      showDeletedOpportunityConfirmation: selectors.selectModal(state, 'showDeleteOpportunityConfirmation'),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      resetRequestDeleteOpportunityId: actions.resetRequestDeleteOpportunity,
      deleteOpportunity: actions.deleteOpportunity,
      resetDeletedOpportunityConfirmation: actions.resetDeletedOpportunityConfirmation,
    }, dispatch);
  }

  public componentDidUpdate(prevProps: TProps) {
    const { deleteOpportunityCommunication } = this.props;

    if (!prevProps.deleteOpportunityCommunication.isLoaded && deleteOpportunityCommunication.isLoaded) {
      this.props.onDeleteOpportunityDone && this.props.onDeleteOpportunityDone();
    }
  }

  public render() {
    const { deleteOpportunityId, showDeletedOpportunityConfirmation } = this.props;
    return (
      <>
        {deleteOpportunityId && (
          <DeleteOpportunityModal
            communication={this.props.deleteOpportunityCommunication}
            onClose={this.props.resetRequestDeleteOpportunityId}
            onDelete={this.handleDeleteOpportunity}
          />
        )}
        {(showDeletedOpportunityConfirmation) && (
          <DeletedOpportunityConfirmationModal
            onClose={this.props.resetDeletedOpportunityConfirmation}
          />
        )}
      </>
    );
  }

  @bind
  private handleDeleteOpportunity() {
    // 1282712434502537216
    this.props.deleteOpportunity(this.props.deleteOpportunityId!);
  }
}

const withRedux = connect<IStateProps, IActionProps>(
  NpoModalsContainer.mapStateToProps,
  NpoModalsContainer.mapDispatch,
)(NpoModalsContainer);
export default i18nConnect<IOwnProps>(withRedux);
