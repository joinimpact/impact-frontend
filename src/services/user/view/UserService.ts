import React from 'react';
import * as selectors from '../redux/selectors';
import { IAppReduxState } from 'shared/types/app';
import { connect } from 'react-redux';
import { i18nConnect, ITranslateProps } from 'services/i18n';

interface IStateProps {
  isAuthorized: boolean;
}

type TProps = IStateProps & ITranslateProps;

class UserService extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      isAuthorized: selectors.selectIsAuthorized(state),
    };
  }

  public render() {
    return null;
  }
}

const i18nConnected = i18nConnect(UserService);
const withRedux = connect<IStateProps>(
  UserService.mapStateToProps,
)(i18nConnected);
export default withRedux;
