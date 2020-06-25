import * as NS from '../namespace';
import config from 'config';
import { initialCommunicationField } from 'shared/types/redux';
import { defaultSettings } from 'shared/defaults/settings';

const initial: NS.IReduxState = {
  communication: {
    updateSettings: initialCommunicationField,
    loadFullSettings: initialCommunicationField,
    loadSettings: initialCommunicationField,
  },
  data: {
    settings: defaultSettings,
  },
  ui: {
    title: config.title,
  }
};

export default initial;
