import * as NS from '../../namespace';
import initial from '../initial';

type ILanguageState = NS.IReduxState['data'];

function dataReducer(state: ILanguageState = initial.data, action: NS.Action): ILanguageState {
  switch (action.type) {
    case 'I18N_SERVICE:SET_LANGUAGE_COMPLETED': {
      return {
        ...state,
        locales: {
          ...state.locales,
          [action.payload.language]: action.payload.locale,
        },
        currentLocale: action.payload.language,
      };
    }
    default:
      return state;
  }
}

export default dataReducer as ((state: ILanguageState) => ILanguageState);
