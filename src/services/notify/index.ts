import { IReduxEntry } from 'shared/types/app';
import { actions, selectors, reducer, getSaga } from './redux';
import * as namespace from './namespace';
import NotifyService from './view/NotifyService';
import NotifyConsumer from './NotifyConsumer';
import NotifyManager from './NotifyManager';

export { namespace, selectors, actions, NotifyConsumer, NotifyManager, NotifyService };
export { instance as notifyInstance } from './NotifyManager';
export { INotifyProps } from './namespace';
export { notifyConnect } from './notifyConnect';

export const reduxEntry: IReduxEntry = {
  reducers: { notifyService: reducer },
  sagas: [ getSaga ],
};
