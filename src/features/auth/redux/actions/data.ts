import * as NS from '../../namespace';
import { IInviteProps } from 'shared/types/models/auth';

export function setInviteProps(payload: IInviteProps): NS.ISetInviteProps {
  return { payload, type: 'AUTH:SET_INVITE_PROPS' };
}
