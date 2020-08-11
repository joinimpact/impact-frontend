import * as NS from '../../namespace';

export function disconnect(): NS.IDisconnect {
  return { type: 'SOCKETS:DISCONNECT' };
}
