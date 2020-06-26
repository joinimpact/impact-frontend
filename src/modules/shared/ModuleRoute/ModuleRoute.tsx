import * as React from 'react';
import { Route as RealRoute, RouteComponentProps, RouteProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IAppReduxState } from 'shared/types/app';
import { selectors as userSelectors } from 'services/user';

interface IStateProps {
  isAuthRequested: boolean;
}

type IProps = IStateProps & RouteProps & RouteComponentProps<{}>;

export class ModuleRoute extends React.Component<IProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      isAuthRequested: userSelectors.selectIsAuthRequested(state),
    };
  }

  public render(): JSX.Element | null {
    const { isAuthRequested } = this.props;
    if (!isAuthRequested) {
      return null;
    }

    return (<RealRoute {...this.props}/>);
  }
}

const Route = connect<IStateProps, void, RouteProps>(
  ModuleRoute.mapStateToProps,
)(ModuleRoute);

export default withRouter(Route);
