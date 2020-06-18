import { routeBuilder } from 'shared/util/routeBuilder';

export const routes = routeBuilder({
  auth: {
    login: {},
    restore: {},
    register: {},
    logout: {},
  },
});
