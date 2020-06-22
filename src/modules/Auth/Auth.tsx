import React from 'react';
import { Switch } from 'react-router';
import { Module } from 'shared/types/app';
import { routes } from './constants';
import ModuleRoute from '../shared/ModuleRoute/ModuleRoute';
import RouteEntry from 'modules/shared/RouteEntry/RouteEntry';
import LoginFormModule from './view/containers/LoginFormModule/LoginFormModule';
import LoginWithEmailModule from './view/containers/LoginWithEmailModule/LoginWithEmailModule';
import ForgotPasswordModule from './view/containers/ForgotPasswordModule/ForgotPasswordModule';

class AuthModule extends Module {
  public getRoutes() {
    return (
      <ModuleRoute key={routes.auth.getElementKey()} path={routes.auth.getPath()}>
        <Switch>
          <RouteEntry
            key={routes.auth.login.getElementKey()}
            path={routes.auth.login.getPath()}
            component={LoginFormModule}
          />
          <RouteEntry
            key={routes.auth['login-with-email'].getElementKey()}
            path={routes.auth['login-with-email'].getPath()}
            component={LoginWithEmailModule}
          />
          <RouteEntry
            key={routes.auth.forgot.getElementKey()}
            path={routes.auth.forgot.getPath()}
            component={ForgotPasswordModule}
          />
        </Switch>
      </ModuleRoute>
    );
  }
}

export default AuthModule;
