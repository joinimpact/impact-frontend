import React from 'react';
import { connect } from 'react-redux';
import { i18nConnect, ITranslateProps } from 'services/i18n';
import { IAppReduxState } from 'shared/types/app';
import { selectors as userSelectors } from 'services/user';
import * as actions from '../redux/actions';
import { bindActionCreators, Dispatch } from 'redux';

interface IStateProps {
  isAuthorized: boolean;
}

interface IActionProps {
  loadUserOrganizations: typeof actions.loadUserOrganizations;
}

type TProps = ITranslateProps & IStateProps & IActionProps;

class NPOService extends React.PureComponent<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      isAuthorized: userSelectors.selectIsAuthorized(state),
    };
  }

  public static mapDispatch(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
      loadUserOrganizations: actions.loadUserOrganizations,
    }, dispatch);
  }

  public componentDidUpdate(prevProps: TProps) {
    const { isAuthorized } = this.props;

    if (!prevProps.isAuthorized && isAuthorized) {
      this.props.loadUserOrganizations();
    }
  }

  public render() {
    return null;
  }
}

const withRedux = connect<IStateProps, IActionProps, ITranslateProps>(
  NPOService.mapStateToProps,
  NPOService.mapDispatch,
)(NPOService);
const i18nConnected = i18nConnect<{}>(withRedux);
export default i18nConnected;
