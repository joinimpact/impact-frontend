import { routeBuilder } from 'shared/util/routeBuilder';

export const routes = routeBuilder({
	auth: {
		login: {},
		'login-with-email': {},
		forgot: {},
		reset: {},
		restore: {},
		register: {},
		logout: {},
	},
});
