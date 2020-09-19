export interface IWebSocketMessage {
	op: number;
	d: object;
	e: string;
	sequenceNumber: number;
}

export interface IHeartBeatMessage {
	heartbeatInterval: number;
	instructions: string;
}

export const enum OPCodes {
	HELLO = 0,
	CLIENT_AUTHENTICATE = 1,
	AUTHENTICATION_SUCCESS = 2,
	HEARTBEAT = 3,
	HEARTBEAT_ACK = 4,
	EVENT = 5,
}

export const enum MessageTypes {
	MESSAGE_SENT = 'messages.MESSAGE_SENT',
}

export interface IWebSocketMessageEvent {
	type: string;
	data: object;
}
