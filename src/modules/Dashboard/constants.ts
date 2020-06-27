import { routeBuilder } from 'shared/util/routeBuilder';

export const routes = routeBuilder({
  dashboard: {
    user: {
      'registration-done': {},
    },
    organization: {
      'registration-done': {},
      'create-opportunity': {},
    },
  },
});
