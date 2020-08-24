import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { IOrganizationsResponseItem } from 'shared/types/responses/npo';
import { IAppReduxState } from 'shared/types/app';
import { selectors as npoSelectors } from 'services/npo';
import * as actions from '../redux/actions';

interface IStateProps {
  currentOrganization: IOrganizationsResponseItem | null
}

interface IActionProps {
  loadConversations: typeof actions.loadConversations;
}

type TProps = IStateProps & IActionProps;

class NpoChatContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      currentOrganization: npoSelectors.selectCurrentOrganization(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      loadConversations: actions.loadConversations,
    }, dispatch);
  }

  public componentDidMount() {
    if (this.props.currentOrganization) {
      this.props.loadConversations();
    }
  }

  public componentDidUpdate(prevProps: TProps) {
    const { currentOrganization } = this.props;

    if (
      (!prevProps.currentOrganization && currentOrganization) ||
      (currentOrganization && prevProps.currentOrganization && prevProps.currentOrganization.id !== currentOrganization.id)
    ) {
      this.props.loadConversations();
    }
  }

  public render() {
    return null;
  }
}

const withRedux = connect<IStateProps, IActionProps>(
  NpoChatContainer.mapStateToProps,
  NpoChatContainer.mapDispatch,
)(NpoChatContainer);
export default withRedux;
