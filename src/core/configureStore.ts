import { IAppReduxState, IDependencies } from 'shared/types/app';
import { applyMiddleware, combineReducers, compose, createStore, Middleware, Reducer, Store } from 'redux';
import { History } from 'history';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { ReducersMap } from 'shared/types/redux';
import { composeReducers } from 'shared/util/redux';

const history: History = createHistory();

interface IStoreData {
  store: Store<IAppReduxState>;
  runSaga: SagaMiddleware<any>['run'];
  history: History;
}

function configureStore(deps: IDependencies): IStoreData {
  const reactRouterReduxMiddleware = routerMiddleware(history);
  const sagaMiddleware = createSagaMiddleware();
  const middlewares: Middleware[] = [reactRouterReduxMiddleware, sagaMiddleware, thunk.withExtraArgument(deps)];

  const composeEnhancers =
    process.env.NODE_ENV === 'development'
      ? composeWithDevTools({
        actionsBlacklist: [
          '@@redux-form/CHANGE',
        ],
      })
      : compose;

  const store: Store<IAppReduxState> = createStore(
    (state: IAppReduxState) => state,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  return {
    store,
    history,
    runSaga: sagaMiddleware.run,
  };
}



function createReducer(reducers: ReducersMap<IAppReduxState>): Reducer<IAppReduxState | undefined> {
  return composeReducers<IAppReduxState | undefined>([
    combineReducers<IAppReduxState>({
      ...reducers,
      form: formReducer,
      router: connectRouter(history),
    }),
  ]);
}

export { createReducer, IStoreData };
export default configureStore;
