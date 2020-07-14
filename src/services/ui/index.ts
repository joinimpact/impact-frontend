import { IReduxEntry } from 'shared/types/app';
import reducer from './redux/reducer';
import * as namespace from './namespace';
import * as actions from './redux/actions';
import * as selectors from './redux/selectors';
import UIProvider from './view/UIProvider';
import ThemeProvider from './view/ThemeProvider';

export { namespace, actions, selectors, UIProvider, ThemeProvider };

export const reduxEntry: IReduxEntry = {
  reducers: { ui: reducer },
};
