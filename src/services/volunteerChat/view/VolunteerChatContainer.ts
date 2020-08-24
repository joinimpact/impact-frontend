import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { IAppReduxState } from 'shared/types/app';
import * as actions from '../redux/actions';
import { IUser } from 'shared/types/models/user';
import { selectors as userSelectors } from 'services/user';

interface IStateProps {
  currentUser: IUser | null;
}

interface IActionProps {
  loadConversations: typeof actions.loadConversations;
}

type TProps = IStateProps & IActionProps;

class VolunteerChatContainer extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      currentUser: userSelectors.selectCurrentUser(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      loadConversations: actions.loadConversations,
    }, dispatch);
  }

  public componentDidMount() {
    if (this.props.currentUser) {
      this.props.loadConversations();
    }
  }

  public componentDidUpdate(prevProps: TProps) {
    const { currentUser } = this.props;

    if (
      (!prevProps.currentUser && currentUser) ||
      (prevProps.currentUser && currentUser && prevProps.currentUser.userId !== currentUser.userId)
    ) {
      this.props.loadConversations();
    }
  }

  public render() {
    return null;
  }
}

const withRedux = connect<IStateProps, IActionProps>(
  VolunteerChatContainer.mapStateToProps,
  VolunteerChatContainer.mapDispatch,
)(VolunteerChatContainer);
export default withRedux;
