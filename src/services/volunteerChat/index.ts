import { IReduxEntry } from 'shared/types/app';
import { actions, selectors, reducer, getSaga } from './redux';
import * as namespace from './namespace';
import VolunteerChatContainer from './view/VolunteerChatContainer';

export { namespace, selectors, actions, VolunteerChatContainer };

export const reduxEntry: IReduxEntry = {
	reducers: { volunteerChat: reducer },
	sagas: [getSaga],
};
