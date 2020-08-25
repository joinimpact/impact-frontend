import { routeBuilder } from 'shared/util/routeBuilder';

export const routes = routeBuilder({
  dashboard: {
    user: {
      'registration-done': {},
      home: {},
      browse: {},
      messages: {},
      opportunities: {
        view: {},
      },
      organizations: {},
      profile: {
        view: {},
      },
      calendar: {},
      settings: {},
    },
    organization: {
      'registration-done': {},
      home: {},
      messages: {},
      volunteers: {},
      opportunity: {
        create: {},
        view: {},
        edit: {},
      },
      edit: {},
      calendar: {},
      team: {},
      settings: {},
    },
  },
});
