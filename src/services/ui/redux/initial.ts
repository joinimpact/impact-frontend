import { IReduxState } from '../namespace';
import { ILayoutType } from 'shared/types/app';

export const initial: IReduxState = {
	data: {
		layoutType: ILayoutType.desktop,
	},
};
