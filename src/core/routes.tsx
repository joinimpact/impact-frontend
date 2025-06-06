import React from 'react';
import { Module } from 'shared/types/app';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';
import { App } from 'modules/App';
import routes from 'modules/routes';
import config from 'config';

const getRoutes = (modules: Module[]): React.ReactElement<RouteComponentProps<any>> => {
	return (
		<Route path={config.prefixRoot}>
			<App>
				<Switch>
					{modules.map((module) => (module.getRoutes ? module.getRoutes() : null))}
					<Redirect exact from={config.prefixRoot} to={routes.dashboard.user.getPath()} />
					<NoMatchRoute />
				</Switch>
			</App>
		</Route>
	);
};

const NoMatch = (path: string) => () => <Redirect to={path} />;
export const NoMatchRoute = ({ defaultPath = config.prefixRoot }) => <Route render={NoMatch(defaultPath)} />;

export default getRoutes;
