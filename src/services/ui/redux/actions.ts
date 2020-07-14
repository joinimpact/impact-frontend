import * as NS from '../namespace';
import { ILayoutType } from 'shared/types/app';

export function changeLayout(payload: ILayoutType): NS.IChangeLayoutType {
  return { payload, type: 'UI:CHANGE_LAYOUT_TYPE' };
}
