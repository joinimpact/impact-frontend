import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import routes from 'modules/routes';
import { actions as userActions } from 'services/user';

interface IOwnProps {
  organizationId: string;
  inviteId: string;
}

interface IActionProps {
  setInviteProps: typeof userActions.setInviteProps;
}

type TRouteProps = RouteComponentProps<{}>;
type TProps = IOwnProps & IActionProps & TRouteProps;

class InviteController extends React.PureComponent<TProps> {
  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      setInviteProps: userActions.setInviteProps,
    }, dispatch);
  }

  public componentDidMount() {
    const { organizationId, inviteId } = this.props;
    this.props.setInviteProps({
      organizationId,
      inviteId,
    });
    this.props.history.push(routes.auth.login.getPath());
  }

  public render() {
    return null;
  }
}

const withRedux = connect<null, IActionProps, IOwnProps & TRouteProps>(
  null,
  InviteController.mapDispatch,
)(InviteController);
export default withRouter(withRedux);
