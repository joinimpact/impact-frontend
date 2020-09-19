import { makeFeatureEntry } from 'shared/util/makeFeatureEntry';

import * as containers from './view/containers';
import { reducer } from './redux';

const entry = makeFeatureEntry({
	containers,
	actionCreators: {},
	selectors: {},
	reduxEntry: {
		reducers: { topBar: reducer },
		sagas: [],
	},
});

type Entry = typeof entry;
export { Entry, entry };
