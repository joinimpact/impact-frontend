import * as NS from '../namespace';
import { makeReduxFormEntry } from 'shared/util/redux';

export const createNewOrganizationEntry = makeReduxFormEntry<NS.ICreateNewOrganizationForm>('createNewOrganization', [
  'organizationName',
  'website',
  'address',
  'description',
]);

export const inviteTeamFormEntry = makeReduxFormEntry<NS.IInviteTeamForm>('inviteTeamForm', ['email']);

export const createOpportunityFormEntry = makeReduxFormEntry<NS.ICreateOpportunityForm>('createNewOpportunity', [
  'title', 'description', 'ageLimitEnabled', 'minAge', 'maxAge', 'hoursPerWeekLimitEnabled', 'hoursPerWeek',
  'capLimitEnabled', 'volunteersCap', 'published', 'tags',
]);

export const createNewEventFormEntry = makeReduxFormEntry<NS.ICreateNewEventForm>('createNewEventForm', [
  'title', 'description', 'location', 'opportunity', 'isAllDay', 'startTime', 'endTime', 'hours', 'hoursQuantum',
]);
