import React from 'react';
import { Switch } from 'react-router';
import { Module } from 'shared/types/app';
import { routes } from './constants';
import ModuleRoute from '../shared/ModuleRoute/ModuleRoute';
import RouteEntry from '../shared/RouteEntry/RouteEntry';
import UserDashboardModule from './view/containers/UserDashboardModule/UserDashboardModule';

class Dashboard extends Module {
  public getRoutes() {
    return (
      <ModuleRoute key={routes.dashboard.getElementKey()} path={routes.dashboard.getPath()}>
        <Switch>
          <RouteEntry
            key={routes.dashboard.user.getElementKey()}
            path={routes.dashboard.user.getPath()}
            component={UserDashboardModule}
          />
        </Switch>
      </ModuleRoute>
    );
  }
}

export default Dashboard;
