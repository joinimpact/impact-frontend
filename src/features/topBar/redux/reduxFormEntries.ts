import * as NS from '../namespace';
import { makeReduxFormEntry } from 'shared/util/redux';

export const searchFormEntry = makeReduxFormEntry<NS.ISearchBarForm>('topBarSearchForm', [
  'search'
]);
