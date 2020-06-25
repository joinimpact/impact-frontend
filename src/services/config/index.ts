import { IReduxEntry } from 'shared/types/app';
import { actions, selectors, reducer, getSaga } from './redux';
import * as namespace from './namespace';
import ConfigProvider from './view/ConfigProvider';

export { namespace, selectors, actions, ConfigProvider };

export const reduxEntry: IReduxEntry = {
  reducers: { configService: reducer },
  sagas: [getSaga],
};
