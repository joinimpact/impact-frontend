import { makeFeatureEntry } from 'shared/util/makeFeatureEntry';

import * as containers from './view/containers';
import { actionCreators, selectors, reducer, getSaga } from './redux';

const entry = makeFeatureEntry({
	actionCreators,
	selectors,
	containers,
	reduxEntry: {
		reducers: { auth: reducer },
		sagas: [getSaga],
	},
});

type Entry = typeof entry;
export { Entry, entry };
