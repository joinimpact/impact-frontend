import reducer from './redux/reducers';
import getSaga from './redux/sagas';
import * as namespace from './namespace';
import * as actions from './redux/actions';
import * as selectors from './redux/selectors';
import { IReduxEntry } from 'shared/types/app';

export { namespace, reducer, getSaga, actions, selectors };
export { default as I18n, instance as i18nInstance } from './I18n';
export { ITranslateProps } from './namespace';
export { i18nConnect } from './view/i18nConnect';

export const reduxEntry: IReduxEntry = {
	reducers: { i18n: reducer },
	sagas: [getSaga],
};
