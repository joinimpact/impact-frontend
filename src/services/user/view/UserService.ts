import React from 'react';
import * as selectors from '../redux/selectors';
import * as actions from '../redux/actions';
import { IAppReduxState } from 'shared/types/app';
import { connect } from 'react-redux';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { bindActionCreators, Dispatch } from 'redux';

interface IStateProps {
  isAuthorized: boolean;
}

interface IActionProps {
  loadTags: typeof actions.loadTags;
  loadUser: typeof actions.loadUser;
  loadUserTags: typeof actions.loadUserTags;
}

type TProps = IStateProps & IActionProps & ITranslateProps;

class UserService extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      isAuthorized: selectors.selectIsAuthorized(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      loadTags: actions.loadTags,
      loadUser: actions.loadUser,
      loadUserTags: actions.loadUserTags,
    }, dispatch);
  }

  public componentDidMount() {
    this.props.loadUser();
    this.props.loadTags();
    // this.props.loadUserTags(); // TODO: REMOVE AFTER AUTHORITY WILL BE WORKED
  }

  public componentDidUpdate(prevProps: TProps) {
    const { isAuthorized } = this.props;
    if (!prevProps.isAuthorized && isAuthorized) {
      this.props.loadUserTags();
    }
  }

  public render() {
    return null;
  }
}

const i18nConnected = i18nConnect<{}>(UserService);
const withRedux = connect<IStateProps, IActionProps>(
  UserService.mapStateToProps,
  UserService.mapDispatch,
)(i18nConnected);
export default withRedux;
