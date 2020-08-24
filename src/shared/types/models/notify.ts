export type TMessageType = 'WS_MESSAGE' | 'ERROR' | 'WARN' | 'INFO';

export interface IMessage {
  body: object | string;
  type: TMessageType;
  id?: string;
}
