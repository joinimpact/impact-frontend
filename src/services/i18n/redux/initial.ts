import { IReduxState, Lang } from '../namespace';
import { initialCommunicationField } from 'shared/types/redux';

const initial: IReduxState = {
  data: {
    locales: {
      en: {},
    },
    currentLocale: (process.env.LANG as Lang) || 'en',
  },
  communications: {
    changeLanguage: { ...initialCommunicationField },
  },
};

export default initial;
