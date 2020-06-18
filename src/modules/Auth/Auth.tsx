import React from 'react';
import { Route, Switch } from 'react-router';
import { Module } from 'shared/types/app';
import { routes } from './constants';
import ModuleRoute from '../shared/ModuleRoute/ModuleRoute';
import LoginFormLayout from './view/containers/LoginFormLayout/LoginFormLayout';

class AuthModule extends Module {
  public getRoutes() {
    return (
      <ModuleRoute key={routes.auth.getElementKey()} path={routes.auth.getPath()}>
        <Switch>
          <Route
            key={routes.auth.login.getElementKey()}
            path={routes.auth.login.getPath()}
            component={LoginFormLayout}
          />
        </Switch>
      </ModuleRoute>
    );
  }
}

export default AuthModule;
