import { IAppReduxState } from 'shared/types/app';
import * as NS from '../namespace';
import { ISettings } from 'shared/types/settings';

function getFeatureState(state: IAppReduxState): NS.IReduxState {
  return state.configService;
}

export function selectTitle(state: IAppReduxState): string {
  return getFeatureState(state).ui.title;
}

export function selectSettings(state: IAppReduxState): ISettings {
  return getFeatureState(state).data.settings;
}
