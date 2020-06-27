import React from 'react';
import { Switch } from 'react-router';
import { Module } from 'shared/types/app';
import { routes } from './constants';
import ModuleRoute from '../shared/ModuleRoute/ModuleRoute';
import RouteEntry from '../shared/RouteEntry/RouteEntry';
import UserDashboardModule from './view/containers/UserDashboardModule/UserDashboardModule';
import OrganizationDashboardModule from './view/containers/OrganizationDashboardModule/OrganizationDashboardModule';

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
          <RouteEntry
            key={routes.dashboard.organization.getElementKey()}
            path={routes.dashboard.organization.getPath()}
            component={OrganizationDashboardModule}
          />
        </Switch>
      </ModuleRoute>
    );
  }
}

export default Dashboard;
