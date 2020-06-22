import { IReduxState } from '../namespace';
import { initialCommunicationField } from 'shared/types/redux';
import config, { TLang } from 'config/config';

const initial: IReduxState = {
  communications: {
    changeLanguage: initialCommunicationField,
    setLanguage: initialCommunicationField,
  },
  data: {
    locales: {
      en: {},
    },
    currentLocale: (process.env.LANG as TLang) || config.lang,
  },
};

export default initial;
