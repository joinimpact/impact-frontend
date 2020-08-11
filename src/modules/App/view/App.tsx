import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';

import { UserService } from 'services/user';
import { NPOService } from 'services/npo';
import { WebSocketServiceContainer } from 'services/sockets';

// Global styles import
import 'shared/view/styles/animation.scss';
import 'shared/view/styles/base.scss';

import './App.scss';

const b = block('root');

class App extends React.Component {
  public render() {
    return (
      <div className={b()}>
        {this.renderStaticServices()}
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
      </>
    );
  }
}

export default App;
