import { bind } from 'decko';

class SocketController {
  private socket: WebSocket | null = null;
  private url: string;
  private connected: boolean = false;

  constructor(url: string) {
    this.url = url;
  }

  public close() {
    this.socket!.close();
  }

  public connect() {
    this.socket = new WebSocket(this.url);
    this.socket.onopen = this.handleOpen;
    this.socket.onclose = this.handleClose;
    this.socket.onmessage = this.handleMessage;
  }

  public send(message: string) {
    if (this.connected) {
      this.socket!.send(message);
    }
  }

  @bind
  private handleOpen() {
    this.connected = true;
  }

  @bind
  private handleClose() {
    this.connected = false;
  }

  @bind
  private handleMessage(event: MessageEvent) {
    console.log(event.data);
  }
}

export default SocketController;
