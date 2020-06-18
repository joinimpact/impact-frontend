import * as React from 'react';
import { Route as RealRoute, RouteComponentProps, RouteProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

type IProps<T> = T & RouteProps & RouteComponentProps<{}>;

export class ModuleRoute<T> extends React.Component<IProps<T>> {
  public render(): JSX.Element | null {
    return (<RealRoute {...this.props}/>);
  }
}

const Route = connect<null, null, RouteProps>(null, null)(ModuleRoute);

export default withRouter(Route);
