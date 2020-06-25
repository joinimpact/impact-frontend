import React from 'react';
import { Switch } from 'react-router';
import { Module } from 'shared/types/app';
import { routes } from './constants';
import ModuleRoute from '../shared/ModuleRoute/ModuleRoute';
import RouteEntry from 'modules/shared/RouteEntry/RouteEntry';
import LoginFormModule from './view/containers/LoginFormModule/LoginFormModule';
import LoginWithEmailModule from './view/containers/LoginWithEmailModule/LoginWithEmailModule';
import ForgotPasswordModule from './view/containers/ForgotPasswordModule/ForgotPasswordModule';
import ResetPasswordModule from './view/containers/ResetPasswordModule/ResetPasswordModule';
import SignUpModule from './view/containers/SignUpModule/SignUpModule';

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
          <RouteEntry
            key={routes.auth.reset.getElementKey()}
            path={routes.auth.reset.getPath()}
            component={ResetPasswordModule}
          />
          <RouteEntry
            key={routes.auth.register.getElementKey()}
            path={routes.auth.register.getPath()}
            component={SignUpModule}
          />
        </Switch>
      </ModuleRoute>
    );
  }
}

export default AuthModule;
