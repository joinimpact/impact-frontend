import * as NS from '../namespace';
import { makeReduxFormEntry } from 'shared/util/redux';

export const addVolunteerPersonalInfoForm = makeReduxFormEntry<NS.IVolunteerPersonalInfoForm>(
  'volunteerPersonalInfoForm',
  ['fullName', 'email', 'address', 'birthday', 'school'],
);

export const addVolunteerAreasForm = makeReduxFormEntry<NS.IInterestAreaForm>('addVolunteerAreasOfInterestForm', [
  'value'
]);
