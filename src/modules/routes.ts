import { routes as authRoutes } from './Auth/constants';
import { routes as dashboardRoutes } from './Dashboard/constants';

export default {
	...authRoutes,
	...dashboardRoutes,
};
