import * as NS from '../namespace';
import { makeReduxFormEntry } from 'shared/util/redux';

export const addVolunteerPersonalInfoForm = makeReduxFormEntry<NS.IVolunteerPersonalInfoForm>(
  'volunteerPersonalInfoForm',
  ['firstName', 'lastName', 'email', 'address', 'birthday', 'school'],
);

export const addVolunteerAreasForm = makeReduxFormEntry<NS.IInterestAreaForm>('addVolunteerAreasOfInterestForm', [
  'value'
]);

export const applyForOpportunityForm = makeReduxFormEntry<NS.IApplyForOpportunityForm>('applyForOpportunity', [
  'message',
]);

export const browseOpportunitiesForm = makeReduxFormEntry<NS.IBrowseOpportunitiesForm>('browseOpportunities', [
  'location', 'ageRange', 'commitment',
]);

export const requestHoursForm = makeReduxFormEntry<NS.IRequestHoursForm>('requestHoursForm', [
  'hours', 'description',
]);

export const editProfileForm = makeReduxFormEntry<NS.IEditProfileForm>('editProfileForm', [
  'profilePicture', 'firstName', 'lastName', 'email', 'address', 'birthday', 'school', 'tags'
]);
