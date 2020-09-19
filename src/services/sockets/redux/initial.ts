import * as NS from '../namespace';
import { initialCommunicationField } from 'shared/types/redux';

export const initial: NS.IReduxState = {
	communications: {
		connect: initialCommunicationField,
		reconnect: initialCommunicationField,
	},
};
