import { routeBuilder } from 'shared/util/routeBuilder';

export const routes = routeBuilder({
  dashboard: {
    user: {
      'registration-done': {},
      home: {},
      browse: {},
      messages: {},
      opportunities: {},
      calendar: {},
      settings: {},
    },
    organization: {
      'registration-done': {},
      opportunity: {
        create: {},
        view: {},
        edit: {},
      },
    },
  },
});
