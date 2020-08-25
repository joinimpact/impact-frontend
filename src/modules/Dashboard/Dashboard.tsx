import React from 'react';
import { Switch } from 'react-router';
import { Module } from 'shared/types/app';
import { routes } from './constants';
import ModuleRoute from '../shared/ModuleRoute/ModuleRoute';
import RouteEntry from '../shared/RouteEntry/RouteEntry';
import UserDashboardModule from './view/containers/UserDashboardModule/UserDashboardModule';
import OrganizationDashboardModule from './view/containers/OrganizationDashboardModule/OrganizationDashboardModule';
import { NpoNewOrganizationModule } from 'modules/Dashboard/view/containers';
import AuthorizedRoute from 'modules/shared/AuthorizedRoute/AuthorizedRoute';

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
          <AuthorizedRoute
            exact
            key={routes.dashboard.organization.edit.getElementKey()}
            path={routes.dashboard.organization.edit.getPath()}
            component={NpoNewOrganizationModule}
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
