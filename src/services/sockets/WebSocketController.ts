import { bind } from 'decko';
import { EventEmitter } from 'events';
import Timer = NodeJS.Timer;
import { IHeartBeatMessage, IWebSocketMessage, IWebSocketMessageEvent, OPCodes } from 'shared/types/websocket';

const hearBeatAck = JSON.stringify({ op: OPCodes.HEARTBEAT });

class WebSocketController extends EventEmitter {
	private socket: WebSocket | null = null;
	private url: string;
	private connected = false;
	private heartbeat: Timer | null = null;

	constructor(url: string) {
		super();
		this.url = url;
	}

	public close() {
		this.socket!.close();
	}

	public connect() {
		return new Promise((resolve, reject) => {
			this.socket = new WebSocket(this.url);
			this.socket.onopen = () => {
				this.handleOpen();
				resolve();
			};
			this.socket.onerror = (err) => {
				this.handleClose();
				reject(err);
			};
			this.socket.onclose = (e) => {
				if (!e.wasClean) {
					this.emit('lost-connection');
				}
				this.handleClose();
				reject(e.reason);
			};
			this.socket.onmessage = this.handleMessage;
		});
	}

	public disconnect() {
		return new Promise((resolve, reject) => {
			this.socket!.close();
			resolve();
		});
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
		if (this.heartbeat) {
			clearInterval(this.heartbeat);
			this.heartbeat = null;
		}
	}

	@bind
	private startHeartBeating(interval: number) {
		if (this.heartbeat) {
			clearInterval(this.heartbeat);
			this.heartbeat = null;
		}

		const heartBeatCall = () => {
			if (this.connected) {
				this.socket!.send(hearBeatAck);
			}
		};

		heartBeatCall();
		this.heartbeat = setInterval(heartBeatCall, interval);
	}

	@bind
	private handleMessage(event: MessageEvent) {
		const json: IWebSocketMessage = JSON.parse(event.data) as IWebSocketMessage;
		// console.log('[message]', JSON.stringify(json, null, 2));
		switch (json.op) {
			case OPCodes.HELLO:
				this.startHeartBeating((json.d as IHeartBeatMessage).heartbeatInterval);
				break;
			case OPCodes.EVENT:
				this.emit('message', {
					type: json.e,
					data: json.d,
				} as IWebSocketMessageEvent);
				break;
		}
	}
}

export default WebSocketController;
