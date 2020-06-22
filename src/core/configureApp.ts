import { Reducer } from 'redux';
import configureDeps from './configureDeps';
import configureStore, { createReducer } from './configureStore';
import { TYPES, container } from './configureIoc';

import * as i18nService from 'services/i18n';
import * as moduleClasses from 'modules';
import { IAppData, IAppReduxState, IReduxEntry, Module, RootSaga } from 'shared/types/app';
import { ReducersMap } from 'shared/types/redux';

import config from 'config/config';

function configureApp(data?: IAppData): IAppData {
  const appModules: Module[] = Object.values(moduleClasses).map(ModuleClass => new ModuleClass());

  if (data) {
    return { ...data };
  }

  const sharedReduxEntries: IReduxEntry[] = [
    i18nService.reduxEntry,
  ];

  const connectedSagas: RootSaga[] = [];
  const connectedReducers: ReducersMap<Partial<IAppReduxState>> = {};
  const dependencies = configureDeps();
  const { runSaga, store, history } = configureStore(dependencies);

  try {
    container.getAll(TYPES.Store);
    container.rebind(TYPES.connectEntryToStore).toConstantValue(connectEntryToStore);
    container.rebind(TYPES.Store).toConstantValue(store);
  } catch {
    container.bind(TYPES.connectEntryToStore).toConstantValue(connectEntryToStore);
    container.bind(TYPES.Store).toConstantValue(store);
  }

  sharedReduxEntries.forEach(connectEntryToStore);

  appModules.forEach((module: Module) => {
    if (module.getReduxEntry) {
      connectEntryToStore(module.getReduxEntry());
    }
  });

  function connectEntryToStore({ reducers, sagas }: IReduxEntry) {
    if (!store) {
      throw new Error('Cannot find store, while connecting module.');
    }

    if (reducers) {
      const keys = Object.keys(reducers) as Array<keyof typeof reducers>;
      const isNeedReplace: boolean = keys.reduce<boolean>((acc, key: keyof typeof reducers) => {
        const featureReducer = reducers[key];
        if (!connectedReducers[key] && featureReducer) {
          (connectedReducers as any)[key] = featureReducer;
          return true;
        }
        return acc || false;
      }, false);

      if (isNeedReplace) {
        store.replaceReducer(createReducer(connectedReducers as ReducersMap<IAppReduxState>) as Reducer<
          IAppReduxState
          >);
      }
    }

    if (sagas) {
      sagas.forEach((saga: RootSaga) => {
        if (!connectedSagas.includes(saga) && runSaga) {
          runSaga(saga(dependencies));
          connectedSagas.push(saga);
        }
      });
    }
  }

  i18nService.i18nInstance.store = store;
  store.dispatch(i18nService.actions.setLanguage(config.lang));

  return { appModules, store, history };
}

export default configureApp;
