import { IReduxEntry } from 'shared/types/app';
import { actions, selectors, reducer, getSaga } from './redux';
import * as namespace from './namespace';
import NPOService from './view/NPOService';

export { namespace, selectors, actions, NPOService };

export const reduxEntry: IReduxEntry = {
  reducers: { npoService: reducer },
  sagas: [getSaga],
};
