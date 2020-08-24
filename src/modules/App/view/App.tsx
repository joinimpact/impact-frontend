 import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { connect } from 'react-redux';

import { withAsyncFeatures } from 'core/AsyncFeaturesConnector';
import { UserService, selectors as userSelectors } from 'services/user';
import { NPOService } from 'services/npo';
import { WebSocketServiceContainer } from 'services/sockets';
import { NotifyService } from 'services/notify';
import { Entry as notificationFeatureEntry } from 'features/notification/entry';
import { loadEntry as notificationFeatureLoadEntry } from 'features/notification/loader';
import { IAppReduxState } from 'shared/types/app';
import { NpoChatContainer } from 'services/npoChat';
import { VolunteerChatContainer } from 'services/volunteerChat';

// Global styles import
import 'shared/view/styles/animation.scss';
import 'shared/view/styles/base.scss';

import './App.scss';

interface IFeatureProps {
  notificationFeatureEntry: notificationFeatureEntry;
}

interface IStateProps {
  isAuthorized: boolean;
}

const b = block('root');

type TProps = IStateProps & IFeatureProps;

class App extends React.Component<TProps> {
  public static mapStateToProps(state: IAppReduxState): IStateProps {
    return {
      isAuthorized: userSelectors.selectIsAuthorized(state),
    };
  }

  public render() {
    return (
      <div className={b()}>
        {this.renderStaticServices()}
        {this.renderStaticComponents()}
        {this.props.isAuthorized && this.renderAuthorizedServices()}
        {this.props.children}
      </div>
    );
  }

  @bind
  private renderStaticServices() {
    return (
      <>
        <UserService/>
        <NPOService/>
        <WebSocketServiceContainer/>
        <NotifyService/>
      </>
    );
  }

  @bind
  private renderStaticComponents() {
    const { NotifyManagerContainer } = this.props.notificationFeatureEntry.containers;
    return (
      <>
        <NotifyManagerContainer/>
      </>
    );
  }

  @bind
  private renderAuthorizedServices() {
    return (
      <>
        <NpoChatContainer/>
        <VolunteerChatContainer/>
      </>
    );
  }
}

const withFeatures = withAsyncFeatures({
  notificationFeatureEntry: notificationFeatureLoadEntry,
})(App);

const withRedux = connect<IStateProps>(
  App.mapStateToProps,
)(withFeatures);
export default withRedux;
