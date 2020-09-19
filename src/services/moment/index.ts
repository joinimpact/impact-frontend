import moment from 'moment';

export const clientLang = (window.navigator as any).userLanguage || window.navigator.language;

moment.locale(clientLang);

/* moment.updateLocale('en', {
  longDateFormat: {
    LT: 'hh:mm A',
    LTS: 'HH:mm:ss A',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D YYYY',
    ll: 'D MMM YYYY',
    LLL: 'MMMM D YYYY HH:mm',
    LLLL: 'dddd, MMMM D YYYY HH:mm',
  },
});*/

export default moment;
