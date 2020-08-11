import WebSocketController from './WebSocketController';
import config from 'config';
import { bind } from 'decko';

class WebSocketService {
  public static get instance(): WebSocketService {
    this._instance = this._instance || new WebSocketService();
    return this._instance;
  }
  private static _instance: WebSocketService;

  private wsController: WebSocketController;

  constructor() {
    const finalUrl = config.publicWsAddress.startsWith('//')
      ? config.publicWsAddress
      : `wss://${location.host}${config.publicWsAddress}`;
    this.wsController = new WebSocketController(finalUrl);
    this.wsController.on('message', this.handleWsMessage);
    this.wsController.on('lost-connection', this.handleConnectionLost);
  }

  @bind
  public attachEventListener(eventName: string) {
    console.log(this.wsController);
  }

  @bind
  public async connect() {
    await this.wsController.connect();
  }

  @bind
  public async disconnect() {
    await this.wsController.disconnect();
  }

  @bind
  private handleWsMessage(message: object) {
    console.log('[handleWsMessage] message: ', message);
  }

  @bind
  private handleConnectionLost() {
    console.log('[connection lost]');
  }
}

export default WebSocketService;
