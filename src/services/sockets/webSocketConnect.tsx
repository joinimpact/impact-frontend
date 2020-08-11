import React from 'react';
import WebSocketService from 'services/sockets/WebSocketService';
import { IWebSocketProps } from 'services/sockets/namespace';

function webSocketConnect<T>(
  WrappedComponent: React.ComponentType<T & IWebSocketProps>,
): React.ComponentClass<Omit<T, keyof IWebSocketProps>> {
  const instance = WebSocketService.instance;

  class WebSocketConnect extends React.PureComponent<T, {}> {
    public displayName: string = `(WebSocketConnect) ${WrappedComponent.displayName}`;

    public render() {
      return (
        <WrappedComponent socket={instance} {...this.props}/>
      );
    }
  }

  return WebSocketConnect;
}

export { webSocketConnect};
