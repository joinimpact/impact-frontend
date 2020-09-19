import { ISettings } from 'shared/types/settings';
import config from 'config';

export const defaultSettings: ISettings = {
	language: config.lang,
};
