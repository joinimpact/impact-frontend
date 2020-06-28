import * as NS from '../namespace';
import { makeReduxFormEntry } from 'shared/util/redux';

export const createNewOrganizationEntry = makeReduxFormEntry<NS.ICreateNewOrganizationForm>('createNewOrganization', [
  'organizationName',
  'website',
  'address',
  'description',
]);

export const inviteTeamFormEntry = makeReduxFormEntry<NS.IInviteTeamForm>('inviteTeamForm', ['email']);
