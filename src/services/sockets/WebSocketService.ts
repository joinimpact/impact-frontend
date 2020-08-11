import WebSocketController from './WebSocketController';
import config from 'config';
import { bind } from 'decko';
import { IWebSocketMessageEvent } from 'shared/types/websocket';
import { EventEmitter } from 'events';

class WebSocketService {
  public static get instance(): WebSocketService {
    this._instance = this._instance || new WebSocketService();
    return this._instance;
  }
  private static _instance: WebSocketService;

  private wsController: WebSocketController;
  private events: EventEmitter;

  constructor() {
    const finalUrl = config.publicWsAddress.startsWith('//')
      ? config.publicWsAddress
      : `wss://${location.host}${config.publicWsAddress}`;
    this.events = new EventEmitter();
    this.wsController = new WebSocketController(finalUrl);
    this.wsController.on('message', this.handleWsMessage);
    this.wsController.on('lost-connection', this.handleConnectionLost);
  }

  @bind
  public attachEventListener(eventName: string, eventHandler: any) {
    this.events.addListener(eventName, eventHandler);
  }

  @bind
  public removeEventListener(eventName: string, eventHandler: any) {
    this.events.removeListener(eventName, eventHandler);
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
  private handleWsMessage(message: IWebSocketMessageEvent) {
    this.events.emit(message.type, message.data);
  }

  @bind
  private handleConnectionLost() {
    console.log('[connection lost]');
  }
}

export default WebSocketService;
