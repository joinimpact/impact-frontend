import { IReduxEntry } from 'shared/types/app';
import { actions, selectors, reducer, getSaga } from './redux';
import * as namespace from './namespace';

export { namespace, selectors, actions };

export const reduxEntry: IReduxEntry = {
  reducers: { events: reducer },
  sagas: [getSaga],
};
