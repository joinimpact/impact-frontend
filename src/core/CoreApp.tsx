import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch } from 'react-router';
import { Router } from 'react-router-dom';
import { IAppData } from 'shared/types/app';
import createRoutes from './routes';

/* tslint:disable:function-name */
function CoreApp({ appModules, store, history }: IAppData) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <ConnectedRouter store={store} history={history}>
          <Switch>
            {createRoutes(appModules)}
          </Switch>
        </ConnectedRouter>
      </Router>
    </Provider>
  );
}

export default CoreApp;
