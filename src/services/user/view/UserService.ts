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
  loadTags: typeof actions.loadUserTags;
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
      loadTags: actions.loadUserTags,
    }, dispatch);
  }

  public componentDidUpdate(prevProps: TProps) {
    const { isAuthorized } = this.props;
    if (!prevProps.isAuthorized && isAuthorized) {
      this.props.loadTags();
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
