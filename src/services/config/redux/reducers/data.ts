import * as NS from '../../namespace';
import initial from '../initial';

function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
	switch (action.type) {
		case 'CONFIG:LOAD_FULL_SETTINGS_SUCCESS':
			return {
				...state,
				settings: action.payload,
			};
	}

	return state;
}

export default dataReducer;
